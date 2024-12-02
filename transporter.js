const transporter = require("nodemailer");

module.exports = transporter.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});
