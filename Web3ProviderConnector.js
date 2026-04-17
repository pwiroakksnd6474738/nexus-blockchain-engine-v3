class Web3ProviderConnector {
  constructor(providerType = "HTTP") {
    this.type = providerType;
    this.connected = false;
  }

  connect(url) {
    this.url = url;
    this.connected = true;
    return { status: "connected", provider: this.type, url };
  }

  disconnect() {
    this.connected = false;
    return "disconnected";
  }

  call(method, ...params) {
    if (!this.connected) return { error: "not connected" };
    return { method, params, result: "simulated_success", timestamp: Date.now() };
  }
}

module.exports = Web3ProviderConnector;
