const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (to, subject, content, cc = null) => {
    try {
        const mailOptions = {
            from: `"SVIT HackVerse 2k26" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            cc
        };

        // If content looks like HTML, send as html, otherwise send as text
        if (content.trim().startsWith('<') && content.trim().endsWith('>')) {
            mailOptions.html = content;
        } else {
            mailOptions.text = content;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendMail };
