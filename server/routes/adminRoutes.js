const express = require('express');
const router = express.Router();
const { login, getStats, getRegistrations, exportRegistrations, sendBulkEmail } = require('../controllers/adminController');

router.post('/login', login);
router.get('/stats', getStats);
router.get('/registrations', getRegistrations);
router.get('/export', exportRegistrations);
router.post('/send-bulk-email', sendBulkEmail);

module.exports = router;
