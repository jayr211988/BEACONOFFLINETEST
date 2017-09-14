

import Notifications from 'react-notification-system-redux';

const PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_REQUEST = 'PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_REQUEST';
const PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_SUCCESS = 'PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_SUCCESS';
const PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_ERROR = 'PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_ERROR';


const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};


export default (state = {

}, action) => {
    switch (action.type) {
    case PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_REQUEST :
        return state = {
            ...state
        };
    case PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_SUCCESS :
        return state = {
            ...state
        };
    case PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_ERROR :
        return state = {
            ...state
        };            
    default: return state;
    }
};

const saveEditPHICPaymentOfficialReceiptDetailsRequest = () => ({
    type: PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_REQUEST
});
const saveEditPHICPaymentOfficialReceiptDetailsSuccess =() => ({
    type: PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_SUCCESS
});
const saveEditPHICPaymentOfficialReceiptDetailsError =() => ({
    type: PHIC_CLAIMS_PAYMENT_OFFICIAL_RECEIPT_DETAILS_EDIT_ERROR
});

export function saveEditPHICPaymentOfficialReceiptDetails(newObj, close) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(saveEditPHICPaymentOfficialReceiptDetailsRequest());
        clientBeacon.put('/api/PHICPaymentOfficialReceiptController/EditPHICPaymentOfficialReceiptDetails', newObj)
            .then(() => {
                dispatch(saveEditPHICPaymentOfficialReceiptDetailsSuccess());
                close();
            })
            .catch(error => {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
                dispatch(saveEditPHICPaymentOfficialReceiptDetailsError());
            });

    };
}