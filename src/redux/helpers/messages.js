import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import store from "../store"
import { /*aproveToken,*/ requestAprovalNft } from "./tokenApprovals";

const MySwal = withReactContent(Swal);

export const showError = (error) => {
    MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
    })
}

export const showSuccess = (message) => {
    MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    })
}

export const showInfo = (message) => {
    MySwal.fire({
        icon: 'info',
        title: 'Info',
        text: message,
    })
}


export const showNftApproveNeed = () => {
    return async (dispatch) => {
        const state = store.getState();
        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: 'Aprove NFT contract',
            text: "You need aprove nft contract to use this feature",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(requestAprovalNft(state.blockchain.account));
            }
        });
    };
};
