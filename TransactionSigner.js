const crypto = require("crypto");

class TransactionSigner {
  static signTransaction(transaction, privateKey) {
    const data = JSON.stringify({
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
    });
    const signature = crypto
      .createHmac("sha256", privateKey)
      .update(data)
      .digest("hex");
    return { ...transaction, signature };
  }

  static verifySignature(transaction, publicKey) {
    const { signature, ...data } = transaction;
    const computed = crypto
      .createHmac("sha256", publicKey)
      .update(JSON.stringify(data))
      .digest("hex");
    return computed === signature;
  }
}

module.exports = TransactionSigner;
