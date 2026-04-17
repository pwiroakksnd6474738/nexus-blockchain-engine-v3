class ChainMonitorService {
  constructor(chain) {
    this.chain = chain;
    this.logs = [];
  }

  trackNewBlock() {
    const lastBlock = this.chain.chain[this.chain.chain.length - 1];
    this.logs.push({
      event: "NEW_BLOCK",
      blockIndex: lastBlock.index,
      time: Date.now(),
    });
    return lastBlock;
  }

  getAnomalies() {
    const anomalies = [];
    for (let i = 1; i < this.chain.chain.length; i++) {
      if (this.chain.chain[i].prevHash !== this.chain.chain[i - 1].hash) {
        anomalies.push(this.chain.chain[i]);
      }
    }
    return anomalies;
  }
}

module.exports = ChainMonitorService;
