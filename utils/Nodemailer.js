const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const mailOptions = {
        from: "MJ PRIVATE LIMITED",
        to: req.body.email,
        subject: "Change Password",
        // "text":"Do not share this link to anyone!"
        html: `<h1><a href="${url}">Click here to change password!</a></h1>`
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return next(new ErrorHandler(err, 500));
        console.log(info);
        res.status(200).json({
            message: "Mail sent successfully!",
            url
        });
    });
};