const crypto = require("crypto");

class BlockchainMerkleTree {
  constructor(transactions) {
    this.leaves = transactions.map(tx => this.hash(tx));
    this.root = this.buildRoot();
  }

  hash(data) {
    return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
  }

  buildRoot() {
    let nodes = [...this.leaves];
    while (nodes.length > 1) {
      const temp = [];
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i];
        const right = i + 1 < nodes.length ? nodes[i + 1] : left;
        temp.push(this.hash(left + right));
      }
      nodes = temp;
    }
    return nodes[0] || "";
  }

  getRoot() {
    return this.root;
  }
}

module.exports = BlockchainMerkleTree;
