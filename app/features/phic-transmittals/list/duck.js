import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

import { transmittalStatus } from '../../../util/data';

const PHIC_TRANSMITTALS_LIST_REQUEST = 'PHIC_TRANSMITTALS_LIST_REQUEST';
const PHIC_TRANSMITTALS_LIST_SUCCESS = 'PHIC_TRANSMITTALS_LIST_SUCCESS';
const PHIC_TRANSMITTALS_LIST_ERROR = 'PHIC_TRANSMITTALS_LIST_ERROR';

const PHIC_TRANSMITTALS_REFRESH_REQUEST = 'PHIC_TRANSMITTALS_REFRESH_REQUEST';
const PHIC_TRANSMITTALS_REFRESH_SUCCESS = 'PHIC_TRANSMITTALS_REFRESH_SUCCESS';
const PHIC_TRANSMITTALS_REFRESH_ERROR = 'PHIC_TRANSMITTALS_REFRESH_ERROR';

const PHIC_TRANSMITTALS_DELETE_REQUEST = 'PHIC_TRANSMITTALS_DELETE_REQUEST';
const PHIC_TRANSMITTALS_DELETE_SUCCESS = 'PHIC_TRANSMITTALS_DELETE_SUCCESS';
const PHIC_TRANSMITTALS_DELETE_ERROR = 'PHIC_TRANSMITTALS_DELETE_ERROR';

const PHIC_TRANSMITTALS_SUBMIT_REQUEST = 'PHIC_TRANSMITTALS_SUBMIT_REQUEST';
const PHIC_TRANSMITTALS_SUBMIT_SUCCESS = 'PHIC_TRANSMITTALS_SUBMIT_SUCCESS';
const PHIC_TRANSMITTALS_SUBMIT_ERROR = 'PHIC_TRANSMITTALS_SUBMIT_ERROR';

const PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_REQUEST = 'PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_REQUEST';
const PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_SUCCESS = 'PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_SUCCESS';
const PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_ERROR = 'PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_ERROR';

const PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_REQUEST = 'PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_REQUEST';
const PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_SUCCESS = 'PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_SUCCESS';
const PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_ERROR = 'PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_ERROR';

const PHIC_TRANSMITTALS_SET_TO_COMPLETE_REQUEST = 'PHIC_TRANSMITTALS_SET_TO_COMPLETE_REQUEST';
const PHIC_TRANSMITTALS_SET_TO_COMPLETE_SUCCESS = 'PHIC_TRANSMITTALS_SET_TO_COMPLETE_SUCCESS';
const PHIC_TRANSMITTALS_SET_TO_COMPLETE_ERROR = 'PHIC_TRANSMITTALS_SET_TO_COMPLETE_ERROR';

// Foreign Action Type
const PHIC_TRANSMITTAL_EDIT_SUCCESS = 'PHIC_TRANSMITTAL_EDIT_SUCCESS';
const PHIC_TRANSMITTALS_NEW_SUCCESS = 'PHIC_TRANSMITTALS_NEW_SUCCESS';

const PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_REQUEST = 'PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_REQUEST';
const PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_SUCCESS = 'PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_SUCCESS';
const PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_ERROR = 'PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_ERROR';

const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    transmittalsList: [],
    uploadingFiles: [],
    getPhicTransmittalsListRequestPending: true,
    refreshPhicTransmittalsRequestPending: false,
    basicDialogRequestPending: false

}, action) => {
    switch (action.type) {

    case PHIC_TRANSMITTALS_LIST_REQUEST:
        return state = {
            ...state,
        };

    case PHIC_TRANSMITTALS_LIST_SUCCESS:
        return state = {
            ...state,
            getPhicTransmittalsListRequestPending: false,
            transmittalsList: action.transmittalsList,
        };

    case PHIC_TRANSMITTALS_LIST_ERROR:
        return state = {
            ...state,
            getPhicTransmittalsListRequestPending: false
        };

    case PHIC_TRANSMITTALS_REFRESH_REQUEST:
        return state = {
            ...state,
            refreshPhicTransmittalsRequestPending: true,
        };

    case PHIC_TRANSMITTALS_REFRESH_SUCCESS:
        return state = {
            ...state,
            transmittalsList: action.transmittalsList,
            refreshPhicTransmittalsRequestPending: false
        };

    case PHIC_TRANSMITTALS_REFRESH_ERROR:
        return state = {
            ...state,
            refreshPhicTransmittalsRequestPending: false
        };

    case PHIC_TRANSMITTALS_DELETE_REQUEST:
        return state = {
            ...state,
            basicDialogRequestPending: true
        };

    case PHIC_TRANSMITTALS_DELETE_SUCCESS:
        return state = {
            ...state,
            basicDialogRequestPending: false,

            transmittalsList: state.transmittalsList
                .filter(t => t.id !== action.transmittalId)
        };

    case PHIC_TRANSMITTALS_DELETE_ERROR:
        return state = {
            ...state,
            basicDialogRequestPending: false
        };

    case PHIC_TRANSMITTAL_EDIT_SUCCESS:
        return state = {
            ...state,

            transmittalsList: state.transmittalsList
                .filter(t => t.id == action.transmittal.id ? t.remarks = action.transmittal.remarks : t)
        };

    case PHIC_TRANSMITTALS_NEW_SUCCESS:
        return state = {
            ...state,
            transmittalsList: [action.transmittal, ...state.transmittalsList]
        };

    case PHIC_TRANSMITTALS_SUBMIT_REQUEST:
        return state = {
            ...state,
            submitPhicTransmittalRequestPending: true
        };

    case PHIC_TRANSMITTALS_SUBMIT_SUCCESS:
        return state = {
            ...state,
            submitPhicTransmittalRequest: false,

            transmittalsList: state.transmittalsList
                .map(t => t.id == action.transmittal.id ? action.transmittal : t)
        };

    case PHIC_TRANSMITTALS_SUBMIT_ERROR:
        return state = {
            ...state,
            submitPhicTransmittalRequest: false
        };

    case PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_REQUEST:
        return state = {
            ...state,
            basicDialogRequestPending: true
        };

    case PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_SUCCESS:
        return state = {
            ...state,
            basicDialogRequestPending: true
        };

    case PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_ERROR:
        return state = {
            ...state,
            basicDialogRequestPending: false
        };

    case PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_REQUEST:
        return state = {
            ...state,
            basicDialogRequestPending: true
        };

    case PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_SUCCESS:
        return state = {
            ...state,
            basicDialogRequestPending: false,
            transmittalsList: state.transmittalsList.map(t => {
                if (t.id != action.transmittal.id) return t;
                t.transmittalStatus = action.transmittal.transmittalStatus;
                t.transmittalStatusDescription = action.transmittal.transmittalStatusDescription;
                return t;
            })
        };

    case PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_ERROR:
        return state = {
            ...state,
            basicDialogRequestPending: false
        };

    case PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_REQUEST:
        return state = {
            ...state,
            transmittalsList: state.transmittalsList.map(t => {
                if (t.id != action.payload) return t;
                t.requestPending = true;
                return t;
            })
        };

    case PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_SUCCESS:
        return state = {
            ...state,
            transmittalsList: state.transmittalsList.map(t => {
                if (t.id != action.payload.id) return t;
                t.transmittalStatus = action.payload.transmittalStatus;
                t.transmittalStatusDescription = action.payload.transmittalStatusDescription;
                t.eTicketNumber = action.payload.eTicketNumber;
                t.requestPending = false;
                return t;
            })
        };

    case PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_ERROR:
        return state = {
            ...state,
            transmittalsList: state.transmittalsList.map(t => {
                if (t.id != action.payload) return t;
                t.requestPending = false;
                return t;
            })
        };

    case PHIC_TRANSMITTALS_SET_TO_COMPLETE_REQUEST :
        return state = {
            ...state,
            basicDialogRequestPending: true
        };

    case PHIC_TRANSMITTALS_SET_TO_COMPLETE_SUCCESS :
        return state = {
            ...state,
            basicDialogRequestPending: false,
            transmittalsList: state.transmittalsList.map(t => {
                if (t.id != action.transmittal.id) return t;
                t.transmittalStatus = action.transmittal.transmittalStatus;
                t.transmittalStatusDescription = action.transmittal.transmittalStatusDescription;
                t.dateUpdated = action.transmittal.dateUpdated;
                return t;
            })            
        };

    case PHIC_TRANSMITTALS_SET_TO_COMPLETE_ERROR : 
        return state = {
            ...state,
            basicDialogRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS:
        return {
            ...state,
            uploadingFiles: state.uploadingFiles.concat(action.payload)
        };

    default: return state;
    }
};

// *** GET PHIC TRANSMITTAL
const getPhicTransmittalsListRequest = () => ({
    type: PHIC_TRANSMITTALS_LIST_REQUEST
});

const getPhicTransmittalsListSuccess = (transmittalsList) => ({
    type: PHIC_TRANSMITTALS_LIST_SUCCESS,
    transmittalsList
});

const getPhicTransmittalsListError = () => ({
    type: PHIC_TRANSMITTALS_LIST_ERROR
});

// *** REFRESH PHIC TRANSMITTAL
const refreshPhicTransmittalsRequest = () => ({
    type: PHIC_TRANSMITTALS_REFRESH_REQUEST
});

const refreshPhicTransmittalsSuccess = (transmittalsList) => ({
    type: PHIC_TRANSMITTALS_REFRESH_SUCCESS,
    transmittalsList
});

const refreshPhicTransmittalsError = () => ({
    type: PHIC_TRANSMITTALS_REFRESH_ERROR
});

// *** DELETE PHIC TRANSMITTAL
const deletePhicTransmittalRequest = () => ({
    type: PHIC_TRANSMITTALS_DELETE_REQUEST
});

const deletePhicTransmittalSuccess = (transmittalId) => ({
    type: PHIC_TRANSMITTALS_DELETE_SUCCESS,
    transmittalId,
});

const deletePhicTransmittalError = () => ({
    type: PHIC_TRANSMITTALS_DELETE_ERROR
});

// *** SUBMIT PHIC TRANSMITTAL
const submitPhicTransmittalRequest = () => ({
    type: PHIC_TRANSMITTALS_SUBMIT_REQUEST
});

const submitPhicTransmittalSuccess = (transmittal) => ({
    type: PHIC_TRANSMITTALS_SUBMIT_SUCCESS,
    transmittal
});

const submitPhicTransmittalError = () => ({
    type: PHIC_TRANSMITTALS_SUBMIT_ERROR
});

// *** VERIFY CLAIMS STATUS
const verifyClaimStatusRequest = () => ({
    type: PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_REQUEST
});

const verifyClaimStatusSuccess = () => ({
    type: PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_SUCCESS
});

// *** EDIT CLAIMS STATUS
const editPhicClaimStatusRequest = () => ({
    type: PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_REQUEST
});

const editPhicClaimStatusSuccess = (transmittal) => ({
    type: PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_SUCCESS,
    transmittal
});

const editPhicClaimStatusError = () => ({
    type: PHIC_TRANSMITTALS_EDIT_CLAIM_STATUS_ERROR
});

const verifyClaimStatusError = () => ({
    type: PHIC_TRANSMITTALS_VERIFY_CLAIM_STATUS_ERROR
});

// *** SET TO COMPLETE
const setToCompleteRequest = () => ({
    type : PHIC_TRANSMITTALS_SET_TO_COMPLETE_REQUEST
});

const setToCompleteSuccess = (transmittal) => ({
    type : PHIC_TRANSMITTALS_SET_TO_COMPLETE_SUCCESS,
    transmittal
});

const setToCompleteError = () => ({
    type : PHIC_TRANSMITTALS_SET_TO_COMPLETE_ERROR
});

/**
 * Get PHIC Transmittals List
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function getPhicTransmittalsList(clientId, transmittalStatus, dateFrom, dateTo) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(getPhicTransmittalsListRequest());

        const dateEndpoint =
            dateFrom !== null && dateTo !== null ? `&dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}` : '';

        clientBeacon.get(`/api/PHICTransmittal/GetAllPHICTransmittal?clientId=${clientId}${dateEndpoint}`)
            .then(response => {
                dispatch(getPhicTransmittalsListSuccess(response.data));
            })

            .catch(error => {
                dispatch(getPhicTransmittalsListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}


export const getPHICTransmittalStatusById = (transmittalId) => (dispatch, getState, { clientBeacon }) => {
    dispatch(getPHICTransmittalStatusByIdRequest(transmittalId));
    
    clientBeacon.get(`/api/PHICTransmittal/GetPHICTransmittalStatusById?transmittalId=${transmittalId}`)
        .then(response => {
            dispatch(getPHICTransmittalStatusByIdSuccess(response.data));

            if(response.data.transmittalStatus == transmittalStatus.transmitted) {

                dispatch(Notifications.info({
                    ...notificationOpts,
                    message: `The transmittal has been successfully submitted. The E-Ticket No. is ${response.data.eTicketNumber}. Please note that it usually take 12 to 24hrs for PhilHealth backend office to process your transmittal.`,
                    title: 'Success',
                    position: 'br',
                    autoDismiss: false,
                    action: {
                        label: 'View Claims',
                        callback: () => browserHistory.push(`/phic-claims/${response.data.id}`)
                    }
                }));
            }

            else if (response.data.transmittalStatus == transmittalStatus.transmitError) {                

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: `There is an error with transmittal no. '${response.data.transmittalNumber}'. Please check the error log for the details.`,
                    title: 'Transmittal Error',
                    position: 'br',
                    autoDismiss: false,
                }));               
            }
        })
        .catch(error => {
            dispatch(getPHICTransmittalStatusByIdError(transmittalId));

            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const getPHICTransmittalStatusByIdRequest = (transmittalId) => ({
    type: PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_REQUEST,
    payload: transmittalId
});

const getPHICTransmittalStatusByIdSuccess = (transmittal) => ({
    type: PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_SUCCESS,
    payload: transmittal
});

const getPHICTransmittalStatusByIdError = (transmittalId) => ({
    type: PHIC_TRANSMITTALS_LIST_GET_TRANSMITTAL_STATUS_BY_ID_ERROR,
    payload: transmittalId
});

/**
 * Refresh PHIC Transmittals List
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function refreshPhicTransmittals(clientId, transmittalStatus, dateFrom, dateTo) {
    return (dispatch, getState, { clientBeacon }) => {

        const statusEndpoint =
            transmittalStatus !== null ? `&transmittalStatus=${transmittalStatus}` : '';

        const dateEndpoint =
            dateFrom !== null && dateTo !== null ? `&dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}` : '';

        dispatch(refreshPhicTransmittalsRequest());

        clientBeacon.get(`/api/PHICTransmittal/GetAllPHICTransmittal?clientId=${clientId}${statusEndpoint}${dateEndpoint}`)
            .then(response => {
                dispatch(refreshPhicTransmittalsSuccess(response.data));
            })

            .catch(error => {
                dispatch(refreshPhicTransmittalsError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}

/**
 * Delete PHIC Transmittal
 * 
 * @export
 * @param {any} transmittalId
 * @param {any} closeBasicDialog
 * @returns
 */
export function deletePhicTransmittal(transmittalId, closeBasicDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(deletePhicTransmittalRequest());

        clientBeacon.delete(`/api/PHICTransmittal/DeletePHICTransmittal?transmittalId=${transmittalId}`)
            .then(() => {
                closeBasicDialog();
                dispatch(deletePhicTransmittalSuccess(transmittalId));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: `Transmittal No. ${transmittalId} succssfully removed!`,
                    title: 'Success'
                }));
            })
            .catch(error => {
                closeBasicDialog();

                dispatch(deletePhicTransmittalError());
                if (error.data.exceptionMessage.includes('REFERENCE')) {
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: 'Transmittal has a processed claim/s. Transmittal cannot be removed.',
                        title: 'Error'
                    }));
                } else {
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));
                }
            });
    };
}

/**
 * Submit PHIC Transmittal
 * 
 * @export
 * @param {any} transmittalId
 * @returns
 */
export function submitPhicTransmittal(transmittalId, hookPHICTransmittalStatusPoll) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(submitPhicTransmittalRequest());

        clientBeacon.put(`/api/PHICTransmittal/SubmitTransmittal?transmittalId=${transmittalId}`)
            .then(response => {
                dispatch(submitPhicTransmittalSuccess(response.data));
                hookPHICTransmittalStatusPoll();
            })

            .catch(error => {
                dispatch(submitPhicTransmittalError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };
}

/**
 * Verify Claim Status
 * 
 * @export
 * @param {any} transmittal,
 * @param {any} closeBasicDialog
 * @returns
 */
export function verifyClaimStatus(transmittal, closeBasicDialog) {
    return (dispatch, getState, { clientEclaims }) => {

        dispatch(verifyClaimStatusRequest());

        // *** check every lhio number
        const isLhiosNumberValid = transmittal.transmittalClaims
            .some(t => t.claimSeriesLhio === null || t.claimSeriesLhio === '');

        if (!isLhiosNumberValid)

            clientEclaims.post('/api/EClaims/v2/GetClaimsStatus', constructClaimStatus(transmittal))

                .then(response => {
                    dispatch(verifyClaimStatusSuccess());

                    response.data['id'] = transmittal.id;

                    // *** update status
                    dispatch(editPhicClaimStatus(response.data, closeBasicDialog, transmittal.id));
                })

                .catch(() => {
                    closeBasicDialog();
                    dispatch(verifyClaimStatusError());

                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: ' Something went wrong, It is most likely caused by a NETWORK ERROR please retry again later',
                        title: 'Error'
                    }));
                });

        else {
            closeBasicDialog();
            dispatch(verifyClaimStatusError());

            dispatch(Notifications.info({
                ...notificationOpts,
                message: 'One of the claims of this transmittal is not mapped to a LHIO Number',
                title: 'Invalid'
            }));
        }
    };
}


/**
 * Set PHIC Transmittal To Complete
 * 
 * @export
 * @param {any} transmittalId 
 * @returns 
 */
export function setToComplete(transmittalId, transmittalNumber, onCloseBasicDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(setToCompleteRequest());

        clientBeacon.put(`/api/PHICTransmittal/SetTransmittalToComplete?transmittalId=${transmittalId}`)
            
            .then(response => {
                onCloseBasicDialog();
                dispatch(setToCompleteSuccess(response.data));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: `Transmittal no. ${transmittalNumber} are successfully set to completed`,
                    title: 'Success'
                }));                   
            })

            .catch(error => {
                onCloseBasicDialog();
                dispatch(setToCompleteError());

                dispatch(Notifications.info({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Information'
                }));                
            });
    };
}

/**
 * Edit Phic Claim Status
 * 
 * @param {any} verifyClaimStatusResponse
 * @param {any} closeBasicDialog
 * @returns
 */
function editPhicClaimStatus(verifyClaimStatusResponse, closeBasicDialog, transmittalId) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(editPhicClaimStatusRequest());

        clientBeacon.put('/api/PHICClaim/EditPHICClaimStatus', verifyClaimStatusResponse)

            .then(response => {
                closeBasicDialog();
                dispatch(editPhicClaimStatusSuccess(response.data));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'All claims status has been verified, Please check the claim list for the status.',
                    title: 'Success'
                }));      

                browserHistory.push(`/phic-claims/${transmittalId}`);
            })

            .catch(error => {
                closeBasicDialog();
                dispatch(editPhicClaimStatusError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });

    };
}

// *** Construct Claim Status
const constructClaimStatus = (transmittal) => {
    const lhioNumbers = [];

    transmittal.transmittalClaims.forEach(t => lhioNumbers.push(t.claimSeriesLhio));

    return {
        seriesLhioNumberList: lhioNumbers,
        phicIdentity: {
            hospitalCode: transmittal.hospitalCode
        }
    };
};

export const addUploadingFiles = (files) => {
    return {
        payload: files,
        type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS
    };
};


export function newPHICTransmittalOfflineMode( value, files,closeDialog) {
    return (dispatch, getState, {clientBeacon}) => {
        const headers = {
            'ContentType': 'multipart/form-data'
        };
        
        const formData = new FormData();
        files.forEach((t, i) => {
            formData.append(`documenttype_${i}`, t.documentType);
            formData.append(`documentvalue_${i}`, t.documentValue);
            formData.append(`file_${i}`, t);
        });
        
        clientBeacon.post(`api/PHICTransmittal/NewPHICTransmittalOffline?clientId=${value.clientId}`, formData, headers)
            .then(response => {
                //dispatch(newPhicTransmittalSuccess(response.data));
                //closeDialog();

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'new PHIC Transmittal added',
                    title: 'Success'
                })); 
            })
            .catch(error => {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                    
            });
    };
}