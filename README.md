# OverflowSentinel (Olympix Take-Home PoC)

OverflowSentinel is a proof-of-concept static analyzer that detects boundary-check and shift-overflow anti-patterns inspired by the Cetus exploit class.

## Project Structure
- `docs/exploit-analysis.md` - exploit selection and rationale.
- `docs/tool-architecture.md` - architecture and data flow.
- `docs/submission-assets.md` - Loom script and email draft.
- `src/` - TypeScript CLI implementation.
- `fixtures/move/` - vulnerable and safe Move examples.
- `fixtures/solidity/` - vulnerable and safe Solidity examples.
- `fixtures/rust/` - vulnerable and safe Solana-style Rust examples.

## Quick Start
```bash
npm install
npm run build
node dist/index.js fixtures/move/vulnerable.move
node dist/index.js fixtures/move/safe.move
node dist/index.js fixtures/solidity/vulnerable.sol
node dist/index.js fixtures/solidity/safe.sol
node dist/index.js fixtures/rust/vulnerable.rs
node dist/index.js fixtures/rust/safe.rs
```

## Expected Output
- Vulnerable fixture should produce high-severity findings (`OS-001`, `OS-002`).
- Safe fixture should not produce high-severity findings.
- Same expected behavior applies to Move, Solidity, and Solana (Rust) fixtures.

## Rule Set (MVP)
- `OS-001`: suspicious all-ones mask shifted to high bits.
- `OS-002`: strict comparator likely incorrect at boundary (`>` instead of `>=`).
- `OS-003`: left shift appears without checked guard context.

## Why This Matters
This PoC demonstrates a practical way to encode real exploit learnings into pre-deployment automated checks, reducing dependence on point-in-time audits.
