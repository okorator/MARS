# MartianChain Phase 1 ↔ Phase 2 Interface Contract (Locked)

This document defines the **frozen interface** between Phase 1 (docs portal) and Phase 2 (SDK + templates).
Parallel work is allowed **only if** this contract is treated as the single source of truth.

## Frozen Artifacts (v1)
- `network.v1.json`
- `network.v1.schema.json`
- `CHANGELOG.md`

## What Phase 1 must do
- Load these constants into the portal (or generate them) and render across docs/tools
- Provide:
  - “Add network” (EIP-3085) snippet from these constants
  - “Export JSON” that matches `network.v1.json` shape
  - RPC health tool that iterates `rpcUrls` + `wsUrls`

## What Phase 2 must do
- Build SDKs/templates by importing/consuming `network.v1.json`
- Do not hardcode constants in multiple places

## Change Rules
- Any change requires a changelog entry
- Any breaking change requires `version` bump (v2, v3, etc.)

## Out of Scope (explicit)
- Marketplace / wallet SDK suite / minting engines
- Complex bridging architectures
- Tokenomics / exchange features
