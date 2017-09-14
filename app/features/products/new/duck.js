import Notifications from 'react-notification-system-redux';
import { qmuApiType } from '../../../util/data/index.js';

const PRODUCTS_QMEUP_API_REQUEST = 'PRODUCTS_QMEUP_API_REQUEST';
const PRODUCTS_QMEUP_API_SUCCESS = 'PRODUCTS_QMEUP_API_SUCCESS';
const PRODUCTS_QMEUP_API_ERROR = 'PRODUCTS_QMEUP_API_ERROR';

// global
const PRODUCTS_NEW_QMU_TO_HIS_API = 'PRODUCTS_NEW_QMU_TO_HIS_API';
const PRODUCTS_NEW_QMU_TO_EHR_API = 'PRODUCTS_NEW_QMU_TO_EHR_API';
const PRODUCTS_NEW_QMU_TO_EHR_PRIVATE_API = 'PRODUCTS_NEW_QMU_TO_EHR_PRIVATE_API';

const SEARCH_QMEUP_FACILITY = 'SEARCH_QMEUP_FACILITY';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};


export default (state = {
    qmeupFacilities : null,
    newProductQmeUpApiPending: true
}, action) => {

    switch (action.type) {

    case PRODUCTS_QMEUP_API_REQUEST :
        return state = {
            ...state,
            newProductQmeUpApiPending : true                                
        };

    case PRODUCTS_QMEUP_API_SUCCESS : 
        return state = {
            ...state,
            newProductQmeUpApiPending : false,
            qmeupFacilities : action.payload            
        };

    case PRODUCTS_QMEUP_API_ERROR : 
        return state = {
            ...state,
            newProductQmeUpApiPending : false
        };

    case SEARCH_QMEUP_FACILITY : 
        return state = {
            ...state,
            qmeupFacilities : state.qmeupFacilities.filter(t => t.name && t.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1)
        };
    default : return state;
    }
    
};


const newProductQMUtoEHRApi = (product) => ({
    type : PRODUCTS_NEW_QMU_TO_EHR_API,
    payload: product
});

const newProductQMUtoEHRPrivateApi = (product)  => ({
    type : PRODUCTS_NEW_QMU_TO_EHR_PRIVATE_API,
    payload : product
});

const newProductQMUtoHISApi = (product)  => ({
    type : PRODUCTS_NEW_QMU_TO_HIS_API,
    payload : product
});

const newProductQmeUpApiRequest = () => ({
    type : PRODUCTS_QMEUP_API_REQUEST
});

const newProductQmeUpApiSuccess = (facilities) => ({
    type : PRODUCTS_QMEUP_API_SUCCESS,
    payload: facilities
});

const newProductQmeUpApiError = () => ({
    type : PRODUCTS_QMEUP_API_ERROR
});


const getSearchFacility = (facilityName) => ({
    type: SEARCH_QMEUP_FACILITY,
    payload: facilityName
});


/**
 *  GET ALL UNMAPPED FACILITY FOR EHR 
 * 
 * @export
 * @returns
 */
export function getListofUnmappedEHRFacility () {
    return (dispatch, getState, { clientQmeUp }) => {

        dispatch(newProductQmeUpApiRequest());
        clientQmeUp.get('/api/Facility/GetAllUnmappedEHRFacilities')
            .then(response => {
                dispatch(newProductQmeUpApiSuccess(response.data));
            })
            .catch(error => {
                dispatch(newProductQmeUpApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));  
            });
    }; 
}


export function displaySearchFacility(facilityName) {
    return (dispatch, getState, {}) => {
        dispatch(getSearchFacility(facilityName));
    };
}



/**
 *  GET ALL UNMAPPED FACILITY FOR HIS
 * 
 * @export
 * @returns
 */
export function getListofUnmappedHISFacility () {
    return (dispatch, getState, { clientQmeUp }) => {

        dispatch(newProductQmeUpApiRequest());
        clientQmeUp.get('/api/Facility/GetAllUnmappedHisBranches')
            .then(response => {
                dispatch(newProductQmeUpApiSuccess(response.data));
            })
            .catch(error => {
                dispatch(newProductQmeUpApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));  
            });
    }; 
}



/**
 *  GET UNMAPPED FACILITY FOR EHR PRIVATE
 * 
 * @export
 * @returns
 */
export function getListofUnmappedEHRPrivateFacility () {
    return (dispatch, getState, { clientQmeUp }) => {

        dispatch(newProductQmeUpApiRequest());
        clientQmeUp.get('/api/Facility/GetAllUnmappedPrivateEHR')
            .then(response => {
                dispatch(newProductQmeUpApiSuccess(response.data));
            })
            .catch(error => {
                dispatch(newProductQmeUpApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));  
            });
    }; 
}

/**
 *  Add Product QMU to HIS API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
export function newFacilityForQMUtoHIS(facility) {
    return (dispatch, getState, {clientBeacon, clientQmeUp}) => {
        clientBeacon.post('/api/Product/NewQMUtoHISApi',facility)

            .then(response => {
                dispatch(newProductQMUtoHISApi(response.data));
                
                mappedHISFacility(response.data.productClientCredentials[0].qmuapiFacilityMapping.facilityId,
                                    response.data.productClientCredentials[0].qmuapiFacilityMapping.id, 
                                    dispatch, clientQmeUp);
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success Adding of QMU to HIS API',
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


/**
 *  Add Product QMU to EHR Private API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
export function newFacilityForQMUtoEHRPrivate(facility) {
    return (dispatch, getState, {clientBeacon, clientQmeUp}) => {
        clientBeacon.post('/api/Product/NewQMUtoEHRPrivateApi', facility)

            .then(response => {
                dispatch(newProductQMUtoEHRPrivateApi(response.data));

                mappedEHRPrivateFacility(
                    response.data.productClientCredentials[0].qmuapiFacilityMapping.facilityId,
                    response.data.productClientCredentials[0].qmuapiFacilityMapping.id,
                    dispatch,
                    clientQmeUp
                );
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success Adding of QMU to EHR Private API',
                    title: 'Success'
                })); 
            })
            .catch(error => {
                error.data.exceptionMessage == qmuApiType.qmuToEhrPrivate ?
                    dispatch(Notifications.info({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'QMU to EHR PRIVATE'
                    })) :

                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));
            });
    };
}


/**
 *  Add Product QMU to EHR API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
export function newFacilityForQMUtoEHR(facility) {
    return (dispatch, getState, {clientQmeUp, clientBeacon }) => {
        clientBeacon.post('/api/Product/NewQMUtoEHRApi', facility)
            .then(response => {

                dispatch(newProductQMUtoEHRApi(response.data));                
                mappedEHRFacility(
                    response.data.productClientCredentials[0].qmuapiFacilityMapping.facilityId,
                    response.data.productClientCredentials[0].qmuapiFacilityMapping.id,
                    dispatch,
                    clientQmeUp
                );
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success Adding of QMU to EHR API',
                    title: 'Success'
                })); 
            })
            .catch(error => {
                error.data.exceptionMessage == qmuApiType.qmuToEhr ?
                    dispatch(Notifications.info({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'QMU to EHR'
                    })) :
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    }));
            });
    };
}

/**
 *  MAPPED EHR FACILITY
 * 
 * @param {any} facilityId
 * @param {any} ehrId
 * @param {any} dispatch
 * @param {any} clientQmeUp
 */
function mappedEHRFacility(facilityId, ehrId, dispatch, clientQmeUp) {
    let ehrObj = {
        facilityId : facilityId,      
        ehrId: `${'QMUAPIEHR'}-${ehrId}`,
    };
    clientQmeUp.put('api/Facility/MapEHRToFacility', ehrObj)
        .then(() => {
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Success Mapping of EHR Facility',
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
}



/**
 *  MAPPED EHR PRIVATE FACILITY
 * 
 * @param {any} facilityId
 * @param {any} ehrId
 * @param {any} dispatch
 * @param {any} clientQmeUp
 */
function mappedEHRPrivateFacility(facilityId, ehrId, dispatch, clientQmeUp) {
    let ehrObj = {
        facilityId : facilityId,
        ehrId: `${'QMUAPIEHRPRIVATE'}-${ehrId}`
    };
    clientQmeUp.put('api/Facility/MapPrivateEHRToFacility', ehrObj)
        .then(() => {
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Success Mapping of EHR Private Facility',
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
}

/**
 *  Add Product QMU to HIS API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
function mappedHISFacility(facilityId, hisId, dispatch, clientQmeUp) {      
    let newObj = {
        facilityId : facilityId,
        hisBranchId : `${'QMUAPIHIS'}-${hisId}`
    };
    clientQmeUp.put('/api/Facility/MapHISBranchToFacility', newObj)
            .then(() => {
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success Mapping of HIS Facility',
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

}