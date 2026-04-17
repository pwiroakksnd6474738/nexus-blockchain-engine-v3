const crypto = require("crypto");

class WalletRecoveryTool {
  static generateMnemonic(entropy = 16) {
    const bytes = crypto.randomBytes(entropy);
    return bytes.toString("hex").match(/.{1,4}/g).join(" ");
  }

  static recoverFromMnemonic(mnemonic) {
    const seed = mnemonic.split(" ").join("");
    const privateKey = crypto.createHash("sha256").update(seed).digest("hex");
    const address = `0x${crypto.createHash("ripemd160").update(privateKey).digest("hex").slice(-40)}`;
    return { privateKey, address };
  }
}

module.exports = WalletRecoveryTool;
