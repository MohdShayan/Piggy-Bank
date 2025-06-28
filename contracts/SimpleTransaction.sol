// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleTransaction {
    function sendEther(address payable recepient) public payable {
        require(msg.value > 0, "Must Send some ether");
        recepient.transfer(msg.value);
    }

    function getBalance(address account) public view returns (uint) {
        return account.balance;
    }
}