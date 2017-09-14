import Notifications from 'react-notification-system-redux';

const CLIENT_USERS_SELECTED_REQUEST = 'CLIENT_USERS_SELECTED_REQUEST';
const CLIENT_USERS_SELECTED_SUCCESS = 'CLIENT_USERS_SELECTED_SUCCESS';
const CLIENT_USERS_SELECTED_ERROR = 'CLIENT_USERS_SELECTED_ERROR';

const CLIENT_USERS_EDIT_REQUEST = 'CLIENT_USERS_EDIT_REQUEST';
const CLIENT_USERS_EDIT_SUCCESS = 'CLIENT_USERS_EDIT_SUCCESS';
const CLIENT_USERS_EDIT_ERROR = 'CLIENT_USERS_EDIT_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default function reducer(state = {
    selectedClientUsersRequestPending : true,
    editClientUserRequestPending : false,

}, action = {}) {
    switch (action.type) {

    case CLIENT_USERS_SELECTED_REQUEST :
        return state = { 
            ...state,
            selectedClientUsersRequestPending : true
        };

    case CLIENT_USERS_SELECTED_SUCCESS :
        return state = {
            ...state,
            selectedClientUsersRequestPending : false,
            selectedClientUser: action.selectedClientUser
        };

    case CLIENT_USERS_SELECTED_ERROR : 
        return state = {
            ...state,
            selectedClientUsersRequestPending : false
        };

    case CLIENT_USERS_EDIT_REQUEST : 
        return state = {
            ...state,
            editClientUserRequestPending : true
        };

    case CLIENT_USERS_EDIT_SUCCESS : 
        return state = {
            ...state,
            editClientUserRequestPending : false
        };
    
    case CLIENT_USERS_EDIT_ERROR :
        return state = {
            ...state,
            editClientUserRequestPending : false
        };

    default: return state;
    }
}

// *** GET SELECTED CLIENT USERS
const getSelectedClientUsersRequest = () => ({
    type : CLIENT_USERS_SELECTED_REQUEST
});

const getSelectedClientUsersSuccess = ( selectedClientUser ) => ({
    type : CLIENT_USERS_SELECTED_SUCCESS,
    selectedClientUser
});

const getSelectedClientUsersError = () => ({
    type : CLIENT_USERS_SELECTED_ERROR
});

// *** EDIT CLIENT USERS
const editClientUsersRequest = () => ({
    type : CLIENT_USERS_EDIT_REQUEST
});

const editClientUsersSuccess = (  ) => ({
    type : CLIENT_USERS_EDIT_SUCCESS
});

const editClientUsersError = () => ({
    type : CLIENT_USERS_EDIT_ERROR
});

/**
 * GET SELECTED CLIENT USER
 * 
 * @export
 * @param {any} userId
 * @returns
 */
export function getSelectedClientUser ( userId ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(getSelectedClientUsersRequest());

        clientBeacon.get(`/api/Account/GetUserByUserId?userId=${userId}`)

            .then(response => {
                dispatch(getSelectedClientUsersSuccess(response.data)); 
            })
            
            .catch(error => { 
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));

                dispatch(getSelectedClientUsersError());
            });
    };
}

/**
 * EDIT CLIENT USER
 * 
 * @export
 * @returns
 */
export function editClientUser ( user ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(editClientUsersRequest());

        clientBeacon.put('/api/Account/EditUser', user)

            .then(response => {
                dispatch(editClientUsersSuccess(response));
            })

            .catch(error => { 
                dispatch(editClientUsersError()); 

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Something went wrong'
                }));        
            });
    };
}
