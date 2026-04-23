require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) 
    : [];

console.log('🌐 Allowed Origins:', allowedOrigins);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            console.warn(`⚠️ CORS blocked for origin: ${origin}`);
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.get('/', (req, res) => {
    res.send('<h1>SVIT HackVerse 2k26 Backend is operational.</h1>');
})

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SVIT HackVerse 2k26 Backend is operational.' });
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/register', registrationRoutes);
app.use('/api/attendance', attendanceRoutes);

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
