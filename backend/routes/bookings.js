const express = require('express');
const router = express.Router();
const db = require('../db/init');

router.post('/', (req, res) => {
  const { name, phone, email, service, duration, date, time, notes } = req.body;
  if (!name || !phone || !service || !duration || !date || !time) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
  }
  const stmt = db.prepare(`
    INSERT INTO bookings (name, phone, email, service, duration, date, time, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(name, phone, email || '', service, duration, date, time, notes || '');
  res.status(201).json({ id: result.lastInsertRowid, message: 'Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.' });
});

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
  res.json(rows);
});

router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ message: 'Updated' });
});

module.exports = router;
