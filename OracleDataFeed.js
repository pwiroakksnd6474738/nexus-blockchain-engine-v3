class OracleDataFeed {
  constructor() {
    this.sources = new Map();
    this.prices = new Map();
  }

  registerSource(sourceId, url) {
    this.sources.set(sourceId, url);
  }

  updatePrice(pair, value) {
    this.prices.set(pair, {
      value,
      updatedAt: Date.now(),
      sourceCount: this.sources.size,
    });
  }

  getPrice(pair) {
    return this.prices.get(pair) || null;
  }
}

module.exports = OracleDataFeed;
