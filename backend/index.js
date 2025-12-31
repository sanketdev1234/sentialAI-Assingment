import express from "express";
import { createPublicClient, http, defineChain } from "viem";
import fs from "fs";

const app = express();
app.use(express.json());


const REGISTRY_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const PORT = 3000;


const hardhatChain = defineChain({
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
});

const client = createPublicClient({
  chain: hardhatChain,
  transport: http(),
});


const registryAbi = JSON.parse(
  fs.readFileSync(
    "artifacts/contracts/MetadataRegistry.sol/MetadataRegistry.json",
    "utf8"
  )
).abi;


const store = {};


client.watchContractEvent({
  address: REGISTRY_ADDRESS,
  abi: registryAbi,
  eventName: "MetadataRegistered",
  onLogs: (logs) => {
    for (const log of logs) {
      const { tokenId, ipfsCid } = log.args;
      store[tokenId.toString()] = {
        cid: ipfsCid,
        flagged: false,
      };
      console.log("Indexed MetadataRegistered:", tokenId.toString());
    }
  },
});


client.watchContractEvent({
  address: REGISTRY_ADDRESS,
  abi: registryAbi,
  eventName: "MetadataFlagged",
  onLogs: (logs) => {
    for (const log of logs) {
      const { tokenId, flagged } = log.args;
      if (!store[tokenId.toString()]) return;
      store[tokenId.toString()].flagged = flagged;
      console.log("Indexed MetadataFlagged:", tokenId.toString(), flagged);
    }
  },
});


app.get("/token/:id", (req, res) => {
  const token = store[req.params.id];
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }
  res.json({
    tokenId: req.params.id,
    ...token,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend indexer running on http://localhost:${PORT}`);
});
