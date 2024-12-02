const gmailService = require("./Services/gmailService");
const totpService = require("./Services/totpService");

class AuthController {
  async login(req, res) {
    try {
      const { gmail } = req.body;

      if (!gmail) {
        return res
          .status(400)
          .json({ message: "Login error, please try again!" });
      }

      const secret = totpService.generateSecret(gmail);

      if (!secret) {
        return res
          .status(400)
          .json({ message: "Something went wrong, please try again!" });
      }

      gmailService(secret.secret, gmail);

      return res
        .status(200)
        .json({ message: "Please check your email address to login page!" });
    } catch (error) {
      console.log(error);
    }
  }

  async verify(req, res) {
    const { key, gmail } = req.body;

    if (!key) {
      return res.json({ message: "Field key is needed, please try again!" });
    }

    const verify = totpService.verifyKey(key, gmail);

    if (!verify) {
      return res
        .status(400)
        .json({ message: "Verification key error, please try again!" });
    }

    return res.json({ message: "Verification ok!" });
  }
}

module.exports = new AuthController();
