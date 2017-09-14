//https://github.com/mzabriskie/axios
//Polyfill for URLSearchParams
import URLSearchParams from 'url-search-params';
import Notifications from 'react-notification-system-redux';

const CLIENTS_LIST_REQUEST = 'CLIENTS_LIST_REQUEST';
const CLIENTS_LIST_SUCCESS = 'CLIENTS_LIST_SUCCESS';
const CLIENTS_LIST_ERROR = 'CLIENTS_LIST_ERROR';

const CLIENTS_DELETE_REQUEST = 'CLIENTS_DELETE_REQUEST';
const CLIENTS_DELETE_SUCCESS = 'CLIENTS_DELETE_SUCCESS';
const CLIENTS_DELETE_ERROR = 'CLIENTS_DELETE_ERROR';

const CLIENTS_REFRESH_REQUEST = 'CLIENTS_REFRESH_REQUEST';
const CLIENTS_REFRESH_SUCCESS = 'CLIENTS_REFRESH_SUCCESS';
const CLIENTS_REFRESH_ERROR = 'CLIENTS_REFRESH_ERROR';

const CLIENTS_RESEND_INVITE_REQUEST = 'CLIENTS_RESEND_INVITE_REQUEST';
const CLIENTS_RESEND_INVITE_SUCCESS = 'CLIENTS_RESEND_INVITE_SUCCESS';
const CLIENTS_RESEND_INVITE_ERROR = 'CLIENTS_RESEND_INVITE_ERROR';

const CLIENTS_FILTER_PRODUCT_TYPE_REQUEST = 'CLIENTS_FILTER_PRODUCT_TYPE_REQUEST';
const CLIENTS_FILTER_PRODUCT_TYPE_SUCCESS = 'CLIENTS_FILTER_PRODUCT_TYPE_SUCCESS';
const CLIENTS_FILTER_PRODUCT_TYPE_ERROR = 'CLIENTS_FILTER_PRODUCT_TYPE_ERROR';

const CLIENTS_SORT = 'CLIENTS_SORT';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    clientsListRequestPending: true,
    deleteClientsRequestPending: false,
    refreshClientsListRequestPending: false,
    resendInviteRequestPending: false

}, action) => {
    switch (action.type) {

        case CLIENTS_LIST_REQUEST:
            return state = {
                ...state,
                clientsListRequestPending: true,
                refreshClientsListRequestPending: true
            };

        case CLIENTS_LIST_SUCCESS:
            return state = {
                ...state,
                clientsList: action.clientsList,
                clientsListRequestPending: false,
                refreshClientsListRequestPending: false
            };

        case CLIENTS_FILTER_PRODUCT_TYPE_REQUEST:
            return state = {
                ...state,
                clientsListFilterRequestPending: true
            };
        case CLIENTS_FILTER_PRODUCT_TYPE_SUCCESS:
            return state = {
                ...state,
                clientsList: action.clientsList,
                clientsListFilterRequestPending: false
            };
        case CLIENTS_FILTER_PRODUCT_TYPE_ERROR:
            return state = {
                ...state,
                clientsListFilterRequestPending: false
            };
        case CLIENTS_DELETE_REQUEST:
            return state = {
                ...state,
                deleteClientsRequestPending: true
            };

        case CLIENTS_DELETE_SUCCESS:
            return state = {
                ...state,
                deleteClientsRequestPending: false,
                clientsList: state.clientsList.filter(t => t.id != action.payload)
            };

        case CLIENTS_DELETE_ERROR:
            return state = {
                ...state,
                deleteClientsRequestPending: false
            };

        case CLIENTS_REFRESH_REQUEST:
            return state = {
                ...state,
                refreshClientsListRequestPending: true
            };

        case CLIENTS_REFRESH_SUCCESS:
            return state = {
                ...state,
                refreshClientsListRequestPending: false,
                clientsList: action.clientsList,
            };

        case CLIENTS_REFRESH_ERROR:
            return state = {
                ...state,
                refreshClientsListRequestPending: false
            };

        case CLIENTS_SORT:
            return state = {
                ...state,
                clientsList: state.clientsList.map(t => t).sort((t, u) => {
                    if (t.name && t.name.toLowerCase() > u.name && u.name.toLowerCase())
                        return 1;
                    if (t.name && t.name.toLowerCase() < u.name && u.name.toLowerCase())
                        return - 1;
                    return 0;
                })
            };

        case CLIENTS_RESEND_INVITE_REQUEST:
            return state = {
                ...state,
                resendInviteRequestPending: true
            };
        case CLIENTS_RESEND_INVITE_SUCCESS:
            return state = {
                ...state,
                resendInviteRequestPending: false
            };
        case CLIENTS_RESEND_INVITE_ERROR:
            return state = {
                ...state,
                resendInviteRequestPending: false

            };
        default: return state;
    }
};

/**
 * GET CLIENTS
 * 
 * @export
 * @returns
 */
export function getClientsList() {
    return (dispatch, getState, { clientBeacon }) => {
        dispatch(getClientsListRequest());

        clientBeacon
            .get('/api/Client/GetClients')
            .then((res) => {
                dispatch(getClientsListSuccess(res.data));
            })
            .catch((error) => {
                dispatch(getClientsListError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}

/**
 *  Get Clients based on product Type
 *  TODO CHRIS
 * @export
 * @param {any} productType
 * @returns
 */
export function getClientByProductType(productType) {
    return (dispatch, getState, { clientBeacon }) => {
        if (productType.length > 0 && productType.some(prod => prod != 0)) {
            let stringType = '';
            productType.map((x, y) => {
                stringType = stringType + `${'productType'}=${x}`;
                if (y + 1 < productType.length) {
                    stringType = stringType + '&';
                }
            });

            dispatch(getClientsByProductTypeRequest());
            clientBeacon
                .get(`/api/Client/GetClientsByProductType?${stringType}`)
                .then(response => {
                    dispatch(getClientsByProductTypeSuccess(response.data));
                })
                .catch(error => {
                    dispatch(getClientsByProductTypeError());
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));
                });
        } else if (productType.length == 0 || productType.some(prod => prod == 0)) {

            dispatch(getClientsListRequest());
            clientBeacon
                .get('/api/Client/GetClients')
                .then((res) => {
                    dispatch(getClientsListSuccess(res.data));
                })
                .catch((error) => {
                    dispatch(getClientsListError());
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        title: 'Error',
                        message: error.data.exceptionMessage
                    }));
                });
        }
    };
}



/**
 * DELETE CLIENT
 * 
 * @export
 * @param {any} clientId
 * @param {any} onCloseDialog
 * @returns
 */
export function deleteClient(clientId, closeBasicDialog) {
    return (dispatch, getState, { clientBeacon }) => {
        dispatch(clientsDeleteClientRequest());

        clientBeacon
            .delete(`/api/Client/DeleteClient?clientId=${clientId}`)
            .then(() => {
                closeBasicDialog();
                dispatch(clientsDeleteClientSuccess(clientId));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    title: 'Success',
                    message: 'Client successfully removed.'
                }));
            })
            .catch((error) => {
                closeBasicDialog();
                dispatch(clientsDeleteClientError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}

/**
 * REFRESH CLIENTS LIST
 * 
 * @export
 * @returns
 */
export function refreshClientsList() {
    return (dispatch, getState, { clientBeacon }) => {
        dispatch(getClientsListRequest());
        clientBeacon
            .get('/api/Client/GetClients')
            .then((res) => {
                dispatch(getClientsListSuccess(res.data));
            })
            .catch((error) => {
                dispatch(getClientsListError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}


/**
 *  RESEND INVITE OF FACILITY OWNER
 * 
 * @export
 * @returns
 */
export function resendInvite(id) {
    return (dispatch, getStatet, { clientBeacon }) => {

        dispatch(resendInviteRequest());
        clientBeacon
            .get(`/api/Client/ResendInvite?clientId=${id}`)
            .then(() => {
                dispatch(resendInviteSuccess());
                dispatch(Notifications.success({
                    ...notificationOpts,
                    title: 'Success',
                    message: 'Resend Invite Successfull'
                }));
            })
            .catch((error) => {
                dispatch(resendInviteError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}

export const sortClients = () => {
    return clientsSort();
};


const resendInviteRequest = () => ({
    type: CLIENTS_RESEND_INVITE_REQUEST
});
const resendInviteSuccess = () => ({
    type: CLIENTS_RESEND_INVITE_SUCCESS
});
const resendInviteError = () => ({
    type: CLIENTS_RESEND_INVITE_ERROR
});

const getClientsListRequest = () => ({
    type: CLIENTS_LIST_REQUEST
});

const getClientsListSuccess = (clientsList) => ({
    type: CLIENTS_LIST_SUCCESS,
    clientsList
});

const getClientsListError = () => ({
    type: CLIENTS_LIST_ERROR
});

const clientsDeleteClientRequest = () => ({
    type: CLIENTS_DELETE_REQUEST
});

const clientsDeleteClientSuccess = (clientId) => ({
    type: CLIENTS_DELETE_SUCCESS,
    payload: clientId
});

const clientsDeleteClientError = () => ({
    type: CLIENTS_DELETE_ERROR
});

const refreshClientsListRequest = () => ({
    type: CLIENTS_REFRESH_REQUEST
});

const refreshClientsListSuccess = (clientsList) => ({
    type: CLIENTS_REFRESH_SUCCESS,
    clientsList
});

const refreshClientsListError = () => ({
    type: CLIENTS_REFRESH_ERROR
});

const clientsSort = () => ({
    type: CLIENTS_SORT
});


const getClientsByProductTypeRequest = () => ({
    type: CLIENTS_FILTER_PRODUCT_TYPE_REQUEST
});

const getClientsByProductTypeSuccess = (clientsList) => ({
    type: CLIENTS_FILTER_PRODUCT_TYPE_SUCCESS,
    clientsList
});

const getClientsByProductTypeError = () => ({
    type: CLIENTS_FILTER_PRODUCT_TYPE_ERROR,
});