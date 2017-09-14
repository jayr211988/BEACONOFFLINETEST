
import Notifications from 'react-notification-system-redux';

const USERS_EDIT_USER_REQUEST = 'USERS_EDIT_USER_REQUEST';
const USERS_EDIT_USER_SUCCESS = 'USERS_EDIT_USER_SUCCESS';
const USERS_EDIT_USER_ERROR = 'USERS_EDIT_USER_ERROR';

const USERS_GET_USER_BY_ID_ERROR =  'USERS_GET_USER_BY_ID_ERROR';
const USERS_GET_USER_BY_ID_SUCCESS = 'USERS_GET_USER_BY_SUCCESS';
const USERS_GET_USER_BY_ID_REQUEST = 'USERS_GET_USER_BY_ID_REQUEST';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};


export default function reducer (state = {
    getSelectedUserByIdPending : true
}, action = {}) {
    switch(action.type) {
    case USERS_EDIT_USER_REQUEST: 
        return state = {
            ...state,
            saveEditUserPending : true
        };
    case USERS_EDIT_USER_SUCCESS : 
        return state = {
            ...state,
            saveEditUserPending : false
        };
    case USERS_EDIT_USER_ERROR : 
        return state = {
            ...state,
            saveEditUserPending : false
        };     
    case USERS_GET_USER_BY_ID_REQUEST: 
        return state = {
            ...state,
            getSelectedUserByIdPending: true
        };
    case USERS_GET_USER_BY_ID_SUCCESS :
        return state = {
            ...state,
            getSelectedUserByIdPending: false,
            selectedUser : action.selectedUser
        };
    case USERS_GET_USER_BY_ID_ERROR :
        return state = {
            ...state,
            getSelectedUserByIdPending: false
        };        
    default: return state;
    }
}

const usersEditUserRequest = () => ({ 
    type: USERS_EDIT_USER_REQUEST 
});
const usersEditUserSuccess = () => ({ 
    type: USERS_EDIT_USER_SUCCESS 
});
const usersEditUserError = () => ({ 
    type: USERS_EDIT_USER_ERROR 
});

const usersGetUserByIdRequest = () => ({
    type: USERS_GET_USER_BY_ID_REQUEST
});
const usersGetUserByIdSuccess = (selectedUser) => ({
    type: USERS_GET_USER_BY_ID_SUCCESS,
    selectedUser
});
const usersGetUserByIdError = () => ({
    type: USERS_GET_USER_BY_ID_ERROR
});



export const editSelectedUser = (user) => (dispatch, getState, {clientBeacon}) => {    
    dispatch(usersEditUserRequest());
    clientBeacon.put('/api/Account/EditUser', user)
        .then(() => {
            dispatch(usersEditUserSuccess());

            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Success',
                title: 'Edit User Successful'
            }));
        })
        .catch(error => { 
            dispatch(usersEditUserError());

            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error on Edit User'
            }));

            return error;
        });
};


// Get Selected User by ID Function
export const getSelectedUserById = (userId) => (dispatch, getState, {clientBeacon}) => {
    dispatch(usersGetUserByIdRequest());
    
    clientBeacon.get(`/api/Account/GetUserByUserId?userId=${userId}`)
        .then(response => {
            dispatch(usersGetUserByIdSuccess(response.data)); 
    
        })            
        .catch(error => { 
            dispatch(usersGetUserByIdError());
            dispatch(Notifications.error({
                ...notificationOpts, 
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};
