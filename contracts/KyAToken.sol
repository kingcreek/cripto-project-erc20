// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


//functions pure, view, external, internal, payable

contract KyAToken is ERC20, Ownable {

  constructor() ERC20("kya token test", "KyAToken") {
    _mint(msg.sender, 5000000 * 1 ether);
  }
  
  uint constant MAX = 2**256 - 1;

  mapping(address => uint256) private ingameMinted;

  //address private rewardsPool;
  address private mintedAddress;
  address private liquidityAddress;

  event changeRewardsPool(address rewardsPool);
  event changeMintedAddress(address mintedAddress);
  event changeLiquidityAddress(address liquidityAddress);

  

  //Function to set the reward pool address
  /*function setRewardsPool(address _rewardsPool) external onlyOwner {
    rewardsPool = _rewardsPool;
    emit changeRewardsPool(_rewardsPool);
  }*/

  //Function to get reward pool address
  /*function getRewardsPool() public view returns(address) {
    return rewardsPool;
  }*/

  //Function to set the minted address
  function setMintedAddress(address _mintedAddress) external onlyOwner {
    mintedAddress = _mintedAddress;
    emit changeMintedAddress(_mintedAddress);
  }

  //Function to set liquidity address
  function setLiquidityAddress(address _liquidityAddress) external onlyOwner {
    liquidityAddress = _liquidityAddress;
    emit changeLiquidityAddress(_liquidityAddress);
  }

  function addMintedValue(address _playerAddress, uint256 _amount) external isMintedAddress {
    ingameMinted[_playerAddress] += _amount;
    //emit changeMintedAddress(_mintedAddress);
  }

  /*
  function getMintedValue(address _playerAddress) public view returns(uint256) {
    return ingameMinted[_playerAddress];
    //emit changeMintedAddress(_mintedAddress);
  }
  */

  function approveUnlimited(address _spender) public {
     approve(_spender, MAX);
  }

  function _transfer(address sender, address receiver, uint256 amount) internal virtual override {
    //require(amount > 0 && amount <= allowance(sender, msg.sender), string("Amount exceed allowance."));
    /*
    Allow transfers to other wallet except this cases:
    1. Transfer to liquidity address if the ingame gained in the game is lower than the amount
       * Allowed to owner & mintedAddress
    */
    if(sender == liquidityAddress) {
      //It's an LP Pair and it's a buy
      //taxAmount = (amount * buyTax) / 100;
    }else if(receiver == liquidityAddress){
      //It's an LP Pair and it's a sell
      require(ingameMinted[sender] >= amount || msg.sender == owner() || msg.sender == mintedAddress, string("You haven't earned enough in the game."));
      ingameMinted[sender] -= amount;
      //taxAmount = (amount * sellTax) / 100;
    }
    //It's not a LP Pair, it's only a transfer between wallets
    
    //require(ingameMinted[sender] >= amount || msg.sender == mintedAddress, string("You haven't earned enough in the game."));
   
    
    super._transfer(sender, receiver, amount);

    //require(blacklist[sender] || blacklist[receiver], string("You are banned"));
    
    /*uint256 taxAmount;
    if(liquidityPool[sender] == true) {
      //It's an LP Pair and it's a buy
      taxAmount = (amount * buyTax) / 100;
    } else if(liquidityPool[receiver] == true) {      
      //It's an LP Pair and it's a sell
      taxAmount = (amount * sellTax) / 100;
      
      require(ingameMinted[sender] >= amount, string("You haven't earned enough in the game."));
      //require(lastTrade[sender] < (block.timestamp - tradeCooldown), string("No consecutive sells allowed. Please wait."));
      //lastTrade[sender] = block.timestamp;

    } else if(sender == rewardsPool || receiver == rewardsPool) {
      taxAmount = 0;
    } else {
      taxAmount = (amount * transferTax) / 100;
    }
    
    if(taxAmount > 0) {
      super._transfer(sender, rewardsPool, taxAmount);
    }    
    super._transfer(sender, receiver, amount - taxAmount);
    */
  }

  function _beforeTokenTransfer(address _from, address _to, uint256 _amount) internal override {
    require(_to != address(this), string("No transfers to contract allowed."));    
    super._beforeTokenTransfer(_from, _to, _amount);
  }

  modifier isMintedAddress() {
    require(msg.sender == mintedAddress);
    _;
  }



}