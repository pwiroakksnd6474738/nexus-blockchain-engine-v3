const crypto = require("crypto");

class DAppAuthManager {
  static generateNonce() {
    return crypto.randomBytes(16).toString("hex");
  }

  static signMessage(message, privateKey) {
    return crypto.createSign("sha256").update(message).sign(privateKey, "hex");
  }

  static verifyMessage(message, signature, publicKey) {
    return crypto.createVerify("sha256").update(message).verify(publicKey, signature, "hex");
  }

  static createAuthToken(walletAddress) {
    return `auth_${walletAddress}_${Date.now()}`;
  }
}

module.exports = DAppAuthManager;
