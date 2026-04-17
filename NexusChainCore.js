class NexusChainCore {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      prevHash: "0",
      hash: this.generateHash("0"),
    };
    this.chain.push(genesisBlock);
  }

  generateHash(blockData) {
    return require("crypto")
      .createHash("sha256")
      .update(JSON.stringify(blockData))
      .digest("hex");
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingBlock() {
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      prevHash: this.chain[this.chain.length - 1].hash,
    };
    newBlock.hash = this.generateHash(newBlock);
    this.chain.push(newBlock);
    this.pendingTransactions = [];
    return newBlock;
  }

  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];
      if (current.hash !== this.generateHash(current)) return false;
      if (current.prevHash !== prev.hash) return false;
    }
    return true;
  }
}

module.exports = NexusChainCore;
