import Notifications from 'react-notification-system-redux';



const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_REQUEST = 'CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_REQUEST';
const CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_SUCCESS = 'CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_SUCCESS';
const CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_ERROR = 'CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_ERROR';
const CF2_DISCHARGE_DIAGNOSIS_CLEAR_ICD10S = 'CF2_DISCHARGE_DIAGNOSIS_CLEAR_ICD10S';
const CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS = 'CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS';
const CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_ERROR = 'CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_ERROR';
const CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_EXIST = 'CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_EXIST';
const CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_REQUEST = 'CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_REQUEST';

export default (state = {
    searchICD10RequestPending: false,
    phicICD10s: [],
    newPHICDischargeDiagnosisRequestPending: false
}, action) => {
    switch (action.type) {

    case CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_REQUEST:
        return {
            ...state,
            searchICD10RequestPending: true
        };

    case CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_SUCCESS:
        return {
            ...state,
            searchICD10RequestPending: false,
            phicICD10s: action.payload
        };

    case CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_ERROR:
        return {
            ...state,
            searchICD10RequestPending: false
        };

    case CF2_DISCHARGE_DIAGNOSIS_CLEAR_ICD10S:
        return {
            ...state,
            phicICD10s: []
        };

    case CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS:
        return {
            ...state,
            newPHICDischargeDiagnosisRequestPending: false
        };

    case CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_ERROR:
        return {
            ...state,
            newPHICDischargeDiagnosisRequestPending: false
        };

    case CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_REQUEST:
        return {
            ...state,
            newPHICDischargeDiagnosisRequestPending: true
        };

    case CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_EXIST:
        return {
            ...state,
            newPHICDischargeDiagnosisRequestPending: false
        };

    default: return state;
    }
};

const searchICD10Request = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_REQUEST
});

const searchICD10success = (icd10s) => ({
    type: CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_SUCCESS,
    payload: icd10s
});

const clearICD10s = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_CLEAR_ICD10S
});

const searchICD10error = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_NEW_SEARCH_ICD10_ERROR
});

export const searchICD10 = (search = '') => (dispatch, getState, {clientBeacon}) => {
    if (search.length == 0) {
        dispatch(clearICD10s());
        return;
    }
    if (search.length < 2) return;

    dispatch(searchICD10Request());

    clientBeacon
        .get(`api/ICD10/SearchICD10?search=${search}`)
        .then((response) => {
            dispatch(searchICD10success(response.data));
        })
        .catch((error) => {
            dispatch(searchICD10error());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const clearPHICICD10s = () => {
    return clearICD10s();
};

export const newPHICDischargeDiagnosis = (phicCf2Id, icd10, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    if (!icd10) {
        dispatch(Notifications.info({
            ...notificationOpts,
            message: 'Please select ICD10 item',
            title: 'Info'
        }));
        return;
    }

    dispatch(newPHICDischargeDiagnosisRequest());

    clientBeacon
        .post('api/PHICDischargeDiagnosis/NewPHICDischargeDiagnosis', {
            phiccF2Id: phicCf2Id,
            ...icd10
        })
        .then(response => {
            // *** check if not exist
            if(response.data) {
                dispatch(newPHICDischargeDiagnosisSuccess(response.data));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Discharge diagnosis successfully added.',
                    title: 'Success'
                }));
                closeDialog();

            } else {
                dispatch(newPHICDischargeDiagnosisExist(icd10));
                dispatch(Notifications.info({
                    ...notificationOpts,
                    message: `${icd10.icD10Value} is already exist`,
                    title: 'Not Allowed For Duplication'
                }));
            }
        })
        .catch(error => {
            dispatch(newPHICDischargeDiagnosisError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const newPHICDischargeDiagnosisSuccess = (dischargeDiagnosis) => ({
    type: CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS,
    payload: dischargeDiagnosis
});

const newPHICDischargeDiagnosisError = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_ERROR
});

const newPHICDischargeDiagnosisExist = (dischargeDiagnosis) => ({
    type : CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_EXIST,
    payload: dischargeDiagnosis
});

const newPHICDischargeDiagnosisRequest = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_REQUEST
});
