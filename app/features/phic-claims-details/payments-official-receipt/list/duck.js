import Notifications from 'react-notification-system-redux';
import moment from 'moment';
import { newPhicClaimsIssue, deletePhicClaimsIssue } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const convertUtcToLocal = t => {
    t.orDate = moment.utc(t.orDate).toDate();
    return t;
};

export default (state = {
    getPHICPaymentOfficialReceiptRequestPending: false,
    phicPaymentOfficialReceipt: []
}, action) => {

    switch (action.type) {
    case PHIC_PAYMENTS_OFFICIAL_RECEIPT_REQUEST:
        return {
            ...state,
            getPHICPaymentOfficialReceiptRequestPending: true
        };
    case PHIC_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS:        
        return {
            ...state,
            getPHICPaymentOfficialReceiptRequestPending: false,
            phicPaymentOfficialReceipt: action.payload.map(convertUtcToLocal)
        };

    case PHIC_PAYMENTS_OFFICIAL_RECEIPT_ERROR:
        return {
            ...state,
            getPHICPaymentOfficialReceiptRequestPending: false,
        };
    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS:
        return {
            ...state,
            phicPaymentOfficialReceipt: [...state.phicPaymentOfficialReceipt, action.payload].map(convertUtcToLocal)
        };
    case PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS:
        return {
            ...state,
            phicPaymentOfficialReceipt: state.phicPaymentOfficialReceipt.map(t => {
                if (t.id != action.payload.id) return t;
                t = action.payload;
                return t;
            }).map(convertUtcToLocal)
        };
    case PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS:
        return {
            ...state,
            phicPaymentOfficialReceipt: state.phicPaymentOfficialReceipt.filter(t => t.id != action.payload).map(convertUtcToLocal)
        };
    case PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_ERROR:
        return {
            ...state,
        };

    case PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_EDIT :          
        return {
            ...state,
            phicPaymentOfficialReceipt : state.phicPaymentOfficialReceipt.map(t => {                
                if (t.id === action.paymentId) {                    
                    t.items.map(x => {
                        if (x.id === action.newObj.id) {                            
                            x.amount = parseInt(action.newObj.amount);
                            x.quantity = parseInt(action.newObj.quantity);
                            x.unitPrice = parseInt(action.newObj.unitPrice);                                                                        
                        }                
                        return x;
                    });                                              
                }                
                return t;
            })
        };        
    case PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_DELETE :
        return {
            ...state,
            phicPaymentOfficialReceipt : state.phicPaymentOfficialReceipt.map(t => {                                
                if (t.id === action.paymentId) {             
                    t.items = t.items.filter((x) => x.id != action.id);
                }                
                return t;
            })            
        };
    case PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_NEW:            
        return {
            ...state,
            phicPaymentOfficialReceipt : state.phicPaymentOfficialReceipt.map(t => {
                if (t.id === action.paymentId) {
                    t.items = action.officialReceiptItems;                    
                }
                return t;                
            })
        };
    default: return state;
    }
};



// edit payment details
export function editPHICPaymentDetails(newObj, paymentId) {
    return (dispatch) => {        
        dispatch(saveToStoreEditPHICPaymentDetails(newObj, paymentId ));
    };
}

export function deletePHICPaymentDetails(id, paymentId) {
    return (dispatch) => {                
        dispatch(saveToStoreDeletePHICPaymentDetails(id, paymentId));
    };
}

export function newPHICPaymentDetails(officialReceiptItems, paymentId) {
    return (dispatch) => {        
    
        dispatch(saveToStoreNewPHICPaymentDetails(officialReceiptItems, paymentId));
    };
}


export function removeIssueOnPaymentItem(phicPaymentList, transId, claimId) {
    return (dispatch) => {        
        const issue = {
            category : 3,     
            message : 'OR Number dont have any Payment Details',       
            transmittalId : transId,
            claimId : claimId
        };
                

        phicPaymentList.some(t => {        
            if (t.items !== null) {
                if (t.items.length != 0) {
                    dispatch(deletePhicClaimsIssue(issue));
                    return 0;
                }                
            } else {
                return 0;
            }            
        });           
    };
}

// add payment details

export function getPHICPaymentsOfficialReceipt (phicClaimId)  {
    return  (dispatch, getState, {clientBeacon}) => {
        dispatch(getPHICPaymentOfficialReceiptRequest());
        
        clientBeacon
            .get(`api/PHICPaymentOfficialReceiptController/GetPHICPaymentOfficialReceipt?phicClaimId=${phicClaimId}`)
            .then(response => {                                      
                dispatch(getPHICPaymentsOfficialReceiptSuccess(response.data));            
            })
            .catch(error => {
                dispatch(getPHICPaymentsOfficialReceiptError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}

export const deleletePHICPaymentsOfficialReceipt = (paymentOfficialReceiptId, changePendingRequest, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    changePendingRequest(true);
    clientBeacon
        .delete(`api/PHICPaymentOfficialReceiptController/DeletePHICPaymentOfficialReceipt?paymentOfficialReceiptId=${paymentOfficialReceiptId}`)
        .then(() => {
            dispatch(deletePHICPaymentOfficialReceiptSuccess(paymentOfficialReceiptId));
            closeDialog();
            changePendingRequest(false);
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Official Receipt successfully removed.',
                title: 'Success'
            }));
        })
        .catch(error => {
            changePendingRequest(false);
            dispatch(deletePHICPaymentOfficialReceiptError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const getPHICPaymentOfficialReceiptRequest = () => ({
    type: PHIC_PAYMENTS_OFFICIAL_RECEIPT_REQUEST
});

const getPHICPaymentsOfficialReceiptSuccess = (officialReceipt) => ({
    type: PHIC_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS,
    payload: officialReceipt
});

const getPHICPaymentsOfficialReceiptError = () => ({
    type: PHIC_PAYMENTS_OFFICIAL_RECEIPT_ERROR
});
const deletePHICPaymentOfficialReceiptSuccess = (paymentOfficialReceiptId) => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS,
    payload: paymentOfficialReceiptId
});
const deletePHICPaymentOfficialReceiptError = (id, paymentId) => ({
    type: PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_ERROR,
    id, paymentId
});

const saveToStoreEditPHICPaymentDetails = (newObj, paymentId) => ({
    type: PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_EDIT,
    newObj, paymentId
});
const saveToStoreDeletePHICPaymentDetails = (id, paymentId) => ({
    type: PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_DELETE,
    id, paymentId
});
const saveToStoreNewPHICPaymentDetails = (officialReceiptItems, paymentId) => ({
    type: PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_NEW,
    officialReceiptItems, paymentId
});

const PHIC_PAYMENTS_OFFICIAL_RECEIPT_REQUEST = 'PHIC_PAYMENTS_OFFICIAL_RECEIPT_REQUEST';
const PHIC_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS = 'PHIC_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS';
const PHIC_PAYMENTS_OFFICIAL_RECEIPT_ERROR = 'PHIC_PAYMENTS_OFFICIAL_RECEIPT_ERROR';
const PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS = 'PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_SUCCESS';
const PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_ERROR  = 'PHIC_CLAIMS_DETAILS_PAYMENTS_PAYMENTS_OFFICIAL_RECEIPT_ERROR';

const PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_EDIT = 'PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_EDIT';
const PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_DELETE = 'PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_DELETE';
const PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_NEW = 'PHIC_PAYMENTS_OFFICIAL_RECEIPT_DETAILS_NEW';

//foreign
const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_PAYMENTS_OFFICIAL_RECEIPT_EDIT_SUCCESS';