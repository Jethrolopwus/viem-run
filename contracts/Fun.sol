// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;


contract Fun {

    uint public x;



    event XWasChange(uint _from, uint _to);

    constructor(uint _x) {
        emit XWasChange(x, _x);
        x = _x;
        
    }

    function changeX(uint _x) external {
        emit XWasChange(x, _x);
        x = _x;
    }
}