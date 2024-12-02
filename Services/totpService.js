class TotpService {
  constructor() {
    this.secrets = {};
  }
  generateSecret(userGmail, length = 16) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let secret = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      secret += charset[randomIndex];
    }

    this.secrets[userGmail] = {
      secret: secret,
      expirationTime: Date.now() + 2 * 60 * 1000,
    };

    setTimeout(() => {
      this.deleteSecret(userGmail);
    }, 2 * 60 * 1000);

    console.log(this.secrets);

    return this.secrets[userGmail];
  }

  verifyKey(key, userGmail) {
    const userSecret = this.secrets[userGmail];

    if (!userSecret) {
      return false;
    }

    if (Date.now() > userSecret.expirationTime) {
      this.deleteSecret(userGmail);
      return false;
    }

    const check = userSecret.secret === key;

    if (check) {
      this.deleteSecret(userGmail);
      return 1;
    }
  }

  deleteSecret(userGmail) {
    delete this.secrets[userGmail];
  }
}

module.exports = new TotpService();
