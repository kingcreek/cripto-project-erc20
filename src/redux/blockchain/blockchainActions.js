//import store from "../store"
import Web3 from "web3"
import KyAToken from "../../contracts/KyAToken.json"
import NFTKyA from "../../contracts/NFTKyA.json"
import { fetchData } from "../data/dataActions"
//import * as Utils from "../../utils";

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    };
};




export const connect = () => {
    return async (dispatch) => {
        dispatch(connectRequest());
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum);
            try {
                //Check if account is already connected
                const connectedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (connectedAccounts === undefined) {
                    console.log("Request connection");
                    return;
                }
                const accounts = await window.ethereum.request({ method: "eth_accounts", });
                const networkId = await window.ethereum.request({ method: "net_version", });

                // Ganache -> 1337
                // BSC Testnet -> 97, 0x61
                // MATIC/Polygon -> 80001
                // Rinkeby -> 4
                //console.log(networkId);
                if (networkId ==  5777) { // 0x539 = Ganache
                    //console.log("Correct network");

                    //token
                    const networkData = KyAToken.networks[networkId];
                    const abi = KyAToken.abi;
                    const address = networkData.address;
                    const kyaToken = new web3.eth.Contract(abi, address);
                    //kyaToken.address = address;

                    //nft
                    const networkDataNFT = NFTKyA.networks[networkId];
                    const abiNFT = NFTKyA.abi;
                    const addressNFT = networkDataNFT.address;
                    const nftkya = new web3.eth.Contract(abiNFT, addressNFT);
                    //nftkya.address = addressNFT;

                    dispatch(
                        connectSuccess({
                            account: accounts[0],
                            kyaToken: kyaToken,
                            nftkya: nftkya,
                            web3: web3,
                        })
                    );

                    window.ethereum.on("accountsChanged", (accounts) => {
                        console.log("accountsChanged 1");
                        //dispatch(autoConnectIfIsConnected(accounts[0]));
                        //window.location.reload();
                        dispatch(updateAccount(accounts[0]));
                    });

                    window.ethereum.on("chainChanged", () => {
                        console.log("chain changed");
                        window.location.reload();
                    });


                } else {
                    //change network
                    console.log("Change network");
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x539' }], // chainId must be in hexadecimal numbers
                    });
                    //dispatch(connectFailed("¡El Smart Contract no se ha desplegado en la red!"));
                }
            } catch (err) {
                console.log(err);
                dispatch(connectFailed("¡Algo ha salido mal!"))
            }
        } else {
            dispatch(connectFailed("¡Instala Metamask!"))
        }
    };
};

export const autoConnectIfIsConnected = (account) => {
    return async (dispatch) => {
        const accounts = await window.ethereum.request({ method: "eth_accounts", });

        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== account) {
            console.log(accounts[0]);
            dispatch(connect());
            //currentAccount = accounts[0];
            //console.log('Current account has not same.');
            // Do any other work!
        }/*else{
            dispatch(connect());
        }*/
    };
};

export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({ account: account }));
        dispatch(fetchData(account));
    };
};



