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
event MetadataRegistered(address owner, uint256 tokenId, string ipfsCid);
event MetadataFlagged(uint256 tokenId, bool flagged);

```
---
### 3. IPFS Metadata Storage

- Created an example NFT metadata JSON file
- Uploaded the metadata file to IPFS using Pinata
- Obtained a CID (Content Identifier) for the file
- The CID is content-addressed:
- Any change to the file results in a new CID
- This ensures immutability and integrity of metadata
- IPFS Metadata
  - Metadata Structure (JSON)
  - Example metadata uploaded to IPFS:
   ```
    {
  "name": "My First NFT",
  "description": "This NFT demonstrates on-chain metadata registration using IPFS.",
  "image": "ipfs://<image_cid>",
  "attributes": [
    { "trait_type": "Level", "value": 1 },
    { "trait_type": "Type", "value": "Demo" }
  ]
  }
   ```

---


### 4. On-Chain Metadata Registration

- Minted an NFT using the ERC-721 contract
- Registered the IPFS CID on-chain using the MetadataRegistry contract
- Metadata registration emits an event that can be indexed off-chain

- This approach keeps:
  - Large metadata off-chain
  - Ownership and references on-chain

---
### 5. Backend Event Indexer (Option B)

- Implemented a simple Node.js backend service
- Listens to on-chain events:
- MetadataRegistered
- MetadataFlagged
-Maintains derived state in memory
---
### Exposes a REST API to query metadata status

- Example API endpoint:
- GET /token/1


### Example response:
```
{
  "tokenId": "1",
  "cid": "bafkreidw55zyljexs5gtwxzizq7oc2xxflbeyvlg5xprefn5evtznmre",
  "flagged": false
}
```
## How to Run the Project

### Start Local Blockchain
```
  npx hardhat node
```

### Deploy Smart Contracts
```
 node scripts/deploy-viem.js
```

### Mint NFT and Register Metadata
```
 node scripts/register-metadata.js
```

### Start Backend Indexer
```
 node backend/index.js
```




### contract-deployment
 <img width="1253" height="278" alt="Screenshot 2025-12-31 233133" src="https://github.com/user-attachments/assets/a7a9b58c-560c-4758-9ac5-cdc372daaafa" />
 
---
### metadata-registration
<img width="1186" height="199" alt="Screenshot 2025-12-31 233426" src="https://github.com/user-attachments/assets/04ffbd2a-024d-4b27-aa1d-15dc84e205fb" />

---
### hardhat-node
<img width="1158" height="138" alt="image" src="https://github.com/user-attachments/assets/483abe97-0c1b-48d7-bd4e-4ff02509505e" />

---
### Backend API
<img width="1729" height="381" alt="Screenshot 2025-12-31 234414" src="https://github.com/user-attachments/assets/a33c7fd3-0203-44f1-8bce-89d8a1b4d79f" />



