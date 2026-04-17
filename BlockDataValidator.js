const crypto = require("crypto");

class BlockDataValidator {
  static validateBlock(block) {
    if (!block.index || !block.timestamp || !block.prevHash || !block.hash) {
      return false;
    }
    const computedHash = crypto
      .createHash("sha256")
      .update(JSON.stringify({ ...block, hash: undefined }))
      .digest("hex");
    return computedHash === block.hash;
  }

  static validateTransaction(tx) {
    return !!(tx.from && tx.to && tx.amount >= 0 && tx.signature);
  }

  static validateChain(chain) {
    return chain.every((block, i) => {
      if (i === 0) return true;
      return this.validateBlock(block) && block.prevHash === chain[i - 1].hash;
    });
  }
}

module.exports = BlockDataValidator;
