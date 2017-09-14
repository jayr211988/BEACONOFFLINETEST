//https://github.com/mzabriskie/axios
//Polyfill for URLSearchParams
import URLSearchParams from 'url-search-params';
import Notifications from 'react-notification-system-redux';

const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    changePasswordPendingRequest: false
}, action) => {
    switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:            
        state = {
            ...state,
            changePasswordPendingRequest: true
        };
        return state;
    case CHANGE_PASSWORD_SUCCESS:
        state = {
            ...state,
            changePasswordPendingRequest: false
        };
        return state;
    case CHANGE_PASSWORD_ERROR:
        state = {
            ...state,
            changePasswordPendingRequest: false
        };
        return state;

    default: return state;
    } 
};

export const changePassword = (password, resetField) => (dispatch, getState, {clientBeacon}) => {
    dispatch(changePasswordRequest());

    clientBeacon
        .put('/api/Account/EditAccountPassword', password)
        .then(() => {
            resetField();
            dispatch(changePasswordSuccess());
            dispatch(Notifications.success({
                ...notificationOpts,
                title: 'Success',
                message: 'Password successfully updated.'
            }));            
        })
        
        .catch((error) => {
            dispatch(changePasswordError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));
        });
};

const changePasswordRequest = () => ({
    type: CHANGE_PASSWORD_REQUEST
});

const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD_SUCCESS
});

const changePasswordError = () => ({
    type: CHANGE_PASSWORD_ERROR
});
