import { createPublicClient, createWalletClient, http, defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import fs from "fs";


const MYNFT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const REGISTRY_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";


const CID = "bafkreidw55zyljexs5gtwxzizq7oc2xxflbeyvlg5xprefn5evtznmre";



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

async function main() {
  const nft = loadArtifact("MyNFT");
  const registry = loadArtifact("MetadataRegistry");

 
  const mintHash = await walletClient.writeContract({
    address: MYNFT_ADDRESS,
    abi: nft.abi,
    functionName: "mint",
    args: [account.address],
  });

  await publicClient.waitForTransactionReceipt({ hash: mintHash });
  console.log("✅ NFT minted with tokenId = 1");


  const registerHash = await walletClient.writeContract({
    address: REGISTRY_ADDRESS,
    abi: registry.abi,
    functionName: "registerMetadata",
    args: [1, CID],
  });

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: registerHash,
  });

  console.log("✅ Metadata registered for tokenId = 1");
  console.log("Transaction hash:", receipt.transactionHash);
}

main().catch(console.error);
