# Sample Hardhat 3 Beta Project (minimal)

This project has a minimal setup of Hardhat 3 Beta, without any plugins.

## What's included?

The project includes native support for TypeScript, Hardhat scripts, tasks, and support for Solidity compilation and tests.

📦 NFT Metadata Registry with IPFS and Event Indexing
Overview

This project demonstrates a complete decentralized metadata workflow using Ethereum smart contracts, IPFS for off-chain storage, and an event-driven backend indexer.

The system allows:
Minting NFTs (ERC-721)
Registering IPFS metadata CIDs on-chain
Emitting events for off-chain indexing
Moderating (flagging) metadata without removing historical records
Querying metadata and moderation status via an API

This assignment focuses on on-chain / off-chain coordination and decentralized storage design.
┌──────────────┐
│  IPFS (JSON) │
└──────┬───────┘
       │ CID
       ▼
┌────────────────────┐
│ MetadataRegistry   │
│  - register CID    │
│  - emit events     │
│  - flag metadata   │
└─────────┬──────────┘
          │ events
          ▼
┌────────────────────┐
│ Backend Indexer    │
│  - listens events  │
│  - stores state    │
│  - exposes API     │
└────────────────────┘


📜 Smart Contracts
1️⃣ MyNFT (ERC-721)
Standard ERC-721 NFT contract
Allows minting NFTs
Each token represents ownership of metadata stored off-chain

2️⃣ MetadataRegistry
Associates a tokenId with an IPFS CID
Emits events when metadata is registered or updated
Allows an admin/moderator to flag metadata
Events
 event MetadataRegistered(address owner, uint256 tokenId, string ipfsCid);
 event MetadataFlagged(uint256 tokenId, bool flagged);

🌐 IPFS Metadata
Metadata Structure (JSON)

Example metadata uploaded to IPFS:
{
  "name": "My First NFT",
  "description": "This NFT demonstrates on-chain metadata registration using IPFS.",
  "image": "ipfs://<image_cid>",
  "attributes": [
    { "trait_type": "Level", "value": 1 },
    { "trait_type": "Type", "value": "Demo" }
  ]
}

How CID is generated

The file is uploaded using Pinata
IPFS generates a content identifier (CID) based on the file’s content
Any change to the file results in a new CID
This ensures immutability and integrity

⛓ On-Chain Metadata Registration
Flow

NFT is minted using MyNFT
Metadata JSON is uploaded to IPFS
The CID is registered on-chain using:
  registerMetadata(tokenId, cid)
MetadataRegistered event is emitted

This keeps:

Large data off-chain
Ownership and references on-chain

Moderation / Flagging

A designated admin can flag metadata
Flagging does not delete on-chain records
Historical data remains verifiable
Flag status is tracked via events and indexed off-chain


🔍 Backend Indexer (Option B)

A lightweight Node.js backend listens to on-chain events and maintains derived state.
Responsibilities

Listen to:
MetadataRegistered
MetadataFlagged
Store token metadata in memory

Expose a REST API

API Endpoint
GET /token/:id


Example:

GET http://localhost:3000/token/1


Response:

{
  "tokenId": "1",
  "cid": "bafkreidw55zyljexs5gtwxzizq7oc2xxflbeyvlg5xprefn5evtznmre",
  "flagged": false
}

▶️ Running the Project
1. Start local blockchain
npx hardhat node

2. Deploy contracts
node scripts/deploy-viem.js

3. Mint NFT & register metadata
node scripts/register-metadata.js

4. Start backend indexer
node backend/index.js

✅ Conclusion

This project demonstrates:
Proper separation of on-chain and off-chain responsibilities
Event-driven indexing architecture
Decentralized storage using IPFS
Clean and maintainable Web3 system desig
