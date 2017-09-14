
import Notifications from 'react-notification-system-redux';

const PHIC_CLAIMS_DETAILS_CF2_SUMMARY_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SUMMARY_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SUMMARY_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SUMMARY_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SUMMARY_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SUMMARY_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};


export default (state = {
    getPhicClaimsDetailsCf1SummaryPending : true,
    patientCF2Info : null,
    phicAllCaseRates : []
    
}, action) => {
    switch(action.type) {
    case PHIC_CLAIMS_DETAILS_CF2_SUMMARY_REQUEST :

        return state = {
            ...state,
            getPhicClaimsDetailsCf1SummaryPending : true
        };
        
    case PHIC_CLAIMS_DETAILS_CF2_SUMMARY_SUCCESS :
        return state = {
            ...state,
            patientCF2Info : action.claimsDetail,
            getPhicClaimsDetailsCf1SummaryPending: false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SUMMARY_ERROR : 
        return state = {
            ...state,
            getPhicClaimsDetailsCf1SummaryPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS:
        return {
            ...state,
            phicAllCaseRates: action.payload
        };

    default : return state;
    }
};


const getPhicClaimsDetailsCf2SummaryRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SUMMARY_REQUEST
});

const getPhicClaimsDetailsCf2SummarySuccess = (claimsDetail) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SUMMARY_SUCCESS,
    claimsDetail
});

const getPhicClaimsDetailsCf2SummaryError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SUMMARY_ERROR
});


export function getPhicClaimsDetailsCf2Summary(claimId) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(getPhicClaimsDetailsCf2SummaryRequest());
        clientBeacon.get(`/api/PHICCF2/GetPHICCF2Summary?id=${claimId}`)
            .then((response) => {                
                
                dispatch(getPhicClaimsDetailsCf2SummarySuccess(response.data));                
            })
            .catch(error => {
                dispatch(getPhicClaimsDetailsCf2SummaryError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));  
            });
    };
}