#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "🔍 Running scans..."

echo "Running Move (vulnerable)..."
node dist/index.js fixtures/move/vulnerable.move

echo "Running Move (safe)..."
node dist/index.js fixtures/move/safe.move

echo "Running Solidity (vulnerable)..."
node dist/index.js fixtures/solidity/vulnerable.sol

echo "Running Solidity (safe)..."
node dist/index.js fixtures/solidity/safe.sol

echo "Running Rust (vulnerable)..."
node dist/index.js fixtures/rust/vulnerable.rs

echo "➡️ Rust (safe)"
node dist/index.js fixtures/rust/safe.rs

echo "✅ Done!"