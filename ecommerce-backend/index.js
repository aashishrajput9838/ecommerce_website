const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

// Routes
const appRouter = require('./routes/app');
app.use('/api', appRouter);

// Health check
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Serve static frontend
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

// Simple debug endpoint to inspect DB connection state
app.get('/debug/db', (_req, res) => {
    const states = mongoose.STATES || mongoose.Connection.STATES || {};
    const state = mongoose.connection.readyState;
    res.json({
        readyState: state,
        stateName: Object.keys(states).find((k) => states[k] === state) || String(state)
    });
});

// Connect to Mongo and only start the server after a successful connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error on startup:', err);
        process.exitCode = 1;
    });

module.exports = app;