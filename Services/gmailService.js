const transporter = require("../transporter");

module.exports = function (secret, gmail) {
  try {
    const mailOptions = {
      from: "",
      to: gmail,
      text: `Hello this is your one time key to login ${secret}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error occurred:", error);
      }
    });

    return 1;
  } catch (error) {
    console.log(error);
  }
};
