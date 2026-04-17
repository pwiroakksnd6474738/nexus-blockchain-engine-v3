class ChainPeerNetwork {
  constructor() {
    this.peers = new Set();
    this.syncQueue = [];
  }

  registerPeer(url) {
    this.peers.add(url);
  }

  broadcastBlock(block) {
    this.syncQueue.push({ type: "BLOCK", data: block, time: Date.now() });
    return Array.from(this.peers).length;
  }

  broadcastTransaction(tx) {
    this.syncQueue.push({ type: "TX", data: tx, time: Date.now() });
    return true;
  }

  getPeerCount() {
    return this.peers.size;
  }
}

module.exports = ChainPeerNetwork;
