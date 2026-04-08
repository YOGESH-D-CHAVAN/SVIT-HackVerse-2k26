const express = require('express');
const router = express.Router();
const { login, getStats, getRegistrations } = require('../controllers/adminController');

router.post('/login', login);
router.get('/stats', getStats);
router.get('/registrations', getRegistrations);

module.exports = router;
