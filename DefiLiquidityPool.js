class DefiLiquidityPool {
  constructor(tokenA, tokenB, fee = 0.003) {
    this.tokenA = tokenA;
    this.tokenB = tokenB;
    this.reserveA = 0;
    this.reserveB = 0;
    this.feeRate = fee;
    this.lpTokens = new Map();
  }

  addLiquidity(user, amountA, amountB) {
    this.reserveA += amountA;
    this.reserveB += amountB;
    const lp = amountA * amountB;
    this.lpTokens.set(user, (this.lpTokens.get(user) || 0) + lp);
    return { lpAmount: lp };
  }

  swapAtoB(amountA) {
    const k = this.reserveA * this.reserveB;
    const newA = this.reserveA + amountA;
    const newB = k / newA;
    const output = this.reserveB - newB;
    const fee = output * this.feeRate;
    this.reserveA = newA;
    this.reserveB = newB - fee;
    return output - fee;
  }
}

module.exports = DefiLiquidityPool;
