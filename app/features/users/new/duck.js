

import URLSearchParams from 'url-search-params';
import Notifications from 'react-notification-system-redux';

const USERS_NEW_USER_REQUEST = 'USERS_NEW_USER_REQUEST';
const USERS_NEW_USER_SUCCESS = 'USERS_NEW_USER_SUCCESS';
const USERS_NEW_USER_ERROR = 'USERS_NEW_USER_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

 
export default function reducer (state = {    
    newUserRequestPending : false,

}, action = {}) {
    switch (action.type) {
    case USERS_NEW_USER_REQUEST:
        return state = {
            ...state,
            newUserRequestPending : true
        };        
    case USERS_NEW_USER_SUCCESS :
        return state = {
            ...state,            
            newUserRequestPending : false
        };        
    case USERS_NEW_USER_ERROR :
        return state = {
            ...state,
            newUserRequestPending : false
        };
    default: return state;
    }
}


const usersNewUserRequest = () => ({ 
    type : USERS_NEW_USER_REQUEST 
});
const usersNewUserSuccess = (response) => ({
    type: USERS_NEW_USER_SUCCESS,
    payload: response
});
const usersNewUserError = () => ({ 
    type: USERS_NEW_USER_ERROR 
});



/// Save User Function
export const saveUser = (userDto, resetFields) => (dispatch, getState, {clientBeacon}) => {    
    dispatch(usersNewUserRequest());        

    clientBeacon 
        .post('/api/Account/NewUser', userDto)
        .then(()=> {
            
            resetFields();
            dispatch(Notifications.success({
                ...notificationOpts,
                title: 'Success',
                message: 'New User Added'
            }));

            dispatch(usersNewUserSuccess());
        
        })
        .catch(function(error) {                        
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error Adding New User'
            }));
            dispatch(usersNewUserError());
        });        
};
