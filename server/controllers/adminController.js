const Admin = require('../models/Admin');
const Participant = require('../models/Participant');
const XLSX = require('xlsx');

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { adminId, authKey } = req.body;

        // 1. Check Env (Legacy support or fallback)
        if (adminId === process.env.ADMIN_ID && authKey === process.env.AUTH_KEY) {
            return res.json({
                success: true,
                message: 'Login successful (Master Key)',
                token: 'master-session-token-' + Date.now()
            });
        }

        // 2. Check Database
        const admin = await Admin.findOne({ adminId });
        if (admin && admin.authKey === authKey) {
            return res.json({
                success: true,
                message: 'Login successful',
                token: 'db-session-token-' + admin._id
            });
        }

        res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
    try {
        const totalRegistrations = await Participant.countDocuments();
        
        // Sum total participants across all teams
        const participantStats = await Participant.aggregate([
            {
                $group: {
                    _id: null,
                    totalParticipants: { $sum: "$teamSize" }
                }
            }
        ]);

        const totalParticipants = participantStats.length > 0 ? participantStats[0].totalParticipants : 0;
        const netRevenue = totalParticipants * 200;

        res.json({
            success: true,
            stats: {
                totalRegistrations, // Total Teams
                totalParticipants,  // Total Individuals
                netRevenue
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get recent registrations
// @route   GET /api/admin/registrations
// @access  Private (Admin)
exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await Participant.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Export registrations to Excel
// @route   GET /api/admin/export
// @access  Private (Admin)
exports.exportRegistrations = async (req, res) => {
    try {
        const registrations = await Participant.find().sort({ createdAt: -1 });
        
        // Flatten data for Excel
        const flattenedData = registrations.map(reg => ({
            'Team Name': reg.teamName,
            'Size': reg.teamSize,
            'College': reg.college,
            'Track': reg.track,
            'Status': reg.status,
            'Leader Name': reg.leaderName,
            'Leader Email': reg.leaderEmail,
            'Leader Phone': reg.leaderPhone,
            'Team Members': reg.members && reg.members.length > 0 
                ? reg.members.map(m => `${m.name} (${m.phone})`).join(', ') 
                : 'None',
            'Transaction ID': reg.transactionId,
            'Payment Proof': reg.paymentProof ? (reg.paymentProof.startsWith('http') ? reg.paymentProof : `${process.env.BACKEND_URL || ''}${reg.paymentProof}`) : 'N/A',
            'Registration Date': new Date(reg.createdAt).toLocaleString()
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(flattenedData);
        
        // Column widths for readability
        const wscols = [
            { wch: 20 }, // Team Name
            { wch: 5 },  // Size
            { wch: 30 }, // College
            { wch: 15 }, // Track
            { wch: 10 }, // Status
            { wch: 20 }, // Leader Name
            { wch: 25 }, // Leader Email
            { wch: 15 }, // Leader Phone
            { wch: 50 }, // Team Members
            { wch: 20 }, // Transaction ID
            { wch: 50 }, // Payment Proof
            { wch: 25 }  // Date
        ];
        ws['!cols'] = wscols;

        XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

        // Write to buffer
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=SVIT_HackVerse_Registrations.xlsx');
        res.send(buf);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Send bulk emails to all participants
// @route   POST /api/admin/send-bulk-email
// @access  Private (Admin)
exports.sendBulkEmail = async (req, res) => {
    try {
        const { subject, message, testEmail } = req.body;
        const { sendMail } = require('../config/email');
        const ccEmails = "rushikesh.bhalerao@pravara.in, Pratibha.waje@pravara.in";

        if (testEmail) {
            // Send test email
            await sendMail(testEmail, subject, message, ccEmails);
            return res.json({ success: true, message: `Test email sent to ${testEmail}` });
        }

        const registrations = await Participant.find({}, 'leaderEmail leaderName members');
        const results = [];
        let successCount = 0;
        let failCount = 0;

        for (const reg of registrations) {
            // Prepare list of recipients for this team (Members ONLY - Leader excluded as per user request)
            const recipients = [];
            
            if (reg.members && reg.members.length > 0) {
                reg.members.forEach(m => {
                    if (m.email) recipients.push({ email: m.email, name: m.name });
                });
            }

            // Send to each recipient in the team
            for (const recipient of recipients) {
                try {
                    await sendMail(recipient.email, subject, message, ccEmails);
                    results.push({ email: recipient.email, name: recipient.name, status: 'Success' });
                    successCount++;
                } catch (err) {
                    console.error(`Failed to send to ${recipient.email}:`, err);
                    results.push({ email: recipient.email, name: recipient.name, status: 'Failed', error: err.message });
                    failCount++;
                }
            }
        }

        res.json({ 
            success: true, 
            message: `Bulk email process completed.`,
            stats: { sent: successCount, failed: failCount },
            results
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
