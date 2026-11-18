const { db } = require('../db');

function pick(source, allowed) {
  const out = {};
  for (const key of allowed) {
    if (source[key] !== undefined) out[key] = source[key];
  }
  return out;
}

function crud(table, fields) {
  const router = require('express').Router();

  router.get('/', async (req, res, next) => {
    try {
      const [rows] = await db.query(`SELECT * FROM \`${table}\` ORDER BY id DESC`);
      res.json(rows);
    } catch (err) { next(err); }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (err) { next(err); }
  });

  router.post('/', async (req, res) => {
    const data = pick(req.body, fields);
    const cols = Object.keys(data);
    if (!cols.length) return res.status(400).json({ error: 'No fields provided' });
    const placeholders = cols.map(() => '?').join(', ');
    const columns = cols.map((c) => `\`${c}\``).join(', ');
    const values = cols.map((c) => data[c]);
    try {
      const [result] = await db.query(`INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`, values);
      const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    const data = pick(req.body, fields);
    const cols = Object.keys(data);
    if (!cols.length) return res.status(400).json({ error: 'No fields provided' });
    const sets = cols.map((c) => `\`${c}\` = ?`).join(', ');
    const values = cols.map((c) => data[c]);
    try {
      const [result] = await db.query(`UPDATE \`${table}\` SET ${sets} WHERE id = ?`, [...values, req.params.id]);
      if (!result.affectedRows) return res.status(404).json({ error: 'Not found' });
      const [rows] = await db.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const [result] = await db.query(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      if (!result.affectedRows) return res.status(404).json({ error: 'Not found' });
      res.json({ ok: true });
    } catch (err) { next(err); }
  });

  return router;
}

module.exports = { crud, pick };
