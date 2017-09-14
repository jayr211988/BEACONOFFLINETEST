import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const VALIDATE_USER_ACCESS_REQUEST = 'VALIDATE_USER_ACCESS_REQUEST';
const VALIDATE_USER_ACCESS_SUCCESS = 'VALIDATE_USER_ACCESS_SUCCESS';
const VALIDATE_USER_ACCESS_ERROR = 'VALIDATE_USER_ACCESS_ERROR';

const VALIDATE_USER_ALREADY_VALIDATED = 'VALIDATE_USER_ALREADY_VALIDATED';

export default (state = {
    validateUserAccessRequestPending: false,
    validateUserForFirstTime: false,
    validateUserAlreadyValidated : false,
    userInfo: {},
    showError: false

}, action) => {

    switch (action.type) {
    case VALIDATE_USER_ACCESS_REQUEST : 
        return state = {
            ...state,
            validateUserAccessRequestPending : true,
            validateUserAlreadyValidated: false,
        };
    case VALIDATE_USER_ACCESS_SUCCESS : 
        return state = {
            ...state,
            validateUserAccessRequestPending : false,
            validateUserAlreadyValidated: false,
            validateUserForFirstTime : true,
            userInfo : action.userInfo,
            showError: false
        };
    case VALIDATE_USER_ACCESS_ERROR : 
        return state = {
            ...state,
            validateUserAccessRequestPending : false,
            validateUserAlreadyValidated: false,
            showError: true
        }; 
    case VALIDATE_USER_ALREADY_VALIDATED : 
        return state = {
            ...state,
            validateUserAccessRequestPending : false,
            validateUserAlreadyValidated: true,
            validateUserForFirstTime : false,            
            showError: false
        };   
    default : return state;
    }
};

const validateUserAccessRequest = () => ({
    type: VALIDATE_USER_ACCESS_REQUEST
});

const validateUserAccessSuccess = (userInfo) => ({
    type: VALIDATE_USER_ACCESS_SUCCESS,
    userInfo
});
const validateUserAccessError = () => ({
    type: VALIDATE_USER_ACCESS_ERROR
});
const validateUserCheckIfValidate = () => ({
    type: VALIDATE_USER_ALREADY_VALIDATED,    
});

export function validateUserAccess(id, token) {    
    return function (dispatch, getState, {clientBeacon}) {
        dispatch (validateUserAccessRequest());
        
        clientBeacon.put(`/api/Account/EmailConfirmation?id=${id}&token=${token}`)
            .then((response) => {                                                         
                setTimeout( dispatch(validateUserAccessSuccess(response.data)), 2000);                
            })
            .catch(error => {
                                
                // validate if throw is Email
                let checkIfEmail =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (checkIfEmail.test(error.data.exceptionMessage)) {
                    dispatch(validateUserCheckIfValidate());
                } else {
                    dispatch (validateUserAccessError());
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));

                }

            });
    };
}