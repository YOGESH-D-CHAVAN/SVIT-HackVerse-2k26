const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Participant = require('./models/Participant');

async function count() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const registrations = await Participant.find({}, 'leaderEmail members');
        
        let totalLeaders = 0;
        let totalMembers = 0;
        
        registrations.forEach(reg => {
            if (reg.leaderEmail) totalLeaders++;
            if (reg.members) totalMembers += reg.members.length;
        });
        
        console.log('--- Email Count Statistics ---');
        console.log(`Total Teams/Leaders: ${totalLeaders}`);
        console.log(`Total Members (excluding leaders): ${totalMembers}`);
        console.log(`Grand Total (Everyone): ${totalLeaders + totalMembers}`);
        console.log('------------------------------');
        
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

count();
