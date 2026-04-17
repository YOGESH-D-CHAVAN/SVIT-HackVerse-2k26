const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true,
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
    leaderName: {
        type: String,
        required: true
    },
    leaderEmail: {
        type: String,
        required: [true, 'Leader email is required'],
        match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Please use a valid @gmail.com address']
    },
    leaderPhone: {
        type: String,
        required: [true, 'Leader phone is required'],
        match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits']
    },
    members: [
        {
            name: String,
            email: String,
            phone: String
        }
    ],
    transactionId: {
        type: String,
        required: true
    },
    paymentProof: {
        type: String // URL or file path to the upload
    }
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);
