import Notifications from 'react-notification-system-redux';
import moment from 'moment';

import { getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const convertRenderDateUtcToLocal = t => {
    t.renderDate = moment.utc(t.renderDate).toDate();
    return t;
};

export default (state = {
    phicChargesDrugsAndMedicines: [],
    getPHICChargesDrugsAndMedicinesRequestPending: false
}, action) => {
    switch(action.type) {

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST:
        return {
            ...state,
            getPHICChargesDrugsAndMedicinesRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS:
        return {
            ...state,
            getPHICChargesDrugsAndMedicinesRequestPending: false,
            phicChargesDrugsAndMedicines: action.payload.map(convertRenderDateUtcToLocal)
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_ERROR:
        return {
            ...state,
            getPHICChargesDrugsAndMedicinesRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS:
        return {
            ...state,
            phicChargesDrugsAndMedicines: [...state.phicChargesDrugsAndMedicines, action.payload].map(convertRenderDateUtcToLocal)
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_REQUEST:
        return state;

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_SUCCESS:
        return {
            ...state,
            phicChargesDrugsAndMedicines: state.phicChargesDrugsAndMedicines.filter(t => t.id != action.payload).map(convertRenderDateUtcToLocal)
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_ERROR:
        return state;

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS:
        return {
            ...state,
            phicChargesDrugsAndMedicines: state.phicChargesDrugsAndMedicines.map(t => {
                if (t.id != action.payload.id) return t;
                t = action.payload;
                return t;
            }).map(convertRenderDateUtcToLocal)
        };
    
    default:
        return state;
    }
};

export const deletePHICChargesDrugsAndMedicines = (drugAndMedicineId, claimId, changePendingRequest, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    changePendingRequest(true);

    clientBeacon
        .delete(`api/PHICChargesDrugAndMedicineController/DeletePHICChargesDrugAndMedicine?claimId=${claimId}&phicChargesDrugAndMedicineId=${drugAndMedicineId}`)
        .then(() => {
            dispatch(deletePHICChargesDrugsAndMedicinesSuccess(drugAndMedicineId));
            closeDialog();
            changePendingRequest(false);
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Drug and Medicine successfully removed.',
                title: 'Success'
            }));

            dispatch(getPhicClaimsIssuesCount(claimId));
        })
        .catch(error => {
            changePendingRequest(false);
            dispatch(deletePHICChargesDrugsAndMedicinesError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const deletePHICChargesDrugsAndMedicinesSuccess = (drugAndMedicineId) => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_SUCCESS,
    payload: drugAndMedicineId
});

const deletePHICChargesDrugsAndMedicinesError = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_ERROR
});

export const getPHICChargesDrugsAndMedicines = (phicClaimId) => (dispatch, getState, {clientBeacon}) => {
    dispatch(getPHICChargesDrugsAndMedicinesRequest());
    
    clientBeacon
        .get(`api/PHICChargesDrugAndMedicineController/GetPHICChargesDrugsAndMedicines?phicClaimId=${phicClaimId}`)
        .then(response => {
            dispatch(getPHICChargesDrugsAndMedicinesSuccess(response.data));
        })
        .catch(error => {
            dispatch(getPHICChargesDrugsAndMedicinesError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const getPHICChargesDrugsAndMedicinesRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST
});

const getPHICChargesDrugsAndMedicinesSuccess = (drugsAndMedicines) => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS,
    payload: drugsAndMedicines
});

const getPHICChargesDrugsAndMedicinesError = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_ERROR
});

const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_REQUEST';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_ERROR = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_DISCHARGE_DRUGS_AND_MEDICINES_ERROR';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_REQUEST = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_REQUEST';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_ERROR = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_DELETE_PHIC_CHARGES_DRUG_AND_MEDICINE_ERROR';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_EDIT_SUCCESS';
