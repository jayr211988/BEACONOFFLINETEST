import Notifications from 'react-notification-system-redux';

const CLIENTS_NEW_REQUEST = 'CLIENTS_NEW_REQUEST';
const CLIENTS_NEW_SUCCESS = 'CLIENTS_NEW_SUCCESS';
const CLIENTS_NEW_ERROR = 'CLIENTS_NEW_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    newClientRequestPending: false,

}, action) => {
    switch (action.type) {
    case CLIENTS_NEW_REQUEST:            
        return state = {
            ...state,
            newClientRequestPending: true
        };

    case CLIENTS_NEW_SUCCESS:
        return state = {
            ...state,
            newClientRequestPending: false
        };

    case CLIENTS_NEW_ERROR:
        return state = {
            ...state,
            newClientRequestPending: false
        };

    default: return state;
    } 
};

/**
 * NEW CLIENT
 * 
 * @export
 * @param {any} clientDto
 * @param {any} resetFields
 * @returns
 */
export function newClient (clientDto, resetFields) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(newClientRequest());

        clientBeacon
            .post('/api/Client/NewClient', clientDto)
            .then(() => {
                resetFields();
                dispatch(newClientSuccess());
                dispatch(Notifications.success({
                    ...notificationOpts,
                    title: 'Success',
                    message: 'Client successfully added.'
                }));
            })
            .catch((error) => {
                dispatch(newClientError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));
            });
    };
}


const newClientRequest = () => ({
    type: CLIENTS_NEW_REQUEST
});

const newClientSuccess = () => ({
    type: CLIENTS_NEW_SUCCESS
});

const newClientError = () => ({
    type: CLIENTS_NEW_ERROR
});

