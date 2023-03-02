//Viết script để gọi hàm Airdrop này thông qua hardhat

const { ethers, upgrades } = require("hardhat");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/dist/src/helpers");

require("dotenv").config();

const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const RECEIVER_ADDRESS = process.env.RECEIVER_ADDRESS;
const AMOUNT = process.env.AMOUNT;

async function main() {
    [deployer] = await ethers.getSigners();
    const dungToken = await ethers.getContractAt("DungToken", TOKEN_ADDRESS);

    // dungToken la ten contract minh deploy

    console.log("Deploying contracts with the account:", deployer.address);

    //airdrop (receiver, amount)
    const airdrop = await dungToken.airdrop(RECEIVER_ADDRESS, AMOUNT);
    await airdrop.wait();
    
}

main().then(async () => {
    process.exit();
}
).catch((error) => {
    console.log(error);
    process.exit(1);
}
);

