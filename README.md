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

IPFS Metadata
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


