import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

// *** extended function
import { getPhicClaimsIssuesCount } from '../../phic-claims-issues/list/duck';

const CF1_EDIT_GET_MEMBER_PIN_REQUEST = 'CF1_EDIT_GET_MEMBER_PIN_REQUEST';
const CF1_EDIT_GET_MEMBER_PIN_SUCCESS = 'CF1_EDIT_GET_MEMBER_PIN_SUCCESS';
const CF1_EDIT_GET_MEMBER_PIN_ERROR = 'CF1_EDIT_GET_MEMBER_PIN_ERROR';

const CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_REQUEST = 'CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_REQUEST';
const CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_SUCCESS = 'CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_SUCCESS';
const CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_ERROR = 'CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_ERROR';

const CF1_CHECK_EMPLOYEE_REQUEST = 'CF1_CHECK_EMPLOYEE_REQUEST';
const CF1_CHECK_EMPLOYEE_SUCCESS = 'CF1_CHECK_EMPLOYEE_SUCCESS';
const CF1_CHECK_EMPLOYEE_ERROR = 'CF1_CHECK_EMPLOYEE_ERROR';

const CF1_CLAIMS_TYPE_IS = 'CF1_CLAIMS_TYPE_IS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    validateMemberShipEligibilityRequest: false,
    patientMemberPinRequest: false,
    validateMemberShipEligibilityXML: [],
    patientMemberPin: [],
    patientInfo: {},
    membershipInfo: [],
    claimType: null,
    getCF1ByIdRequestPending: false,
    employerInfo: null,
    validateEmployeeRequestPending: false
}, action) => {

    switch (action.type) {

    case CF1_EDIT_GET_MEMBER_PIN_REQUEST:
        return state = {
            ...state,
            patientMemberPinRequest: true
        };

    case CF1_EDIT_GET_MEMBER_PIN_SUCCESS:
        return state = {
            ...state,
        };

    case CF1_EDIT_GET_MEMBER_PIN_ERROR:
        return state = {
            ...state,
            patientMemberPinRequest: false
        };

    case CF1_EDIT_EDIT_CF1_SUCCESS:
        return state = {
            ...state,
            patientMemberPinRequest: false
        };

    case CF1_EDIT_EDIT_CF1_ERROR:
        return state = {
            ...state,
            patientMemberPinRequest: false
        };

    case CF1_EDIT_GET_CF1_BY_ID_SUCCESS:
        return {
            ...state,
            getCF1ByIdRequestPending: false,
            patientInfo: action.payload,

            employerInfo : action.payload.validEmployer==null? null : action.payload.validEmployer ? { employer: true } : { employer: null } 
        };

    case CF1_EDIT_GET_CF1_BY_ID_REQUEST:
        return {
            ...state,
            getCF1ByIdRequestPending: true
        };
    case CF1_GET_EMPLOYER_NAME_REQUEST:
        return {
            ...state,
            //getCF1ByIdRequestPending: true
        };
    case CF1_GET_EMPLOYER_NAME_SUCCESS:
        return {
            ...state,
            //getCF1ByIdRequestPending: false,
            employerInfo: action.payload
        };
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
    default: return state;
    }
};


const claimsTypeIs = (claimsIsPatientOrMember) => ({
    type: CF1_CLAIMS_TYPE_IS,
    payload: claimsIsPatientOrMember
});

// get member PIN
const getMemberPINRequest = () => ({
    type: CF1_EDIT_GET_MEMBER_PIN_REQUEST
});

const getMemberPINSuccess = (patientMemberPin, patientInfo) => ({
    type: CF1_EDIT_GET_MEMBER_PIN_SUCCESS,
    payload: patientMemberPin,
    patientInfo: patientInfo
});

const getMemberPINError = () => ({
    type: CF1_EDIT_GET_MEMBER_PIN_ERROR
});


const validateMemberEligibilityRequest = () => ({
    type: CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_REQUEST
});
const validateMemberEligibilitySuccess = (validateMemberShipEligibility) => ({
    type: CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_SUCCESS,
    payload: validateMemberShipEligibility
});
const validateMemberEligibilityError = () => ({
    type: CF1_VALIDATE_MEMBERSHIP_ELIGIBILITY_ERROR
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


/**
 *  GET MEMBER PIN
 * 
 * @export
 * @param {any} patientInformation
 * @returns
 */
export function getMemberPIN(patientInformation, transmittalNum, phicClaimId, formValues) {
    return function (dispatch, getState, { clientEclaims, clientBeacon }) {

        dispatch(getMemberPINRequest());


        clientEclaims.post('/api/EClaims/v2/ValidateMembership', patientInformation)
            .then(response => {
                dispatch(getMemberPINSuccess(response.data, patientInformation));
                const isMemberValid = response.data.isMemberValid;
                const memberPINErrorMessage = response.data.errorMessage;

                // constructing of object                
                const editPHICCf1Dto = {
                    id: phicClaimId,
                    memberPin: response.data.memberPIN,
                    memberTypeCode: formValues.membertypecode,
                    memberTypeValue: patientInformation.memberTypeValue,
                    memberLastname: patientInformation.memberLastname,
                    memberFirstname: patientInformation.memberFirstname,
                    memberMiddlename: patientInformation.memberMiddlename,
                    memberSuffix: patientInformation.memberSuffix,
                    memberBirthday: patientInformation.memberBirthday,
                    memberGender: formValues.membergender,
                    memberMailingAddress: formValues.membermailingaddress,
                    memberZipCode: formValues.zipcode,
                    memberLandLineNumber: formValues.memberlandlinenumber,
                    memberMobileNumber: formValues.membermobilenumber,
                    memberEmail: formValues.memberemail,
                    memberPEN: formValues.memberPEN,
                    memberemployername: formValues.memberemployername,
                    patientPin: formValues.dependantpin,
                    patientIsCode: patientInformation.patientIsCode,
                    patientIsValue: patientInformation.patientIsValue,
                    patientLastname: formValues.patientlastname,
                    patientFirstname: formValues.patientfirstname,
                    patientMiddlename: formValues.patientmiddlename,
                    patientSuffix: formValues.patientsuffix,
                    patientBirthday: formValues.patientbirthday,
                    patientGender: formValues.patientgender,
                    patientMailingAddress: formValues.membermailingaddress,
                    zipCode: formValues.zipcode,
                    patientLandlineNumber: formValues.memberlandlinenumber,
                    patientMobileNumber: formValues.membermobilenumber,
                    patientEmail: formValues.memberemail,
                    admissionDate: formValues.admissiondate,
                    dischargeDate: formValues.dischargedate,
                    claimStatus: response.data.isMemberValid ? 1 : 0,
                    validEmployer: patientInformation.validEmployer
                };

                clientBeacon.put('/api/PHICCF1/EditCF1', editPHICCf1Dto)

                    .then((response) => {                        
                        dispatch(editCf1Success(response.data));                             

                        if (!memberPINErrorMessage) {
                            dispatch(Notifications.success({
                                ...notificationOpts,
                                message: isMemberValid ? 'Successful getting the Member PIN' : memberPINErrorMessage,
                                title: 'Success'
                            }));
                        }

                        // *** count claim issues
                        dispatch(getPhicClaimsIssuesCount(phicClaimId));

                        browserHistory.push(`/phic-claims-details/${transmittalNum}/summary/${phicClaimId}`);
                    })
                    .catch(error => {
                        dispatch(editCf1Error());
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


// function for validating eligibility check
export function validateMemberEligibility(patientInformation, patientMemberPin) {
    return function (dispatch, getState, { clientEclaims }) {

        dispatch(validateMemberEligibilityRequest());

        clientEclaims.post('/api/EClaims/v2/ValidateMemberEligibility', patientValidateInfo)
            .then(response => {
                dispatch(validateMemberEligibilitySuccess(response.data));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success Validating Membership Eligibility',
                    title: 'Success'
                }));
            })
            .catch(error => {
                dispatch(validateMemberEligibilityError());
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}



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

export const getCF1ById = (cf1Id = 0) => (dispatch, getState, { clientBeacon }) => {
    dispatch(getCF1ByIdRequest());

    clientBeacon
        .get(`api/PHICCF1/GetCF1ById?cf1Id=${cf1Id}`)
        .then((response) => {
            dispatch(getCF1ByIdSuccess(response.data));
        })
        .catch(() => {

        });
};

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

const getCF1ByIdSuccess = (cf1) => ({
    type: CF1_EDIT_GET_CF1_BY_ID_SUCCESS,
    payload: cf1
});

const getCF1ByIdRequest = () => ({
    type: CF1_EDIT_GET_CF1_BY_ID_REQUEST
});

const editCf1Success = (selectedClaim) => ({
    type: CF1_EDIT_EDIT_CF1_SUCCESS,
    payload: selectedClaim
});

const editCf1Error = () => ({
    type: CF1_EDIT_EDIT_CF1_ERROR
});

const getEmployerNameRequest = () => ({
    type: CF1_GET_EMPLOYER_NAME_REQUEST
});

const getEmployerNameSuccess = (employer) => ({
    type: CF1_GET_EMPLOYER_NAME_SUCCESS,
    payload: employer
});


const CF1_GET_EMPLOYER_NAME_SUCCESS = 'CF1_GET_EMPLOYER_NAME_SUCCESS';
const CF1_GET_EMPLOYER_NAME_REQUEST = 'CF1_GET_EMPLOYER_NAME_REQUEST';
const CF1_EDIT_GET_CF1_BY_ID_SUCCESS = 'CF1_EDIT_GET_CF1_BY_ID_SUCCESS';
const CF1_EDIT_GET_CF1_BY_ID_REQUEST = 'CF1_EDIT_GET_CF1_BY_ID_REQUEST';
const CF1_EDIT_EDIT_CF1_SUCCESS = 'CF1_EDIT_EDIT_CF1_SUCCESS';
const CF1_EDIT_EDIT_CF1_ERROR = 'CF1_EDIT_EDIT_CF1_ERROR';
