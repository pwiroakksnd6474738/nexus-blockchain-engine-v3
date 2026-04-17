import json
import hashlib
from datetime import datetime

class ChainAnalyticsEngine:
    def __init__(self, chain_data):
        self.chain = chain_data
        self.stats = {}

    def compute_block_time(self):
        times = []
        for i in range(1, len(self.chain)):
            delta = self.chain[i]["timestamp"] - self.chain[i-1]["timestamp"]
            times.append(delta / 1000)
        self.stats["avg_block_time"] = sum(times) / len(times) if times else 0
        return self.stats["avg_block_time"]

    def transaction_count(self):
        count = 0
        for block in self.chain:
            count += len(block["transactions"])
        self.stats["total_tx"] = count
        return count

    def hash_verify_rate(self):
        valid = 0
        total = max(1, len(self.chain) - 1)
        for i in range(1, len(self.chain)):
            block = self.chain[i].copy()
            del block["hash"]
            calc = hashlib.sha256(json.dumps(block, sort_keys=True).encode()).hexdigest()
            if calc == self.chain[i]["hash"]:
                valid += 1
        self.stats["validity_rate"] = valid / total
        return self.stats["validity_rate"]
