// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PiggyBank {

    mapping(address=> uint256) public balances;

    function deposit() public payable{
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] = balances[msg.sender] + msg.value;
    }

    function checkBalance() public view returns (uint256){
        return balances[msg.sender];
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdrawal must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}