const nodemailer = require("nodemailer");

exports.generateOTP = () => {
    let otp = "";
    for(let i = 0; i <= 3; i++) {
    const randomOTP = Math.floor(Math.random() * 9)
    otp = otp + randomOTP;
    }
    return otp;
};

exports.mailTransport = () => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
    });

}