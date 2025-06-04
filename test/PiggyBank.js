const hre = require("hardhat");
const { expect } = require("chai");

describe("PiggyBank", function () {
  let piggyBank;
  let sender;

  beforeEach(async () => {
    [sender] = await hre.ethers.getSigners();
    const PiggyBank = await hre.ethers.getContractFactory("PiggyBank");
    piggyBank = await PiggyBank.deploy();
  });

  it("deposit", async () => {
    const oneEther = hre.ethers.parseEther("1");
    await piggyBank.deposit({ value: oneEther });
    const balance = await piggyBank.checkBalance();
    console.log("Balance:", hre.ethers.formatEther(balance));
    expect(balance).to.equal(oneEther);
  });

  it("withdraw", async () => {
    //deposit 1 ether
    const oneEther = hre.ethers.parseEther("1");
    await piggyBank.deposit({ value: oneEther });
    
    //withdraw 0.5 ether
    await piggyBank.withdraw(( hre.ethers.parseEther("0.5")) );

    const balance = await piggyBank.checkBalance();

    expect(balance).to.equal(hre.ethers.parseEther("0.5"));
  });

});
