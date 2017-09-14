import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    editPHICChargesDrugAndMedicineRequestPending: false
}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_REQUEST:
        return {
            ...state,
            editPHICChargesDrugAndMedicineRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS:
        return {
            ...state,
            editPHICChargesDrugAndMedicineRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_ERROR: 
        return {
            ...state,
            editPHICChargesDrugAndMedicineRequestPending: false
        };
    }

    return state;
};

export const editPHICChargesDrugAndMedicine = (drugAndMedicineDto, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(editPHICChargesDrugAndMedicineRequest());

    clientBeacon
        .put('api/PHICChargesDrugAndMedicineController/EditPHICChargesDrugAndMedicine', drugAndMedicineDto)
        .then(response => {
            dispatch(editPHICChargesDrugAndMedicineSuccess(response.data));
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Drug and Medicine successfully edited.',
                title: 'Success'
            }));
        })
        .catch(error => {
            dispatch(editPHICChargesDrugAndMedicineError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const editPHICChargesDrugAndMedicineRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_REQUEST
});

const editPHICChargesDrugAndMedicineSuccess = (drugAndMedicine) => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS,
    payload: drugAndMedicine
});

const editPHICChargesDrugAndMedicineError = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_ERROR
});

const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_REQUEST = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_REQUEST';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_ERROR = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_ERROR';
