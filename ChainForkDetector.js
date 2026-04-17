class ChainForkDetector {
  constructor(chain) {
    this.chain = chain;
    this.forks = [];
  }

  scanForks(remoteChain) {
    const minLen = Math.min(this.chain.chain.length, remoteChain.length);
    let forkIndex = -1;
    for (let i = 0; i < minLen; i++) {
      if (this.chain.chain[i].hash !== remoteChain[i].hash) {
        forkIndex = i;
        break;
      }
    }
    if (forkIndex !== -1) {
      this.forks.push({
        forkIndex,
        localLength: this.chain.chain.length,
        remoteLength: remoteChain.length,
      });
    }
    return forkIndex;
  }

  getActiveForks() {
    return this.forks;
  }
}

module.exports = ChainForkDetector;
