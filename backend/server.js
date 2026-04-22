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

app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Anna Spa API' }));

app.listen(PORT, () => {
  console.log(`Anna Spa API running on port ${PORT}`);
});
