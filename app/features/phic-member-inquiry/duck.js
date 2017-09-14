import Notifications from 'react-notification-system-redux';

//member pin
const MEMBER_INQUIRY_GET_MEMBER_PIN_REQUEST = 'MEMBER_INQUIRY_GET_MEMBER_PIN_REQUEST';
const MEMBER_INQUIRY_GET_MEMBER_PIN_SUCCESS = 'MEMBER_INQUIRY_GET_MEMBER_PIN_SUCCESS';
const MEMBER_INQUIRY_GET_MEMBER_PIN_ERROR = 'MEMBER_INQUIRY_GET_MEMBER_PIN_ERROR';

//hospital code
const MEMBER_INQUIRY_GET_HOSPITAL_CODE_REQUEST = 'MEMBER_INQUIRY_GET_HOSPITAL_CODE_REQUEST';
const MEMBER_INQUIRY_GET_HOSPITAL_CODE_SUCCESS = 'MEMBER_INQUIRY_GET_HOSPITAL_CODE_SUCCESS';
const MEMBER_INQUIRY_GET_HOSPITAL_CODE_ERROR = 'MEMBER_INQUIRY_GET_HOSPITAL_CODE_SUCCESS';

const MEMBER_INQUIRY_REMOVE_PATIENT_INFO = 'MEMBER_INQUIRY_REMOVE_PATIENT_INFO';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc'
};


export default (state = {
    patientMemberPinRequest: false,
    patientMemberPin: [],
    patientInfo: null,
    primaryHospitalCode : null,
    memberInquiry: 'Inquiry'

}, action) => {

    switch (action.type) {

    case MEMBER_INQUIRY_GET_MEMBER_PIN_REQUEST : {
        return state = {
            ...state,
            patientMemberPinRequest : true
        };
    }

    case MEMBER_INQUIRY_GET_MEMBER_PIN_SUCCESS : {
        return state = {
            ...state,
            patientMemberPin : action.payload,
            patientInfo : action.patientInfo,
            patientMemberPinRequest : false
        };
    }

    case MEMBER_INQUIRY_GET_MEMBER_PIN_ERROR : {
        return state = {
            ...state,
            patientMemberPinRequest : false
        };
    }

    case MEMBER_INQUIRY_GET_HOSPITAL_CODE_REQUEST : {
        return state = {
            ...state
        };
    }

    case MEMBER_INQUIRY_GET_HOSPITAL_CODE_SUCCESS : {
        return state = {
            ...state,
            primaryHospitalCode : action.payload[0].hospitalCode
        };
    }

    case MEMBER_INQUIRY_REMOVE_PATIENT_INFO : {
        return state = {
            ...state,
            patientInfo : null,
            //memberInquiry : 'Not Inquiry'
        };
    }


    default : return state;
    }
};


// get member PIN
const getMemberPINRequest = () => ({
    type : MEMBER_INQUIRY_GET_MEMBER_PIN_REQUEST

});

const getMemberPINSuccess = (patientMemberPin, patientInfo) => ({
    type: MEMBER_INQUIRY_GET_MEMBER_PIN_SUCCESS,
    payload : patientMemberPin,
    patientInfo : patientInfo
});

const getMemberPINError = () => ({
    type: MEMBER_INQUIRY_GET_MEMBER_PIN_ERROR
});

//hospital code
const getHospitalCodeRequest = () => ({
    type: MEMBER_INQUIRY_GET_HOSPITAL_CODE_REQUEST
});

const getHospitalCodeSuccess = (hospitalCode) => ({
    type: MEMBER_INQUIRY_GET_HOSPITAL_CODE_SUCCESS,
    payload:hospitalCode
});

const getHospitalCodeError = () => ({
    type: MEMBER_INQUIRY_GET_HOSPITAL_CODE_ERROR
});

const onBackChangePatientInfo = () => ({
    type: MEMBER_INQUIRY_REMOVE_PATIENT_INFO
});



export function getMemberPin(patientInformation) {
    return function(dispatch, getState, {clientEclaims}) {
        
        dispatch(getMemberPINRequest());   

        clientEclaims.post('/api/EClaims/v2/ValidateMembership', patientInformation)
            .then(response => {
                dispatch(getMemberPINSuccess(response.data, patientInformation));
               
                !response.data.isMemberValid ? 
                null
                :
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Successful getting the Member PIN',
                    title: 'Success'
                })); 

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

/**
 *  Get List of Hospital Code
 * 
 * @export
 * @param {any} productId
 * @returns
 */
export function getHospitalCode (productId) {
    return (dispatch, getState, {clientBeacon}) => {        
        
        dispatch(getHospitalCodeRequest());
        clientBeacon.get(`/api/Product/GetHospitalCodes?productId=${productId}`)
            .then(response => {
                dispatch(getHospitalCodeSuccess(response.data));
            }) 
            .catch(error => {
                dispatch(getHospitalCodeError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));   
            });  
    };
}

export function onBack () {
   
    return (dispatch) => {
        dispatch(onBackChangePatientInfo());
    };

}