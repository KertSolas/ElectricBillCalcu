const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database/connection');
const billRoutes = require('./routes/billRoutes');
const shopRoutes = require('./routes/shopRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/bills', billRoutes);
app.use('/api/shops', shopRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

