
import Notifications from 'react-notification-system-redux';
import { newPhicClaimsIssue, deletePhicClaimsIssue } from '../../../phic-claims-issues/list/duck';

const PHIC_CLAIMS_PAYMENT_DETAILS_LIST = 'PHIC_CLAIMS_PAYMENT_DETAILS_LIST';

const PHIC_CLAIMS_GET_PAYMENT_DETAILS_REQUEST = 'PHIC_CLAIMS_GET_PAYMENT_DETAILS_REQUEST';
const PHIC_CLAIMS_GET_PAYMENT_DETAILS_SUCCESS = 'PHIC_CLAIMS_GET_PAYMENT_DETAILS_SUCCESS';
const PHIC_CLAIMS_GET_PAYMENT_DETAILS_ERROR = 'PHIC_CLAIMS_GET_PAYMENT_DETAILS_ERROR';

const PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_SUCCESS = 'PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_SUCCESS';
const PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_ERROR  = 'PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_ERROR';

const PHIC_CLAIMS_PAYMENT_DETAILS_SELECTED_FOR_EDIT = 'PHIC_CLAIMS_PAYMENT_DETAILS_SELECTED_FOR_EDIT';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    listOfPaymentDetails : [],
    selectedDetail: [],
    getListOfPaymentDetailsRequest: false,

}, action) => {
    switch(action.type) {

    case PHIC_CLAIMS_GET_PAYMENT_DETAILS_REQUEST : 
        return state = {
            ...state,
            getListOfPaymentDetailsRequest : true
        };
    case PHIC_CLAIMS_GET_PAYMENT_DETAILS_SUCCESS : 
        return state = {
            ...state,
            getListOfPaymentDetailsRequest : false,
            listOfPaymentDetails : action.listOfPaymentDetails
        };
    case PHIC_CLAIMS_GET_PAYMENT_DETAILS_ERROR : 
        return state = {
            ...state,
            getListOfPaymentDetailsRequest : false
        };
    
    case PHIC_CLAIMS_PAYMENT_DETAILS_LIST : 
        return state = {
            ...state,
            listOfPaymentDetails : action.val
        };

    case PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_SUCCESS : 
        return state = {
            ...state
        };
    case PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_ERROR :
        return state = {
            ...state
        };

    case PHIC_CLAIMS_PAYMENT_DETAILS_SELECTED_FOR_EDIT : 
        return state = {
            ...state,
            selectedDetail: action.item
        };
    default: return state;
    }
};


const saveListOfPayments = (val) => ({
    type: PHIC_CLAIMS_PAYMENT_DETAILS_LIST,
    val
});
const getListOfPaymentORDetailsRequest = () => ({
    type: PHIC_CLAIMS_GET_PAYMENT_DETAILS_REQUEST
    
});
const getListOfPaymentORDetailsSuccess = (listOfPaymentDetails) => ({
    type: PHIC_CLAIMS_GET_PAYMENT_DETAILS_SUCCESS,
    listOfPaymentDetails
});
const getListOfPaymentORDetailsError = () => ({
    type: PHIC_CLAIMS_GET_PAYMENT_DETAILS_ERROR
});
const deletePHICPaymentOfficialReceiptDetailsSuccess = () => ({
    type : PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_SUCCESS
});
const deletePHICPaymentOfficialReceiptDetailsError = () => ({
    type : PHIC_CLAIMS_PAYMENT_DETAILS_DELETE_ERROR
});

const saveSelectedDetialToEdit = (item) => ({
    type: PHIC_CLAIMS_PAYMENT_DETAILS_SELECTED_FOR_EDIT,
    item

});

export function saveToListOfPayment(val) {
    return (dispatch) => {        
        dispatch(saveListOfPayments(val));
    };
}

export function saveSelectedDetailToEdit(item) {
    return (dispatch) => {
        dispatch(saveSelectedDetialToEdit(item));
    };
}



export function getListOfPaymentDetails(id) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(getListOfPaymentORDetailsRequest());

        clientBeacon.get(`/api/PHICPaymentOfficialReceiptController/GetPHICPaymentDetailsOfficialReceipt?id=${id}`)
            .then(response => {                
                dispatch(getListOfPaymentORDetailsSuccess(response.data));
            })
            .catch(error => {
                dispatch(getListOfPaymentORDetailsError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };
}

export function deleletePHICPaymentsOfficialReceiptDetails(id, changePendingRequest, closeDialog, deleteInStore, officialReceiptItems,  selectedClaim, selectedTransmittal ) {
    return (dispatch, getState, {clientBeacon}) => {
        changePendingRequest(true);                    

        clientBeacon.delete(`/api/PHICPaymentOfficialReceiptController/DeletePHICPaymentOfficialReceiptDetails?id=${id}`)
            .then(() => {
                dispatch(deletePHICPaymentOfficialReceiptDetailsSuccess());
                changePendingRequest(false);
                closeDialog();
                deleteInStore(id);


                if (officialReceiptItems.length === 1) {
                    //** Remove Error */
                    const issue = {
                        category : 3,
                        message : 'OR Number dont have any Payment Details',
                        transmittalId : selectedTransmittal.id,
                        claimId : selectedClaim.id
                    };

                    
                    // *** call new issue
                    dispatch(newPhicClaimsIssue(issue));      
                }

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Payment Details successfully removed.',
                    title: 'Success'
                }));
            })
            .catch(error => {
                dispatch(deletePHICPaymentOfficialReceiptDetailsError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
        closeDialog();
    };
}