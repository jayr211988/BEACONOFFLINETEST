import Notifications from 'react-notification-system-redux';

import { getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR';

export default (state = {
    getPHICAllCaseRateRequestPending: false,
    deletePHICAllCaseRateRequestPending: true,
    newborn: false,
    hearing: false,
    screening: false,

}, action) => {
    switch (action.type) {
    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST:
        return {
            ...state,
            getPHICAllCaseRateRequestPending: true
        };
    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS:
        return {
            ...state,
            getPHICAllCaseRateRequestPending: false
        };
    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_ERROR:
        return {
            ...state,
            getPHICAllCaseRateRequestPending: false
        };
    case PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST:
        return {
            ...state,
            deletePHICAllCaseRateRequestPending: true
        };
    case PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS:
        return {
            ...state,
            deletePHICAllCaseRateRequestPending: false
        };
    case PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR:
        return {
            ...state,
            deletePHICAllCaseRateRequestPending: false
        };
    default: return state;
    }
};

export const getPHICAllCaseRates = (phicCf2Id) => (dispatch, getState, { clientBeacon }) => {
    dispatch(getPHICAllCaseRatesRequest());

    clientBeacon
        .get(`api/PHICAllCaseRate/GetPHICAllCaseRates?phicCf2Id=${phicCf2Id}`)
        .then(response => {
            dispatch(getPHICAllCaseRatesSuccess(response.data));
        })
        .catch(error => {
            dispatch(getPHICAllCaseRatesError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const deletePHICAllCaseRate = (allCaseRateId, claimId, closeDialog, changePendingRequest) => (dispatch, getState, { clientBeacon }) => {
    dispatch(deletePHICAllCaseRateRequest());
    changePendingRequest(true);

    clientBeacon
        .delete(`api/PHICAllCaseRate/DeletePHICAllCaseRate?allCaseRateId=${allCaseRateId}`)
        .then(() => {
            closeDialog();
            changePendingRequest(false);
            dispatch(deletePHICAllCaseRateSuccess(allCaseRateId));
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully untagged as CASE RATE.',
                title: 'Success'
            }));

            dispatch(getPhicClaimsIssuesCount(claimId));
        })
        .catch(error => {
            dispatch(deletePHICAllCaseRateError());
            changePendingRequest(false);
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const deletePHICAllCaseRateRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST
});

const deletePHICAllCaseRateSuccess = (caseRateId) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS,
    payload: caseRateId
});

const deletePHICAllCaseRateError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR
});

const getPHICAllCaseRatesRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_REQUEST
});

const getPHICAllCaseRatesSuccess = (allCaseRates) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS,
    payload: allCaseRates
});

const getPHICAllCaseRatesError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_ERROR
});
