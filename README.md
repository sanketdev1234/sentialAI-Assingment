# NFT Metadata Registry – Take-Home Assignment

## Overview

This project was built as part of a take-home assignment to demonstrate **decentralized storage** and **on-chain / off-chain coordination** using Ethereum.

The goal of this assignment was to:
- Store NFT metadata off-chain using IPFS
- Register and manage metadata references on-chain
- Index blockchain events using a backend service

---

## What Was Implemented

### 1. ERC-721 NFT Contract

- Implemented a basic ERC-721 contract (`MyNFT`)
- Supports minting NFTs
- Each NFT is identified by a unique `tokenId`

---

### 2. Metadata Registry Contract

- Implemented a `MetadataRegistry` smart contract
- Allows users to register an **IPFS CID** against a `tokenId`
- Emits an event whenever metadata is registered or updated:

```solidity
MetadataRegistered(address owner, uint256 tokenId, string ipfsCid)

Event emitted on moderation:
  event MetadataFlagged(uint256 tokenId, bool flagged);

3. IPFS Metadata Storage

Created an example NFT metadata JSON file
Uploaded the metadata file to IPFS using Pinata
Obtained a CID (Content Identifier) for the file
The CID is content-addressed:
Any change to the file results in a new CID
This ensures immutability and integrity of metadata

4. On-Chain Metadata Registration

Minted an NFT using the ERC-721 contract
Registered the IPFS CID on-chain using the MetadataRegistry contract
Metadata registration emits an event that can be indexed off-chain

This approach keeps:
Large metadata off-chain
Ownership and references on-chain

5. Backend Event Indexer (Option B)

Implemented a simple Node.js backend service
Listens to on-chain events:
MetadataRegistered
MetadataFlagged

Maintains derived state in memory

Exposes a REST API to query metadata status

Example API endpoint:
GET /token/1


Example response:

{
  "tokenId": "1",
  "cid": "bafkreidw55zyljexs5gtwxzizq7oc2xxflbeyvlg5xprefn5evtznmre",
  "flagged": false
}

How to Run the Project

Start Local Blockchain
npx hardhat node

Deploy Smart Contracts
node scripts/deploy-viem.js

Mint NFT and Register Metadata
node scripts/register-metadata.js

Start Backend Indexer
node backend/index.js
