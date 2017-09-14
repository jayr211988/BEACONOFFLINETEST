import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc'
};

export default (state = {
    newPHICXLSORequestPending: false
}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_XLSO_NEW_REQUEST:
        return {
            ...state,
            newPHICXLSORequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS:
        return {
            ...state,
            newPHICXLSORequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_XLSO_NEW_ERROR: 
        return {
            ...state,
            newPHICXLSORequestPending: false
        };
    }

    return state;
};

const newPHICXLSORequest = () => ({
    type: PHIC_CLAIMS_DETAILS_XLSO_NEW_REQUEST
});

const newPHICXLSOSuccess = (xrayLabSuppliesAndOthers) => ({
    type: PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS,
    payload: xrayLabSuppliesAndOthers
});

const newPHICXLSOError = () => ({
    type: PHIC_CLAIMS_DETAILS_XLSO_NEW_ERROR
});

export const newPHICXLSO = (xlso, closeDialog, reset) => (dispatch, getState, {clientBeacon}) => {
    dispatch(newPHICXLSORequest());
    clientBeacon
        .post('api/PHICChargesXLSOController/NewPHICChargesXLSO', xlso)
        .then(response => {
            dispatch(newPHICXLSOSuccess(response.data));
            dispatch(reset());
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Xray, Lab, Supplies and Others successfully added to list.',
                title: 'Success'
            }));

        })
        .catch(error => {
            dispatch(newPHICXLSOError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};


const PHIC_CLAIMS_DETAILS_XLSO_NEW_REQUEST = 'PHIC_CLAIMS_DETAILS_XLSO_NEW_REQUEST';
const PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_XLSO_NEW_ERROR = 'PHIC_CLAIMS_DETAILS_XLSO_NEW_ERROR';