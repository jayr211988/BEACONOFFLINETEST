import Notifications from 'react-notification-system-redux';

import { deletePhicClaimsIssue } from '../../../phic-claims-issues/list/duck';

const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_ERROR';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_CLEAR_ACCREDITATION_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_CLEAR_ACCREDITATION_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    validateDoctorAccreditationRequestPending : false

}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_REQUEST : 
        return state = {
            ...state,
            validateDoctorAccreditationRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS :
        return state = {
            ...state,
            validateDoctorAccreditationRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_ERROR :
        return state = {
            ...state,
            validateDoctorAccreditationRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_REQUEST :
        return state = {
            ...state,            
            doctorInfo : action.doctorInfo,
            validateDoctorAccreditationRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_SUCCESS :
        return state = {
            ...state,
            validateDoctorAccreditationRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_ERROR :
        return state = {
            ...state,
            validateDoctorAccreditationRequestPending : false,
            errorInfo : action.errorInfo
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_CLEAR_ACCREDITATION_ERROR :
        return state = {
            ...state,
            errorInfo : null
        };

    default: return state;
    }
};

// *** VALIDATE DOCTOR ACCREDITATION
const validateDoctorAccreditationRequest = (doctorInfo) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_REQUEST,
    doctorInfo
});

const validateDoctorAccreditationSuccess = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_SUCCESS
});

const validateDoctorAccreditationError = (errorInfo) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_VALIDATE_ACCREDITATION_ERROR,
    errorInfo
});

// *** NEW PHIC CLAIMS DETAILS DOCTOR
const newPhicClaimsDetailsCf2DoctorRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_REQUEST
});

const newPhicClaimsDetailsCf2DoctorSuccess = (doctor) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS,
    doctor
});

const newPhicClaimsDetailsCf2DoctorError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_ERROR
});

export const clearDoctorAccreditationError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_CLEAR_ACCREDITATION_ERROR
});

/**
 * Validate Doctor Accreditation
 * 
 * @export
 * @param {any} value
 * @param {any} closeDialog
 * @returns
 */
export function validateDoctorAccreditation(value, closeDialog, hospitalCode, id) {
    return (dispatch, getState, { clientEclaims }) => {

        // *** check if addmission date and discharge has value
        if(!value.admissionDate || !value.dischargeDate) {
            
            dispatch(Notifications.error({
                ...notificationOpts,
                message: 'Admission Date and Discharge Date is required',
                title: 'Error'
            }));   

        } else {

            dispatch(validateDoctorAccreditationRequest(value));

            clientEclaims.post('api/EClaims/v2/ValidateDoctorAccreditation', 

                constructDoctorAccreditation(value, hospitalCode))
                
                .then(response => {                    
                    // if(response.data) {
                    //     dispatch(validateDoctorAccreditationError());

                    //     dispatch(Notifications.info({
                    //         ...notificationOpts,
                    //         message: 'Doctor is not accredited.',
                    //         title: 'Invalid'
                    //     }));     

                    // } else {
                        // *** Save Doctor if accredited
                    dispatch(validateDoctorAccreditationSuccess());

                    value['Accredited'] = response.data.isAccredited;
                    dispatch(newPhicClaimsDetailsCf2Doctor(value, id, closeDialog));                        
                   // } 
                })
                .catch(error => {
                    dispatch(validateDoctorAccreditationError(error.data));

                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));                 
                });
        }
    };
}

/**
 * New Phic Claims Details Doctor
 * 
 * @export
 * @param {any} value
 * @param {any} value
 * @returns
 */
function newPhicClaimsDetailsCf2Doctor(value, id, closeDialog) {
    return (dispatch, getState, { clientBeacon }) => {
        
        dispatch(newPhicClaimsDetailsCf2DoctorRequest());

        clientBeacon.post('/api/PHICDoctor/NewPHICDoctor', value)
        
            .then(response => {
                closeDialog();
                dispatch(newPhicClaimsDetailsCf2DoctorSuccess(response.data));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'New doctor has been successfully saved',
                    title: 'Success'
                }));                 

                // remove doctor issue
                const issue = {
                    category : 4,
                    claimId : id
                };
                dispatch(deletePhicClaimsIssue(issue));
            })    

            .catch(error => {
                closeDialog();            

                dispatch(newPhicClaimsDetailsCf2DoctorError());
                
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));

             
                 
            });
    };
}

// *** construct Doctor Accreditation Prameters
const constructDoctorAccreditation = (doctorInfo, hospitalCode) => {
    return {
        doctorAccreditationCode : doctorInfo.accreditationNumber,
        admissionDate : doctorInfo.admissionDate,
        dischargeDate : doctorInfo.dischargeDate,
        phicIdentity: {
            hospitalCode: hospitalCode
        }    
    };
};