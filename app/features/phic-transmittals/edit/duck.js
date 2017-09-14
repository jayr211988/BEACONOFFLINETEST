import Notifications from 'react-notification-system-redux';

const PHIC_TRANSMITTAL_EDIT_REQUEST = 'PHIC_TRANSMITTAL_EDIT_REQUEST';
const PHIC_TRANSMITTAL_EDIT_SUCCESS = 'PHIC_TRANSMITTAL_EDIT_SUCCESS';
const PHIC_TRANSMITTAL_EDIT_ERROR = 'PHIC_TRANSMITTAL_EDIT_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    phicTransmittal : [],

}, action) => {
    switch (action.type) {

    case PHIC_TRANSMITTAL_EDIT_REQUEST :
        return state = {
            ...state,
            editPhicTransmittalRequestPending: true
        };
    case PHIC_TRANSMITTAL_EDIT_SUCCESS :
        return state = {
            ...state,
            editPhicTransmittalRequestPending: false
        };
    case PHIC_TRANSMITTAL_EDIT_ERROR :
        return state = {
            ...state,
            editPhicTransmittalRequestPending: false
        };

    default: return state;        

    }
};

const editPhicTransmittalRequest = () => ({
    type: PHIC_TRANSMITTAL_EDIT_REQUEST
});

const editPhicTransmittalSuccess = (transmittal) => ({
    type: PHIC_TRANSMITTAL_EDIT_SUCCESS,
    transmittal
});

const editPhicTransmittalError = () => ({
    type: PHIC_TRANSMITTAL_EDIT_ERROR
});

export function editPhicTransmittal(value, closeDialog){
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(editPhicTransmittalRequest());

        clientBeacon.put('/api/PHICTransmittal/EditPHICTransmittal', value)
        .then(function(response){
            closeDialog();
            dispatch(editPhicTransmittalSuccess(response.data));

            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully saved',
                title: 'Success'
            }));
        }).catch(error => {
            dispatch(editPhicTransmittalError());

            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });

    };
}