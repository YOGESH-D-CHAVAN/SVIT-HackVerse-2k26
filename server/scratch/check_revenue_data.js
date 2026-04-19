const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Participant = require('../models/Participant');

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const participants = await Participant.find();
        console.log(`Total registrations: ${participants.length}`);
        
        participants.forEach(p => {
            console.log(`Team: ${p.teamName}, Size: ${p.teamSize} (${typeof p.teamSize}), Members Array Length: ${p.members.length}`);
        });

        const stats = await Participant.aggregate([
            {
                $group: {
                    _id: null,
                    totalParticipants: { $sum: "$teamSize" }
                }
            }
        ]);
        console.log('Aggregation result:', JSON.stringify(stats, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkData();
