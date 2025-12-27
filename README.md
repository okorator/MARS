# MartianChain Network Info (v1)

This folder contains the canonical **network info contract** for MartianChain used by:
- Phase 1: Developer Portal docs + tools (Base44 build)
- Phase 2: SDKs, templates, generators, and health-check tooling

## Files
- `network.v1.json` — the single source of truth for public network constants
- `network.v1.schema.json` — JSON Schema for validating `network.v1.json`
- `CHANGELOG.md` — change control log for any updates to network constants or schema

## Change Control (Scope Lock)
1. Changes to `network.v1.json` **must** add an entry to `CHANGELOG.md`
2. If a breaking change occurs (field renamed/removed, semantic meaning changes), bump `version`
3. Phase 1 + Phase 2 must both read the same file to prevent drift

## Network Summary
- Chain: Martian Chain
- Chain ID: 2027 (hex 0x7EB)
- Explorer: https://explorer.martianchain.com
- RPC: https://rpc1.martianchain.com (primary)

## Notes
`nativeToken.decimals` is set to **18** as an EVM-default to support wallet add-network UX.
If MartianChain uses different decimals, update the value and log it in CHANGELOG.
