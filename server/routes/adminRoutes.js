const express = require('express');
const router = express.Router();
const { login, getStats, getRegistrations, exportRegistrations } = require('../controllers/adminController');

router.post('/login', login);
router.get('/stats', getStats);
router.get('/registrations', getRegistrations);
router.get('/export', exportRegistrations);

module.exports = router;
