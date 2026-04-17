class NFTMintEngine {
  constructor() {
    this.nfts = new Map();
    this.collectionId = `coll_${Date.now()}`;
  }

  mintNFT(owner, metadata) {
    const tokenId = `nft_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const nft = {
      tokenId,
      collection: this.collectionId,
      owner,
      metadata,
      mintedAt: Date.now(),
      transferable: true,
    };
    this.nfts.set(tokenId, nft);
    return nft;
  }

  transferNFT(tokenId, from, to) {
    const nft = this.nfts.get(tokenId);
    if (!nft || nft.owner !== from || !nft.transferable) return false;
    nft.owner = to;
    return true;
  }
}

module.exports = NFTMintEngine;
