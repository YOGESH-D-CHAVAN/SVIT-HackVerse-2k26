const mongoose = require('mongoose');
const Participant = require('../models/Participant');
const Attendance = require('../models/Attendance');
const crypto = require('crypto');
require('dotenv').config();

const generateToken = () => crypto.randomBytes(8).toString('hex').toUpperCase();

const fix = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        // 1. Sync Participants to Attendance
        const allParticipants = await Participant.find({});
        console.log(`Processing ${allParticipants.length} teams...`);

        let createdCount = 0;
        for (const team of allParticipants) {
            // Check/Create Leader
            const leaderExists = await Attendance.findOne({ participantId: team._id.toString(), role: 'leader' });
            if (!leaderExists) {
                console.log(`Creating record for Leader: ${team.leaderName} (Team: ${team.teamName})`);
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

            // Check/Create Members
            if (team.members) {
                for (const member of team.members) {
                    const memberExists = await Attendance.findOne({ participantId: member._id.toString(), role: 'member' });
                    if (!memberExists) {
                        console.log(`Creating record for Member: ${member.name} (Team: ${team.teamName})`);
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
        }
        console.log(`Sync complete. Created ${createdCount} missing records.`);

        // 2. Reset Attendance (Remove tested QR scans)
        console.log('Resetting attendance status for all records...');
        const resetResult = await Attendance.updateMany(
            {}, 
            { $set: { isAttended: false, attendedAt: null } }
        );
        console.log(`Reset complete. Modified ${resetResult.modifiedCount} records.`);

        const finalCount = await Attendance.countDocuments();
        console.log(`Final Attendance record count: ${finalCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Error during fix:', error);
        process.exit(1);
    }
};

fix();
