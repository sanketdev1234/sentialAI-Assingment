import { createPublicClient, createWalletClient, http } from "viem";
import { defineChain } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import fs from "fs";

const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const account = privateKeyToAccount(PRIVATE_KEY);
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

const publicClient = createPublicClient({
  chain: hardhatChain,
  transport: http(),
});

const walletClient = createWalletClient({
  account,
  chain: hardhatChain,
  transport: http(),
});

function loadArtifact(name) {
  const path = `artifacts/contracts/${name}.sol/${name}.json`;
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

async function deploy(name) {
  const artifact = loadArtifact(name);

  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode,
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.contractAddress;
}

async function main() {
  const myNFT = await deploy("MyNFT");
  const registry = await deploy("MetadataRegistry");

  console.log("MyNFT deployed to:", myNFT);
  console.log("MetadataRegistry deployed to:", registry);
}

main().catch(console.error);
