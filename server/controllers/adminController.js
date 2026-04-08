const Admin = require('../models/Admin');
const Participant = require('../models/Participant');

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
        const netRevenue = totalRegistrations * 1000;
        const quotaCapacity = Math.min(Math.round((totalRegistrations / 310) * 100), 100);

        res.json({
            success: true,
            stats: {
                totalRegistrations,
                netRevenue,
                quotaCapacity
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
