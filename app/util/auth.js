import axios from 'axios'
import {browserHistory} from 'react-router'

function setAuthorizationHeader (token) {
    if (token) {
        axios.defaults.headers.common[`Authorization`] = `Bearer ${token}`;  
    } else {
        delete axios.defaults.headers.common[`Authorization`];
    }
}



/**
 * Create A New User Session
 * 
 * @export
 * @param {any} token
 * @param {any} refreshToken
 * @param {any} currentUserId
 */
export function createUserSession(token, refreshToken,currentUserId) {    
    // localStorage.setItem('token', token);
    // localStorage.setItem('refreshToken', refreshToken);     
    // localStorage.setItem('currentUserId',currentUserId);
    // setAuthorizationHeader(token);
    browserHistory.replace('/');
}

/**
 * Refresh the User Session
 * 
 * @export
 * @param {any} token
 * @param {any} refreshToken
 */
export function refreshUserSession(token, refreshToken) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);    
    setAuthorizationHeader(token);
}

/**
 * Logout the User Session
 * 
 * @export
 */
export function logoutUserSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUserId');
    setAuthorizationHeader(false);
    browserHistory.replace('/');
}


export function unauthorizedResourceAccessedByUser() {
    browserHistory.replace('/unauthorized');
}


/**
 * Check if a User has Session
 * 
 * @export
 */
export default function checkIfUserHasSession() {    
    // const token = localStorage.getItem('token');
    // if (token) {
    //     setAuthorizationHeader(token);
    //     browserHistory.replace(window.location.pathname);
    // }
    // else {
    //     setAuthorizationHeader(false);
    //     browserHistory.replace('/');
    // }
    browserHistory.replace('/');
}
