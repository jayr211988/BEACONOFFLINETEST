import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    getPhicTransactionsEclaimsRequestPending: true,
    phicTransactionsEclaimsList: [],    
}, action) => {
    switch(action.type) {
    case PHIC_TRANSACTIONS_ECLAIMS_LIST_REQUEST:
        return {
            ...state,
            getPhicTransactionsEclaimsRequestPending: true
        };

    case PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS:
        return {
            ...state,
            getPhicTransactionsEclaimsRequestPending: false,
            phicTransactionsEclaimsList: action.payload
        };

    case PHIC_TRANSACTIONS_ECLAIMS_LIST_ERROR:
        return {
            ...state,
            getPhicTransactionsEclaimsRequestPending: false
        };

    case PHIC_TRANSACTION_ECLAIMS_SEARCH : 
        return state = {
            ...state,
            search : action.search
        };
    default: return state;
    }
};

const PHIC_TRANSACTIONS_ECLAIMS_LIST_REQUEST = 'PHIC_TRANSACTIONS_ECLAIMS_LIST_REQUEST';
const PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS = 'PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS';
const PHIC_TRANSACTIONS_ECLAIMS_LIST_ERROR = 'PHIC_TRANSACTIONS_ECLAIMS_LIST_ERROR';

const PHIC_TRANSACTION_ECLAIMS_SEARCH  = 'PHIC_TRANSACTION_ECLAIMS_SEARCH';

export const getPhicTransactionsEclaims = (clientId, claimStatus = null, from = null, to = null) => (dispatch, event, {clientBeacon}) => {
    dispatch(getPHICTransactionsRequest());

    let endpoint = `api/PHICTransaction/GetPHICTransactions?clientId=${clientId}`;
    endpoint = claimStatus ? `${endpoint}&claimStatus=${claimStatus}` : endpoint;
    endpoint = from ? `${endpoint}&from=${from.toISOString()}` : endpoint;
    endpoint = to ? `${endpoint}&to=${to.toISOString()}` : endpoint;

    clientBeacon
        .get(endpoint)
        .then(response => {
            dispatch(getPHICTransactionsSuccess(response.data));
        })
        .catch(error => {
            dispatch(getPHICTransactionsError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const getPHICTransactionsRequest = () => ({
    type: PHIC_TRANSACTIONS_ECLAIMS_LIST_REQUEST
});

const getPHICTransactionsSuccess = (transactions) => ({
    type: PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS,
    payload: transactions
});

const getPHICTransactionsError = () => ({
    type: PHIC_TRANSACTIONS_ECLAIMS_LIST_ERROR
});
