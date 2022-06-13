// SPDX-License-Identifier: MIT
//optional console log - used in hardhat

import "hardhat/console.sol";

pragma solidity ^0.8.6;

contract Lottery {
    //new contract(like a class) contains methods and variables
    address public manager;
    //The manager is the creater of the contract
    address payable[] public players;

    constructor() payable {
        manager = msg.sender;
    }

    //The constructor has to be payable when it receiveds eth
    //The constructor creates the lottery and identifies a manager

    function Enter() public payable {
        require(msg.value > .0001 ether);
        players.push(payable(msg.sender));
    }

    function Random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function PickWinner() public onlyManagerCanCall {
        //Requires the person access the fucntion to be the creator of the lottery
        uint256 index = Random() % players.length;
        // players[index].transfer(this.balance);
        players[index].transfer(address(this).balance);
        //transfer all the money from the current contract into the selected random address
        players = new address payable[](0);
        //an empty dynamic array to reset the players array
    }

    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
