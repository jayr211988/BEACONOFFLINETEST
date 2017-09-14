import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST';
const CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS';
const CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR';

export default (state = {
    editPhicDischargeDiagnosisCustomDescriptionRequestPending: false
}, action) => {
    switch (action.type) {
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST:
        return {
            ...state,
            editPhicDischargeDiagnosisCustomDescriptionRequestPending: true
        };
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS:
        return {
            ...state,
            editPhicDischargeDiagnosisCustomDescriptionRequestPending: false
        };
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR:
        return {
            ...state,
            editPhicDischargeDiagnosisCustomDescriptionRequestPending: false
        };
    default: return state;
    }
};

export const editPHICDischargeDiagnosisCustomDescription = ({id, icD10CustomDescription}, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(editPHICDischargeDiagnosisCustomDescriptionRequest());

    clientBeacon
        .put(`api/PHICDischargeDiagnosis/EditPHICDischargeDiagnosisCustomDescription?phicDischargeDiagnosis=${id}&icd10CustomDescription=${icD10CustomDescription}`)
        .then((response) => {
            dispatch(editPHICDischargeDiagnosisCustomDescriptionSuccess(response.data));
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Custom description successfully modified.',
                title: 'Success'
            }));
            closeDialog();
        })
        .catch(error => {
            dispatch(editPHICDischargeDiagnosisCustomDescriptionError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const editPHICDischargeDiagnosisCustomDescriptionRequest = () => ({
    type: CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST
});

const editPHICDischargeDiagnosisCustomDescriptionSuccess = (dischargeDiagnosis) => ({
    type: CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS,
    payload: dischargeDiagnosis
});

export const editPHICDischargeDiagnosisCustomDescriptionError = () => ({
    type: CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR
});
