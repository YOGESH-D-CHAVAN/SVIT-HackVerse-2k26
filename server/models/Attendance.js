const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    participantId: {
        type: String,
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['leader', 'member'],
        required: true
    },
    isAttended: {
        type: Boolean,
        default: false
    },
    attendedAt: {
        type: Date
    },
    isAttendedDay2: {
        type: Boolean,
        default: false
    },
    attendedAtDay2: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
