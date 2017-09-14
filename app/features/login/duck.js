//https://github.com/mzabriskie/axios
//Polyfill for URLSearchParams
import URLSearchParams from 'url-search-params';
import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

import { createUserSession } from '../../util/auth';

const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

const notificationGlobal = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const notificationOpts = {    
    title: 'Login Error',
    message: 'Invalid username or password',
    position: 'tc',
    autoDismiss: 5
};

const notificationEmail = {
    title: 'Login Error',
    message: 'Please validate your email first',
    position: 'tc',
    autoDismiss: 5
};

const notificationSuccess = {    
    title: 'Login Success',
    message: 'Welcome User',
    position: 'tc',
    autoDismiss: 5
};

export default function reducer(state = {
    loginError: null,
    loginRequestPending: false

}, action = {}) {
    
    switch (action.type) {
    case LOGIN_USER_REQUEST:            
        return state = {
            ...state,
            loginRequestPending: true
        };       
    case LOGIN_USER_SUCCESS:
        return state = {
            ...state,
            loginRequestPending: false
        };
        

    case LOGIN_USER_ERROR:            
        return state = {
            ...state,
            loginRequestPending: false,
            loginError: action.error
        }; 

    default: return state;
    }
}

export function loginUser(credentials) {    
    return function (dispatch, getState, {clientBeacon}) {
        console.log(clientBeacon);
        console.log(credentials);
        dispatch(loginUserRequest());

        //https://github.com/WebReflection/url-search-params
        // var params = new URLSearchParams();
        // params.append('grant_type', 'password');
        // params.append('username', credentials.username);
        // params.append('password', credentials.password);        
        
        clientBeacon.post('/token', `grant_type=password&username=${credentials.username}&password=${credentials.password}`).then(function (response) {            
            dispatch(loginUserSuccess());            
            createUserSession(
                response.data.access_token, 
                response.data.refresh_token,
                response.data.Id,                
            );             
            // dispatch(Notifications.success(notificationSuccess));
            dispatch(Notifications.success({
                ...notificationOpts,
                message: `Welcome ${response.data.Username}`,
                title: 'Success'
            })); 

            
        }).catch(function (error) {                     
            if (error.data.error === 'Please confirm your email first.') {                
                dispatch(loginUserError(error));
                dispatch(Notifications.error(notificationEmail));
            } else {
                dispatch(loginUserError(error));
                dispatch(Notifications.error(notificationOpts));
            }
        });
    };
}


function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    };
}


function loginUserSuccess() {
    return {
        type: LOGIN_USER_SUCCESS
    };
}

function loginUserError(error) {    
    return { type: LOGIN_USER_ERROR, error };
}