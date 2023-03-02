const { getContractAt } = require("@nomiclabs/hardhat-ethers/dist/src/helpers");
const { ethers, upgrades } = require("hardhat");

require("dotenv").config();

const CONTRACT_ADDRESS = process.env.PROXY_ADDRESS;
//contract address la contract sau khi deploy
async function main() {

    [deployer] = await ethers.getSigners();
    const dungToken = await ethers.getContractAt("DungToken", CONTRACT_ADDRESS);

    //dungToken la ten contract minh deploy

    console.log("Deploying contracts with the account:", deployer.address);

    //set Admin
    const setAdmin =  await dungToken.setAdmin(process.env.ADMIN_ADDRESS, "true");
    await setAdmin.wait();
}

main().then(async() => {
    process.exit();
}).catch((error) => {
    console.log(error);
    process.exit(1);
});