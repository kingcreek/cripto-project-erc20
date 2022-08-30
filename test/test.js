
const maxUint256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const KyAToken = artifacts.require("KyAToken");
/*
contract('KyAToken', function(accounts) {

    it('1. Comprar tokens sin tener nada minteado', async () => {
        let instance = await KyAToken.deployed();
        let balance1 = await instance.balanceOf(accounts[0]);
        let balance2 = await instance.balanceOf(accounts[1]);
        
        console.log("Balance cuenta 1: " + balance1);
        console.log("Balance cuenta 2: " + balance2);

        let tx = await instance.transfer(accounts[1], 5, {from: accounts[0]});

        //descomentar para agregar primero valor minteado
        let tx2 = await instance.transfer(accounts[1], 50, {from: accounts[0]});

        balance1 = await instance.balanceOf(accounts[0]);
        balance2 = await instance.balanceOf(accounts[1]);

        console.log("Balance cuenta 1: " + balance1);
        console.log("Balance cuenta 2: " + balance2);

    });

});
*/


const NFTKyA = artifacts.require("NFTKyA");

let tokencontractaddress = "0xaBEb80DF938891fc84cC8b31711De6090D75A07A";
let nftcontractaddress = "0x749Ba044474D5762a50D78b5A1B0c5908ded5635";

let liquidity = "0x38771A7434ac262CD7a10c4e6A76C55E93358BB6"; //It's the third account
contract('NFTKyA', function(accounts) {
    
    
    it('1. test from deployed contract', async () => {
        
        let instancetoken = await KyAToken.at(tokencontractaddress);
        let instance = await NFTKyA.at(nftcontractaddress);

        console.log(instancetoken.address + "  --> Token address");
        console.log(instance.address + "  --> NFT address");

        let txChangeMintedAddress = await instancetoken.setMintedAddress(instance.address, {from: accounts[0]});
        let txSetLiquidityAddress = await instancetoken.setLiquidityAddress(liquidity, {from: accounts[0]});
        let txUpdateTokenAddress = await instance.updateTokenAddress(instancetoken.address, {from: accounts[0]});

        
        
        //mint
        //let tx2 = await instance._createNFT({from: accounts[0]});


    });
    
   
    
    xit('2. test from new contract', async () => {
        let instancetoken = await KyAToken.deployed();
        let instance = await NFTKyA.deployed();

        console.log(instancetoken.address + "  --> Token address");
        console.log(instance.address + "  --> NFT address");

        let owner = accounts[0];
        let accountToUse = accounts[1];
        //let approveResult = await instancetoken.approve.sendTransaction(instance.address, 2*10**6, {from: accountToUse});
        let approveToNFTResult = await instancetoken.approve(instance.address, maxUint256, {from: owner});
        let approveToTokenResult = await instancetoken.approve(owner, maxUint256, {from: owner});
        
        let txChangeMintedAddress = await instancetoken.setMintedAddress(instance.address, {from: owner});
        let txSetLiquidityAddress = await instancetoken.setLiquidityAddress(instance.address, {from: owner});
        let txUpdateTokenAddress = await instance.updateTokenAddress(instancetoken.address, {from: owner});
        
        //transfer
        let tx = await instancetoken.transfer(accountToUse, 10, {from: owner});
        //mint
        let mint = await instance._createNFT({from: owner});



        //let tx3 = await instance.getOwnerAnimalsWithIndex(accountToUse, {from: accountToUse});

        //console.log(tx3);

    });
});