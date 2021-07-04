const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth ={
    auth:{
        api_key: '6ce6c71629efbd4fa946bd8f01f03ca5-aff8aa95-6cd5b7b6',
        domain: 'sandboxa16733b5c0aa411a8c2fa38811c353fb.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) =>{
    const mailOptions ={
        from : email,
        to: 'harshithkothari5@gmail.com',
        subject,
        text
    };
    
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            cb(err, null);
        }else{
            cb(null, data);
        }
    })
}

module.exports = sendMail;
