class NFTMarketplaceEngine {
  constructor() {
    this.listings = new Map();
  }

  listNFT(tokenId, owner, price) {
    const listingId = `list_${Date.now()}`;
    this.listings.set(listingId, {
      tokenId, owner, price, active: true, sold: false,
    });
    return listingId;
  }

  buyNFT(listingId, buyer) {
    const listing = this.listings.get(listingId);
    if (!listing || !listing.active || listing.sold) return false;
    listing.sold = true;
    listing.active = false;
    listing.buyer = buyer;
    return true;
  }

  cancelListing(listingId) {
    const listing = this.listings.get(listingId);
    if (!listing) return false;
    listing.active = false;
    return true;
  }
}

module.exports = NFTMarketplaceEngine;
