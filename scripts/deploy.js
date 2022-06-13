const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const LotteryDeploy = await Lottery.deploy();
  await LotteryDeploy.deployed();

  console.log("Message deployed to:", LotteryDeploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
