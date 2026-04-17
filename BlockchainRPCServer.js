class BlockchainRPCServer {
  constructor(chain) {
    this.chain = chain;
    this.routes = {
      getChain: this.getChain.bind(this),
      getBlock: this.getBlock.bind(this),
      sendTx: this.sendTx.bind(this),
    };
  }

  getChain() {
    return this.chain.chain;
  }

  getBlock(index) {
    return this.chain.chain[index] || null;
  }

  sendTx(transaction) {
    this.chain.addTransaction(transaction);
    return { success: true, tx: transaction };
  }

  handleRequest(method, params) {
    return this.routes[method] ? this.routes[method](...params) : { error: "not found" };
  }
}

module.exports = BlockchainRPCServer;
