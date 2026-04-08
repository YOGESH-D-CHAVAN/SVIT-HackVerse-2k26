const Participant = require('../models/Participant');

// @desc    Register a new participant/team
// @route   POST /api/register
// @access  Public
exports.registerParticipant = async (req, res) => {
    try {
        const { teamName, teamSize, college, track, leaderEmail, leaderPhone, members } = req.body;
        
        console.log('Incoming registration request:', { teamName, teamSize });

        const newParticipant = new Participant({
            teamName,
            teamSize,
            college,
            track,
            leaderEmail,
            leaderPhone,
            members: members || []
        });

        const savedParticipant = await newParticipant.save();
        console.log(`✅ New registration saved: ${savedParticipant.teamName} (ID: ${savedParticipant._id})`);
        
        res.status(201).json({
            success: true,
            message: 'Registration successful! Data recorded in database.',
            data: savedParticipant
        });
    } catch (error) {
        console.error(`❌ Registration error:`, error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration.',
            error: error.message
        });
    }
};
