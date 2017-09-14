import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';
import { claimStatus } from '../../../util/data';

// *** extended function
import { getPhicClaimsIssuesCount } from '../../phic-claims-issues/list/duck';

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_ERROR = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_ERROR';

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_ERROR = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_ERROR';

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_ERROR = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_ERROR';

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_ERROR = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_ERROR';

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_ERROR = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_ERROR'; 

const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_REQUEST = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_REQUEST';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_ERROR = 'PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_ERROR';

const CF1_VALIDATE_ELIGIBILITY_SUCCESS = 'CF1_VALIDATE_ELIGIBILITY_SUCCESS';

const PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY = 'PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY';
const PHIC_CLAIMS_DETAILS_IS_FINAL_FROM_CF1_NEW = 'PHIC_CLAIMS_DETAILS_IS_FINAL_FROM_CF1_NEW';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    validateMemberEligibilityRequestPending : false,
    getPhicClaimsDetailsCf1SummaryPending : true,
    getPBEFDocumentRequestPending: false,
    membershipElegibilityInfo : null,
    patientInfo : null,
    documentList: [],
    updateClaimStatusPending : false,
    isFinalReady : false    
}, action ) =>  {
    switch(action.type) {

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_REQUEST : 
        return state = {
            ...state,
            validateMemberEligibilityRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_SUCCESS :        
        return state = {
            ...state,
            membershipElegibilityInfo : action.membershipElegibilityInfo,
            patientInfo: {
                ...state.patientInfo,
                eligibilityDocuments: action.membershipElegibilityInfo.documents ? action.membershipElegibilityInfo.documents.document : null,
                eligibilityRemainingDays: action.membershipElegibilityInfo.remaininG_DAYS,
                eligibleAsOf: action.membershipElegibilityInfo.asof,
                eligibilityTrackingNumber: action.membershipElegibilityInfo.trackinG_NUMBER,
                eligibilityIsNHTS : action.membershipElegibilityInfo.isnhts,
                eligibilityWith3Over6 : action.membershipElegibilityInfo.witH3OVER6,
                eligibilityWith9Over12 : action.membershipElegibilityInfo.witH9OVER12,    
                eligibilityIsOk : action.membershipElegibilityInfo.isok     
            }
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_ERROR : 
        return state = {
            ...state,
            validateMemberEligibilityRequestPending : false
        };
    
    case  PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST  :
        return state ={ 
            ...state,
            getPhicClaimsDetailsCf1SummaryPending: true
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS : 
        return state = {
            ...state,
            isFinalReady : false,
            patientInfo: action.patientInfo,
            getPhicClaimsDetailsCf1SummaryPending: false
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_ERROR :
        return state = {
            ...state,            
            getPhicClaimsDetailsCf1SummaryPending: false
        };    

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_REQUEST : 
        return state = {
            ...state,
            validateMemberEligibilityRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_SUCCESS :
        return state = {
            ...state,
            // patientInfo: {
            //     ...state.patientInfo,
            //     eligibilityRemainingDays: action.membershipElegibilityInfo.remaininG_DAYS,
            //     eligibleAsOf: action.membershipElegibilityInfo.asof
            // },
            validateMemberEligibilityRequestPending : false,
            //isMemberElegible : action.payload.claimStatus == 2 ? true : false 
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_ERROR : 
        return state = {
            ...state,
            validateMemberEligibilityRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_REQUEST : 
        return state = {
            ...state
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_SUCCESS :
        return state = {
            ...state,
            validateMemberEligibilityRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_ERROR : 
        return state = {
            ...state,
            validateMemberEligibilityRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_REQUEST :
        return state = {
            ...state
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS :
        return state = {
            ...state,
            updateClaimStatusPending : false,
            patientInfo : { ...state.patientInfo, eligibilityIsOk: null }
        };

    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_ERROR :
        return state = {
            ...state,
            updateClaimStatusPending : false
        };   
    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_REQUEST : 
        return state = {
            ...state,
            getPBEFDocumentRequestPending: true
        };
    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_SUCCESS : 
        return state = {
            ...state,
            getPBEFDocumentRequestPending: false
        };
    case PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_ERROR : 
        return state = {
            ...state,
            getPBEFDocumentRequestPending: false
        };                

    case PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY :         
        return state = {
            ...state,
            isFinalReady: action.ready
        };    

    // case PHIC_CLAIMS_DETAILS_IS_FINAL_FROM_CF1_NEW :     
    //     return state = {
    //         ...state,
    //         isFinalReady: action.ready
    //     };    

    default: return state;
    }
};

// *** VALIDATE MEMBER ELEGIBILITY
const validateMemberEligibilityRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_REQUEST
});
const validateMemberEligibilitySuccess = (membershipElegibilityInfo) => ({
    type: PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_SUCCESS,
    membershipElegibilityInfo
});
const validateMemberEligibilityError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF1_SUMMARY_VALIDATE_MEMBER_ELIGIBILITY_ERROR
});

// *** GET PHIC CLAIMS DETAILS CF1 SUMMARYL 
const getPhicClaimsDetailsCf1SummaryRequest = () => ({    
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_REQUEST
});
const getPhicClaimsDetailsCf1SummarySuccess = (patientInfo) => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_SUCCESS,
    patientInfo
});
const getPhicClaimsDetailsCf1SummaryError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_ERROR
});

// *** EDIT PHIC ELIGIBILITY STATUS
const editPHICClaimsDetailsEligibilityStatusRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_REQUEST
});

const editPHICClaimsDetailsEligibilityStatusSuccess = (status) => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_SUCCESS,
    payload : {
        claimStatus : status.claimStatus,
        claimStatusDescription : status.claimStatusDescription
    }
});

const editPHICClaimsDetailsEligibilityStatusError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_STATUS_ERROR
});

// *** EDIT PHIC ELIGIBILITY TRACKING NUMBER
const editPHICClaimsDetailsEligibilityTrackingNumberRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_REQUEST
});

const editPHICClaimsDetailsEligibilityTrackingNumberSuccess = (trackingNumber) => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_SUCCESS,
    trackingNumber
   
});

const editPHICClaimsDetailsEligibilityTrackingNumberError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_ELIGIBILITY_TRACKING_NUMBER_ERROR
});

// *** EDIT CLAIM STATUS 
const editPHICClaimsStatusRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_REQUEST
});

const editPHICClaimsStatusSuccess = (status) => ({
    type : PHIC_CLAIMS_DETAILS_CF1_SUMMARY_EDIT_MEMBERSHIP_STATUS_SUCCESS,
    payload : {
        claimStatusDescription : status.claimStatusDescription,
        claimStatus : status.claimStatus
    }
});

const getPBEFDocumentRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_REQUEST
});
const getPBEFDocumentSuccess = () => ({
    type: PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_SUCCESS
});
const getPBEFDocumentError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF1_SUMMARY_PBEF_ERROR
});

const updateSelectedClaimStatus = (resultClaim) => ({    
    type : CF1_VALIDATE_ELIGIBILITY_SUCCESS,
    payload: resultClaim
});



function newBlob(data, datatype) {
    const out = new Blob([data], {type: datatype});        
    return out;    
}




/**
 *  GET PBEF DOCUMENT
 * 
 * @export
 * @returns
 */
export function printPBEF(id) {
    return function (dispatch, getState, {clientBeacon}) {
        dispatch(getPBEFDocumentRequest());
        
        clientBeacon.get(`/api/PHICCF1/GetPHICCF1PBEF?Id=${id}`)
            .then(() => {
                dispatch(getPBEFDocumentSuccess());
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success Downloading PBEF Document',
                    title: 'Success'
                }));
            })
            .catch(error => {         
           
                dispatch(getPBEFDocumentError());           
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));      
            });
    };
}

/**
 * Valdiate Member Eligibility
 * 
 * @export
 * @param {any} patientInfo
 * @returns
 */
export function validateMemberEligibility(patientInfo, claimId, transmittalId, hospitalCode) {
    return function(dispatch, getState, { clientEclaims }) {                     
        dispatch(validateMemberEligibilityRequest());

        clientEclaims.post('/api/EClaims/v2/ValidateMemberEligibility', 
            
            constructPatientInfo(patientInfo, hospitalCode, 0))  
                  
            .then(response => {                                
                dispatch(validateMemberEligibilitySuccess(response.data));
                dispatch(editPHICClaimsDetailsEligibilityStatus(response.data, patientInfo, claimId, transmittalId));              
            })
            
            .catch(error => {
                dispatch(validateMemberEligibilityError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));  
            });
    };
}

/**
 * Edit PHIC Claims Details Elgibility Status
 * 
 * @param {any} membershipElegibilityInfo
 * @param {any} claimId
 * @returns
 */
function editPHICClaimsDetailsEligibilityStatus(membershipElegibilityInfo, patientInfo, claimId, transmittalId) {
    return (dispatch, getState, { clientBeacon } ) => {

        dispatch(editPHICClaimsDetailsEligibilityStatusRequest());

        clientBeacon.put('/api/PHICClaim/EditPHICClaimEligibilityStatus', 
            constructEligibilityStatus(membershipElegibilityInfo, patientInfo, claimId))

            .then(response => {                
                dispatch(updateSelectedClaimStatus(response.data));
                         
                if(response.data.claimStatus == 2 || response.data.claimStatus == 10) {
                    dispatch(Notifications.success({
                        ...notificationOpts,
                        message: `Member is ${response.data.claimStatusDescription}`,
                        title: 'Status'
                    })); 

                } else {
                    dispatch(Notifications.info({
                        ...notificationOpts,
                        message: `Member is ${response.data.claimStatusDescription}`,
                        title: 'Status'
                    }));      

                }
                dispatch(editPHICClaimsDetailsEligibilityStatusSuccess(response.data));
                dispatch(getPhicClaimsIssuesCount(claimId));
            })

            .catch(error => {
                dispatch(editPHICClaimsDetailsEligibilityStatusError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                  
            });
    };
}


/**
 * Finalize Eligibility
 * 
 * @export
 * @param {any} patientInfo
 * @param {any} claimId
 * @param {any} transmittalId
 * @param {any} hospitalCode
 * @returns
 */
export function finalizedElegibility(patientInfo, claimId, transmittalId, hospitalCode, claimStatusResult) {
    return function(dispatch, getState, { clientEclaims }) {                
        
        if (claimStatusResult === claimStatus.conditional) {
            return dispatch(Notifications.info({
                ...notificationOpts,
                message: 'Eligibility Information has been finalized. Tracking No. cannot be generated because member is not eligible.',
                title: 'Information'
            }));  
        }
        dispatch(validateMemberEligibilityRequest());

        clientEclaims.post('/api/EClaims/v2/ValidateMemberEligibility', 
            constructPatientInfo(patientInfo, hospitalCode, 1))  
                  
            .then(response => {                
                dispatch(validateMemberEligibilitySuccess(response.data));
                dispatch(editPHICClaimsEligibilityTrackingNumber(response.data, patientInfo, claimId, transmittalId));             
            })
            
            .catch(error => {
                dispatch(validateMemberEligibilityError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));  
            });
    };
}

/**
 * Edit Tracking Number
 * 
 * @param {any} membershipElegibilityInfo
 * @param {any} patientInfo
 * @param {any} claimId
 * @returns
 */
function editPHICClaimsEligibilityTrackingNumber(membershipElegibilityInfo, patientInfo, claimId) {
    
    return (dispatch, getState, { clientBeacon } ) => {

        dispatch(editPHICClaimsDetailsEligibilityTrackingNumberRequest());

        clientBeacon.put('/api/PHICClaim/EditPHICClaimEligibilityTrackingNumber', 
            constructEligibilityStatus(membershipElegibilityInfo, patientInfo, claimId))

            .then(response => {
                dispatch(editPHICClaimsDetailsEligibilityTrackingNumberSuccess(response.data));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Successfully finalized Eligibility Information. Tracking No. has been generated.',
                    title: 'Success'
                }));                 
            })

            .catch(error => {
                dispatch(editPHICClaimsDetailsEligibilityTrackingNumberError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                  
            });
    };
}

/**
 *  Get PHIC Claims Details CF1 Summary
 * 
 * @export
 * @param {any} claimId
 * @returns
 */
export function getPhicClaimsDetailsCf1Summary(claimId) {
    return (dispatch, getState, { clientBeacon }) => {     

        dispatch(getPhicClaimsDetailsCf1SummaryRequest());
        
        clientBeacon.get(`/api/PHICCF1/GetPHICCF1Summary?id=${claimId}`)

            .then((response) => {                
                dispatch(getPhicClaimsDetailsCf1SummarySuccess(response.data));                 
            })
            .catch(error => {
                dispatch(getPhicClaimsDetailsCf1SummaryError());                                              

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                    
                }));  
            });
    };
}

export function editPhicClaimsMembershipStatus(params){
    return (dispatch, getState, { clientBeacon } ) => {
        
        
        dispatch(editPHICClaimsStatusRequest());

        clientBeacon.put(`/api/PHICClaim/EditPHICClaimMembershipStatus?claimId=${params.claimId}`)
        .then(function(response){
            dispatch(editPHICClaimsStatusSuccess(response.data));
            dispatch(browserHistory.push(`/phic-claims-details/${params.transmittalId}/edit/${params.claimId}`));


        })
         .catch(() => {

         });
    };
}


// *** Construct eligibility status parameters
const constructEligibilityStatus = (memberShipInfo, patientInfo, claimId) => {
    return {
        Id : claimId,
        eligibilityIsOk : memberShipInfo.isok,
        eligibilityTrackingNumber : memberShipInfo.trackinG_NUMBER,
        eligibilityRemainingDays : memberShipInfo.remaininG_DAYS,
        eligibleAsOf : memberShipInfo.asof,
        eligibilityDocuments : memberShipInfo.documents ? memberShipInfo.documents.document : null,
        eligibilityIsNHTS : memberShipInfo.isnhts,
        eligibilityWith3Over6 : memberShipInfo.witH3OVER6,
        eligibilityWith9Over12 : memberShipInfo.witH9OVER12,        
        admissionDate : patientInfo.admissionDate,
        dischargeDate : patientInfo.dischargeDate,
    };
};

// *** Construct required parameters
const constructPatientInfo = (patient, hospitalCode, isFinal) => {

    return {
        memberPIN : patient.memberPin,
        memberLastname : patient.memberLastname,
        memberFirstname : patient.memberFirstname,
        memberMiddlename : patient.memberMiddlename,
        memberBirthday : patient.memberBirthday,
        memberSuffix : patient.memberSuffix,

        mailingAddress : patient.memberMailingAddress,
        zipCode : patient.memberZipCode,    
        patientIs: patient.patientIsCode,

        admissiondate : patient.admissionDate,
        dischargedate : patient.dischargeDate,

        patientLastname : patient.patientLastname,
        patientFirstname : patient.patientFirstname,
        patientMiddlename : patient.patientMiddlename,
        patientBirthday : patient.patientBirthday,
        patientGender : patient.patientGender,
        patientSuffix : patient.patientSuffix,

        membershipType : patient.memberTypeCode,
        pen: patient.memberPEN, // PEN
        employerName : patient.memberemployername,

        totalAmountActual : patient.totalAmountActual, //TOTAL AMOUNT ACTUAL
        totalAmountClaimed: patient.totalAmountClaimed, // TOTAL AMOUNT CLAIMED
        isFinal : isFinal, // IS FINAL
        rvs : null, // RVS      
        phicIdentity: {
            hospitalCode:  hospitalCode
        }      
    };
};

