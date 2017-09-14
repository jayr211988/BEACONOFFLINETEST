
import URLSearchParams from 'url-search-params';
import Notifications from 'react-notification-system-redux';

const USERS_GET_ALL_USERS_REQUEST = 'USERS_GET_ALL_USERS_REQUEST';
const USERS_GET_ALL_USERS_SUCCESS = 'USERS_GET_ALL_USERS_SUCCESS';
const USERS_GET_ALL_USERS_ERROR = 'USERS_GET_ALL_USERS_ERROR';

const USERS_DELETE_USER_REQUEST = 'USERS_DELETE_USER_REQUEST';
const USERS_DELETE_USER_SUCCESS = 'USERS_DELETE_USER_SUCCESS';
const USERS_DELETE_USER_ERROR = 'USERS_DELETE_USER_ERROR';

const USERS_SORT = 'USERS_SORT';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};


export default function reducer (state = {
    getAllUsersPending: false,  
    deleteUserPending  : false,
    users: []
}, action = {}) {

    switch (action.type) {
    case USERS_GET_ALL_USERS_REQUEST :
        return state = {
            ...state,
            getAllUsersPending: true
        };
        
    case USERS_GET_ALL_USERS_SUCCESS :            
        return state = {
            ...state,
            getAllUsersPending: false,
            users: action.payload
        };
        
    case USERS_GET_ALL_USERS_ERROR : 
        return state = {
            ...state,
            getAllUsersPending : false
        };

    case USERS_DELETE_USER_REQUEST : 
        return state = {
            ...state,
            deleteUserPending: true
        };
        
    case USERS_DELETE_USER_SUCCESS :        
        return state = {
            ...state,
            deleteUserPending: false,
            users : state.users.filter(user => user.id != action.userId)
        };        
    case USERS_DELETE_USER_ERROR :         
        return state = {
            ...state,
            deleteUserPending : false,        
        };  
    case USERS_SORT : 
        state = {
            ...state,
            users: state.users.map(t => t).sort((t, u) => {
                if (t.firstname && t.firstname.toLowerCase() > u.firstname && u.firstname.toLowerCase())
                    return 1;
                if (t.firstname && t.firstname.toLowerCase() < u.firstname && u.firstname.toLowerCase())
                    return - 1;
                return 0;
            })
        };
        return state;   
    default: return state;
    }
}

// GET ALL USER
const usersGetAllUsersRequest = () => ({ 
    type: USERS_GET_ALL_USERS_REQUEST 
});
const usersGetAllUsersSuccess = (response) => ({    
    type: USERS_GET_ALL_USERS_SUCCESS,
    payload: response
});
const usersGetAllUsersError = () => ({ 
    type: USERS_GET_ALL_USERS_ERROR 
});

// DELETE USER
const usersDeleteUserRequest = () => ({ 
    type: USERS_DELETE_USER_REQUEST 
});
const usersDeleteUserSuccess = (response) => ({ 
    type: USERS_DELETE_USER_SUCCESS,
    userId: response
});
const usersDeleteUserError = () => ({ 
    type: USERS_DELETE_USER_ERROR 
});

const usersSort = () => ({
    type: USERS_SORT
});


// sort users
export const sortUsers = () => {    
    return usersSort();
};

// Get All Users Function
export const getAllUsers = () => (dispatch, getState, {clientBeacon}) => {        
    dispatch(usersGetAllUsersRequest());
    clientBeacon 
        .get('/api/Account/GetAllUser')
        .then((response) => {      
            
            dispatch(usersGetAllUsersSuccess(response.data));            
        })
        .catch((error) => {
            dispatch(usersGetAllUsersError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};


// Delete Selected User
export const deleteSelectedUser = (userId, close) => (dispatch, getState, {clientBeacon}) => {            
    dispatch(usersDeleteUserRequest());    
    clientBeacon
        .delete(`/api/Account/DeleteSelectedUser?userID=${userId}`)
        .then(() => {
            close();
            dispatch(usersDeleteUserSuccess(userId));
            dispatch(Notifications.success({
                ...notificationOpts, 
                message: 'Success Deleting User',
                title: 'Success'
            }));

        })
        .catch((error) => {
            close();
            dispatch(usersDeleteUserError());
            dispatch(Notifications.error({
                ...notificationOpts, 
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};