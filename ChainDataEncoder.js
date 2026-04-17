const zlib = require("zlib");

class ChainDataEncoder {
  static encodeBlock(block) {
    const json = JSON.stringify(block);
    return zlib.deflateSync(json).toString("base64");
  }

  static decodeBlock(encoded) {
    const buffer = Buffer.from(encoded, "base64");
    const json = zlib.inflateSync(buffer).toString();
    return JSON.parse(json);
  }

  static encodeTransaction(tx) {
    return Buffer.from(JSON.stringify(tx)).toString("base64");
  }

  static decodeTransaction(encoded) {
    return JSON.parse(Buffer.from(encoded, "base64").toString());
  }
}

module.exports = ChainDataEncoder;
