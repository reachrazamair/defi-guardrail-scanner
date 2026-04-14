// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SafeShiftGuard {
    function checkedShlw(uint256 n) external pure returns (uint256, bool) {
        uint256 mask = uint256(1) << 192;
        if (n >= mask) {
            return (0, true);
        }
        return (n << 64, false);
    }
}
