import type { Score } from "../../types";
import hre from "hardhat";

export async function deployScoreFixture(): Promise<{
  score: Score;
  address: string;
}> {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];

  const Score = await hre.ethers.getContractFactory("Score");
  const score = await Score.connect(contractOwner).deploy();
  await score.waitForDeployment();
  const address = await score.getAddress();	
  return { score, address };
}

export async function getTokensFromFaucet() {
  if (hre.network.name === "localfhenix") {
    const signers = await hre.ethers.getSigners();

    if (
      (await hre.ethers.provider.getBalance(signers[0].address)).toString() ===
      "0"
    ) {
      await hre.fhenixjs.getFunds(signers[0].address);
    }
  }
}
