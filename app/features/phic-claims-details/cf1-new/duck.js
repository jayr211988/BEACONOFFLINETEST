
import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

import {  getPhicClaimsIssuesCount } from '../../phic-claims-issues/list/duck';

const CF1_VALIDATE_MEMBERSHIP_REQUEST = 'CF1_VALIDATE_MEMBERSHIP_REQUEST';
const CF1_VALIDATE_MEMBERSHIP_SUCCESS = 'CF1_VALIDATE_MEMBERSHIP_SUCCESS';
const CF1_VALIDATE_MEMBERSHIP_ERROR = 'CF1_VALIDATE_MEMBERSHIP_SUCCESS';

const CF1_GET_MEMBER_PIN_REQUEST = 'CF1_GET_MEMBER_PIN_REQUEST';
const CF1_GET_MEMBER_PIN_SUCCESS = 'CF1_GET_MEMBER_PIN_SUCCESS';
const CF1_GET_MEMBER_PIN_ERROR = 'CF1_GET_MEMBER_PIN_ERROR';

const CF1_PHIC_CLAIMS_RECORD_REQUEST = 'CF1_PHIC_CLAIMS_RECORD_REQUEST';
const CF1_PHIC_CLAIMS_RECORD_SUCCESS = 'CF1_PHIC_CLAIMS_RECORD_SUCCESS';
const CF1_PHIC_CLAIMS_RECORD_ERROR = 'CF1_PHIC_CLAIMS_RECORD_ERROR';

const CF1_CLAIMS_TYPE_IS = 'CF1_CLAIMS_TYPE_IS';
const PHIC_CLAIMS_RESET_PATIENT_INFO = 'PHIC_CLAIMS_RESET_PATIENT_INFO';
const PHIC_CLAIMS_TRANSMITTAL_SUCCESS = 'PHIC_CLAIMS_TRANSMITTAL_SUCCESS';

const CF1_GET_GET_MEMBER_PIN_SUCCESS = 'CF1_GET_GET_MEMBER_PIN_SUCCESS';

// const PHIC_CLAIMS_DETAILS_IS_FINAL_READY = 'PHIC_CLAIMS_DETAILS_IS_FINAL_READY';

const PHIC_CLAIMS_DETAILS_IS_FINAL_FROM_CF1_NEW = 'PHIC_CLAIMS_DETAILS_IS_FINAL_FROM_CF1_NEW';
const CF1_CHECK_EMPLOYEE_REQUEST = 'CF1_CHECK_EMPLOYEE_REQUEST';
const CF1_CHECK_EMPLOYEE_SUCCESS = 'CF1_CHECK_EMPLOYEE_SUCCESS';
const CF1_CHECK_EMPLOYEE_ERROR = 'CF1_CHECK_EMPLOYEE_ERROR';

const CF1_CHECK_EMPLOYEE = 'CF1_CHECK_EMPLOYEE';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {    
    patientMemberPinRequest: false,
    validateMemberShipEligibilityXML : [],
    patientMemberPin : [],
    patientInfo : [],
    membershipInfo: [],
    claimType : null,
    employerInfo: null

}, action) => {
    
    switch(action.type) {
    case CF1_VALIDATE_MEMBERSHIP_REQUEST :
        return state = {
            ...state,
            employerInfo: null
        };    
    case CF1_VALIDATE_MEMBERSHIP_SUCCESS : 
        return state = {
            ...state,  
            membershipInfo : action.payload 
        };
    case CF1_VALIDATE_MEMBERSHIP_ERROR : 
        return state = {
            ...state
        };
    case CF1_CLAIMS_TYPE_IS : 
        return state = {
            ...state,
            claimType: action.payload
        };
    case CF1_GET_MEMBER_PIN_REQUEST :
        return state = {
            ...state,
            patientMemberPinRequest : true
        };
    case CF1_GET_MEMBER_PIN_SUCCESS : 
        return state = {
            ...state,
            patientMemberPin : action.payload,
            patientInfo : action.patientInfo,
            patientMemberPinRequest : false
        };
    case CF1_GET_MEMBER_PIN_ERROR :
        return state = {
            ...state,
            patientMemberPinRequest : false
        };    
    case CF1_PHIC_CLAIMS_RECORD_REQUEST : 
        return state = {
            ...state,
            employerInfo: null
        };
    case CF1_PHIC_CLAIMS_RECORD_SUCCESS : 
        return state  = {
            ...state
        };
    case CF1_PHIC_CLAIMS_RECORD_ERROR :
        return state = {
            ...state
        };    
    case PHIC_CLAIMS_RESET_PATIENT_INFO : {
        return state = {
            ...state,
            patientInfo: []
        };
    }
    case PHIC_CLAIMS_TRANSMITTAL_SUCCESS : {        
        return state = {
            ...state,
            patientInfo : action.payload
        };
    }
    case CF1_CHECK_EMPLOYEE_REQUEST : 
        return {
            ...state,
            validateEmployeeRequestPending : true
        };
    case CF1_CHECK_EMPLOYEE_SUCCESS : 
        return {
            ...state,
            validateEmployeeRequestPending : false,
            employerInfo : action.employer
        };
    case CF1_CHECK_EMPLOYEE_ERROR : 
        return {
            ...state,
            validateEmployeeRequestPending : false,
            employerInfo : { employer: null }
        };
    case CF1_CHECK_EMPLOYEE :
        return state = {
            ...state,
            employerInfo: null
        }; 
  
    default: return state;
    
    }
};



const claimsTypeIs = (claimsIsPatientOrMember) => ({
    type: CF1_CLAIMS_TYPE_IS,
    payload: claimsIsPatientOrMember    
});

// get member PIN
const getMemberPINRequest = () => ({
    type : CF1_GET_MEMBER_PIN_REQUEST

});

const getMemberPINSuccess = (patientMemberPin, patientInfo) => ({
    type: CF1_GET_MEMBER_PIN_SUCCESS,
    payload : patientMemberPin,
    patientInfo : patientInfo
});

const getMemberPINError = () => ({
    type: CF1_GET_MEMBER_PIN_ERROR
});

const newPHICClaimsRecordSuccess = () => ({
    type: CF1_PHIC_CLAIMS_RECORD_SUCCESS
});

const newPHICClaimsRecordError = () => ({
    type : CF1_PHIC_CLAIMS_RECORD_ERROR
});

const updateMemberValidSuccess = (selectedClaim) => ({
    type: CF1_GET_GET_MEMBER_PIN_SUCCESS,
    payload : selectedClaim
});

// validate employee 
const validateEmployeeRequest = () => ({
    type: CF1_CHECK_EMPLOYEE_REQUEST
});

const validateEmployeeSuccess = (employer) => ({
    type: CF1_CHECK_EMPLOYEE_SUCCESS,
    employer
});
const validateEmployeeError = () => ({
    type: CF1_CHECK_EMPLOYEE_ERROR
});

const checkEmployer = () => ({
    type: CF1_CHECK_EMPLOYEE
});


/**
 *  GET MEMBER PIN
 * 
 * @export
 * @param {any} patientInformation
 * @returns
 */
export function getMemberPIN(patientInformation, transmittalNum, cf1mode) {
    return function(dispatch, getState, {clientEclaims, clientBeacon}) {

        dispatch(getMemberPINRequest());               
         
        
        clientEclaims.post('/api/EClaims/v2/ValidateMembership', patientInformation)
            .then(response => {
                dispatch(getMemberPINSuccess(response.data, patientInformation));                     
                
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: response.data.isMemberValid ? 'Successful getting the Member PIN' : response.data.errorMessage,
                    title: 'Success'
                }));    

                if (cf1mode === 'new-claim-dependent') {
                    patientInformation.memberpin = response.data.memberPIN;
                    patientInformation.transmittalId = transmittalNum;                      
                    patientInformation.memberverified = 1;                    

                } else if ( cf1mode === 'new-claim-member') {                                                 
                    patientInformation.memberpin = response.data.memberPIN;
                    patientInformation.patientpin = response.data.memberPIN;                    
                    patientInformation.transmittalId = transmittalNum;  
                    patientInformation.memberverified = 1;
                    patientInformation.patientsuffix = patientInformation.membersuffix;
                }

                // if not in phil health eclaims
                if (response.data.errorMessage) {                    
                    patientInformation.memberverified = 0;                    
                }
                                                
                clientBeacon.post('/api/PHICCF1/NewPHICClaimsRecord', patientInformation)
                    .then(response => {
                        
                        dispatch(updateMemberValidSuccess(response.data));
                        dispatch(newPHICClaimsRecordSuccess());
                        dispatch(getPhicClaimsIssuesCount(response.data.id));

                        browserHistory.push(`/phic-claims-details/${transmittalNum}/summary/${response.data.id}`);                                             

                    })
                    .catch(error => {                                   
                        dispatch(newPHICClaimsRecordError());
                        dispatch(Notifications.error({
                            ...notificationOpts,
                            message: error.data.exceptionMessage,
                            title: 'Error'
                        }));    
                    });
            })
            .catch(error => {
                dispatch(getMemberPINError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));    
            });
    };
}

export const getEmployerName = (selectedTransmittal,employerPEN,employer) => 
    (dispatch, getState, {clientEclaims}) => {

        dispatch(validateEmployeeRequest());

        clientEclaims
        .post('api/EClaims/v2/SearchEmployer', {
            pen: employerPEN,
            employerName: employer.toString(),
            phicIdentity: {
                hospitalCode: selectedTransmittal.hospitalCode
            }
        })
        .then(response => {
            dispatch(validateEmployeeSuccess(response.data));
        })
        .catch(() => {
            dispatch(validateEmployeeError());
        });
    };



/** 
 * CHECK FOR CLAIM TYPES IF 
 * IF DEPENDENTS OR MEMBER
 * 
 * @export
 * @returns
 */
export function checkForClaims() {
    return function (dispatch, getState) {
        const claimsIsPatientOrMember = getState().phicClaimsListReducer.claimsType;        
        dispatch(claimsTypeIs(claimsIsPatientOrMember));
        
    };
}

/** 
 * CHECK FOR EMPLOYER IF 
 * RESET EMPPLOYER
 * 
 * @export
 * @returns
 */

export function checkForEmployer() {
    return function (dispatch) {     
        dispatch(checkEmployer());
    };
}

