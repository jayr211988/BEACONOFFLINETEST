
import URLSearchParams from 'url-search-params';
import Notifications from 'react-notification-system-redux';

const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

const notificationSuccess = {
    title: 'Forgot Password Success',
    message: 'New password has been sent to your email',
    position: 'tc',
    autoDismiss: 5
};

const notificationFailed = {
    title: 'Error Forgot Password',
    message: 'Username Not Recognized',
    position: 'tc',
    autoDismiss: 5
};


export default function reducer(state = {
    forgotPasswordPending: false

}, action = {}) {

    switch (action.type) {
    case FORGOT_PASSWORD_REQUEST :
        state = {
            ...state, 
            forgotPasswordPending : true
        };
        return state;
    case FORGOT_PASSWORD_SUCCESS :
        state = {
            ...state,
            forgotPasswordPending : false
        };
        return state;
    default : return state;
    }    
}


export function forgotPassword(credentials) {
    return function(dispatch, getState, {clientBeacon}) {

        dispatch(forgotPasswordRequest());
        
        var params = new URLSearchParams();
        params.append('username', credentials.username);
        const currentUsername = credentials.username;
        
        
        clientBeacon.get(`/api/Account/ForgotPassword?username=${currentUsername}`).then(function(response) {
            
            dispatch(forgotPasswordSuccess());

            dispatch(Notifications.success(notificationSuccess));

        }).catch(function(error) {
            dispatch(Notifications.error(notificationFailed));
            dispatch(forgotPasswordSuccess());
        });    
    };
}

function forgotPasswordRequest() {
    return {
        type: FORGOT_PASSWORD_REQUEST
    };
}

function forgotPasswordSuccess() {
    return {
        type: FORGOT_PASSWORD_SUCCESS
    };
}