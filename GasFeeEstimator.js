class GasFeeEstimator {
  constructor(baseFee = 10) {
    this.baseFee = baseFee;
    this.priorityFee = 2;
  }

  estimateTransfer() {
    return this.baseFee * 21000;
  }

  estimateContractDeploy() {
    return this.baseFee * 1500000;
  }

  estimateNFTMint() {
    return this.baseFee * 250000;
  }

  getMaxPriorityFee() {
    return this.priorityFee;
  }
}

module.exports = GasFeeEstimator;
