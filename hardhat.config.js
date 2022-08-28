require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "BSC_test",
  networks: {
    hardhat: {
    },
    ethereum:{
      url: "https://mainnet.infura.io/v3/2c327e3276c54e609c310695044b534a",
      accounts:[""]
    },
    BSC_test: {
      url: "https://speedy-nodes-nyc.moralis.io/12df964d866c784c7027641d/bsc/testnet",
      chainId:97,
      accounts: [""]
    },
    Roburna: {
      url: "https://preseed-testnet-1.roburna.com",
      chainId:159,
      accounts: [""]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    //apiKey: ""
    apiKey: "N5T3AVC376B3VGU5Z7JUI658MS2Y7A9P9W"
    //apiKey:"e3d46e626c465a670e0747ed035fd9d4eaa33036c78a66c9e9ebd63254befe64"
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
