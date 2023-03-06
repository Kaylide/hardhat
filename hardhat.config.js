require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

const fs = require('fs');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.2",
    networks: {
        bscTestnet: {
            url: process.env.BSC_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            // gasPrice: 8000000000,
        },
        polygonTestnet: {
            url: process.env.POLYGONSCAN_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    etherscan: {
         apiKey: {
            bscTestnet: process.env.BSC_API_KEY,
        //     polygonTestnet: process.env.POLYGONSCAN_API_KEY
        },
        //apiKey: process.env.POLYGONSCAN_API_KEY
    },
};



