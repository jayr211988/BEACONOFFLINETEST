import Notifications from 'react-notification-system-redux';
import { getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';
import { onComputeTotalCaseRateAmountNewbornPackage } from '../../../../util/helpers/helper';


const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_ERROR';


const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : true,
    editPhicSurgicalProcedureSessionLateralityRequestPending : false,
    surgicalProceduresList: []

}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST :
        return state = {
            ...state,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS : 
        return state = {
            ...state,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : false,
            surgicalProceduresList : action.surgicalProceduresList
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_ERROR :
        return state = {
            ...state,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_REQUEST : 
        return state = {
            ...state,
            deletePhicClaimsDetailsCf2SurgicalProcedureRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_SUCCESS :
        return state = {
            ...state,
            surgicalProceduresList : state.surgicalProceduresList.filter(t => t.id !== action.surgicalProcedureId),

            deletePhicClaimsDetailsCf2SurgicalProcedureRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_ERROR :
        return state = {
            ...state,
            deletePhicClaimsDetailsCf2SurgicalProcedureRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS : 
        return state = {
            ...state,
            surgicalProceduresList : [...state.surgicalProceduresList, action.surgicalProcedure]
        };

    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_REQUEST :
        return state = {
            ...state,
            editPhicSurgicalProcedureSessionLateralityRequestPending : true
        };
    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_SUCCESS :           
        return state = {
            ...state,
            editPhicSurgicalProcedureSessionLateralityRequestPending : false,             
        };
    case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_ERROR : 
        return state = {
            ...state,
            editPhicSurgicalProcedureSessionLateralityRequestPending : false
        };
    default: return state;
    }
};

// *** GET PHIC SURGICAL PROCEDURE LIST
const getPhicClaimsDetailsCf2SurgicalProcedureListRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_REQUEST
});

const getPhicClaimsDetailsCf2SurgicalProcedureListSuccess = (surgicalProceduresList) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_SUCCESS,
    surgicalProceduresList
});

const getPhicClaimsDetailsCf2SurgicalProcedureListError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURE_LIST_ERROR
});

// *** DELETE PHIC SURGICAL PROCEDURE
const deletePhicClaimsDetailsCf2SurgicalProcedureRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_REQUEST
});

const deletePhicClaimsDetailsCf2SurgicalProcedureSuccess = (surgicalProcedureId) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_SUCCESS,
    surgicalProcedureId
});

const deletePhicClaimsDetailsCf2SurgicalProcedureError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_DELETE_ERROR
});


const editPhicSurgicalProcedureLateralityRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_REQUEST
});
const editPhicSurgicalProcedureLateralitySuccess = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_SUCCESS,    
});
const editPhicSurgicalProcedureLateralityError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SURGICAL_LATERALITY_ERROR
});


export function editLateralityOfSelectedSessions(sessionInformation) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(editPhicSurgicalProcedureLateralityRequest());

        clientBeacon.post('/api/PHICSurgicalProcedure/EditPHICSurgicalProcedureLateralitySession', sessionInformation)
            .then(() => {                
                dispatch(editPhicSurgicalProcedureLateralitySuccess());
            })
            .catch( error => {                
                dispatch(editPhicSurgicalProcedureLateralityError());                
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };
}

/**
 * Get Phic Claims Details CF2 Surgical Procedure
 * 
 * @export
 * @param {any} cf2Id
 * @returns
 */
export function getPhicClaimsDetailsCf2SurgicalProcedureList(cf2Id) {
    return (dispatch, getState, { clientBeacon }) => {
        
        dispatch(getPhicClaimsDetailsCf2SurgicalProcedureListRequest());

        clientBeacon.get(`api/PHICSurgicalProcedure/GetPHICSurgicalProcedure?cf2Id=${cf2Id}`)

            .then(response => {
                dispatch(getPhicClaimsDetailsCf2SurgicalProcedureListSuccess(response.data));
            })

            .catch(error => {
                dispatch(getPhicClaimsDetailsCf2SurgicalProcedureListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };
}

/**
 * Delete Phic Claims Details CF2 Surgical Procedure
 * 
 * @export
 * @param {any} surgicalProcedureId
 * @param {any} fields
 * @param {any} index
 * @param {any} closeBasicDialog
 * @param {any} changePendingRequest
 * @returns
 */
export function deletePhicClaimsDetailsCf2SurgicalProcedure(surgicalProcedureId, fields, index, closeBasicDialog, changePendingRequest) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(deletePhicClaimsDetailsCf2SurgicalProcedureRequest());
        changePendingRequest(true);

        clientBeacon.delete(`api/PHICSurgicalProcedure/DeletePHICSurgicalProcedure?surgicalProcedureId=${surgicalProcedureId}`)

            .then(() => {
                closeBasicDialog();
                fields.remove(index);
                changePendingRequest(false);
                dispatch(deletePhicClaimsDetailsCf2SurgicalProcedureSuccess(surgicalProcedureId));
                
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Successfully removed',
                    title: 'Success'
                }));                    
            })

            .catch(error => {
                dispatch(deletePhicClaimsDetailsCf2SurgicalProcedureError());
                changePendingRequest(false);

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                 
            });  
    };
}

export const newPHICAllCaseRate = (newCaseRate, closeBasicDialog, changePendingRequest, selectedTransmittal, id, session, selectedLaterality, selectedCf2) => (dispatch, getState, {clientBeacon, clientEclaims}) => {
    dispatch(newPHICAllCaseRateRequest());
    changePendingRequest(true);    
    
    const newCaseRateAPI = (amount, caseRateCode, caserate) => {                

        newCaseRate.caseRateCode = caseRateCode;
        if (selectedLaterality == 'N/A') {
            selectedLaterality = 'NA';
        }
        newCaseRate.lateralityType = selectedLaterality;

        newCaseRate.caseRateAmount = newCaseRate.caseRateType == 0
            ? computeCaseRate(session.typeCode, newCaseRate.sessions.length, amount.pPrimaryCaseRate, newCaseRate.sessions, selectedLaterality)
            : computeCaseRate(session.typeCode, newCaseRate.sessions.length, amount.pSecondaryCaseRate, newCaseRate.sessions, selectedLaterality);


        if (newCaseRate.caseRateType === 0) {
            newCaseRate.hospitalFee = amount.pPrimaryHCIFee;
            newCaseRate.profFee = amount.pPrimaryProfFee;
        } else {
            newCaseRate.hospitalFee = amount.pSecondaryHCIFee;
            newCaseRate.profFee = amount.pSecondaryProfFee;
        }            

        clientBeacon
            .post('api/PHICAllCaseRate/NewPHICAllCaseRate', newCaseRate)
            .then(response => {
                closeBasicDialog();
                changePendingRequest(false);
                dispatch(newPHICAllCaseRateSuccess(response.data));

                if(newCaseRate.rvsCode == '99432'){
                    dispatch(onComputeTotalCaseRateAmountNewbornPackage(response.data, selectedCf2, null, null, null));
                }             

                dispatch(Notifications.success({
                    ...notificationOpts,
                    //message: `Successfully tagged as ${newCaseRate.caseRateType == 0 ? '1ST' : '2ND'} CASE RATE.`,                  
                    message : newCaseRate.caseRateType == 0 ? 'Success on tagging 1st case rate' : 'Success on tagging 2nd case rate',                    
                    title: 'Success'
                }));
          
            })
            .catch(error => {
                changePendingRequest(false);
                dispatch(newPHICAllCaseRateError());
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
                icD10Code: '',
                caseRateDescription: '',
                rvsCode: newCaseRate.rvsCode,
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
                    if (t.pItemCode == newCaseRate.rvsCode) {
                        amounts = t.amount;
                        newCaseRate.caseRateGroupDescription = t.pCaseRateDescription;
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
                                t.pCheckFacilityPCF == 'F' ) {                                    
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

                newCaseRateAPI(amount, caserate.pCaseRateCode, caserate);
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

const computeCaseRate = (procedureType, sessionCount, caseRateAmount, sessions, selectedLaterality) => {
    let lateralityCount = 0;
    

    sessions.map((t) => {
        switch (t.lateralityCode) {
        case 'B' : 
            return t.lateralityValue = 'Both';                   
        case 'L' :
            return t.lateralityValue = 'Left';
        case 'R' :
            return t.lateralityValue = 'Right';
        default : 
            return t.lateralityValue = 'N/A';
        }
    });    
    
    switch(procedureType) {

    case 'CHEMOTHERAPY':
        return caseRateAmount;
    case 'PERITONEAL':
        return parseInt(sessionCount / 4) * caseRateAmount;
    default:
    
        // TODO CHRIS REFACTOR 
        // Minimize code !!
        switch(selectedLaterality) {        
        case 'Left' :            
            sessions.map((t) => {
                if (t.lateralityValue == 'Left' ) {
                    lateralityCount ++;
                }
            });
            return caseRateAmount * lateralityCount;
        case 'Right' :
            sessions.map((t) => {
                if (t.lateralityValue == 'Right' ) {
                    lateralityCount ++;
                }
            });
            return caseRateAmount * lateralityCount;
        case 'Both' :
            sessions.map((t) => {
                if (t.lateralityValue == 'Both' ) {
                    lateralityCount ++;
                }
            });
            return caseRateAmount * lateralityCount;
        case 'N/A' : 
        case 'NA' :
            sessions.map((t) => {
                if (t.lateralityValue == 'NA' || t.lateralityValue == 'N/A') {
                    lateralityCount ++;
                }
            });
            return caseRateAmount * lateralityCount;
        }        
    }
};

const newPHICAllCaseRateRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_REQUEST
});

const newPHICAllCaseRateSuccess = (caseRate) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS,
    payload: caseRate
});

const newPHICAllCaseRateError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_ERROR
});

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

const deletePHICAllCaseRateSuccess = (caseRateId) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS,
    payload: caseRateId
});

const deletePHICAllCaseRateError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_ERROR
});
