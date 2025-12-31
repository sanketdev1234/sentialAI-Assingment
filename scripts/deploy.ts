import hre from "hardhat";

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const [walletClient] = await hre.viem.getWalletClients();

  const myNFT = await hre.viem.deployContract("MyNFT", [], {
    walletClient,
  });

  const registry = await hre.viem.deployContract("MetadataRegistry", [], {
    walletClient,
  });

  console.log("MyNFT deployed to:", myNFT.address);
  console.log("MetadataRegistry deployed to:", registry.address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
