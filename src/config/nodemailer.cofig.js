const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth: {
        user : process.env.EMAIL,
        pass: process.EMAIL_PASSWORD,
    },
});

module.exports = transporter;