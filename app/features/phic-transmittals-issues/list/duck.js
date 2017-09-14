import Notifications from 'react-notification-system-redux';

const PHIC_TRANSMITTALS_ISSUES_LIST_REQUEST = 'PHIC_TRANSMITTALS_ISSUES_LIST_REQUEST';
const PHIC_TRANSMITTALS_ISSUES_LIST_SUCCESS = 'PHIC_TRANSMITTALS_ISSUES_LIST_SUCCESS';
const PHIC_TRANSMITTALS_ISSUES_LIST_ERROR = 'PHIC_TRANSMITTALS_ISSUES_LIST_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    transmittalsIssuesList: [],
    getPhicTransmittalsIssuesListRequestPending : false

}, action) => {
    switch (action.type) {
        
    case PHIC_TRANSMITTALS_ISSUES_LIST_REQUEST : 
        return state = {
            ...state,
            getPhicTransmittalsIssuesListRequestPending : true
        };

    case PHIC_TRANSMITTALS_ISSUES_LIST_SUCCESS :
        return state = {
            ...state,
            transmittalsIssuesList : action.transmittalsIssuesList,
            getPhicTransmittalsIssuesListRequestPending : false
        };

    case PHIC_TRANSMITTALS_ISSUES_LIST_ERROR :
        return state = {
            ...state,
            getPhicTransmittalsIssuesListRequestPending : false
        };

    default: return state;
    }
};

// *** GET PHIC TRANSMITTAL ISSUE
const getPhicTransmittalsIssuesListRequest = () => ({
    type : PHIC_TRANSMITTALS_ISSUES_LIST_REQUEST,
    
});

const getPhicTransmittalsIssuesListSuccess = (transmittalsIssuesList) => ({
    type : PHIC_TRANSMITTALS_ISSUES_LIST_SUCCESS,
    transmittalsIssuesList
});

const getPhicTransmittalsIssuesListError = () => ({
    type : PHIC_TRANSMITTALS_ISSUES_LIST_ERROR
});

/**
 * Get Phic Transmittal Issues
 * 
 * @export
 * @param {any} transmittalId
 * @returns
 */
export function getPhicTransmittalsIssuesList(transmittalId) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(getPhicTransmittalsIssuesListRequest());

        clientBeacon.get(`/api/PHICTransmittalIssue/GetAllPHICTransmittalIssueByTransmittalId?transmittalId=${transmittalId}`)
            .then(response => {
                dispatch(getPhicTransmittalsIssuesListSuccess(response.data));
            })

            .catch(error => {
                dispatch(getPhicTransmittalsIssuesListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}