const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit
});

router.post('/', (req, res, next) => {
    upload.single('paymentProof')(req, res, (err) => {
        if (err) {
            console.error('❌ Multer/Cloudinary Error:', err);
            return res.status(500).json({
                success: false,
                message: 'File upload failed.',
                error: err.message || err
            });
        }
        next();
    });
}, registrationController.registerParticipant);

module.exports = router;
