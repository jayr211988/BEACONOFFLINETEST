import Notifications from 'react-notification-system-redux';

const PHIC_TRANSACTIONS_ECLAIMS_API_LIST_REQUEST = 'PHIC_TRANSACTIONS_ECLAIMS_API_LIST_REQUEST';
const PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS = 'PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS';
const PHIC_TRANSACTIONS_ECLAIMS_API_LIST_ERROR = 'PHIC_TRANSACTIONS_ECLAIMS_API_LIST_ERROR';

const PHIC_TRANSACTION_ECLAIMS_SEARCH  = 'PHIC_TRANSACTION_ECLAIMS_SEARCH';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    
    autoDismiss: 5
};

export default (state = {
    transactionsEclaimsApiList : [],
    getPhicTransactionsEclaimsApiRequestPending : false,
}, action) => {
    switch(action.type) {


    case PHIC_TRANSACTIONS_ECLAIMS_API_LIST_REQUEST : 
        return state = {
            ...state,
            getPhicTransactionsEclaimsApiRequestPending : true
        };

    case PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS :
        return state = {
            ...state,
            transactionsEclaimsApiList : action.transactionsEclaimsApiList,
            getPhicTransactionsEclaimsApiRequestPending : false
        };

    case PHIC_TRANSACTIONS_ECLAIMS_API_LIST_ERROR :
        return state = {
            ...state,
            getPhicTransactionsEclaimsApiRequestPending : false
        };

    case PHIC_TRANSACTION_ECLAIMS_SEARCH :        
        return state = {
            ...state,
            search: action.search
        };
    default: return state;
    }
};




const getPhicTransactionsEclaimsApiRequest = () => ({
    type: PHIC_TRANSACTIONS_ECLAIMS_API_LIST_REQUEST
});

const getPhicTransactionsEclaimsApiSuccess = ( transactionsEclaimsApiList ) => ({
    type : PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS,
    transactionsEclaimsApiList
});

const getPhicTransactionsEclaimsApiError = () => ({
    type : PHIC_TRANSACTIONS_ECLAIMS_API_LIST_ERROR
});

/**
 * Get PHIC Eclaims API
 * 
 * @export
 * @param {any} clientId
 * @param {any} [claimStatus=null]
 * @param {any} [from=null]
 * @param {any} [to=null]
 * @returns
 */
export function getPhicTransactionsEclaimsApi (clientId, claimStatus = null, dateFrom = null, dateTo = null) {
    return (dispatch, getState, { clientBeacon }) => {

        const statusEndpoint =
            claimStatus !== null ? `&claimStatus=${claimStatus}` : '';

        const dateEndpoint =
            dateFrom !== null && dateTo !== null ? `&from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}` : '';

        dispatch(getPhicTransactionsEclaimsApiRequest());

        clientBeacon.get(`/api/PHICTransaction/GetPHICAPITransactions?clientId=${clientId}${statusEndpoint}${dateEndpoint}`)
            
            .then(response => {
                dispatch(getPhicTransactionsEclaimsApiSuccess(response.data));
            })

            .catch(error => {
                dispatch(getPhicTransactionsEclaimsApiError());
            
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));        
            });
    };
}