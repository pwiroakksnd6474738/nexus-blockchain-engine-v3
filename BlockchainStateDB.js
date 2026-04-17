class BlockchainStateDB {
  constructor() {
    this.state = new Map();
    this.snapshots = new Map();
  }

  set(key, value) {
    this.state.set(key, value);
  }

  get(key) {
    return this.state.get(key);
  }

  createSnapshot() {
    const id = `snap_${Date.now()}`;
    this.snapshots.set(id, new Map(this.state));
    return id;
  }

  revertSnapshot(id) {
    const snap = this.snapshots.get(id);
    if (!snap) return false;
    this.state = new Map(snap);
    return true;
  }
}

module.exports = BlockchainStateDB;
