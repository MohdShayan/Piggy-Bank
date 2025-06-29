const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("Lottery", function () {
    let manager;
    let player1, player2, player3;

    beforeEach(async () => {
        [manager, player1, player2, player3] = await ethers.getSigners();
        const LotteryFactory = await ethers.getContractFactory("Lottery");
        this.lottery = await LotteryFactory.deploy();

        await this.lottery.connect(player1).enter({ value: parseEther("0.01") });
        await this.lottery.connect(player2).enter({ value: parseEther("0.01") });
        await this.lottery.connect(player3).enter({ value: parseEther("0.01") });

    });

    it("enter players into the lottery", async () => {
        await this.lottery.connect(player1).enter({ value: parseEther("0.01") });
        await this.lottery.connect(player2).enter({ value: parseEther("0.01") });
        await this.lottery.connect(player3).enter({ value: parseEther("0.01") });
    });
    it("list all players", async () => {
        const players = await this.lottery.returnPlayers();
        console.log("Players:", players);
        expect(players.length).to.equal(3);
    });

    it("pick a winner", async () => {
    
    const contractBalance = await ethers.provider.getBalance(this.lottery.target);
    console.log("Contract balance before picking winner:", ethers.formatEther(contractBalance));

   
    const tx = await this.lottery.connect(manager).pickWinner();
    await tx.wait();

   
    const contractBalanceAfter = await ethers.provider.getBalance(this.lottery.target);
    console.log("Contract balance after picking winner:", ethers.formatEther(contractBalanceAfter));

    // Check balances of players
    const balance1 = await ethers.provider.getBalance(player1.address);
    const balance2 = await ethers.provider.getBalance(player2.address);
    const balance3 = await ethers.provider.getBalance(player3.address);

    console.log("player1 balance:", ethers.formatEther(balance1));
    console.log("player2 balance:", ethers.formatEther(balance2));
    console.log("player3 balance:", ethers.formatEther(balance3));
});


});