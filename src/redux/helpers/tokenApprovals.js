import store from "../store"
//import Web3 from "web3"
//import KyAToken from "../../contracts/KyAToken.json"
//import NFTKyA from "../../contracts/NFTKyA.json"
//import { fetchData } from "../data/dataActions"
import * as Utils from "../../utils";
import * as Messages from "./messages";

/*
export const aproveToken = (_account) => {
    return async (dispatch) => {
        const state = store.getState();
        let _amount = Utils.maxUint256;
        let token = state.blockchain.kyaToken;
        const alreadyApproved = await token.methods.allowance(_account, token._address).call({ from: _account });

        if (Number(alreadyApproved) >= Number(_amount)) {
            return true;
        }
        const gasPrice = await estimate(2);
        token.methods.approve(_account, _amount).send({
            from: _account,
            gasPrice,
        }).once("error", (err) => {
            dispatch(aprovedRequest({tokenAproved: false}));
            console.log(err);
        }).then((receipt) => {
            dispatch(aprovedRequest({tokenAproved: true}));
        });
    };
};
*/
export const checkIfNftNeedApproval = (_account/*, _amount*/) => {
    return async (dispatch) => {
        const state = store.getState();

        let _amount = Utils.maxUint256;
        let token = state.blockchain.kyaToken;
        let tokenNft = state.blockchain.nftkya;
        const alreadyApproved = await token.methods.allowance(_account, tokenNft._address).call({ from: _account });
        //const wei = state.blockchain.web3.utils.toWei(_amount.toString(), "ether");
        //console.log("wei " + wei);
        console.log("alreadyApproved " + alreadyApproved);
        if (Number(alreadyApproved) >= Number(_amount)) {
            console.log("no necesita aprobacion");
            //dispatch(aproveNftRequest({ nftNeedApproved: false }));
        } else {
            console.log("necesita aprobacion");
            dispatch(Messages.showNftApproveNeed());
            //dispatch(aproveNftRequest({ nftNeedApproved: true }));
        }
    };
};

export const requestAprovalNft = (_account/*, _amount*/) => {
    return async (dispatch) => {
        const state = store.getState();
        let _amount = Utils.maxUint256;
        let token = state.blockchain.kyaToken;
        let tokenNft = state.blockchain.nftkya;
        const gasPrice = await estimate(2);
        token.methods.approve(tokenNft._address, _amount).send({
            from: _account,
            gasPrice,
        }).once("error", (err) => {
            //dispatch(aproveNftRequest({ nftNeedApproved: false }));
            //console.log(err);
        }).then((receipt) => {
            //dispatch(aproveNftRequest({ nftNeedApproved: true }));
        });
    };
}


const estimate = async (incr = 1) => {
    const state = store.getState();
    const MINIMUM_GAS_PRICE = 40;
    const e = await state.blockchain.web3.eth.getGasPrice();
    let gasPrice = e ? Number(e) * incr : undefined;
    const minimum = MINIMUM_GAS_PRICE * 1000000000;
    if (!gasPrice || gasPrice < minimum) {
        gasPrice = minimum;
    }
    console.log({ gasPrice });
    return gasPrice;
}