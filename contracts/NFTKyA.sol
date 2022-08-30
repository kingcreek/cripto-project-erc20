// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Oracle.sol";

contract NFTKyA is ERC721Enumerable, Ownable {
    
    //constructor (string memory _name, string memory _symbol)
    //ERC721(_name, _symbol) {}

    constructor() ERC721("kya nft test", "NFTKyA") {}
    
    struct Animal {
        uint animalType;
        uint32 level;
        uint32 readyTime;
    }

    
    uint256 fee = 1 ether;
    
    address private KyAToken;
    uint private cooldownTime = 1 days;
    uint256 private price = 1*10**18;

    mapping (uint => address) private animalToOwner;
    Animal[] private animals;
    
    
    event NewNft(uint nftId);
    event TokenAddressUpdated(address _address);

    // Update token contract address
    function updateTokenAddress(address _address) external onlyOwner {
        KyAToken = _address;
        emit TokenAddressUpdated(_address);
    }

    function _createNFT() public payable {
        //payable(msg.sender).transfer(10 ether);
        require(ERC20(KyAToken).transferFrom(msg.sender, address(this), price), "You need to pay for this");
        require(ERC20(KyAToken).balanceOf(msg.sender) >= price, "You don't have enough tokens");
        animals.push(Animal(1, 1, uint32(block.timestamp + cooldownTime)));
        uint id = animals.length - 1;
        
        animalToOwner[id] = msg.sender;
        //ownerZombieCount[msg.sender]++;
        _mint(msg.sender, id);
        //_beforeTokenTransfer(address(this), msg.sender, id);
        
        emit NewNft(id);
        
    }
    
    // Extracción de los ethers del Smart Contract hacia el Owner 
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // return all NFTs
    function getAnimals() public view returns (Animal [] memory) {
        return animals;
    }

    // return all owner NFTs by index
    function getOwnerAnimalsWithIndex(address _account/*, uint _index*/) public view returns (Animal[] memory) {

        uint256 tokenCount = balanceOf(_account);

        if (tokenCount == 0) {
            // Return an empty array
            return new Animal[](0);
        } else {
            Animal[] memory result = new Animal[](tokenCount);
            uint256 totalCats = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all cats have IDs starting at 1 and increasing
            // sequentially up to the totalCat count.

            for (uint256 catId = 1; catId <= totalCats; catId++) {
                if (animalToOwner[catId] == _account) {
                    result[resultIndex] = animals[catId];
                    resultIndex++;
                }
            }

            return result;
        }
    }

    // return all owner NFTs
    /*function getOwnerLips(address _owner) public view returns (Animal [] memory) {

        Animal [] memory result = new Animal [] (balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i <animals.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = animals[i];
                counter++;
            }
        }
        return result;
    }*/


    

    /*
    event NewNft(uint nftId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;

    struct Zombie {
      string name;
      uint dna;
      uint32 level;
      uint32 readyTime;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    function _createNFT(string memory _name, uint _dna) internal {
        
        zombies.push(Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime)));
        uint256 id = zombies.length - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        emit NewNft(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomNFT(string memory _name) public {
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createNFT(_name, randDna);
    }
    */

}
