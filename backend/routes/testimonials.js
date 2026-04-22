const express = require('express');
const router = express.Router();
const db = require('../db/init');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM testimonials ORDER BY id ASC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { name, country, flag, rating, content } = req.body;
  if (!name || !content) return res.status(400).json({ error: 'Missing required fields' });
  const stmt = db.prepare(`
    INSERT INTO testimonials (name, country, flag, rating, content)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(name, country || '', flag || '🌍', rating || 5, content);
  res.status(201).json({ id: result.lastInsertRowid });
});

module.exports = router;
