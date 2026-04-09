const Participant = require('../models/Participant');

// @desc    Register a new participant/team
// @route   POST /api/register
// @access  Public
exports.registerParticipant = async (req, res) => {
    try {
        console.log('--- Debug: Incoming Registration Body ---');
        console.log(req.body);
        console.log('--- Debug: File Info ---');
        console.log(req.file);
        
        const { teamName, teamSize, college, track, leaderName, leaderEmail, leaderPhone, transactionId } = req.body;
        let { members } = req.body;

        // ... existing parse logic ...
        if (typeof members === 'string') {
            try {
                members = JSON.parse(members);
            } catch (e) {
                console.warn('Could not parse members string, using empty array');
                members = [];
            }
        }
        
        console.log('Processed Destructured Fields:', { teamName, teamSize, leaderName, transactionId });

        // Check for unique team name
        const existingTeam = await Participant.findOne({ teamName: { $regex: new RegExp(`^${teamName}$`, 'i') } });
        if (existingTeam) {
            return res.status(400).json({
                success: false,
                message: `The team name "${teamName}" is already taken. Please go back and choose a different name.`
            });
        }

        const newParticipant = new Participant({
            teamName,
            teamSize,
            college,
            track,
            leaderName,
            leaderEmail,
            leaderPhone,
            transactionId,
            members: members || [],
            paymentProof: req.file ? `/uploads/${req.file.filename}` : null
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
