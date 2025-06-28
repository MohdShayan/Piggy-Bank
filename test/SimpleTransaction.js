const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("SimpleTransaction", function () {
  let SimpleTransaction;
  let sender;
  let receiver;

  beforeEach(async () => {
    [sender, receiver] = await ethers.getSigners();
    const SimpleTransactionFactory = await ethers.getContractFactory(
      "SimpleTransaction"
    );

    SimpleTransaction = await SimpleTransactionFactory.deploy();
  });

  it("transaction", async () => {
    const amount = parseEther("1.0");
    await SimpleTransaction.connect(sender).sendEther(receiver.address, { value: amount });

    const senderBalance = await ethers.provider.getBalance(sender.address);
    const receiverBalance = await ethers.provider.getBalance(receiver.address);
    console.log("Sender Balance:", senderBalance.toString());
    console.log("Receiver Balance:", receiverBalance.toString());
  });
});
