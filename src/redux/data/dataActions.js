import store from "../store"

const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST",
    };
};

const fetchDataSuccess = (payload) => {
    return {
        type: "CHECK_DATA_SUCCESS",
        payload: payload,
    };
};

const fetchDataFailed = (payload) => {
    return {
        type: "CHECK_DATA_FAILED",
        payload: payload,
    };
};

const fetchBnbBalance = (payload) => {
    return {
        type: "FETCH_BNB_BALANCE",
        payload: payload,
    };
};


export const fetchData = (account) => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());
        try {
            let allOwnerPets = await store.getState().blockchain.nftkya.methods.getOwnerAnimalsWithIndex(account).call();
            let allPets = await store.getState().blockchain.nftkya.methods.getAnimals().call();
            dispatch(fetchDataSuccess({ allPets, allOwnerPets }));
        } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed("¡No se ha podido cargar los datos del Smart Contract!"))
        }
    };
};

//Get BNB balance
export const getBnbBalance = (account) => {
    return async (dispatch) => {
        let balanceBNB = await store.getState().blockchain.web3.eth.getBalance(account);
        //console.log(balanceBNB);
        dispatch(fetchBnbBalance(balanceBNB));
    };
}

