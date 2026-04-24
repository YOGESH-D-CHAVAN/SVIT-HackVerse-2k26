const Attendance = require('../models/Attendance');
const Participant = require('../models/Participant');
const crypto = require('crypto');

// Generate a random token
const generateToken = () => crypto.randomBytes(8).toString('hex').toUpperCase();

// Sync existing participants into the Attendance collection
exports.syncAttendance = async (req, res) => {
    try {
        const allParticipants = await Participant.find({});
        let createdCount = 0;

        for (const team of allParticipants) {
            // Check/Create for Leader
            const leaderExists = await Attendance.findOne({ participantId: team._id.toString(), role: 'leader' });
            if (!leaderExists) {
                await Attendance.create({
                    token: generateToken(),
                    participantId: team._id.toString(),
                    teamId: team._id,
                    name: team.leaderName,
                    email: team.leaderEmail,
                    teamName: team.teamName,
                    role: 'leader'
                });
                createdCount++;
            }

            // Check/Create for each Member
            for (const member of team.members) {
                const memberExists = await Attendance.findOne({ participantId: member._id.toString(), role: 'member' });
                if (!memberExists) {
                    await Attendance.create({
                        token: generateToken(),
                        participantId: member._id.toString(),
                        teamId: team._id,
                        name: member.name,
                        email: member.email,
                        teamName: team.teamName,
                        role: 'member'
                    });
                    createdCount++;
                }
            }
        }

        res.status(200).json({
            success: true,
            message: `Synced ${createdCount} new participants to attendance system.`
        });
    } catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ success: false, message: 'Failed to sync attendance data.' });
    }
};

// Get participant info by token
exports.getParticipantByToken = async (req, res) => {
    try {
        const { token } = req.params;
        const record = await Attendance.findOne({ token });

        if (!record) {
            return res.status(404).json({ success: false, message: 'Invalid QR Code / Token.' });
        }

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching participant info.' });
    }
};

// Mark attendance
exports.markAttendance = async (req, res) => {
    try {
        const { token } = req.params;
        const { day } = req.body; // Expecting { day: 1 } or { day: 2 }
        const record = await Attendance.findOne({ token });

        if (!record) {
            return res.status(404).json({ success: false, message: 'Invalid QR Code / Token.' });
        }

        if (day === 2) {
            if (record.isAttendedDay2) {
                return res.status(400).json({ success: false, message: 'Day 2 attendance already marked for this participant.' });
            }
            record.isAttendedDay2 = true;
            record.attendedAtDay2 = new Date();
        } else {
            // Default to Day 1
            if (record.isAttended) {
                return res.status(400).json({ success: false, message: 'Day 1 attendance already marked for this participant.' });
            }
            record.isAttended = true;
            record.attendedAt = new Date();
        }

        await record.save();

        res.status(200).json({
            success: true,
            message: `Attendance marked successfully for ${record.name} (Day ${day || 1}).`,
            data: record
        });
    } catch (error) {
        console.error('Mark Attendance Error:', error);
        res.status(500).json({ success: false, message: 'Error marking attendance.' });
    }
};

// Get all attendance records (for admin list)
exports.getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.find().sort({ isAttended: -1, updatedAt: -1 });
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching attendance list.' });
    }
};

// Get QR for a specific participant (leader or member)
// This is a helper for the frontend to find their token
exports.getParticipantToken = async (req, res) => {
    try {
        const { email } = req.params;
        const record = await Attendance.findOne({ email: new RegExp('^' + email + '$', 'i') });

        if (!record) {
            return res.status(404).json({ success: false, message: 'Attendance record not found for this email.' });
        }

        res.status(200).json({ success: true, token: record.token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching token.' });
    }
};
