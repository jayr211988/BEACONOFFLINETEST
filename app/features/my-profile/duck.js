
import Notifications from 'react-notification-system-redux';


const MYPROFILE_EDIT_USER_REQUEST = 'MYPROFILE_EDIT_USER_REQUEST';
const MYPROFILE_EDIT_USER_SUCCESS = 'MYPROFILE_EDIT_USER_SUCCESS';
const MYPROFILE_EDIT_USER_ERROR = 'MYPROFILE_EDIT_USER_ERROR';

const MYPROFILE_GET_USER_BY_ID_ERROR =  'MYPROFILE_GET_USER_BY_ID_ERROR';
const MYPROFILE_GET_USER_BY_ID_SUCCESS = 'MYPROFILE_GET_USER_BY_ID_SUCCESS';
const MYPROFILE_GET_USER_BY_ID_REQUEST = 'MYPROFILE_GET_USER_BY_ID_REQUEST';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

//test
export default function reducer (state = {
    getSelectedUserByIdPending : true
}, action = {}) {
    switch(action.type) {

    case MYPROFILE_EDIT_USER_REQUEST: 
        return state = {
            ...state,
            saveEditUserPending : true
        };
    case MYPROFILE_EDIT_USER_SUCCESS :         
        return state = {
            ...state,
            saveEditUserPending : false,
            currentUser : action.user
        };
    case MYPROFILE_EDIT_USER_ERROR : 
        return state = {
            ...state,
            saveEditUserPending : false
        };   

    case MYPROFILE_GET_USER_BY_ID_REQUEST: 
        return state = {
            ...state,
            getSelectedUserByIdPending: true
        };
    case MYPROFILE_GET_USER_BY_ID_SUCCESS :


        return state = {
            ...state,
            getSelectedUserByIdPending: false,
            currentUser : action.currentUser
        };
    case MYPROFILE_GET_USER_BY_ID_ERROR :
        return state = {
            ...state,
            getSelectedUserByIdPending: false
        };        
    default: return state;
    }
}

const usersEditUserRequest = () => ({ 
    type: MYPROFILE_EDIT_USER_REQUEST 
});
const usersEditUserSuccess = (user) => ({ 
    type: MYPROFILE_EDIT_USER_SUCCESS,
    user
});
const usersEditUserError = () => ({ 
    type: MYPROFILE_EDIT_USER_ERROR 
});

const usersGetUserByIdRequest = () => ({
    type: MYPROFILE_GET_USER_BY_ID_REQUEST
});
const usersGetUserByIdSuccess = (currentUser) => ({
    type: MYPROFILE_GET_USER_BY_ID_SUCCESS,
    currentUser
});
const usersGetUserByIdError = () => ({
    type: MYPROFILE_GET_USER_BY_ID_ERROR
});


export const editSelectedUser = (user) => (dispatch, getState, {clientBeacon}) => {    
    dispatch(usersEditUserRequest());
    clientBeacon.put('/api/Account/EditUser', user)
        .then(response => {
            dispatch(usersEditUserSuccess(response.data));

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





