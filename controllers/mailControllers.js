const nodemailer = require("nodemailer");
const { decryptPassword } = require("./crypt_decrypt");
exports.sendMail = (req, res) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abdosaid07@gmail.com",
      pass: decryptPassword(),
    },
  });
  let mailDetails = {
    from: req.body.email,
    to: "abdelilahsaid01@gmail.com",
    subject: `Email : ${req.body.email} name : ${req.body.name}`,
    text: req.body.message,
  };
  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (data) return res.status(200).send(data);
    res.status(404).send(err);
  });
};

// https://myaccount.google.com/lesssecureapps   less security app for gmail
