/**
 * MartianChain RPC Health Check (minimal Node script)
 * - Calls eth_blockNumber for each HTTPS RPC endpoint
 * - Prints latency + latest block number
 *
 * Usage:
 *   node rpc_health.mjs
 *
 * Requirements:
 *   Node 18+ (global fetch)
 */

const rpcUrls = [
  "https://rpc1.martianchain.com",
  "https://rpc2.martianchain.com",
  "https://rpc3.martianchain.com",
  "https://rpc4.martianchain.com",
  "https://rpc5.martianchain.com"
];

async function ping(url) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber",
    params: []
  };

  const start = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(body)
  });
  const ms = Date.now() - start;

  if (!res.ok) {
    return { url, ok: false, ms, status: res.status, statusText: res.statusText };
  }
  const json = await res.json();
  return { url, ok: true, ms, blockNumberHex: json.result };
}

(async () => {
  console.log("MartianChain RPC Health Check");
  for (const url of rpcUrls) {
    try {
      const r = await ping(url);
      if (!r.ok) console.log(`[FAIL] ${url}  ${r.ms}ms  HTTP ${r.status} ${r.statusText}`);
      else console.log(`[OK]   ${url}  ${r.ms}ms  block=${r.blockNumberHex}`);
    } catch (e) {
      console.log(`[ERR]  ${url}  ${(e && e.message) ? e.message : String(e)}`);
    }
  }
})();
