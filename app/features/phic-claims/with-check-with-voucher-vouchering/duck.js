import Notifications from 'react-notification-system-redux';
 
const PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_REQUEST = 'PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_REQUEST';
const PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_SUCCESS = 'PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_SUCCESS';
const PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_ERROR = 'PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_ERROR';
 
const notificationOpts = {
    title: '',
    message: '',
    position: 'tc'
};
 
export default (state = {
    getPhicClaimsPayeeRequestPending: true,
    phicClaimPayees: []
}, action) => {
    switch(action.type){
 
    case PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_REQUEST :
        return {
            ...state,
            getPhicClaimsPayeeRequestPending : true
        };
 
    case PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_SUCCESS : 
        return {
            ...state,
            getPhicClaimsPayeeRequestPending : false,
            phicClaimPayees: action.payload
        };
 
    case PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_ERROR :
        return {
            ...state,
            getPhicClaimsPayeeRequestPending : false
        };

    default: return state;
    
    }
};
 
const getPhicClaimsPayeeRequest = () => ({
    type: PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_REQUEST
});
 
const getPhicClaimsPayeeSuccess = (payees) => ({
    type: PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_SUCCESS,
    payload: payees
});
 
const getPhicClaimsPayeeError = () => ({
    type: PHIC_CLAIMS_WITH_CHEQUE_WITH_VOUCHER_VOUCHERING_GET_PAYEE_ERROR
});
 
export function getPhicClaimPayee(claimId){
    return (dispatch, getState, { clientBeacon }) => {
        dispatch(getPhicClaimsPayeeRequest());
 
        clientBeacon.get(`/api/PHICClaimPayee/GetPHICClaimPayees?claimId=${claimId}`)
            .then(response => {
                dispatch(getPhicClaimsPayeeSuccess(response.data));
            })
            .catch(error => {
                dispatch(getPhicClaimsPayeeError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}
