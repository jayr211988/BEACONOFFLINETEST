import Notifications from 'react-notification-system-redux';

const CLIENTS_EDIT_REQUEST = 'CLIENTS_EDIT_REQUEST';
const CLIENTS_EDIT_SUCCESS = 'CLIENTS_EDIT_SUCCESS';
const CLIENTS_EDIT_ERROR = 'CLIENTS_EDIT_ERROR';

const CLIENTS_SELECTED_REQUEST = 'CLIENTS_SELECTED_REQUEST';
const CLIENTS_SELECTED_SUCCESS = 'CLIENTS_SELECTED_SUCCESS';
const CLIENTS_SELECTED_ERROR = 'CLIENTS_SELECTED_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    editClientsRequestPending: false,
    selectedClientsRequestPending: true,
    selectedClient: null
}, action) => {
    switch (action.type) {

    case CLIENTS_EDIT_REQUEST:
        return state = {
            ...state,
            editClientsRequestPending: true
        };

    case CLIENTS_EDIT_SUCCESS:
        return state = {
            ...state,
            editClientsRequestPending: false,
            selectedClient: action.payload
        };

    case CLIENTS_EDIT_ERROR:
        return state = {
            ...state,
            editClientsRequestPending: false
        };

    case CLIENTS_SELECTED_REQUEST:
        return state = {
            ...state,
            selectedClientsRequestPending: true
        };

    case CLIENTS_SELECTED_SUCCESS:
        return state = {
            ...state,
            selectedClient: action.payload,
            selectedClientsRequestPending: false
        };

    case CLIENTS_SELECTED_ERROR:
        return state = {
            ...state,
            selectedClientsRequestPending: false
        };

    default: return state;
    } 
};

/**
 * EDIT CLIENT 
 * 
 * @export
 * @param {any} clientDto
 * @returns
 */
export function editClient(clientDto) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(clientsEditClientRequest());

        clientBeacon
            .put('/api/Client/EditClient', clientDto)
            .then((res) => {
                dispatch(clientsEditClientSuccess(res.data));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    title: 'Success',
                    message: 'Client successfully edited.'
                }));
            })
            .catch((error) => {
                dispatch(clientsEditClientError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}

/**
 * GET SELECTED CLIENT
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function getSelectedClient (clientId) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(getSelectedClientRequest());

        clientBeacon
            .get(`/api/Client/GetClientById?clientId=${clientId}`)
            .then((res) => {
                dispatch(getSelectedClientSuccess(res.data));
            })
            .catch((error) => {
                dispatch(getSelectedClientError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}

const clientsEditClientRequest = () => ({
    type: CLIENTS_EDIT_REQUEST
});

const clientsEditClientSuccess = (res) => ({
    type: CLIENTS_EDIT_SUCCESS,
    payload: res
});

const clientsEditClientError = () => ({
    type: CLIENTS_EDIT_ERROR
});

const getSelectedClientRequest = () => ({
    type: CLIENTS_SELECTED_REQUEST
});

const getSelectedClientSuccess = (res) => ({
    type: CLIENTS_SELECTED_SUCCESS,
    payload: res
});

const getSelectedClientError = () => ({
    type: CLIENTS_SELECTED_ERROR
});

