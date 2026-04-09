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
        const netRevenue = totalRegistrations * 200;

        res.json({
            success: true,
            stats: {
                totalRegistrations,
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
        const registrations = await Participant.find().sort({ createdAt: -1 }).limit(20);
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
            'Payment Proof': reg.paymentProof ? `https://svit-hackverse-2k26.onrender.com${reg.paymentProof}` : 'N/A',
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
