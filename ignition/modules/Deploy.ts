import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployModule = buildModule("DeployModule", (m) => {
  const myNFT = m.contract("MyNFT");
  const registry = m.contract("MetadataRegistry");

  return { myNFT, registry };
});

export default DeployModule;
