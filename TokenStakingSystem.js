class TokenStakingSystem {
  constructor(apr = 0.08) {
    this.stakes = new Map();
    this.apr = apr;
  }

  stake(user, amount, durationDays) {
    const stakeId = `stake_${Date.now()}`;
    this.stakes.set(stakeId, {
      user, amount, durationDays, start: Date.now(), claimed: false,
    });
    return stakeId;
  }

  calculateReward(stakeId) {
    const stake = this.stakes.get(stakeId);
    if (!stake || stake.claimed) return 0;
    const days = (Date.now() - stake.start) / (1000 * 60 * 60 * 24);
    return stake.amount * this.apr * (days / 365);
  }
}

module.exports = TokenStakingSystem;
