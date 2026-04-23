const mongoose = require('mongoose');
const Participant = require('../models/Participant');
const Attendance = require('../models/Attendance');
require('dotenv').config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const allParticipants = await Participant.find({});
        console.log(`Total Teams: ${allParticipants.length}`);

        let totalExpectedFromTeamSize = 0;
        let totalActualPeopleInDocs = 0;

        for (const team of allParticipants) {
            totalExpectedFromTeamSize += team.teamSize;
            
            // Check Leader
            const leaderInAttendance = await Attendance.findOne({ participantId: team._id.toString(), role: 'leader' });
            if (!leaderInAttendance) {
                console.log(`MISSING LEADER: ${team.leaderName} (${team.leaderEmail}) from Team ${team.teamName}`);
                console.log(`  Team ID: ${team._id.toString()}`);
                const anyRecordWithId = await Attendance.findOne({ participantId: team._id.toString() });
                if (anyRecordWithId) {
                    console.log(`  Found record with same participantId: Role=${anyRecordWithId.role}, Name=${anyRecordWithId.name}`);
                }
                const anyRecordWithEmail = await Attendance.findOne({ email: team.leaderEmail });
                if (anyRecordWithEmail) {
                    console.log(`  Found record with same email: Role=${anyRecordWithEmail.role}, Team=${anyRecordWithEmail.teamName}`);
                }
            }
            totalActualPeopleInDocs++;

            // Check Members
            if (team.members) {
                for (const member of team.members) {
                    totalActualPeopleInDocs++;
                    const memberInAttendance = await Attendance.findOne({ participantId: member._id.toString(), role: 'member' });
                    if (!memberInAttendance) {
                        console.log(`MISSING MEMBER: ${member.name} (${member.email}) from Team ${team.teamName}`);
                    }
                }
            }
        }

        console.log(`\nTotal Expected (sum of teamSize): ${totalExpectedFromTeamSize}`);
        console.log(`Total Actual People in Participant Docs: ${totalActualPeopleInDocs}`);

        const attendanceCount = await Attendance.countDocuments();
        console.log(`Total Records in Attendance Collection: ${attendanceCount}`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

check();
