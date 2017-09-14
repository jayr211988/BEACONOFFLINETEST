import Notifications from 'react-notification-system-redux';

const PHIC_CLAIMS_DETAILS_XLSO_EDIT_REQUEST = 'PHIC_CLAIMS_DETAILS_XLSO_EDIT_REQUEST';
const PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS';
const PHIC_CLAIMS_DETAILS_XLSO_EDIT_ERROR = 'PHIC_CLAIMS_DETAILS_XLSO_EDIT_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc'
};

export default (state = {
    phicXlso : []
}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_XLSO_EDIT_REQUEST : 
        return state = { 
            ...state,
            editPhicXlsoRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS :
        return state = {
            ...state,
            editPhicXlsoRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_XLSO_EDIT_ERROR :
        return state = {
            ...state,
            editPhicXlsoRequestPending : false
        };        

    default: return state;

    }
};

const editPhicXlsoRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_XLSO_EDIT_REQUEST
});

const editPhicXlsoSuccess = (xlso) => ({
    type: PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS,
    xlso
});

const editPhicXlsoError = () => ({
    type: PHIC_CLAIMS_DETAILS_XLSO_EDIT_ERROR
});

export function editPhicXlso(value, closeDialog){
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(editPhicXlsoRequest());

        clientBeacon.put('/api/PHICChargesXLSOController/EditPHICChargesXLSO', value)
        .then(function(response){
            closeDialog();
            dispatch(editPhicXlsoSuccess(response.data));

            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully saved',
                title: 'Success'
            }));
        })
        .catch(error => {
            dispatch(editPhicXlsoError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
    };
}