const { ethers, upgrades } = require("hardhat");

require("dotenv").config();

const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
//contract address la contract sau khi deploy
async function main() {

    [deployer] = await ethers.getSigners();
    const dungToken = await ethers.getContractAt("DungToken", TOKEN_ADDRESS);

    //dungToken la ten contract minh deploy

    console.log("Deploying contracts with the account:", deployer.address);

    //set Admin
    const setAdmin =  await dungToken.setAdmin(process.env.ADMIN_ADDRESS);
    await setAdmin.wait();
}

main().then(async() => {
    process.exit();
}).catch((error) => {
    console.log(error);
    process.exit(1);
});