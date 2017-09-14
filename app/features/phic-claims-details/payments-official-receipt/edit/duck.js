import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    editPHICPaymentOfficialReceiptRequestPending: false
}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_REQUEST:
        return {
            ...state,
            editPHICPaymentOfficialReceiptRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS:
        return {
            ...state,
            editPHICPaymentOfficialReceiptRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_ERROR: 
        return {
            ...state,
            editPHICPaymentOfficialReceiptRequestPending: false
        };

    default : return state;
    }
    //return state;
};

export const editPHICPaymentOfficialReceipt = (officialReceipt, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(editPHICPaymentOfficialReceiptRequest());

    clientBeacon
        .put('api/PHICPaymentOfficialReceiptController/EditPHICPaymentOfficialReceipt', officialReceipt)
        .then(response => {
            dispatch(editPHICPaymentOfficialReceiptSuccess(response.data));
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Official Receipt successfully edited.',
                title: 'Success'
            }));
        })
        .catch(error => {
            dispatch(editPHICPaymentOfficialReceiptError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const editPHICPaymentOfficialReceiptRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_REQUEST
});

const editPHICPaymentOfficialReceiptSuccess = (officialReceipt) => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS,
    payload: officialReceipt
});

const editPHICPaymentOfficialReceiptError = () => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_ERROR
});

const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_REQUEST = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_REQUEST';
const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS';
const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_ERROR = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_ERROR';