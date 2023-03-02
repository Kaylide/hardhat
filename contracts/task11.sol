// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
    Viết 1 smartcontract:
    - Tạo 1 đồng Token ERC20 với constructor nhận Name và Symbol từ file .env
    - Viết 1 hàm Airdrop với quyền onlyOwner, kiểm tra _receiver có trong whitelist hay không
    - Airdrop (mint token) tới 1 danh sách whitelist address, danh sách whitelist này được set với quyền onlyAdmin (admin được contract owner set).
    - Viết script để gọi hàm Airdrop này thông qua hardhat
    - Tạo 1 event để emit các thông tin cần thiết sau khi Airdrop
    - Deploy và Verify trên 2 chain: BSC Testnet và Polygon Mumbai
*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DungToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) public onlyOwner {
        _burn(_from, _amount);
    }

    event Airdrop(address indexed _receiver, uint256 _amount);

    //Viết 1 hàm Airdrop với quyền onlyOwner, kiểm tra _receiver có trong whitelist hay không
    function airdrop(
        address[] memory _receiver,
        uint256 _amount
    ) public onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        for (uint256 i = 0; i < _receiver.length; i++) {
            if (whitelist[_receiver[i]] == true) {
                _mint(_receiver[i], _amount);
            }
            //Tạo 1 event để emit các thông tin cần thiết sau khi Airdrop
            emit Airdrop(_receiver[i], _amount);
        }
    }

    //owner set admin
    mapping(address => bool) public admin;
    address[] public adminArray;

    function setAdmin(address _address) public onlyOwner {
        require(_address != address(0), "Invalid address");
        admin[_address] = true;
        adminArray.push(_address);
    }

    function removeAdmin(address _address) public onlyOwner {
        require(admin[_address] == true, "Address is not admin");
        admin[_address] = false;
    }

    //admin set whitelist
    mapping(address => bool) public whitelist;
    address[] public whitelistArray;

    function setWhitelist(address _address) public onlyAdmin {
        require(_address != address(0), "Invalid address");
        whitelist[_address] = true;
        whitelistArray.push(_address);
    }

    function removeWhitelist(address _address) public onlyAdmin {
        require(whitelist[_address] == true, "Address is not whitelist");
        whitelist[_address] = false;
    }

    //get whitelist function onlyOwner
    function getWhitelist() public view onlyOwner returns (address[] memory) {
        return whitelistArray;
    }

    modifier onlyAdmin() {
        require(admin[msg.sender] == true, "You are not admin");
        _;
    }
}
