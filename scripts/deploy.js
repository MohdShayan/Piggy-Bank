const { ethers } = require("hardhat"); 

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    
    await lottery.waitForDeployment();
    console.log("Lottery contract deployed to:", lottery.target);

}

main().then(() => {
    console.log("Deployment script completed successfully.");
}).catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
});