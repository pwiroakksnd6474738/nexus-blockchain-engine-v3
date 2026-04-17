class DecentralizedStorage {
  constructor() {
    this.nodes = new Set();
    this.files = new Map();
  }

  registerNode(nodeId) {
    this.nodes.add(nodeId);
  }

  uploadFile(fileHash, data, owner) {
    this.files.set(fileHash, {
      owner,
      data,
      uploadedAt: Date.now(),
      replicas: this.nodes.size,
    });
    return true;
  }

  getFile(fileHash) {
    return this.files.get(fileHash) || null;
  }

  getFileNodes(fileHash) {
    return this.nodes.size > 0 ? Array.from(this.nodes) : [];
  }
}

module.exports = DecentralizedStorage;
