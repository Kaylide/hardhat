require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
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
            url: process.env.POLYGON_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            bscTestnet: process.env.BSCSCAN_API,
            polygonMumbai: process.env.POLYGON_API
        },
    },
};



