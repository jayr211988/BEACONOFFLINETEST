import Notifications from 'react-notification-system-redux';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_ERROR';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_EXIST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_EXIST';

const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    surgicalProcedureResult: []

}, action) => {
    switch (action.type) {

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_REQUEST:
            return state = {
                ...state,
                newPhicClaimsDetailsCf2SurgicalProcedureRequestPending: true
            };

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS:
            return state = {
                ...state,
                newPhicClaimsDetailsCf2SurgicalProcedureRequestPending: false
            };

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_EXIST:
            return state = {
                ...state,
                newPhicClaimsDetailsCf2SurgicalProcedureRequestPending: false
            };

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_ERROR:
            return state = {
                ...state,
                newPhicClaimsDetailsCf2SurgicalProcedureRequestPending: false
            };

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_REQUEST:
            return state = {
                ...state,
                searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending: true
            };

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_SUCCESS:
            return state = {
                ...state,
                surgicalProcedureResult: action.surgicalProcedureResult,
                searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending: false
            };

        case PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_ERROR:
            return state = {
                ...state,
                searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending: false
            };

        default: return state;
    }
};

// *** NEW SURGICAL PROCEDURE
const newPhicClaimsDetailsCf2SurgicalProcedureRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_REQUEST
});

const newPhicClaimsDetailsCf2SurgicalProcedureSuccess = (surgicalProcedure) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_SUCCESS,
    surgicalProcedure
});

const newPhicClaimsDetailsCf2SurgicalProcedureExist = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_EXIST
});

const newPhicClaimsDetailsCf2SurgicalProcedureError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_NEW_ERROR
});

// *** SEARCH SURGICAL PROCEDURE
const searchPhicClaimsDetailsCf2SurgicalProcedureRequest = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_REQUEST
});

const searchPhicClaimsDetailsCf2SurgicalProcedureSuccess = (surgicalProcedureResult) => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_SUCCESS,
    surgicalProcedureResult
});

const searchPhicClaimsDetailsCf2SurgicalProcedureError = () => ({
    type: PHIC_CLAIMS_DETAILS_CF2_SURGICAL_PROCEDURES_SEARCH_ERROR
});

/**
 * New Phic Claims Details CF2 Surgicl Procedure
 * 
 * @export
 * @param {any} value
 * @param {any} fields
 * @param {any} closeDialog
 * @returns
 */
export function newPhicClaimsDetailsCf2SurgicalProcedure(value, fields, closeDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        const repetitive =  value.repetitive == 'Y' ? true : false;

        const execute = () => {
            dispatch(newPhicClaimsDetailsCf2SurgicalProcedureRequest());

            const surgical = {
                ...value, 
                repetitive : repetitive
            };

            clientBeacon.post('/api/PHICSurgicalProcedure/NewPHICSurgicalProcedure', surgical)

                .then((response) => {

                    // *** Check if exist
                    // *** [this code is usesless.]
                    if (response.data) {
                        closeDialog();
                        fields.push(response.data);
                        dispatch(newPhicClaimsDetailsCf2SurgicalProcedureSuccess(response.data));

                        dispatch(Notifications.success({
                            ...notificationOpts,
                            message: 'New Surgical Procedure successfully addded',
                            title: 'Success'
                        }));


                    } else {
                        dispatch(newPhicClaimsDetailsCf2SurgicalProcedureExist());

                        dispatch(Notifications.info({
                            ...notificationOpts,
                            message: 'New Surgical Procedure successfully addded',
                            title: 'Not Allowed For Duplication'
                        }));
                    }
                })

                .catch(error => {
                    dispatch(newPhicClaimsDetailsCf2SurgicalProcedureError());

                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));
                });
        };

        //console.log(value);

        if (repetitive) {
            if (!value.numberOfSessions || !value.typeCode) {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: 'Field cannot be null.',
                    title: 'Error'
                }));
            }
            else{
                execute();
            }
        }
        else {
            if (!value.sessionDate || !value.lateralityCode) {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: 'Field cannot be null.',
                    title: 'Error'
                }));
            }
            else{
                execute();
            }
        }
    };
}

/**
 * Search Phic Claims Details CF2 Surgicl Procedure
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function searchPhicClaimsDetailsCf2SurgicalProcedure(value) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(searchPhicClaimsDetailsCf2SurgicalProcedureRequest());

        clientBeacon.get(`api/PHICSurgicalProcedure/SearchSurgicalProcedure?search=${value}`)

            .then(response => {
                dispatch(searchPhicClaimsDetailsCf2SurgicalProcedureSuccess(response.data));
            })

            .catch(error => {
                dispatch(searchPhicClaimsDetailsCf2SurgicalProcedureError());

                dispatch(Notifications.error({
                    ...notificationOpts,

                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            });

    };
}