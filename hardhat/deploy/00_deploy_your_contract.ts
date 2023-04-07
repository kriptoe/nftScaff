import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
const { ethers } = require("ethers");
/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  //const floorContract = await hre.ethers.getContract("Floor101", deployer);
  //const tokenContract = await hre.ethers.getContract("Token", deployer);
 // await tokenContract.mint("0x3c5989DE5d521878b122f6b57D8e726C336539e1", ethers.utils.parseEther("6900"))

  // tokenContract.mint("0x92109567BE6913245677ec006be9F2F45EA16e83",5000000);

  await deploy("FloorLendingV2", {
    from: deployer,
    // Contract constructor arguments LENS NFT address and DAI stablecoin is 2nd arg
    args: ["0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d", "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
};



export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["FloorLendingV2"];