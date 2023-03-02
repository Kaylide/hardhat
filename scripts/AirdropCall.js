//Viết script để gọi hàm Airdrop này thông qua hardhat

const { ethers, upgrades } = require("hardhat");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/dist/src/helpers");

require("dotenv").config();

const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS;
const AIRDROP_ADDRESS = process.env.AIRDROP_ADDRESS;

async function main() {
    [deployer] = await ethers.getSigners();
    const upgradeable = await ethers.getContractAt("Upgradeable", TOKEN_ADDRESS);
    const airdrop = await ethers.getContractAt("Airdrop", AIRDROP_ADDRESS);

    console.log("Deploying contracts with the account:", deployer.address);

    //set Admin
    const setAdmin = await upgradeable.setAdmin(ADMIN_ADDRESS, "true");
    await setAdmin.wait();

    //call Airdrop
    const callAirdrop = await upgradeable.callAirdrop(airdrop.address, "0x0");
    await callAirdrop.wait();
}

main().then(async () => {
    process.exit();
}
).catch((error) => {
    console.log(error);
    process.exit(1);
}
);

