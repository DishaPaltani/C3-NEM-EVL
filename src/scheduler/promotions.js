const cron = require('node-cron');
const transporter = require('../config/nodemailer.cofig');

cron.schedule('0 0 * * 0', ()=>{
    const mailOption = {
        from : process.env.EMAIL,
        to : 'customer@example.com',
        subject : 'Weekly Promotions',
        text : 'Check out our latest  promotios!',
    };

    transporter.sendMail(mailOption, (error, info)=>{
        if(error){
            return console.log(error);
        }
        console.log('Promotional email sent:' + info.response );
    });
});