
import Notifications from 'react-notification-system-redux';

import { newPHICPaymentDetails } from '../../payments-official-receipt/list/duck';

const PHIC_CLAIMS_PAYMENT_GET_XLSO_REQUEST = 'PHIC_CLAIMS_PAYMENT_GET_XLSO_REQUEST';
const PHIC_CLAIMS_PAYMENT_GET_XLSO_SUCCESS = 'PHIC_CLAIMS_PAYMENT_GET_XLSO_SUCCESS';
const PHIC_CLAIMS_PAYMENT_GET_XLSO_ERROR = 'PHIC_CLAIMS_PAYMENT_GET_XLSO_ERROR';

const PHIC_CLAIMS_PAYMENT_SAVE_REQUEST= 'PHIC_CLAIMS_PAYMENT_SAVE_REQUEST';
const PHIC_CLAIMS_PAYMENT_SAVE_SUCCESS = 'PHIC_CLAIMS_PAYMENT_SAVE_SUCCESS';
const PHIC_CLAIMS_PAYMENT_SAVE_ERROR = 'PHIC_CLAIMS_PAYMENT_SAVE_ERROR';

const PHIC_CLAIMS_PAYMENT_SELECTED_ITEM = 'PHIC_CLAIMS_PAYMENT_SELECTED_ITEM';

const PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_QTY = 'PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_QTY';
const PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_UNITPRICE = 'PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_UNITPRICE';

const PHIC_CLAIMS_RESET_SELECTED_ITEM = 'PHIC_CLAIMS_RESET_SELECTED_ITEM';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    listOfDrugsAndXlso : [],
    selectedItem : null,
    addPaymentItemRequest : false,
    newPaymentDetails : [],    
    unitPrice: 0,
    qty : 0,
    totalAmount: 0    

}, action) => {
    switch(action.type) {
    case PHIC_CLAIMS_PAYMENT_GET_XLSO_REQUEST : 
        return state = {
            ...state            
        };
    case PHIC_CLAIMS_PAYMENT_GET_XLSO_SUCCESS :
        return state = {
            ...state,
            listOfDrugsAndXlso : action.listOfDrugsAndXlso
            
        };
    case PHIC_CLAIMS_PAYMENT_GET_XLSO_ERROR :
        return state = {
            ...state
        };
    case PHIC_CLAIMS_PAYMENT_SELECTED_ITEM :
        return state = {
            ...state,
            selectedItem : action.value
        };
    case PHIC_CLAIMS_PAYMENT_SAVE_REQUEST : 
        return state = {
            ...state,
            addPaymentItemRequest : true
        };
    case PHIC_CLAIMS_PAYMENT_SAVE_SUCCESS : 
        return state = {
            ...state,
            addPaymentItemRequest : false,
            newPaymentDetails : action.response
        };
    case PHIC_CLAIMS_PAYMENT_SAVE_ERROR : 
        return state = {
            ...state,
            addPaymentItemRequest : false
        };
    case PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_UNITPRICE : 
        return state = {
            ...state,
            unitPrice : action.unitPrice,
            totalAmount : state.qty * action.unitPrice
        };
    case PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_QTY :
        return state = {
            ...state,
            qty : action.qty,
            totalAmount : action.qty * state.unitPrice
        };    

    case PHIC_CLAIMS_RESET_SELECTED_ITEM : 
        return state = {
            ...state,
            selectedItem: null
        };
    default : return state;
    }
};


const getPHICXLSORequest = () => ({
    type : PHIC_CLAIMS_PAYMENT_GET_XLSO_REQUEST
});
const getPHICXLSOSuccess = (listOfDrugsAndXlso) => ({
    type : PHIC_CLAIMS_PAYMENT_GET_XLSO_SUCCESS,
    listOfDrugsAndXlso
});
const getPHICXLSOError = () => ({
    type : PHIC_CLAIMS_PAYMENT_GET_XLSO_ERROR
});
const getSelectedDrugsOrXLSOname = (value) => ({
    type : PHIC_CLAIMS_PAYMENT_SELECTED_ITEM,
    value
});
const saveEnteredDrugsAndXLSODetailsRequest = () => ({
    type : PHIC_CLAIMS_PAYMENT_SAVE_REQUEST
});
const saveEnteredDrugsAndXLSODetailsSuccess = (response) => ({
    type : PHIC_CLAIMS_PAYMENT_SAVE_SUCCESS,
    response
});
const saveEnteredDrugsAndXLSODetailsError = () => ({
    type : PHIC_CLAIMS_PAYMENT_SAVE_ERROR
});

const resetSelectedItemOnMount  = () => ({
    type: PHIC_CLAIMS_RESET_SELECTED_ITEM
});

const changeValueOfQty = (qty) => ({
    type: PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_QTY,
    qty
});

const changeValueOfUnitPrice = (unitPrice) => ({
    type: PHIC_CLAIMS_PAYMENT_ITEM_CHANGE_UNITPRICE,
    unitPrice
});

// reset selectedItem
export function resetSelectedItem() {
    return (dispatch) => {
    
        dispatch(resetSelectedItemOnMount());
    };
}

export function checkSelectedDrugsOrXLSO(value) {
    return (dispatch) => {
        dispatch(getSelectedDrugsOrXLSOname(value));
    };
}

 // change qty value
export function changeQty(value) {
    return (dispatch) => {
        dispatch(changeValueOfQty(value));
    };
}

// change unit price value
export function changeUnitPrice(value) {
    return (dispatch) => {
        dispatch(changeValueOfUnitPrice(value));
    };
}


/**
 *  get Drugs and XLSO Details
 * 
 * @export
 * @param {any} id
 * @returns
 */
export function getDrugsAndXLODetails(id) {
    return (dispatch, getState, {clientBeacon}) => {
        
        dispatch(getPHICXLSORequest());
        clientBeacon.get(`/api/PHICPaymentOfficialReceiptController/GetXLSOsAndDrugsMedicineItem?id=${id}`)
            .then(response => {                              
                                                
                let listOfDrugsAndXlso = [];
                
                response.data.map((item) => {     
                    let tempDrug = {};                    
                    if (item.brandName) {
                        tempDrug.value = item.brandName;
                        tempDrug.group = 'Drugs and Medicines';
                        listOfDrugsAndXlso.push(tempDrug);
                    }
                    if (item.description) {
                        tempDrug.value = item.description;
                        tempDrug.group = 'Xray, Lab, Supplies and Others';
                        listOfDrugsAndXlso.push(tempDrug);                        
                    }                    
                });         
                                

                dispatch(getPHICXLSOSuccess(listOfDrugsAndXlso));
            })
            .catch(error => {                
                dispatch(getPHICXLSOError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };    
}

export function saveToListOfPaymentDetails(newObj, paymentId, officialReceiptItems, selectedTransmittal, selectedClaim, phicPaymentOfficialReceipt, close) {
    return (dispatch, getState, {clientBeacon}) => {         
        

        
        
        dispatch(saveEnteredDrugsAndXLSODetailsRequest());    
        clientBeacon.post('/api/PHICPaymentOfficialReceiptController/saveEnteredDrugsAndXLSOData', newObj)
            .then(response => {                
                dispatch(saveEnteredDrugsAndXLSODetailsSuccess(response.data));                                                 

                if (officialReceiptItems === null) {
                    officialReceiptItems = [];
                }
                officialReceiptItems.push(response.data);
                
                // action from payment-official-receipt DUCK                                
                dispatch(newPHICPaymentDetails(officialReceiptItems, paymentId));
                dispatch(resetSelectedItemOnMount());
            })
            .catch(error => {
                dispatch(saveEnteredDrugsAndXLSODetailsError());        
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
                close();
            });
        
    };
}