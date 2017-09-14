import Notifications from 'react-notification-system-redux';

import { deletePhicClaimsIssue } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc'
};

export default (state = {
    uploadingFiles: [],
    uploadDocumentsRequestPending: false
}, action) => {
    switch(action.type) {

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_ADD_UPLOAD_PHIC_DOCUMENTS:
        return {
            ...state,
            uploadingFiles: state.uploadingFiles.concat(action.payload)
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CHANGE_DOCUMENT_TYPE:
        return {
            ...state,
            uploadingFiles: state.uploadingFiles.map((t, i) => {
                if (action.index != i) return t;
                
                t.documentType = action.payload.code;
                t.documentValue = action.payload.value;
                return t;
            })
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_REMOVE_UPLOADING_PHIC_DOCUMENTS:
        return {
            ...state,
            uploadingFiles: state.uploadingFiles.filter((t, i) => i != action.payload)
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_REQUEST:
        return {
            ...state,
            uploadDocumentsRequestPending: true
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS:
        return {
            ...state,
            uploadDocumentsRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_ERROR:
        return {
            ...state,
            uploadDocumentsRequestPending: false
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CLEAR_UPLOADING_FILES:
        return {
            ...state,
            uploadingFiles: []
        };

    default: return state;
    }
};

export const addUploadingFiles = (files) => {
    return {
        payload: files,
        type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_ADD_UPLOAD_PHIC_DOCUMENTS
    };
};

export const changeDocumentType = (documentType, index) => {
    return {
        payload: documentType,
        index: index,
        type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CHANGE_DOCUMENT_TYPE
    };
};

export const removeUploadingFile = (index) => {
    return {
        payload: index,
        type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_REMOVE_UPLOADING_PHIC_DOCUMENTS
    };
};

export const uploadDocuments = (phicClaimId, files, closeDialog, hospitalCodeId) => (dispatch, getState, {clientBeacon}) => {

    let errorMsg = 'Spire.PDF Free version is limited to 10 pages of PDF. This limitation is enforced during loading and creating files.When converting PDF to Image, the first 3 pages of PDF files will be converted to Image format successfully.';

    if (!validateUploadingFiles(files, dispatch)) {
        return;
    }    

    dispatch(uploadDocumentsRequest());

    const headers = {
        'ContentType': 'multipart/form-data'
    };
    const formData = new FormData();
    files.forEach((t, i) => {
        formData.append(`documenttype_${i}`, t.documentType);
        formData.append(`documentvalue_${i}`, t.documentValue);
        formData.append(`file_${i}`, t);
    });

    clientBeacon
        .post(`api/PHICDocument/UploadDocuments?phicClaimId=${phicClaimId}&dateToday=${new Date().toISOString()}&hospitalCodeId=${hospitalCodeId}&returnDocument=${false}`, formData, headers)
        .then(response => {
            dispatch(uploadDocumentsSuccess(response.data));
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Documents successfully uploaded.',
                title: 'Success'
            }));

            // remove document issue 
            const issue = {
                category : 8,                
                claimId : phicClaimId
            };
            dispatch(deletePhicClaimsIssue(issue));
        
              
        })
        .catch(error => {
            dispatch(uploadDocumentsError());
            if (error.data.exceptionMessage == errorMsg) {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: 'Beacon Portal only supports 10 pages per document. If the file has exceeded the maximum number of pages, you need to provide a scanner that can support PDF/A documents',
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

const uploadDocumentsRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_REQUEST
});

const uploadDocumentsSuccess = (phicDocuments) => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS,
    payload: phicDocuments
});

const uploadDocumentsError = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_ERROR
});

export const clearUploadingFiles = () => ({
    type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CLEAR_UPLOADING_FILES
});

const validateUploadingFiles = (files, dispatch) => {

    if (files.length == 0) {
        dispatch(Notifications.info({
            ...notificationOpts,
            message: 'Please select a document to upload.',
            title: 'Info'
        }));
        return false;
    }

    const hasError = files.some(t => {
        if (t.type != 'application/pdf') {
            dispatch(Notifications.error({
                ...notificationOpts,
                message: `${t.name} is not a valid PDF/PDFA document.`,
                title: 'Error'
            }));
            return true;
        }
        if (!t.documentType) {
            dispatch(Notifications.error({
                ...notificationOpts,
                message: `Please specify document type for ${t.name}`,
                title: 'Error'
            }));
            return true;
        }
    });

    return !hasError;
};

const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_ADD_UPLOAD_PHIC_DOCUMENTS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_ADD_UPLOAD_PHIC_DOCUMENTS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CHANGE_DOCUMENT_TYPE = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CHANGE_DOCUMENT_TYPE';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_REMOVE_UPLOADING_PHIC_DOCUMENTS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_REMOVE_UPLOADING_PHIC_DOCUMENTS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_REQUEST = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_REQUEST';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_SUCCESS';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_ERROR = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_UPLOAD_DOCUMENTS_ERROR';
const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CLEAR_UPLOADING_FILES = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_CLEAR_UPLOADING_FILES';
