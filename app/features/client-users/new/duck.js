import Notifications from 'react-notification-system-redux';

const CLIENT_USERS_NEW_REQUEST = 'CLIENT_USERS_NEW_REQUEST';
const CLIENT_USERS_NEW_SUCCESS = 'CLIENT_USERS_NEW_SUCCESS';
const CLIENT_USERS_NEW_ERROR = 'CLIENT_USERS_NEW_ERROR';

const CLIENT_USER_IS_EXIST_REQUEST = 'CLIENT_USER_IS_EXIST_REQUEST';
const CLIENT_USER_IS_EXIST_SUCCESS = 'CLIENT_USER_IS_EXIST_SUCCESS';
const CLIENT_USER_IS_EXIST_ERROR = 'CLIENT_USER_IS_EXIST_ERROR';

const CLIENT_USER_IS_EXIST_RESET = 'CLIENT_USER_IS_EXIST_RESET';


const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default function reducer(state = {
    newClientUsersRequestPending : false,
    existingClientuserRequestPending : false,
    existingClientUserName : 0
}, action = {}) {
    switch (action.type) {

    case CLIENT_USERS_NEW_REQUEST : 
        return state = {
            ...state,
            newClientUsersRequestPending : true
        };


    case CLIENT_USERS_NEW_SUCCESS : 
        return state = {
            ...state,
            newClientUsersRequestPending : false
        };
    

    case CLIENT_USERS_NEW_ERROR : 
        return state ={
            ...state,
            newClientUsersRequestPending : false
        };

    case CLIENT_USER_IS_EXIST_REQUEST :
        return state = {
            ...state,
            existingClientuserRequestPending : true             
        };
    case CLIENT_USER_IS_EXIST_SUCCESS :                
        return state = {
            ...state,
            existingClientuserRequestPending : false,     
            existingClientUserName : action.username        
        };
    case CLIENT_USER_IS_EXIST_ERROR :
        return state = {
            ...state,
            existingClientuserRequestPending : false             
        };
    case CLIENT_USER_IS_EXIST_RESET : 
        return state = {
            ...state,
            existingClientuserRequestPending : false,
            existingClientUserName : 0  
        };
    default: return state;
    }
}

// *** NEW CLIENT USERS
const newClientUsersRequest = () => ({
    type : CLIENT_USERS_NEW_REQUEST
});

const newClientUsersSuccess = () => ({
    type : CLIENT_USERS_NEW_SUCCESS
});

const newClientUsersError = () => ({
    type : CLIENT_USERS_NEW_ERROR
});


// ** EXISTING CLIENT SEARCH BY CHECK
const checkIfEmailisExistRequet =() => ({
    type: CLIENT_USER_IS_EXIST_REQUEST
});
const checkIfEmailisExistSuccess = (username) => ({
    type: CLIENT_USER_IS_EXIST_SUCCESS,
    username
});
const checkIfEmailIsExistError = () => ({
    type: CLIENT_USER_IS_EXIST_ERROR
});
const clearCheckEmailIfExistPendingRequest = () => ({
    type: CLIENT_USER_IS_EXIST_RESET

});


/**
 * NEW CLIENT USER
 * 
 * @export
 * @param {any} user
 * @returns
 */
export const newClientUser = (user, clientId, resetFields) => (dispatch, getState, {clientBeacon}) => { 
    dispatch(newClientUsersRequest());

    const clientUserDto = {
        ...user,
        clientId : clientId
    };

    clientBeacon.post('/api/Account/NewClientUser', clientUserDto)        
        .then(() => {
            resetFields();
            dispatch(newClientUsersSuccess());
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'New user added',
                title: 'Success'
            }));
        })
        .catch(error => {
            dispatch(newClientUsersError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const checkIfEmailExist = (email, callback) => (dispatch, getState, {clientBeacon}) => {
    dispatch(checkIfEmailisExistRequet());
    clientBeacon.get(`/api/Account/CheckIfEmailExist?email=${email}`) 
        .then((response) => {                           
            if (response.data){
                dispatch(checkIfEmailisExistSuccess(response.data.userName));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Existing Email Found, Username added',
                    title: 'Success'
                }));
                callback(response.data.userName);
            } else {
                dispatch(clearCheckEmailIfExistPendingRequest());                
                callback(null);
            }
        })
        .catch(error => {            
            dispatch(checkIfEmailIsExistError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));            
        });    
};
