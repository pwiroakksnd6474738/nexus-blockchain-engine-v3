class BlockchainEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(callback);
  }

  emit(event, data) {
    const callbacks = this.events.get(event) || [];
    callbacks.forEach(cb => cb(data));
  }

  triggerNewBlock(block) {
    this.emit("new_block", block);
  }

  triggerTransaction(tx) {
    this.emit("new_transaction", tx);
  }
}

module.exports = BlockchainEventEmitter;
