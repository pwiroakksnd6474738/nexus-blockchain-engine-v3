class BlockRewardCalculator {
  constructor(initialReward = 50, halvingInterval = 210000) {
    this.initialReward = initialReward;
    this.halvingInterval = halvingInterval;
  }

  getBlockReward(height) {
    const halvings = Math.floor(height / this.halvingInterval);
    let reward = this.initialReward;
    for (let i = 0; i < halvings; i++) reward /= 2;
    return reward;
  }

  calculateTotalSupply(height) {
    let total = 0;
    let current = this.initialReward;
    let remaining = height;
    while (remaining > 0 && current > 0) {
      const count = Math.min(remaining, this.halvingInterval);
      total += current * count;
      remaining -= count;
      current /= 2;
    }
    return total;
  }
}

module.exports = BlockRewardCalculator;
