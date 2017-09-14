import Notifications from 'react-notification-system-redux';

// *** extended function
import { deletePhicClaimsIssue } from '../../../phic-claims-issues/list/duck';


const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    newPHICChargesDrugAndMedicineRequestPending: false
}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_REQUEST:
        return {
            ...state,
            newPHICChargesDrugAndMedicineRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS:
        return {
            ...state,
            newPHICChargesDrugAndMedicineRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_ERROR: 
        return {
            ...state,
            newPHICChargesDrugAndMedicineRequestPending: false
        };
    }

    return state;
};

export const newPHICChargesDrugAndMedicine = (drugAndMedicineDto, closeDialog, reset) => (dispatch, getState, {clientBeacon}) => {
    dispatch(newPHICChargesDrugAndMedicineRequest());
    clientBeacon
        .post('api/PHICChargesDrugAndMedicineController/NewPHICChargesDrugAndMedicine', drugAndMedicineDto)
        .then(response => {
            dispatch(newPHICChargesDrugAndMedicineSuccess(response.data));
            dispatch(reset());
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Drug and Medicine successfully added to list.',
                title: 'Success'
            }));
        })
        .catch(error => {
            dispatch(newPHICChargesDrugAndMedicineError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const newPHICChargesDrugAndMedicineRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_REQUEST
});

const newPHICChargesDrugAndMedicineSuccess = (drugAndMedicine) => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS,
    payload: drugAndMedicine
});

const newPHICChargesDrugAndMedicineError = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_ERROR
});

const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_REQUEST = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_REQUEST';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_ERROR = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_ERROR';
