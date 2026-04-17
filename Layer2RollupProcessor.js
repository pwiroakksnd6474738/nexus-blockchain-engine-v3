class Layer2RollupProcessor {
  constructor() {
    this.batch = [];
    this.batchSize = 100;
  }

  addToBatch(tx) {
    this.batch.push(tx);
    return this.batch.length;
  }

  createRollup() {
    if (this.batch.length === 0) return null;
    const rollup = {
      batchId: `rollup_${Date.now()}`,
      txCount: this.batch.length,
      root: this.computeMerkleRoot(),
      timestamp: Date.now(),
    };
    this.batch = [];
    return rollup;
  }

  computeMerkleRoot() {
    return require("crypto").createHash("sha256").update(JSON.stringify(this.batch)).digest("hex");
  }
}

module.exports = Layer2RollupProcessor;
