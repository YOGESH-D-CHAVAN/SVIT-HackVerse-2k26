require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SVIT HackVerse 2k26 Backend is operational.' });
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/register', registrationRoutes);

// Server Startup
const startServer = async () => {
    // 1. Start listening first
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        
        // 2. Connect to Database asynchronously
        const mongoose = require('mongoose');
        mongoose.connect(process.env.MONGO_URI)
            .then(conn => {
                console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            })
            .catch(error => {
                console.error('❌ MongoDB Connection Error:', error.message);
                console.log('⚠️ Running in offline mode. Registration and Admin features will be limited.');
            });
    });
};

startServer();
