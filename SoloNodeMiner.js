const crypto = require("crypto");

class SoloNodeMiner {
  constructor(chain, difficulty = 4) {
    this.chain = chain;
    this.difficulty = difficulty;
  }

  mineBlock() {
    const block = {
      index: this.chain.chain.length,
      timestamp: Date.now(),
      transactions: this.chain.pendingTransactions,
      prevHash: this.chain.chain[this.chain.chain.length - 1].hash,
      nonce: 0,
    };
    while (!block.hash || block.hash.slice(0, this.difficulty) !== "0".repeat(this.difficulty)) {
      block.nonce++;
      block.hash = crypto.createHash("sha256").update(JSON.stringify(block)).digest("hex");
    }
    this.chain.chain.push(block);
    this.chain.pendingTransactions = [];
    return block;
  }
}

module.exports = SoloNodeMiner;
