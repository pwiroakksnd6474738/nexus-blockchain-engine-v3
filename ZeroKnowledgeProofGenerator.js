const crypto = require("crypto");

class ZeroKnowledgeProofGenerator {
  static generateProof(secret, publicKey) {
    const hash = crypto.createHash("sha256").update(secret).digest("hex");
    const proof = crypto
      .createHmac("sha256", publicKey)
      .update(hash)
      .digest("hex");
    return { proof, commitment: hash };
  }

  static verifyProof(proof, commitment, publicKey) {
    const computed = crypto.createHmac("sha256", publicKey).update(commitment).digest("hex");
    return computed === proof;
  }
}

module.exports = ZeroKnowledgeProofGenerator;
