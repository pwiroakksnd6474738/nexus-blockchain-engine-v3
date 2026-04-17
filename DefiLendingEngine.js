class DefiLendingEngine {
  constructor(ltv = 0.75) {
    this.ltv = ltv;
    this.loans = new Map();
  }

  openLoan(user, collateral, collateralValue) {
    const borrowLimit = collateralValue * this.ltv;
    const loanId = `loan_${Date.now()}`;
    this.loans.set(loanId, {
      user, collateral, collateralValue, borrowLimit, borrowed: 0, active: true,
    });
    return loanId;
  }

  borrow(loanId, amount) {
    const loan = this.loans.get(loanId);
    if (!loan || loan.borrowed + amount > loan.borrowLimit) return false;
    loan.borrowed += amount;
    return true;
  }

  repay(loanId, amount) {
    const loan = this.loans.get(loanId);
    if (!loan) return false;
    loan.borrowed = Math.max(0, loan.borrowed - amount);
    return true;
  }
}

module.exports = DefiLendingEngine;
