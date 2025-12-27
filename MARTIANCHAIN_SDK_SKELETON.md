# @martianchain/sdk — Skeleton (Phase 2 starter)

Goal: publish a small, clean TypeScript SDK that exposes:
- canonical network constants
- helper constructors for viem and ethers
- basic safety checks (chainId assertion, rpc failover)

## Minimal repo structure
martianchain-sdk/
  package.json
  tsconfig.json
  src/
    network.ts
    index.ts

## network.ts (example)
```ts
import network from "../network.v1.json";

export const MARTIAN_CHAIN = network;

export const CHAIN_ID = network.chainId;
export const CHAIN_ID_HEX = network.chainIdHex;

export const RPC_URLS = network.rpcUrls;
export const WS_URLS = network.wsUrls;

export const EXPLORER_URL = network.urls.explorer;

export const CONTRACTS = network.contracts;
```

## index.ts (example)
```ts
import { createPublicClient, http, webSocket } from "viem";

import { RPC_URLS, WS_URLS, CHAIN_ID } from "./network";

export function getViemPublicClient(rpcUrl: string = RPC_URLS[0]) {
  return createPublicClient({
    transport: http(rpcUrl),
    // chain optional; if you add it later, keep it consistent with CHAIN_ID
  });
}

export function getViemWsClient(wsUrl: string = WS_URLS[0]) {
  return createPublicClient({
    transport: webSocket(wsUrl),
  });
}

export async function assertChainId(client: any) {
  const id = await client.getChainId?.() ?? await client.request?.({ method: "eth_chainId" });
  const parsed = typeof id === "string" ? parseInt(id, 16) : id;
  if (parsed !== CHAIN_ID) throw new Error(`Wrong chainId: expected ${CHAIN_ID}, got ${parsed}`);
}
```

## Publishing notes
- Bundle `network.v1.json` in the package OR depend on `martianchain/network-info` as a separate package.
- Use semantic versioning.
- Any constant changes require changelog + version bump.
