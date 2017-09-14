import Notifications from 'react-notification-system-redux';
import moment from 'moment';

import { getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const convertUtcToLocal = t => {
    t.renderDate = moment.utc(t.renderDate).toDate();
    return t;
};

export default (state = {
    getPHICChargesXLSORequestPending: false,
    phicChargesXLSOs: []
}, action) => {
    
    switch (action.type) {
    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_REQUEST:
        return {
            ...state,
            getPHICChargesXLSORequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_SUCCESS:
        return {
            ...state,
            getPHICChargesXLSORequestPending: false,
            phicChargesXLSOs: action.payload.map(convertUtcToLocal)
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_ERROR:
        return {
            ...state,
            getPHICChargesXLSORequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS :
        return state = {
            ...state,
            phicChargesXLSOs : state.phicChargesXLSOs.filter((t) => {
                if (t.id == action.xlso.id){
                    t.description = action.xlso.description;
                    t.type = action.xlso.type;
                    t.quantity = action.xlso.quantity;
                    t.renderDate = action.xlso.renderDate;
                    return t;
                }
                else return t;
                    
            })
        };

    case PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS:
        return {
            ...state,
            phicChargesXLSOs: [...state.phicChargesXLSOs, action.payload].map(convertUtcToLocal)
        };
    case PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_SUCCESS:
        return {
            ...state,
            phicChargesXLSOs: state.phicChargesXLSOs.filter(t => t.id != action.payload).map(convertUtcToLocal)
        };

    case PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_ERROR:
        return state;

    default: return state;
    }
};

export const getPHICChargesXLSO = (phicClaimId) => (dispatch, getState, {clientBeacon}) => {
    dispatch(getPHICChargesXLSORequest());
    
    clientBeacon
        .get(`api/PHICChargesXLSOController/GetPHICChargesXLSO?phicClaimId=${phicClaimId}`)
        .then(response => {
            dispatch(getPHICChargesXLSOSuccess(response.data));
        })
        .catch(error => {
            dispatch(getPHICChargesXLSOError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const deletePHICXlso = (xlsoId, claimId, changePendingRequest, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    changePendingRequest(true);

    clientBeacon
        .delete(`api/PHICChargesXLSOController/DeletePHICChargesXLSO?claimId=${claimId}&phicChargesXLSOsId=${xlsoId}`)
        .then(() => {
            dispatch(deletePHICChargesXlsoSuccess(xlsoId));
            closeDialog();
            changePendingRequest(false);
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Xray, Lab, Supplies and Others successfully deleted from list.',
                title: 'Success'
            }));

            dispatch(getPhicClaimsIssuesCount(claimId));
        })
        .catch(error => {
            changePendingRequest(false);
            dispatch(deletePHICChargesXlsoError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const getPHICChargesXLSORequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_REQUEST
});

const getPHICChargesXLSOSuccess = (xlsos) => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_SUCCESS,
    payload: xlsos
});

const getPHICChargesXLSOError = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_ERROR
});

const deletePHICChargesXlsoSuccess = (xlsoId) => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_SUCCESS,
    payload: xlsoId
});

const deletePHICChargesXlsoError = () => ({
    type: PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_ERROR
});

const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_REQUEST = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_REQUEST';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_ERROR = 'PHIC_CLAIMS_DETAILS_CHARGES_DRUGS_AND_MEDICINES_LIST_GET_PHIC_CHARGES_XLSO_ERROR';

//Foreign Type
const PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_XLSO_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_XLSO_EDIT_SUCCESS';


const PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_SUCCESS = 'PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_SUCCESS';
const PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_ERROR = 'PHIC_CLAIMS_DETAILS_CHARGES_XRAY_LAB_SUPPLIES_AND_OTHERS_ERROR';
