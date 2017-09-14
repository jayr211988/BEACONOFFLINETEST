import Notifications from 'react-notification-system-redux';

// *** extended function
import { newPhicClaimsIssue, deletePhicClaimsIssue } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc'
};

export default (state = {
    newPHICPaymentOfficialReceiptRequestPending: false
}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_REQUEST:
        return {
            ...state,
            newPHICPaymentOfficialReceiptRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS:
        return {
            ...state,
            newPHICPaymentOfficialReceiptRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_ERROR: 
        return {
            ...state,
            newPHICPaymentOfficialReceiptRequestPending: false
        };
    }

    return state;
};

export const newPHICPaymentOfficialReceipt = (officialReceipt, phicClaimId, selectedTransmittal, closeDialog, reset) => (dispatch, getState, {clientBeacon}) => {
    dispatch(newPHICPaymentsOfficialReceiptRequest());    
    clientBeacon
        .post('api/PHICPaymentOfficialReceiptController/NewPHICPaymentOfficialReceipt', officialReceipt )
        .then(response => {

            //** Add Error */
            const issue = {
                category : 3,
                message : 'OR Number dont have any Payment Details',
                transmittalId : selectedTransmittal.id,
                claimId : phicClaimId
            };

            // *** call new issue
            dispatch(newPhicClaimsIssue(issue));       

            dispatch(newPHICPaymentsOfficialReceiptSuccess(response.data));
            dispatch(reset());
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Official Receipt successfully added to list.',
                title: 'Success'                
            }));
        })
        .catch(error => {
            dispatch(newPHICPaymentsOfficialReceiptError());
            closeDialog();
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const newPHICPaymentsOfficialReceiptRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_REQUEST
});

const newPHICPaymentsOfficialReceiptSuccess = (OfficialReceipt) => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS,
    payload: OfficialReceipt
});

const newPHICPaymentsOfficialReceiptError = () => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_ERROR
});

const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_REQUEST = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_REQUEST';
const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_ERROR = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_ERROR';