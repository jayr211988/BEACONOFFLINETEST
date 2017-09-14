import Notifications from 'react-notification-system-redux';

// *** extended function
import { deletePhicClaimsIssue, getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_REQUEST = 'CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_REQUEST';
const CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS = 'CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS';
const CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_ERROR = 'CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_ERROR';
const CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS = 'CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS';
const CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS = 'CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS';
const CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_REQUEST = 'CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_REQUEST';
const CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_ERROR = 'CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_ERROR';
const CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_REQUEST = 'CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_REQUEST';
const CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS = 'CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS';
const CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_ERROR = 'CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_ERROR';
const CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS';
const CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST';
const CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS';
const CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR = 'CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_ERROR';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR';

export default (state = {
    getPHICDischargeDiagnosisRequestPending: true,
    phicDischargeDiagnoses: [],
}, action) => {
    switch (action.type) {
    case CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_REQUEST:
        return {
            ...state,
            getPHICDischargeDiagnosisRequestPending: true
        };
    case CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS:
        return {
            ...state,
            getPHICDischargeDiagnosisRequestPending: false,
            phicDischargeDiagnoses: action.payload
        };
    case CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_ERROR:
        return {
            ...state,
            getPHICDischargeDiagnosisRequestPending: false
        };
    case CF2_DISCHARGE_DIAGNOSIS_NEW_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS:
        return {
            ...state,
            phicDischargeDiagnoses: [...state.phicDischargeDiagnoses, action.payload]
        };
    case CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_REQUEST:
        return {
            ...state,
            phicDischargeDiagnoses: state.phicDischargeDiagnoses.map(t => {
                t.primary = false;
                if (t.id != action.payload) return t;

                t.primary = true;
                t._primaryRequestPending = true;
                return t;
            })
        };
    case CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS:
        return {
            ...state,
            phicDischargeDiagnoses: state.phicDischargeDiagnoses.map(t => {
                t.primary = t.id == action.payload;
                t._primaryRequestPending = false;
                return t;
            })
        };
    case CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_ERROR:
        return {
            ...state
        };
    case CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_REQUEST:
        return {
            ...state,
        };
    case CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS:
        return {
            ...state,
            phicDischargeDiagnoses: state.phicDischargeDiagnoses.filter(t => t.id != action.payload)
        };
    case CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_ERROR:
        return {
            ...state,
        };
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS:
        return {
            ...state,
            phicDischargeDiagnoses: state.phicDischargeDiagnoses.map(t => {
                if (t.id != action.payload.id) return t;
                t.icD10CustomDescription = action.payload.icD10CustomDescription;
                return t;
            })
        };
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST:
        return {
            ...state
        };
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS:
        return {
            ...state,
            phicDischargeDiagnoses: state.phicDischargeDiagnoses.map(t => {
                if (t.id != action.payload.id) return t;
                t.icD10CustomDescription = action.payload.icD10CustomDescription;
                return t;
            })
        };
    case CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR:
        return {
            ...state
        };
    default: return state;
    }
};

export const getPHICDischargeDiagnoses = (phicCf2Id = 0) => (dispatch, getState, {clientBeacon}) => {
    dispatch(getPHICDischargeDiagnosesRequest());

    clientBeacon.get(`api/PHICDischargeDiagnosis/GetPHICDischargeDiagnoses?phicCF2Id=${phicCf2Id}`)
        .then(response => {
            dispatch(getPHICDischargeDiagnosesSuccess(response.data));
        })
        .catch(error => {
            dispatch(getPHICDischargeDiagnosesError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const editPrimaryPHICDischargeDiagnosis = (phicCf2Id, phicDischargeDiagnosisId) =>(dispatch, getState, {clientBeacon}) => {
    dispatch(editPrimaryPHICDischargeDiagnosisRequest(phicDischargeDiagnosisId));

    clientBeacon
        .put(`api/PHICDischargeDiagnosis/EditPrimaryPHICDischargeDiagnosis?phicCf2Id=${phicCf2Id}&phicDischargeDiagnosisId=${phicDischargeDiagnosisId}`)
        .then(() => {
            dispatch(editPrimaryPHICDischargeDiagnosisSuccess(phicDischargeDiagnosisId));
        })
        .catch(error => {
            dispatch(editPrimaryPHICDischargeDiagnosisError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const deletePHICDischargeDiagnosis = (dischargeDiagnosisId, claimId, changePendingRequest, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(deletePHICDischargeDiagnosisRequest());
    changePendingRequest(true);

    clientBeacon
        .delete(`api/PHICDischargeDiagnosis/DeletePHICDischargeDiagnosis?phicDischargeDiagnosisId=${dischargeDiagnosisId}`)
        .then(() => {
            dispatch(deletePHICDischargeDiagnosisSuccess(dischargeDiagnosisId));
            changePendingRequest(false);
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Discharge diagnosis successfully removed.',
                title: 'Success'
            }));

            dispatch(getPhicClaimsIssuesCount(claimId));    
        })
        .catch(error => {
            dispatch(deletePHICDischargeDiagnosisError());
            changePendingRequest(false);
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

export const editPHICDischargeDiagnosisCustomDescription = (id, changePendingRequest, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(editPHICDischargeDiagnosisCustomDescriptionRequest());
    changePendingRequest(true);

    clientBeacon
        .put(`api/PHICDischargeDiagnosis/EditPHICDischargeDiagnosisCustomDescription?phicDischargeDiagnosis=${id}`)
        .then((response) => {
            dispatch(editPHICDischargeDiagnosisCustomDescriptionSuccess(response.data));
            changePendingRequest(false);
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Discharge diagnosis description successfully reverted.',
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

export const newCaseRate = (caseRate, closeDialog, changePendingRequest, selectedTransmittal, id) => (dispatch, getState, {clientBeacon, clientEclaims}) => {
    dispatch(newCaseRateRequest());
    changePendingRequest(true);

    const newCaseRateAPI = (amount, caseRateCode) => {        
        
        caseRate.caseRateCode = caseRateCode;
        caseRate.caseRateAmount = caseRate.caseRateType == 0
            ? amount.pPrimaryCaseRate
            : amount.pSecondaryCaseRate;
        if (caseRate.caseRateType === 0) {
            caseRate.hospitalFee = amount.pPrimaryHCIFee;
            caseRate.profFee = amount.pPrimaryProfFee;
        } else {
            caseRate.hospitalFee = amount.pSecondaryHCIFee;
            caseRate.profFee = amount.pSecondaryProfFee;
        }
        
        clientBeacon
            .post('api/PHICAllCaseRate/NewPHICAllCaseRate', caseRate)
            .then(response => {          
                
                dispatch(newCaseRateSuccess(response.data));          
                
                closeDialog();
                changePendingRequest(false);
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: `Successfully tagged as ${ caseRate.caseRateType == 0 ? '1ST' : '2ND'} CASE RATE.`,
                    title: 'Success'
                }));
                
                
                
                // remove discharge error 
                const issue = {
                    category : 5,
                    claimId : id
                };
                        
                dispatch(deletePhicClaimsIssue(issue));

            })
            .catch(error => {
                changePendingRequest(false);
                dispatch(newCaseRateError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });
    };

    const searchCaseRateAPI = () => {
        clientEclaims
        .post('api/EClaims/v2/SearchCaseRate', {
            icD10Code: caseRate.icD10Code,
            caseRateDescription: '',
            rvsCode: '',
            phicIdentity: {
                hospitalCode: selectedTransmittal.hospitalCode
            }
        })
        .then(response => {   
            
            const caserates = response.data.caserates;
            let caserate;
            let amounts = [];
            let amount = null;            
            caserates.some(t => {
                if (t.pItemCode == caseRate.icD10Code) {
                    caseRate.caseRateGroupDescription = t.pCaseRateDescription;
                    amounts = t.amount;                      
                    caserate = t;                    
                }
            });            

            amounts.some(t => {
                // todo Rey
                // LEVEL 1
                if (selectedTransmittal.phichciType == 1 && t.pCheckFacilityH1 == 'T') {
                    amount = t;
                }
                // LEVEL 2
                else if (selectedTransmittal.phichciType == 2 && t.pCheckFacilityH2 == 'T') {
                    amount = t;
                }
                // LEVEL 3
                else if (selectedTransmittal.phichciType == 3 && t.pCheckFacilityH3 == 'T') {
                    amount = t;
                }
                // PCF
                else if (selectedTransmittal.phichciType == 4 && t.pCheckFacilityPCF == 'T') {
                    amount = t;
                }
                // ASC
                else if (selectedTransmittal.phichciType == 5 && t.pCheckFacilityASC == 'T') {
                    amount = t;
                } 
                // MAT
                else if (selectedTransmittal.phichciType == 6 && t.pCheckFacilityMAT == 'T') {
                    amount = t;
                }
                // FSDC
                else if (selectedTransmittal.phichciType == 7 && t.pCheckFacilityFSDC == 'T') {
                    amount = t;
                }
                else if (   t.pCheckFacilityASC == 'F' && 
                            t.pCheckFacilityFSDC == 'F' && 
                            t.pCheckFacilityH1 == 'F' && 
                            t.pCheckFacilityH2 == 'F' && 
                            t.pCheckFacilityH3 == 'F' && 
                            t.pCheckFacilityMAT == 'F' &&
                            t.pCheckFacilityPCF == 'F') {
                    amount = t;
                }
            });

            if (!amount) {
                dispatch(Notifications.info({
                    ...notificationOpts,
                    message: 'Case Rate not found.',
                    title: 'Info'
                }));
                changePendingRequest(false);
                return;
            }            
            newCaseRateAPI(amount, caserate.pCaseRateCode);
        })
        .catch(error => {
            changePendingRequest(false);
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
    };
    
    searchCaseRateAPI();
};

export const deletePHICAllCaseRate = (allCaseRateId, claimId) => (dispatch, getState, {clientBeacon}) => {
    dispatch(deletePHICAllCaseRateRequest());

    clientBeacon
        .delete(`api/PHICAllCaseRate/DeletePHICAllCaseRate?allCaseRateId=${allCaseRateId}`)
        .then(() => {
            dispatch(deletePHICAllCaseRateSuccess(allCaseRateId));
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Successfully untagged as CASE RATE.',
                title: 'Success'
            }));

            dispatch(getPhicClaimsIssuesCount(claimId));
        })
        .catch(error => {
            dispatch(deletePHICAllCaseRateError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const deletePHICAllCaseRateRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST
});

const deletePHICAllCaseRateSuccess = (allCaseRateId) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS,
    payload: allCaseRateId
});

const deletePHICAllCaseRateError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR
});

const newCaseRateRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_REQUEST
});

const newCaseRateSuccess = (caseRate) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS,
    payload: caseRate
});

const newCaseRateError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_ERROR
});

const editPHICDischargeDiagnosisCustomDescriptionRequest = () => ({
    type: CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_REQUEST
});

const editPHICDischargeDiagnosisCustomDescriptionSuccess = (dischargeDiagnosis) => ({
    type: CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_SUCCESS,
    payload: dischargeDiagnosis
});

export const editPHICDischargeDiagnosisCustomDescriptionError = () => ({
    type: CF2_PHIC_DISCHARGE_DIAGNOSIS_LIST_EDIT_PHIC_DISCHARGE_DIAGNOSIS_CUSTOM_DESCRIPTION_ERROR
});

const deletePHICDischargeDiagnosisRequest = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_REQUEST
});

const deletePHICDischargeDiagnosisSuccess = (phicCF2Id) => ({
    type: CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS,
    payload: phicCF2Id
});

const deletePHICDischargeDiagnosisError = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_DELETE_PHIC_DISCHARGE_DIAGNOSIS_ERROR
});

const editPrimaryPHICDischargeDiagnosisRequest = (phicDischargeDiagnosisId) => ({
    type: CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_REQUEST,
    payload: phicDischargeDiagnosisId
});

const editPrimaryPHICDischargeDiagnosisSuccess = (phicDischargeDiagnosisId) => ({
    type: CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS,
    payload: phicDischargeDiagnosisId
});

const editPrimaryPHICDischargeDiagnosisError = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_EDIT_PRIMARY_PHIC_DISCHARGE_DIAGNOSIS_ERROR
});

const getPHICDischargeDiagnosesRequest = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_REQUEST
});

const getPHICDischargeDiagnosesSuccess = (dischargeDiagnoses) => ({
    type: CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_SUCCESS,
    payload: dischargeDiagnoses
});

const getPHICDischargeDiagnosesError = () => ({
    type: CF2_DISCHARGE_DIAGNOSIS_GET_PHIC_DISCHARGE_DIAGNOSIS_ERROR
});
