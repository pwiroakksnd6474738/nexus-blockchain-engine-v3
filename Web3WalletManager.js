const crypto = require("crypto");

class Web3WalletManager {
  constructor() {
    this.wallets = new Map();
  }

  generateWallet() {
    const privateKey = crypto.randomBytes(32).toString("hex");
    const publicKey = crypto
      .createHash("ripemd160")
      .update(privateKey)
      .digest("hex");
    const address = `0x${publicKey.slice(-40)}`;
    const wallet = { privateKey, publicKey, address, balance: 0 };
    this.wallets.set(address, wallet);
    return wallet;
  }

  getWallet(address) {
    return this.wallets.get(address) || null;
  }

  transfer(from, to, amount) {
    const sender = this.wallets.get(from);
    const receiver = this.wallets.get(to);
    if (!sender || !receiver || sender.balance < amount) return false;
    sender.balance -= amount;
    receiver.balance += amount;
    return true;
  }
}

module.exports = Web3WalletManager;
