
import store from "../store"

import { fetchData } from "../data/dataActions";




// Mint de un nuevo Token NFT
export const mintNFT = (_account, _name) => {
  return async (dispatch) => {
    const state = store.getState();

    //setLoading(true);

    state.blockchain.nftkya.methods._createNFT().send({
      from: _account,
      //value: blockchain.web3.utils.toWei("1", "ether"),
    }).once("error", (err) => {
      //setLoading(false);
      //console.log(err);
    }).then((receipt) => {
      //setLoading(false);
      //console.log(receipt);
      dispatch(fetchData(state.blockchain.account));
    });
  };
};