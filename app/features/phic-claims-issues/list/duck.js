import Notifications from 'react-notification-system-redux';

const PHIC_CLAIMS_ISSUES_NEW_REQUEST = 'PHIC_CLAIMS_ISSUES_NEW_REQUEST';
const PHIC_CLAIMS_ISSUES_NEW_SUCCESS = 'PHIC_CLAIMS_ISSUES_NEW_SUCCESS';
const PHIC_CLAIMS_ISSUES_NEW_ERROR = 'PHIC_CLAIMS_ISSUES_NEW_ERROR';

const PHIC_CLAIMS_ISSUES_DELETE_REQUEST = 'PHIC_CLAIMS_ISSUES_DELETE_REQUEST';
const PHIC_CLAIMS_ISSUES_DELETE_SUCCESS = 'PHIC_CLAIMS_ISSUES_DELETE_SUCCESS';
const PHIC_CLAIMS_ISSUES_DELETE_ERROR = 'PHIC_CLAIMS_ISSUES_DELETE_ERROR';

const PHIC_CLAIMS_ISSUES_LIST_REQUEST = 'PHIC_CLAIMS_ISSUES_LIST_REQUEST';
const PHIC_CLAIMS_ISSUES_LIST_SUCCESS = 'PHIC_CLAIMS_ISSUES_LIST_SUCCESS';
const PHIC_CLAIMS_ISSUES_LIST_ERROR = 'PHIC_CLAIMS_ISSUES_LIST_ERROR';

const PHIC_CLAIMS_ISSUES_COUNT_SUCCESS = 'PHIC_CLAIMS_ISSUES_COUNT_SUCCESS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    claimsIssuesList: [],
    getPhicClaimsIssuesListPending: true

}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_ISSUES_NEW_REQUEST:
        return state = {
            ...state
        };

    case PHIC_CLAIMS_ISSUES_NEW_SUCCESS:
        return state = {
            ...state,
            claimsIssuesList: action.issue ? [action.issue, ...state.claimsIssuesList] : state.claimsIssuesList
        };

    case PHIC_CLAIMS_ISSUES_NEW_ERROR:
        return state = {
            ...state
        };

    case PHIC_CLAIMS_ISSUES_LIST_REQUEST:
        return state = {
            ...state,
            getPhicClaimsIssuesListPending: true
        };

    case PHIC_CLAIMS_ISSUES_LIST_SUCCESS:
        return state = {
            ...state,
            claimsIssuesList: action.claimsIssuesList,
            getPhicClaimsIssuesListPending: false
        };

    case PHIC_CLAIMS_ISSUES_LIST_ERROR:
        return state = {
            ...state,
            getPhicClaimsIssuesListPending: false
        };

    case PHIC_CLAIMS_ISSUES_DELETE_REQUEST:
        return state = {
            ...state
        };
    case PHIC_CLAIMS_ISSUES_DELETE_SUCCESS:
        return state = {
            ...state
        };
    case PHIC_CLAIMS_ISSUES_DELETE_ERROR:
        return state = {
            ...state
        };


    default: return state;
    }
};

// *** NEW CLAIM ISSUE
const newPhicClaimsIssueRequest = () => ({
    type: PHIC_CLAIMS_ISSUES_NEW_REQUEST
});

const newPhicClaimsIssueSuccess = (issue) => ({
    type: PHIC_CLAIMS_ISSUES_NEW_SUCCESS,
    issue
});

const newPhicClaimsIssueError = () => ({
    type: PHIC_CLAIMS_ISSUES_NEW_ERROR
});

// *** DELETE CLAIM ISSUE
const deletePhicClaimsIssueRequest = () => ({
    type: PHIC_CLAIMS_ISSUES_DELETE_REQUEST
});
const deletePhicClaimsIssueSuccess = (issue) => ({
    type: PHIC_CLAIMS_ISSUES_DELETE_SUCCESS,
    issue
});
const deletePhicClaimsIssueError = () => ({
    type: PHIC_CLAIMS_ISSUES_DELETE_ERROR
});

// *** GET CLAIMS ISSUES
const getPhicClaimsIssuesListRequest = () => ({
    type: PHIC_CLAIMS_ISSUES_LIST_REQUEST
});

const getPhicClaimsIssuesListSuccess = (claimsIssuesList) => ({
    type: PHIC_CLAIMS_ISSUES_LIST_SUCCESS,
    claimsIssuesList
});

const getPhicClaimsIssuesListError = () => ({
    type: PHIC_CLAIMS_ISSUES_LIST_ERROR
});

// *** GET CLAIMS ISSUES COUNT 
const getPhicClaimsIssuesCountSuccess = (claimsIssuesTotal) => ({
    type : PHIC_CLAIMS_ISSUES_COUNT_SUCCESS,
    claimsIssuesTotal
});

/**
 * New Phic Claims Issue
 * 
 * @export
 * @param {any} issue
 * @returns
 */
export function newPhicClaimsIssue(issue) {
    return (dispatch, getState, { clientBeacon }) => {        
        dispatch(newPhicClaimsIssueRequest());

        clientBeacon.post('/api/PHICClaimIssue/NewPHICClaimIssue', issue)

            .then(response => {
                dispatch(newPhicClaimsIssueSuccess(response.data));
            })

            .catch(error => {
                dispatch(newPhicClaimsIssueError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}


/**
 * Delete Phic Claims Issue
 * 
 * @export
 * @param {any} issue
 * @returns
 */
export function deletePhicClaimsIssue( issue ) {
    return (dispatch, getState, { clientBeacon }) => {
        dispatch(deletePhicClaimsIssueRequest());
        clientBeacon.post('/api/PHICClaimIssue/DeletePHICClaimIssue', issue)
        
            .then(response => {
                dispatch(deletePhicClaimsIssueSuccess(response.data));
            })
            .catch(error => {
                dispatch(deletePhicClaimsIssueError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                 
            });
    };
}

/**
 * Get Phic Claims Issues List
 * 
 * @export
 * @param {any} claimId
 * @returns
 */
export function getPhicClaimsIssuesList(claimId) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(getPhicClaimsIssuesListRequest());

        clientBeacon.get(`/api/PHICClaimIssue/GetAllPHICClaimIssueByClaimId?claimId=${claimId}`)

            .then(response => {
                dispatch(getPhicClaimsIssuesListSuccess(response.data));
            })

            .catch(error => {
                dispatch(getPhicClaimsIssuesListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}  

/**
 * Get Phic Claims Issues Count
 * 
 * @export
 * @param {any} clientId
 * @param {any} transmittalId
 * @returns
 */
export function getPhicClaimsIssuesCount(claimId) {
    return (dispatch, getState, { clientBeacon }) => {

        clientBeacon.get(`/api/PHICClaimIssue/GetPHICClaimIssueCount?claimId=${claimId}`)
            .then(response => {
                dispatch(getPhicClaimsIssuesCountSuccess(response.data));
            })

            .catch(() => {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: 'Error while counting claim issues',
                    title: 'Error'
                }));                
            });
    };
}