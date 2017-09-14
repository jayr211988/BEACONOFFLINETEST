import Notifications from 'react-notification-system-redux';

const CLIENT_USERS_LIST_REQUEST = 'CLIENT_USERS_LIST_REQUEST';
const CLIENT_USERS_LIST_SUCCESS = 'CLIENT_USERS_LIST_SUCCESS';
const CLIENT_USERS_LIST_ERROR = 'CLIENT_USERS_LIST_ERROR';

const CLIENT_USERS_DELETE_REQUEST = 'CLIENT_USERS_DELETE_REQUEST';
const CLIENT_USERS_DELETE_SUCCESS = 'CLIENT_USERS_DELETE_SUCCESS';
const CLIENT_USERS_DELETE_ERROR = 'CLIENT_USERS_DELETE_';

const CLIENT_USERS_REFRESH_REQUEST = 'CLIENT_USERS_REFRESH_REQUEST';
const CLIENT_USERS_REFRESH_SUCCESS = 'CLIENT_USERS_REFRESH_SUCCESS';
const CLIENT_USERS_REFRESH_ERROR = 'CLIENT_USERS_REFRESH_ERROR';
const CLIENT_USERS_SORT = 'CLIENT_USERS_SORT';

const CLIENT_USERS_GRANT_ADMIN_ACCESS_REQUEST = 'CLIENT_USERS_GRANT_ADMIN_ACCESS_REQUEST';
const CLIENT_USERS_GRANT_ADMIN_ACCESS_SUCCESS = 'CLIENT_USERS_GRANT_ADMIN_ACCESS_SUCCESS';
const CLIENT_USERS_GRANT_ADMIN_ACCESS_ERROR = 'CLIENT_USERS_GRANT_ADMIN_ACCESS_ERROR';

const CLIENT_USERS_REVOKE_ADMIN_ACCESS_REQUEST = 'CLIENT_USERS_REVOKE_ADMIN_ACCESS_REQUEST';
const CLIENT_USERS_REVOKE_ADMIN_ACCESS_SUCCESS = 'CLIENT_USERS_REVOKE_ADMIN_ACCESS_SUCCESS';
const CLIENT_USERS_REVOKE_ADMIN_ACCESS_ERROR = 'CLIENT_USERS_REVOKE_ADMIN_ACCESS_ERROR';

const CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS = 'CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS';

const CLIENT_USERS_RESEND_EMAIL_INVITATION_REQUEST = 'CLIENT_USERS_RESEND_EMAIL_INVITATION_REQUEST';
const CLIENT_USERS_RESEND_EMAIL_INVITATION_SUCCESS = 'CLIENT_USERS_RESEND_EMAIL_INVITATION_SUCCESS';
const CLIENT_USERS_RESEND_EMAIL_INVITATION_ERROR = 'CLIENT_USERS_RESEND_EMAIL_INVITATION_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default function reducer(state = {
    clientUsersListRequestPending : true,
    basicDialogRequestPending : false,
    refreshClientUsersListRequestPending : false,
    clientUsersList: [],

}, action = {}) {
    switch (action.type) {

    case CLIENT_USERS_LIST_REQUEST : 
        return state = {
            ...state, 
            clientUsersListRequestPending : true
        };

    case CLIENT_USERS_LIST_SUCCESS :
        return state = {
            ...state, 
            clientUsersListRequestPending : false,
            clientUsersList : action.clientUsersList
        };

    case CLIENT_USERS_LIST_ERROR : 
        return state = {
            ...state,
            clientUsersListRequestPending : false,
        };

    case CLIENT_USERS_DELETE_REQUEST :
        return state = {
            ...state,
            basicDialogRequestPending : true
        };
    
    case CLIENT_USERS_DELETE_SUCCESS : 
        return state = {
            ...state,
            basicDialogRequestPending : false,
            clientUsersList : state.clientUsersList.filter(user => user.id != action.userId)
        };

    case CLIENT_USERS_DELETE_ERROR :
        return state = {
            ...state,
            basicDialogRequestPending : false
        };

    case CLIENT_USERS_REFRESH_REQUEST : 
        return state = {
            ...state,
            refreshClientUsersListRequestPending : true
        };

    case CLIENT_USERS_REFRESH_SUCCESS : 
        return state = {
            clientUsersList : action.clientUsersList,
            refreshClientUsersListRequestPending : false
        };

    case CLIENT_USERS_REFRESH_ERROR :
        return state = {
            refreshClientUsersListRequestPending : false
        };

    case CLIENT_USERS_SORT : 
        return state = {
            ...state,
            clientUsersList: state.clientUsersList.map(t => t).sort((t, u) => {
                if (t.firstname && t.firstname.toLowerCase() > u.firstname && u.firstname.toLowerCase())
                    return 1;
                if (t.firstname && t.firstname.toLowerCase() < u.firstname && u.firstname.toLowerCase())
                    return - 1;
                return 0;
            })
        };

    case CLIENT_USERS_GRANT_ADMIN_ACCESS_REQUEST :
        return state = {
            ...state,
            basicDialogRequestPending : true
        };

    case CLIENT_USERS_GRANT_ADMIN_ACCESS_SUCCESS :
        return state = {
            ...state,
            basicDialogRequestPending : false,
            clientUsersList : state.clientUsersList.map(t => t.id == action.clientUser.id ? action.clientUser : t)
        };

    case CLIENT_USERS_GRANT_ADMIN_ACCESS_ERROR :
        return state = {
            ...state,
            basicDialogRequestPending : false
        };

    case CLIENT_USERS_REVOKE_ADMIN_ACCESS_REQUEST :
        return state = {
            ...state,
            basicDialogRequestPending : true,
        };

    case CLIENT_USERS_REVOKE_ADMIN_ACCESS_SUCCESS :
        return state = {
            ...state,
            basicDialogRequestPending : false,
            clientUsersList : state.clientUsersList.map(t => t.id == action.clientUser.id ? action.clientUser : t)
        };

    case CLIENT_USERS_REVOKE_ADMIN_ACCESS_ERROR :
        return state = {
            ...state,
            basicDialogRequestPending : false
        };

    case CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS:
        return state = {
            ...state,
            clientUsersList: state.clientUsersList.map(t => {
                if (t.id != action.payload.id) return t;

                t.roles = action.payload.roles;
                return t;
            })
        };

    default: return state;
    }
}


const usersSort = () => ({
    type: CLIENT_USERS_SORT
});
// sort users
export const sortUsers = () => {    
    return usersSort();
};


// *** GET CLIENT USERS
const getClientUsersListRequest = () => ({
    type : CLIENT_USERS_LIST_REQUEST
});

const getClientUsersListSuccess = ( clientUsersList ) => ({
    type : CLIENT_USERS_LIST_SUCCESS, 
    clientUsersList
});

const getClientUsersListError = () => ({
    type : CLIENT_USERS_LIST_ERROR
});

// *** DELETE CLIENT USERS
const deleteClientUsersRequest = () => ({
    type : CLIENT_USERS_DELETE_REQUEST
});

const deleteClientUsersSuccess = (userId) => ({
    type : CLIENT_USERS_DELETE_SUCCESS,
    userId
});

const deleteClientUsersError = () => ({
    type : CLIENT_USERS_DELETE_ERROR
});

// *** REFRESH CLIENT USERS
const refreshClientUsersRequest = () => ({
    type : CLIENT_USERS_REFRESH_REQUEST
});

const refreshClientUsersSuccess = ( clientUsersList ) => ({
    type : CLIENT_USERS_REFRESH_SUCCESS,
    clientUsersList
});

const refreshClientUsersError = () => ({
    type : CLIENT_USERS_REFRESH_ERROR
});

// *** GRANT ADMIN ACCESS
const grantAdminAccessRequest = () => ({
    type : CLIENT_USERS_GRANT_ADMIN_ACCESS_REQUEST
});

const grantAdminAccessSuccess = ( clientUser ) => ({
    type : CLIENT_USERS_GRANT_ADMIN_ACCESS_SUCCESS,
    clientUser
});

const grantAdminAccessError = () => ({
    type : CLIENT_USERS_GRANT_ADMIN_ACCESS_ERROR
});

// *** REVOKE ADMIN ACCESS 
const revokeAdminAccessRequest = () => ({
    type : CLIENT_USERS_REVOKE_ADMIN_ACCESS_REQUEST,
    
});

const revokeAdminAccessSuccess = ( clientUser ) => ({
    type : CLIENT_USERS_REVOKE_ADMIN_ACCESS_SUCCESS,
    clientUser
});

const revokeAdminAccessError = () => ({
    type : CLIENT_USERS_REVOKE_ADMIN_ACCESS_ERROR
});

const resendEmailInvitationRequest = () => ({
    type: CLIENT_USERS_RESEND_EMAIL_INVITATION_REQUEST
});

const resendEmailInvitationSuccess = () => ({
    type : CLIENT_USERS_RESEND_EMAIL_INVITATION_SUCCESS

});

const resendEmailInvitationError = () => ({
    type : CLIENT_USERS_RESEND_EMAIL_INVITATION_ERROR
});

/**
 * GET ALL USERS PER CLIENT
 * 
 * @export
 * @returns
 */
export function getClientUsersList (clientId) {

    return (dispatch, getState, {clientBeacon}) => {
        dispatch(getClientUsersListRequest());

        clientBeacon.get(`/api/Account/GetAllClientUserByClientId?clientId=${clientId}`)

            .then(response => { 
                dispatch(getClientUsersListSuccess(response.data));   
            })

            .catch(error => { 
                dispatch(getClientUsersListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });    
    };
}

/**
 * DELETE CLIENT USER
 * 
 * @export
 * @param {any} userId
 * @param {any} closeClientUsersDialogDelete
 * @returns
 */
export function deleteClientUser ( userId, closeBasicDialog ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(deleteClientUsersRequest());

        clientBeacon.delete(`/api/Account/DeleteClientUser?userId=${userId}`)

            .then(() => {
                closeBasicDialog();
                dispatch(deleteClientUsersSuccess(userId));
            })

            .catch(error => { 
                closeBasicDialog();
                dispatch(deleteClientUsersError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Something went wrong'
                }));
            });
    };
}

/**
 * REFRESH CLIENT USERS LIST
 * 
 * @export
 * @returns
 */
export function refreshClientUsersList (clientId) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(refreshClientUsersRequest());

        clientBeacon.get(`/api/Account/GetAllClientUserByClientId?clientId=${clientId}`)

            .then(response => { 
                dispatch(refreshClientUsersSuccess(response.data));
            })

            .catch(error => { 
                dispatch(refreshClientUsersError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });            
    };
}

/**
 * GRANT ADMIN ACCESS
 * 
 * @export
 * @param {any} userId
 * @param {any} clientId
 * @param {any} closeBasicDialog
 * @returns
 * 
 */
export function grantAdminAccess (userId, clientId, closeBasicDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(grantAdminAccessRequest());

        clientBeacon.put(`/api/Account/EditAdminAccess?userId=${userId}&clientId=${clientId}&isAddToRole=${true}`)

            .then(response => {
                closeBasicDialog();
                dispatch(grantAdminAccessSuccess(response.data));
            })

            .catch(error => {
                closeBasicDialog();
                dispatch(grantAdminAccessError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                
            });
    };
}

/**
 * REVOKE ADMIN ACCESS
 * 
 * @export
 * @param {any} userId
 * @param {any} clientId
 * @param {any} closeBasicDialog
 * @returns
 * 
 */
export function revokeAdminAccess (userId, clientId, closeBasicDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(revokeAdminAccessRequest());

        clientBeacon.put(`/api/Account/EditAdminAccess?userId=${userId}&clientId=${clientId}&isAddToRole=${false}`)

            .then(response => {
                closeBasicDialog();
                dispatch(revokeAdminAccessSuccess(response.data));
            })

            .catch(error => {
                closeBasicDialog();
                dispatch(revokeAdminAccessError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                     
            });
    };
}

export function resendInvitationEmail (user) {
    return (dispatch, getState, { clientBeacon}) => {
        dispatch(resendEmailInvitationRequest());

        clientBeacon.post('/api/Account/ResendEmailInvitation', user)
        .then(response => {
            dispatch(resendEmailInvitationSuccess(response.data));
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Client access key successfully changed.',
                title: 'Success'
            })); 
        })
        .catch(error => {
            dispatch(resendEmailInvitationError());

            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
    };
}