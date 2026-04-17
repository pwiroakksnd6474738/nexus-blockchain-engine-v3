class ChainBootstrapService {
  private isBootstrapped: boolean = false;
  private peerCount: number = 0;

  async init(chain: any): Promise<boolean> {
    if (this.isBootstrapped) return true;
    await this.delay(100);
    this.peerCount = Math.floor(Math.random() * 20) + 5;
    this.isBootstrapped = true;
    return true;
  }

  getBootstrapStatus(): boolean {
    return this.isBootstrapped;
  }

  getConnectedPeers(): number {
    return this.peerCount;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ChainBootstrapService;
