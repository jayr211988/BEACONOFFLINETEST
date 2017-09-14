
// *** Foreign Action Type
const PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS = 'PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS';
const PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS = 'PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS';
const PHIC_TRANSACTION_ECLAIMS_SEARCH = 'PHIC_TRANSACTION_ECLAIMS_SEARCH';

export default (state = {
    totalTransactions: 0,

}, action) => {
    switch(action.type) {

    case PHIC_TRANSACTIONS_ECLAIMS_LIST_SUCCESS :
        return state = {
            ...state,
            totalTransactions : action.payload.length
        };

    case PHIC_TRANSACTIONS_ECLAIMS_API_LIST_SUCCESS :
        return state = {
            ...state,
            totalTransactions : action.transactionsEclaimsApiList.length
        };
    default: return state;
    }
};

const dispatchSearchItem = (search) => ({
    type: PHIC_TRANSACTION_ECLAIMS_SEARCH,
    search
});


export function searchItem (search) {
    return (dispatch) => {
        dispatch(dispatchSearchItem(search));
    };
}

