require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5013;

app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : '*',
}));
app.use(express.json());

// Auto-seed on startup
require('./db/seed');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/images', require('./routes/images'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Apollo Spa API' }));

app.listen(PORT, () => {
  console.log(`Apollo Spa API running on port ${PORT}`);
});
