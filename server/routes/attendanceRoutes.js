const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Sync route (should be protected by admin middleware in production)
router.post('/sync', attendanceController.syncAttendance);

// Get all attendance records
router.get('/list', attendanceController.getAllAttendance);

// Get participant info by token (for scanner)
router.get('/info/:token', attendanceController.getParticipantByToken);

// Mark attendance by token (for scanner)
router.post('/mark/:token', attendanceController.markAttendance);

// Get token by email (for participant to find their QR)
router.get('/token/:email', attendanceController.getParticipantToken);

module.exports = router;
