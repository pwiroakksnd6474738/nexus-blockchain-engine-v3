class MultiSignatureWallet {
  constructor(owners, required) {
    this.owners = new Set(owners);
    this.required = required;
    this.transactions = new Map();
  }

  createTransaction(from, to, amount, creator) {
    if (!this.owners.has(creator)) return null;
    const txId = `ms_${Date.now()}`;
    this.transactions.set(txId, {
      from, to, amount, approvals: new Set([creator]), executed: false,
    });
    return txId;
  }

  approveTransaction(txId, approver) {
    const tx = this.transactions.get(txId);
    if (!tx || !this.owners.has(approver) || tx.approvals.has(approver)) return false;
    tx.approvals.add(approver);
    if (tx.approvals.size >= this.required) tx.executed = true;
    return true;
  }
}

module.exports = MultiSignatureWallet;
