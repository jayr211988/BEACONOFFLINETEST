import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';
import { destroy } from 'redux-form';

const PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_REQUEST = 'PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_REQUEST';
const PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_SUCCESS = 'PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_SUCCESS';
const PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_ERROR   = 'PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_ERROR';

const PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_REQUEST = 'PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_REQUEST';
const PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_SUCCESS = 'PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_SUCCESS';
const PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_ERROR = 'PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_ERROR';

const CF1_EDIT_EDIT_CF1_SUCCESS = 'CF1_EDIT_EDIT_CF1_SUCCESS';
const CF1_GET_GET_MEMBER_PIN_SUCCESS = 'CF1_GET_GET_MEMBER_PIN_SUCCESS';
const CF1_VALIDATE_ELIGIBILITY_SUCCESS = 'CF1_VALIDATE_ELIGIBILITY_SUCCESS';
const CF2_SAVE_INFORMATION_DETAILS = 'CF2_SAVE_INFORMATION_DETAILS';

const PHIC_CLAIM_DETAILS_RESET_FIELDS = 'PHIC_CLAIM_DETAILS_RESET_FIELDS';

// *** Foreign action type

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS';


const PHIC_CLAIMS_ISSUES_COUNT_SUCCESS = 'PHIC_CLAIMS_ISSUES_COUNT_SUCCESS';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS';

const CF1_VALIDATE_ELIGIBILITY_STATUS = 'CF1_VALIDATE_ELIGIBILITY_STATUS';
const PHIC_CLAIMS_ISSUES_LIST_SUCCESS = 'PHIC_CLAIMS_ISSUES_LIST_SUCCESS';



const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    getSelectedTransmittalRequestPending : true,    
    getPHICClaimRequestPending: false,    
    selectedTransmittal: null,
    selectedClaim: null,
    hospitalCodes : null,
    //isMemberElegible : false,
    claimsIssuesTotal: 0,

    getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : true,
    getPhicClaimsDetailsCf1SummaryPending : true,
    getSelectedPhicClaimDetailCf2RequestPending : true,
    getPHICAllCaseRateRequestPending: true,
    getPHICChargesDrugsAndMedicinesRequestPending : true,
    getPHICDocumentsRequestPending : true

}, action) => {

    switch (action.type) {

    case PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_REQUEST : 
        return state = {
            ...state,
            //memberClaimStatus : 'New',
            claimsIssuesTotal: 0,
            getSelectedTransmittalRequestPending : true
        };

    case PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_SUCCESS :        
        return state = {
            ...state,
            selectedTransmittal : action.transmittal,
            getSelectedTransmittalRequestPending : false
        };
        
    case PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_ERROR : 
        return state = {
            ...state,
            getSelectedTransmittalRequestPending : false
        };

    case PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_REQUEST:
        return state = {
            ...state,
            getPHICClaimRequestPending: true
        };
    case PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_SUCCESS:
        return state = {
            ...state,
            //memberClaimStatus: action.payload.claimStatusDescription,
            //isMemberElegible : action.payload.claimStatus == 2 ? true : false,        
            selectedClaim: action.payload,
            claimsIssuesTotal : action.payload.claimIssuesTotal,
            getPHICClaimRequestPending: false,
        };
    case PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_ERROR:
        return state = {
            ...state,
            getPHICClaimRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS :
        return state = {
            ...state,
            //memberClaimStatus : action.payload.claimStatusDescription,
            //isMemberElegible : action.payload.claimStatus
            selectedClaim : { 
                ...state.selectedClaim, 
                claimStatusDescription : action.payload.claimStatusDescription,
                claimStatus : action.payload.claimStatus
            }
        };   
    
    case CF1_VALIDATE_ELIGIBILITY_STATUS : {
        return state = {
            ...state,
            selectedClaim : state.selectedClaim.claimStatus === 2 || state.selectedClaim.claimStatus === 10
        };
    }
    // update selectedClaim in new cf1
    case CF1_GET_GET_MEMBER_PIN_SUCCESS :                
        return state = {
            ...state,
            //isMemberElegible : false,
            selectedClaim : action.payload
        };
    // update selectedClaim in edit cf1
    case CF1_EDIT_EDIT_CF1_SUCCESS:                    
        return state = {
            ...state,
            //isMemberElegible : false,
            selectedClaim : action.payload
        };

    // update selectedClaim in validate eligibility        
    case CF1_VALIDATE_ELIGIBILITY_SUCCESS:    
        return state = {
            ...state,
            //isMemberElegible : false,
            selectedClaim : {
                ...state.selectedClaim,
                claimStatus : action.payload.claimStatus,
                claimStatusDescription : action.payload.claimStatusDescription
            }
        };

    case CF2_SAVE_INFORMATION_DETAILS :         
        return state = {
            ...state,
            selectedClaim : {
                ...state.selectedClaim,
                isFinal : action.value
            }
        };
    case PHIC_CLAIMS_ISSUES_COUNT_SUCCESS : 
        return state = {
            ...state,
            claimsIssuesTotal : action.claimsIssuesTotal
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST:
        return state = {
            ...state,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST:
        return state ={ 
            ...state,
            getPhicClaimsDetailsCf1SummaryPending: true
        };

    case PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST :
        return state = {
            ...state,
            getSelectedPhicClaimDetailCf2RequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST:
        return {
            ...state,
            getPHICAllCaseRateRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST:
        return {
            ...state,
            getPHICChargesDrugsAndMedicinesRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST:
        return {
            ...state,
            getPHICDocumentsRequestPending: true
        };     

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS : 
        return state = {
            ...state,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS :
        return state = {
            ...state,
            getPhicClaimsDetailsCf1SummaryPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESS :
        return state = {
            ...state,
            getSelectedPhicClaimDetailCf2RequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS :
        return state = {
            ...state,
            getPHICAllCaseRateRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS :
        return state = {
            ...state,
            getPHICChargesDrugsAndMedicinesRequestPending : false
        };    

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS:
        return {
            ...state,
            getPHICDocumentsRequestPending: false
        };      

    case PHIC_CLAIMS_ISSUES_LIST_SUCCESS:
        return {
            ...state,
            claimsIssuesTotal: action.claimsIssuesList.length
        };

    case PHIC_CLAIM_DETAILS_RESET_FIELDS :
        return {
            ...state,
            getSelectedTransmittalRequestPending : true
        };

    default: return state;
    }
};



// *** GET SELECTED TRANSMITTAL
const getSelectedTransmittalRequest = () => ({
    type : PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_REQUEST
});
const getSelectedTransmittalError = () => ({
    type : PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_ERROR
});
const getSelectedTransmittalSuccess = ( transmittal ) => ({
    type : PHIC_CLAIM_DETAILS_SELECTED_TRANSMITTAL_SUCCESS,
    transmittal
});


const getPHICClaimRequest = () => ({
    type: PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_REQUEST
});

const getPHICClaimSuccess = (phicClaim) => ({
    type: PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_SUCCESS,
    payload: phicClaim
});

const getPHICClaimError = () => ({
    type: PHIC_CLAIM_DETAILS_GET_PHIC_CLAIM_ERROR
});


/**
 * GET selected PHIC Transmittal
 * 
 * @export
 * @param {any} transmittalId
 * @returns
 */
export function getSelectedTransmittal( transmittalId ) {
    return (dispatch, getState, {clientBeacon}) =>   
      {
        dispatch(getSelectedTransmittalRequest());    
        clientBeacon.get(`/api/PHICTransmittal/GetPHICTransmittalById?transmittalId=${transmittalId}`)
            .then(response => {
                dispatch(getSelectedTransmittalSuccess(response.data));
            })
            .catch(error => {                     
                dispatch(getSelectedTransmittalError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };
}


export function getPHICClaim(claimId) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(getPHICClaimRequest());
        clientBeacon.get(`/api/PHICClaim/GetPHICClaim?id=${claimId}`)
            .then(response => {                

                dispatch(getPHICClaimSuccess(response.data));
            })
            .catch(error => {
                dispatch(getPHICClaimError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };
}

const resetPHICClaimFieldsRequest = () => ({
    type :  PHIC_CLAIM_DETAILS_RESET_FIELDS
});

export function resetPHICClaimFields() {
    return (dispatch) => {
        dispatch(destroy('cf1EligibilityCheck'));
        dispatch(destroy('cf1EditForm'));
        dispatch(destroy('phicClaimsDetailsCf2Form'));

        dispatch(resetPHICClaimFieldsRequest());
    };
}


