const mongoose = require('mongoose');
require('dotenv').config();

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const Participant = require('../models/Participant');
        const count = await Participant.countDocuments();
        console.log('Total Registrations in DB:', count);
        const teams = await Participant.find({}, 'teamName');
        console.log('Teams List:');
        teams.forEach((t, i) => console.log(`${i + 1}. ${t.teamName}`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
