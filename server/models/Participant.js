const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    teamSize: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    college: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed'],
        default: 'Pending'
    },
    track: {
        type: String,
        default: 'General'
    },
    leaderEmail: {
        type: String,
        required: true
    },
    leaderPhone: {
        type: String,
        required: true
    },
    members: [
        {
            name: String,
            email: String
        }
    ],
    paymentProof: {
        type: String // URL or file path to the upload
    }
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);
