require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { init, seed, DB_NAME } = require('./db');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ service: 'EduStruc SMS API', status: 'online', health: '/api/health' }));
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'EduStruc API', database: 'supabase' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', auth(), require('./routes/students'));
app.use('/api/courses', auth(), require('./routes/courses'));
app.use('/api/classes', auth(), require('./routes/classes'));
app.use('/api/schedules', auth(), require('./routes/schedules'));
app.use('/api/payments', auth(), require('./routes/payments'));
app.use('/api/messages', auth(), require('./routes/messages'));
app.use('/api/settings', auth('admin'), require('./routes/settings'));
app.use('/api/dashboard', auth(), require('./routes/dashboard'));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await init();
    await seed();
    console.log(`MySQL connected. Database "${DB_NAME}" ready.`);
  } catch (err) {
    console.error('MySQL init failed:', err.message);
    console.error('Check MySQL is running and DB_HOST/DB_USER/DB_PASSWORD/DB_NAME in backend/.env are correct.');
  }
  if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`EduStruc API running on http://localhost:${PORT}`));
  }
}

start();

module.exports = app;
