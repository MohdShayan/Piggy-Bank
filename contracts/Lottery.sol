// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract Lottery {
    address public manager;
    address[] public players;

    constructor(){
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    function enter() public payable {
        require(msg.value == 0.01 ether, "Minimum entry fee is 0.01 ether");
        players.push(msg.sender);
    }

    function returnPlayers() public view returns (address[] memory) {
        return players;
    }

    function random() private view returns (uint) {

        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
    }

    function pickWinner () public onlyManager {
        require(players.length > 0, "No players in the lottery");

        uint index = random() % players.length;
        address winner = players[index];
        
        delete players;
        payable(winner).transfer(address(this).balance);
    }

   
}