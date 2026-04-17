class P2PMessageProtocol {
  static encodeMessage(type, data) {
    return JSON.stringify({
      magic: "NEXUS_P2P",
      type,
      data,
      timestamp: Date.now(),
      checksum: this.checksum(data),
    });
  }

  static decodeMessage(raw) {
    try {
      const msg = JSON.parse(raw);
      if (msg.magic !== "NEXUS_P2P") return null;
      return msg;
    } catch {
      return null;
    }
  }

  static checksum(data) {
    return require("crypto").createHash("md5").update(JSON.stringify(data)).digest("hex");
  }
}

module.exports = P2PMessageProtocol;
