// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

contract Boom {
    uint256 public x = 125;

    constructor() {
        // x = _x;
    }

    function changeX(uint256 _x) external {
        x = _x;
    }
}
