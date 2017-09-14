import Notifications from 'react-notification-system-redux';

import { getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    phicDocuments: [],
    getPHICDocumentsRequestPending: true,
    deletePHICDocumentRequestPending: false
}, action) => {
    switch(action.type) {

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST:
        return {
            ...state,
            getPHICDocumentsRequestPending: true
        };
    
    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS:
        return {
            ...state,
            phicDocuments: action.payload,
            getPHICDocumentsRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_ERROR:
        return {
            ...state,
            getPHICDocumentsRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS:
        return {
            ...state,
            phicDocuments: state.phicDocuments.concat(action.payload)
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_REQUEST:
        return {
            ...state,
            deletePHICDocumentRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_SUCCESS:
        return {
            ...state,
            deletePHICDocumentRequestPending: false,
            phicDocuments: state.phicDocuments.filter(t => t.id != action.payload)
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_ERROR:
        return {
            ...state,
            deletePHICDocumentRequestPending: false
        };

    default: return state;
    }
};

export const getPHICDocuments = (claimId) => (dispatch, getState, {clientBeacon}) => {
    dispatch(getPHICDocumentsRequest());

    clientBeacon
        .get(`/api/PHICDocument/GetPHICDocuments?phicClaimId=${claimId}`)
        .then((response) => {
            dispatch(getPHICDocumentsSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getPHICDocumentsError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            })); 
        });
};

export const deletePHICDocument = (phicClaimId, phicDocumentId, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(deletePHICDocumentRequest());

    clientBeacon
        .delete(`api/PHICDocument/DeletePHICDocument?phicDocumentId=${phicDocumentId}&phicClaimId=${phicClaimId}`)
        .then(() => {
            dispatch(deletePHICDocumentSuccess(phicDocumentId));
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Document successfully removed.',
                title: 'Success'
            }));

            dispatch(getPhicClaimsIssuesCount(phicClaimId));
        })
        .catch(error => {
            dispatch(deletePHICDocumentError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            })); 
        });
};

const deletePHICDocumentRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_REQUEST
});

const deletePHICDocumentSuccess = (phicDocumentId) => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_SUCCESS,
    payload: phicDocumentId
});

const deletePHICDocumentError = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_ERROR
});

const getPHICDocumentsRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST,
});

const getPHICDocumentsSuccess = (phicDocuments) => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS,
    payload: phicDocuments
});

const getPHICDocumentsError = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_ERROR
});

const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_SUCCESS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_REQUEST';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_ERROR = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_GET_PHIC_DOCUMENTS_ERROR';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_REQUEST = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_REQUEST';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_SUCCESS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_SUCCESS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_ERROR = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_LIST_DELETE_PHIC_DOCUMENT_ERROR';
