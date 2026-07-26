const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../db/init');
const auth = require('../middleware/auth');
const cloudinary = require('../lib/cloudinary');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

const SINGLE_SECTIONS = ['hero', 'hero_mobile', 'welcome', 'home_cta', 'contact_header', 'booking_header', 'reviews_header', 'favicon'];
const MULTI_SECTIONS = ['gallery', 'feedback'];
const ALL_SECTIONS = [...SINGLE_SECTIONS, ...MULTI_SECTIONS];

function uploadToCloudinary(buffer, mimetype, folder) {
  return new Promise((resolve, reject) => {
    const b64 = `data:${mimetype};base64,${buffer.toString('base64')}`;
    cloudinary.uploader.upload(b64, { folder: `apollo-spa/${folder}` }, (err, result) => {
      if (err) reject(err); else resolve(result);
    });
  });
}

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM site_images ORDER BY section ASC, position ASC, id ASC').all();
  const grouped = {};
  ALL_SECTIONS.forEach(s => { grouped[s] = []; });
  rows.forEach(r => { grouped[r.section] = grouped[r.section] || []; grouped[r.section].push(r); });
  res.json(grouped);
});

router.post('/:section', auth, upload.single('image'), async (req, res) => {
  const { section } = req.params;
  if (!ALL_SECTIONS.includes(section)) return res.status(400).json({ error: 'Phần ảnh không hợp lệ.' });
  if (!req.file) return res.status(400).json({ error: 'Chưa chọn file ảnh.' });
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(500).json({ error: 'Cloudinary chưa được cấu hình trên server (thiếu biến môi trường CLOUDINARY_*).' });
  }

  try {
    const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype, section);

    if (SINGLE_SECTIONS.includes(section)) {
      const old = db.prepare('SELECT * FROM site_images WHERE section = ?').get(section);
      if (old) {
        if (old.public_id) {
          try { await cloudinary.uploader.destroy(old.public_id); } catch { /* ignore */ }
        }
        db.prepare('DELETE FROM site_images WHERE id = ?').run(old.id);
      }
      const info = db.prepare('INSERT INTO site_images (section, position, url, public_id) VALUES (?, 0, ?, ?)')
        .run(section, result.secure_url, result.public_id);
      return res.status(201).json({ id: info.lastInsertRowid, section, position: 0, url: result.secure_url, public_id: result.public_id });
    }

    const maxPos = db.prepare('SELECT COALESCE(MAX(position), -1) as m FROM site_images WHERE section = ?').get(section).m;
    const info = db.prepare('INSERT INTO site_images (section, position, url, public_id) VALUES (?, ?, ?, ?)')
      .run(section, maxPos + 1, result.secure_url, result.public_id);
    res.status(201).json({ id: info.lastInsertRowid, section, position: maxPos + 1, url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ error: 'Upload thất bại. Kiểm tra cấu hình Cloudinary.' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const row = db.prepare('SELECT * FROM site_images WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
  if (row.public_id) {
    try { await cloudinary.uploader.destroy(row.public_id); } catch { /* ignore */ }
  }
  db.prepare('DELETE FROM site_images WHERE id = ?').run(row.id);
  res.json({ message: 'Đã xoá' });
});

module.exports = router;
