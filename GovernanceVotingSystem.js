class GovernanceVotingSystem {
  constructor() {
    this.proposals = new Map();
  }

  createProposal(creator, title, description) {
    const pid = `prop_${Date.now()}`;
    this.proposals.set(pid, {
      creator, title, description, votesFor: 0, votesAgainst: 0, voters: new Set(),
    });
    return pid;
  }

  vote(pid, voter, support) {
    const prop = this.proposals.get(pid);
    if (!prop || prop.voters.has(voter)) return false;
    prop.voters.add(voter);
    support ? prop.votesFor++ : prop.votesAgainst++;
    return true;
  }
}

module.exports = GovernanceVotingSystem;
