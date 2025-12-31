# 📦 NFT Metadata Registry with IPFS and Event Indexing

## Overview

This project demonstrates a complete decentralized metadata workflow using **Ethereum smart contracts**, **IPFS for off-chain storage**, and an **event-driven backend indexer**.

The system allows:

- Minting NFTs (ERC-721)
- Registering IPFS metadata CIDs on-chain
- Emitting events for off-chain indexing
- Moderating (flagging) metadata without removing historical records
- Querying metadata and moderation status via a REST API

This assignment focuses on **on-chain / off-chain coordination** and **decentralized storage design**.

---

## 📜 Smart Contracts

### 1️⃣ MyNFT (ERC-721)

- Standard ERC-721 NFT contract
- Allows minting NFTs
- Each token represents ownership of metadata stored off-chain

---

### 2️⃣ MetadataRegistry

- Associates a `tokenId` with an IPFS CID
- Emits events whenever metadata is registered or updated
- Allows an admin/moderator to flag metadata without deleting on-chain records

#### Events

```solidity
event MetadataRegistered(address owner, uint256 tokenId, string ipfsCid);
event MetadataFlagged(uint256 tokenId, bool flagged);
Why Events?
Events allow off-chain systems to efficiently index blockchain activity without storing large data directly on-chain.

🌐 IPFS Metadata
Metadata Structure (JSON)
Example metadata uploaded to IPFS:

json
Copy code
{
  "name": "My First NFT",
  "description": "This NFT demonstrates on-chain metadata registration using IPFS.",
  "image": "ipfs://<image_cid>",
  "attributes": [
    { "trait_type": "Level", "value": 1 },
    { "trait_type": "Type", "value": "Demo" }
  ]
}
How the CID is Generated
The metadata file is uploaded using Pinata

IPFS generates a Content Identifier (CID) based on the file’s content

Any modification to the file results in a new CID

This ensures immutability and content integrity

⛓ On-Chain Metadata Registration Flow
NFT is minted using the MyNFT contract

Metadata JSON is uploaded to IPFS

The CID is registered on-chain using:

solidity
Copy code
registerMetadata(tokenId, cid)
The MetadataRegistered event is emitted

Design Benefits
Large metadata stays off-chain

Ownership and references stay on-chain

Off-chain systems react via emitted events

🚩 Moderation / Flagging
A designated admin can flag or unflag metadata

Flagging does not remove any on-chain records

Historical data remains verifiable

Flag status is indexed and exposed via the backend API

This ensures transparency while allowing moderation.

🔍 Backend Indexer (Option B)
A lightweight Node.js backend listens to on-chain events and maintains derived state.

Responsibilities
Listen to:

MetadataRegistered

MetadataFlagged

Store token metadata in memory

Expose a REST API for querying metadata state

API Endpoint
bash
Copy code
GET /token/:id
Example Request
bash
Copy code
GET http://localhost:3000/token/1
Example Response
json
Copy code
{
  "tokenId": "1",
  "cid": "bafkreidw55zyljexs5gtwxzizq7oc2xxflbeyvlg5xprefn5evtznmre",
  "flagged": false
}
▶️ Running the Project
1️⃣ Start Local Blockchain
bash
Copy code
npx hardhat node
2️⃣ Deploy Smart Contracts
bash
Copy code
node scripts/deploy-viem.js
3️⃣ Mint NFT & Register Metadata
bash
Copy code
node scripts/register-metadata.js
4️⃣ Start Backend Indexer
bash
Copy code
node backend/index.js
