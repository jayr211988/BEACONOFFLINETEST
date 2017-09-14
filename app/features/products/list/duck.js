

import Notifications from 'react-notification-system-redux';

const PRODUCTS_GET_SELECTED_CLIENT = 'PRODUCTS_GET_SELECTED_CLIENT';
const PRODUCTS_GET_CLIENT_BY_ID_REQUEST = 'PRODUCTS_GET_CLIENT_BY_ID_REQUEST';
const PRODUCTS_GET_CLIENT_BY_ID_SUCCESS = 'PRODUCTS_GET_CLIENT_BY_ID_SUCCESS';
const PRODUCTS_GET_CLIENT_BY_ID_ERROR = 'PRODUCTS_GET_CLIENT_BY_ID_ERROR';

const PRODUCTS_LIST_REQUEST = 'PRODUCTS_LIST_REQUEST';
const PRODUCTS_LIST_SUCCESS = 'PRODUCTS_LIST_SUCCESS';
const PRODUCTS_LIST_ERROR = 'PRODUCTS_LIST_ERROR';

// add product eclaims form 
const PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_REQUEST = 'PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_REQUEST';
const PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_SUCCESS = 'PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_SUCCESS';
const PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_ERROR = 'PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_ERROR';

// add product eclaims api
const PRODUCTS_NEW_PHIC_ECLAIMS_API_REQUEST = 'PRODUCTS_NEW_PHIC_ECLAIMS_API_REQUEST';
const PRODUCTS_NEW_PHIC_ECLAIMS_API_SUCCESS = 'PRODUCTS_NEW_PHIC_ECLAIMS_API_SUCCESS';
const PRODUCTS_NEW_PHIC_ECLAIMS_API_ERROR = 'PRODUCTS_NEW_PHIC_ECLAIMS_API_ERROR';

const PRODUCTS_NEW_QMU_TO_HIS_API = 'PRODUCTS_NEW_QMU_TO_HIS_API';
const PRODUCTS_NEW_QMU_TO_EHR_API = 'PRODUCTS_NEW_QMU_TO_EHR_API';
const PRODUCTS_NEW_QMU_TO_EHR_PRIVATE_API = 'PRODUCTS_NEW_QMU_TO_EHR_PRIVATE_API';

const PRODUCTS_REFRESH_REQUEST = 'PRODUCTS_REFRESH_REQUEST';
const PRODUCTS_REFRESH_SUCCESS = 'PRODUCTS_REFRESH_SUCCESS';
const PRODUCTS_REFRESH_ERROR = 'PRODUCTS_REFRESH_ERROR';


// 5/12/2017 TO DO REY
// const PRODUCTS_REFRESH_COUNT_OF_HOSPITAL_CODE = 'PRODUCTS_REFRESH_COUNT_OF_HOSPITAL_CODE';


const PRODUCTS_SELECTED_HOSPITAL_PRIMARY_CODE = 'PRODUCTS_SELECTED_HOSPITAL_PRIMARY_CODE';

const PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST = 'PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST';
const PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS = 'PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS';
const PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR = 'PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR';

const PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST = 'PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST';
const PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS = 'PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS';
const PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR = 'PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR';

const PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_REQUEST = 'PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_REQUEST';
const PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_SUCCESS = 'PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_SUCCESS';
const PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_ERROR = 'PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_ERROR';

const QMU_HIS_BRANCHES_MAPPING_REQUEST = 'QMU_HIS_BRANCHES_MAPPING_REQUEST';
const QMU_HIS_BRANCHES_MAPPING_SUCCESS= 'QMU_HIS_BRANCHES_MAPPING_SUCCESS';
const QMU_HIS_BRANCHES_MAPPING_ERROR = 'QMU_HIS_BRANCHES_MAPPING_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};


export default (state = {
    newProductPhicEclaimsFormRequestPending : false,
    newProductPhicEclaimsApiRequestPending: false,
    newProductQMUtoHISApiRequestPending: false,
    newProductQMUtoEHRApiRequestPending: false,
    newProductQMUtoEHRPrivateApiRequestPending: false,
    refreshProductsListRequestPending : false,
    getClientByIdPending: false,
    productsListRequestPending : true,
    productsList : [],
    listOfHospitalCode: [],
    hospitalCodeName: '',
    deletePhicEclaimsApiRequestPending: false,
    ProductsBasicDialogPending : false,
    qmuForHis: null

}, action) => {
    switch(action.type) {

    case PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_REQUEST : 
        return state = {
            ...state,
            deleteProductPhicEclaimsFormRequestPending : true
        };

    case PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_SUCCESS : 
        return state = {
            ...state,
            deleteProductPhicEclaimsFormRequestPending : false,
            productsList: state.productsList.filter(product => product.id != action.payload),
        };

    case PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_ERROR :
        return state = {
            ...state,
            deleteProductPhicEclaimsFormRequestPending : false
        } ;

    case PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST:
        state = {
            ...state,
            ProductsBasicDialogPending: true,            
        };
        return state;

    case PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS:
        state = {
            ...state,
            ProductsBasicDialogPending: false,
            productsList: state.productsList.map(t => {
                if (!t.productClientCredentials) return;

                t.productClientCredentials = t.productClientCredentials.map(u => {
                    if (u.id == action.payload.id) u.clientSecret = action.payload.clientSecret;
                    return u;
                });
                return t;
            })
        };
        return state;

    case PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR:
        state = {
            ...state,
            ProductsBasicDialogPending: false,
        };
        return state;
    case PRODUCTS_GET_SELECTED_CLIENT:
        state = {
            ...state,
            selectedClient : action.payload
        };
        return state;
    
    case PRODUCTS_GET_CLIENT_BY_ID_REQUEST :
        state = {
            ...state,     
            getClientByIdPending: true,      
        };
        return state;
    case PRODUCTS_GET_CLIENT_BY_ID_SUCCESS :
        state = {
            ...state,
            getClientByIdPending: false,
        };
        return state;
    case PRODUCTS_GET_CLIENT_BY_ID_ERROR:
        state = {
            ...state,
            getClientByIdPending: false,
        };
        return state;
    case PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_REQUEST : 
        return state = {
            ...state,
            newProductPhicEclaimsFormRequestPending : true
        };

    case PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_SUCCESS : 
        return state = {
            ...state,
            newProductPhicEclaimsFormRequestPending : false,
            productsList : [ ...state.productsList, action.product ]
        };

    case PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_ERROR : 
        return state = {    
            ...state,
            newProductPhicEclaimsFormRequestPending : false
        };        
    case PRODUCTS_REFRESH_REQUEST :
        return state = {
            productsList : [],
            selectedClient : action.selectedClient,
            
            refreshProductsListRequestPending : true
        };

    case PRODUCTS_REFRESH_SUCCESS :
        return state = {
            ...state,
            productsList : action.productsList,
            selectedClient : action.selectedClient,
            refreshProductsListRequestPending : false
        };

    case PRODUCTS_REFRESH_ERROR :
        return state ={
            productsList : [],
            refreshProductsListRequestPending : false
        };

    case PRODUCTS_LIST_REQUEST : 
        return state = {
            ...state,
            productsListRequestPending : true
        };

    case PRODUCTS_LIST_SUCCESS : 
        return state = {
            ...state,
            productsListRequestPending : false,
            productsList : action.productsList
        };

    case PRODUCTS_LIST_ERROR :
        return state = {
            ...state,
            productsListRequestPending : false
        };

    case PRODUCTS_NEW_PHIC_ECLAIMS_API_REQUEST:
        return state = {
            ...state,
            newProductPhicEclaimsApiRequestPending: true
        };

    case PRODUCTS_NEW_PHIC_ECLAIMS_API_SUCCESS:
        return state = {
            ...state,
            newProductPhicEclaimsApiRequestPending: false,
            productsList: [...state.productsList, action.payload]
        };
    case PRODUCTS_NEW_PHIC_ECLAIMS_API_ERROR:
        return state = {
            ...state,
            newProductPhicEclaimsApiRequestPending: false
        };
    // global qmu to ehr 
    case PRODUCTS_NEW_QMU_TO_EHR_PRIVATE_API : 
        return state = {
            ...state,
            productsList: [...state.productsList, action.payload]
        };
    // global qmu to his
    case PRODUCTS_NEW_QMU_TO_HIS_API :         
        return state = {
            ...state,
            productsList : state.productsList.some(t => t.productType == action.payload.productType)
                ? state.productsList
                : [ ...state.productsList, action.payload ],
            qmuForHis : [...state.qmuForHis, action.payload]


        };
    // global qmu to ehr 
    case PRODUCTS_NEW_QMU_TO_EHR_API : 
        return state = {
            ...state,
            productsList: [...state.productsList, action.payload]
        };
    case PRODUCTS_SELECTED_HOSPITAL_PRIMARY_CODE : {
        return state = {
            ...state,
            hospitalCodeName: action.payload
        };
    }
    case PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST:
        state = {
            ...state,
            ProductsBasicDialogPending: true
             
        };
        return state;

    case PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS:
        state = {
            ...state,
            ProductsBasicDialogPending: false,
            productsList : state.productsList.filter(product => product.id != action.payload),
            qmuForHis : state.qmuForHis.filter(product => product.id != action.payload)
        };
        return state;

    case PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR:
        state = {
            ...state,
            ProductsBasicDialogPending: false
        };
        return state;

    case QMU_HIS_BRANCHES_MAPPING_REQUEST :
        return state = {
            ...state,
            manageQmuHIsPending : true
        };
    
    case QMU_HIS_BRANCHES_MAPPING_SUCCESS :
        return state = {
            ...state,
            manageQmuHIsPending : false,
            qmuForHis : action.payload
        };

    case QMU_HIS_BRANCHES_MAPPING_ERROR :
        return state = {
            ...state,
            manageQmuHIsPending : false
        };

    default: return state;
    }
};



const getselectedClient =(response) => ({
    type: PRODUCTS_GET_SELECTED_CLIENT,
    payload: response
});


const getselectedClientRequest = () => ({
    type: PRODUCTS_GET_CLIENT_BY_ID_REQUEST
});
const getselectedClientSuccess = () => ({
    type: PRODUCTS_GET_CLIENT_BY_ID_SUCCESS
});
const getselectedClientError =() => ({
    type: PRODUCTS_GET_CLIENT_BY_ID_ERROR
});

const getProductsListRequest = () => ({
    type : PRODUCTS_LIST_REQUEST
});
const getProductsListSuccess = ( productsList ) => ({
    type : PRODUCTS_LIST_SUCCESS,
    productsList
});

const getProductsListError = () => ({
    type : PRODUCTS_LIST_ERROR
});

// ** new product ECLAIMS FORM
const newProductPhicEclaimsFormRequest = () => ({
    type : PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_REQUEST
});
const newProductPhicEclaimsFormSuccess = ( product ) => ({
    type : PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_SUCCESS,
    product
});
const newProductPhicEclaimsFormError = () => ({
    type : PRODUCTS_NEW_PHIC_ECLAIMS_FORMS_ERROR
});
// ** end of ECLAIMS FORM

// ** new product ECLAIMS API
const newProductPhicEclaimsApiRequest = () => ({
    type: PRODUCTS_NEW_PHIC_ECLAIMS_API_REQUEST
});
const newProductPhicEclaimsApiSuccess = (product) => ({
    type: PRODUCTS_NEW_PHIC_ECLAIMS_API_SUCCESS,
    payload: product
});
const newProductPhicEclaimsApiError = () => ({
    type: PRODUCTS_NEW_PHIC_ECLAIMS_API_ERROR
});
// ** end of ECLAIMS API


const refreshClientUsersListRequest = ( selectedClient ) => ({
    type : PRODUCTS_REFRESH_REQUEST,
    selectedClient
});

const refreshClientUsersListSuccess = ( productsList, selectedClient ) => ({
    type : PRODUCTS_REFRESH_SUCCESS,
    productsList,
    selectedClient
});

const refreshClientUsersListError = () => ({
    type : PRODUCTS_REFRESH_ERROR
});

// 5/12/2017 TO DO REY
// const refreshCountOfHospitalCode = (listOfHospitalCode) => ({
//     type : PRODUCTS_REFRESH_COUNT_OF_HOSPITAL_CODE,
//     payload: listOfHospitalCode
// });

// const selectedHospitalPrimaryCode = (hospitalCodeName) => ({
//     type: PRODUCTS_SELECTED_HOSPITAL_PRIMARY_CODE,
//     payload: hospitalCodeName
// });


// *** DELETE PHIC ECLAIMS
const productsDeletePhicEclaimsApiRequest = () => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST
});

const productsDeletePhicEclaimsApiSuccess = (productId) => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS,
    payload: productId
});
const productsDeletePhicEclaimsApiError = () => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR
});
//** EDIT CLIENT SECRET
const productsEditClientSecretSuccess = (response) => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS,
    payload: response
});

const productsEditClientSecretError = () => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR
});

const productsEditClientSecretRequest = () => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST
});

const deleteProductPhicEclaimsFormRequest = () => ({
    type : PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_REQUEST
});

const deleteProductPhicEclaimsFormSuccess = ( productId ) => ({
    type : PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_SUCCESS,
    payload: productId
});

const deleteProductPhicEclaimsFormError = () => ({
    type : PRODUCTS_PHIC_ECLAIMS_FORM_DELETE_ERROR
});

const manageQmuHisRequest = () => ({
    type : QMU_HIS_BRANCHES_MAPPING_REQUEST
});

const manageQmuHisSuccess = (product) => ({
    type : QMU_HIS_BRANCHES_MAPPING_SUCCESS,
    payload : product
});

const manageQmuHisError = () => ({
    type: QMU_HIS_BRANCHES_MAPPING_ERROR
});



export const  getSelectedClient = (id) => (dispatch, getState, {clientBeacon}) => {
    dispatch(getselectedClientRequest());
    clientBeacon
        .get(`/api/Client/GetClientById?clientId=${id}`)
        .then((res) => {            
            dispatch(getselectedClient(res.data));
            dispatch(getselectedClientSuccess());
        })
        .catch((error) => {
            dispatch(getselectedClientError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));
        });                 
};


/**
 * Get Products List
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function getProductsList ( clientId ) {
    return (dispatch, getState, {clientBeacon}) => {        
        dispatch(getProductsListRequest());
        clientBeacon.get(`/api/Product/GetAllProducts?clientId=${clientId}`)
            .then(response => {
                dispatch(getProductsListSuccess(response.data));
            })
            .catch(error => {                     
                dispatch(getProductsListError());                
                
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                 
            });
    };
}


/**
 * New Product Phic Eclaims Form
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function newProductPhicEclaimsForm ( clientId ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(newProductPhicEclaimsFormRequest());
        clientBeacon.post(`/api/Product/NewPhicEclaimsForm?clientId=${clientId}`)
            .then( response => {
                dispatch(newProductPhicEclaimsFormSuccess(response.data));                
            })

            .catch(error => {
                dispatch(newProductPhicEclaimsFormError());               
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                   
            });
    };
}


/**
 * Refresh Products List
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function refreshProductsList ( clientId ) {
    return (dispatch, getState, {clientBeacon}) => {

        const { selectedClient } = getState().productListReducer;

        dispatch(refreshClientUsersListRequest(selectedClient));

        clientBeacon.get(`/api/Product/GetAllProducts?clientId=${clientId}`)

            .then(response => {
                dispatch(refreshClientUsersListSuccess(response.data, selectedClient));
            })

            .catch(error => {
                dispatch(refreshClientUsersListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                 
            });
    };
}

/**
 *  Display Notification is QMU to HIS is Exist
 * 
 * @export
 * @returns
 */
export function checkIfHISisExist() {
    return (dispatch) => {
        dispatch(Notifications.info({
            ...notificationOpts,
            message: 'QMU to HIS is Already Exist',
            title: 'QMU to HIS'
        }));  
    };
}


/**
 * New Product Phic Eclaims API
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function newProductPhicEclaimsApi ( clientId ) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(newProductPhicEclaimsApiRequest());

        clientBeacon.post(`/api/Product/NewPHICEclaimsApi?clientId=${clientId}`)
            .then( response => {
                dispatch(newProductPhicEclaimsApiSuccess(response.data));
            })
            .catch(error => {
                dispatch(newProductPhicEclaimsApiError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                   
            });
    };
}


/**
 * DELETE PHIC ECLAIMS
 * 
 * @export
 * @param {any} productId
 * @param {any} closePhicEclaimsFormDelete
 * @returns
 */
export const deletePhicEclaimsApi = (productClientCredentialId,  productId, closeDialog) => (dispatch, getState, {clientBeacon}) => {    
    dispatch(productsDeletePhicEclaimsApiRequest());        

    clientBeacon.delete(`/api/Product/DeletePHICEclaimsAPI?clientCredentialId=${productClientCredentialId}&productId=${productId}`)
        .then(() => {        
            
            dispatch(productsDeletePhicEclaimsApiSuccess(productId));
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Product successfully removed.',
                title: 'Success'
            }));   
        })
        .catch((error) => {            
            dispatch(productsDeletePhicEclaimsApiError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));
        });
};



/**
 * DELETE QMU to HIS API
 * 
 * @export
 * @param {any} productId
 * @param {any} closePhicEclaimsFormDelete
 * @returns
 */
export const  deleteQMUtoHISApi = (facilityId, qmuMappingId, productClientCredentialId,  productId, closeDialog) => (dispatch, getState, {clientBeacon, clientQmeUp}) => {    
    
    dispatch(productsDeletePhicEclaimsApiRequest());        

    const deleteQMU = () => {
        clientBeacon.delete(`/api/Product/DeleteQMUtoHISAPI?clientCredentialId=${productClientCredentialId}&productId=${productId}`)
        .then(() => {                    
            dispatch(productsDeletePhicEclaimsApiSuccess(productId));            
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Product successfully removed.',
                title: 'Success'
            }));   
        })
        .catch((error) => {            
            dispatch(productsDeletePhicEclaimsApiError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));
        });
    };

    unmapHIStoFacility(
        facilityId,
        qmuMappingId,
        dispatch,
        clientQmeUp,
        deleteQMU,
        closeDialog
    );
    
};




/**
 * DELETE QMU to HIS API
 * 
 * @export
 * @param {any} productId
 * @param {any} closePhicEclaimsFormDelete
 * @returns
 */
export const deleteQMUtoEHRApi = (facilityId,qmuMappingId, productClientCredentialId,  productId, closeDialog) => (dispatch, getState, {clientBeacon, clientQmeUp}) => {    
    dispatch(productsDeletePhicEclaimsApiRequest());        
    

    clientBeacon.delete(`/api/Product/DeleteQMUtoEHRAPI?clientCredentialId=${productClientCredentialId}&productId=${productId}`)
        .then(() => {        
            
            dispatch(productsDeletePhicEclaimsApiSuccess(productId));

            unmapEHRtoFacility(
                facilityId,
                qmuMappingId,
                dispatch,
                clientQmeUp,
                closeDialog
            );

            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Product successfully removed.',
                title: 'Success'
            }));   
        })
        .catch((error) => {            
            dispatch(productsDeletePhicEclaimsApiError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));
        });
};



/**
 * DELETE QMU to EHR Private API
 * 
 * @export
 * @param {any} productId
 * @param {any} closePhicEclaimsFormDelete
 * @returns
 */
export const deleteQMUtoEHRPrivateApi = (facilityId, qmuMappingId, productClientCredentialId,  productId, closeDialog) => (dispatch, getState, {clientBeacon, clientQmeUp}) => {    
    dispatch(productsDeletePhicEclaimsApiRequest());        

    clientBeacon.delete(`/api/Product/DeleteQMUtoEHRPrivate?clientCredentialId=${productClientCredentialId}&productId=${productId}`)
        .then(() => {        
            
            dispatch(productsDeletePhicEclaimsApiSuccess(productId));
            closeDialog();

            unmapEHRPrivatetoFacility(
                facilityId,
                qmuMappingId,
                dispatch,
                clientQmeUp,
                closeDialog
            );


            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Product successfully removed.',
                title: 'Success'
            }));   
        })
        .catch((error) => {            
            dispatch(productsDeletePhicEclaimsApiError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));
        });
};




/**
 *  Unmap Product QMU to HIS API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
function unmapHIStoFacility(facilityId, hisId, dispatch, clientQmeUp, deleteQMU, close) {      
    let newObj = {
        facilityId : facilityId,
        hISId : `${'QMUAPIHIS'}-${hisId}`
    };
    
    clientQmeUp.put('/api/Facility/UnmapHIStoFacility', newObj)
            .then((response) => {
                if (response.data) {
                    deleteQMU();                    
                    dispatch(Notifications.success({
                        ...notificationOpts,
                        message: 'Success UnMapping of HIS Facility',
                        title: 'Success'
                    }));      
                }                
            })
            .catch(error => {
                close();
                dispatch(productsDeletePhicEclaimsApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                        
            });
        

}



/**
 *  Unmap Product QMU to EHR API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
function unmapEHRtoFacility(facilityId, ehrId, dispatch, clientQmeUp, close) {      
    let newObj = {
        facilityId : facilityId,
        ehrId : `${'QMUAPIEHR'}-${ehrId}`
    };
    clientQmeUp.put('/api/Facility/UnmapEHRtoFacility', newObj)
            .then(() => {
                
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success UnMapping of HIS Facility',
                    title: 'Success'
                })); 
            })
            .catch(error => {
                close();
                dispatch(productsDeletePhicEclaimsApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
}


/**
 *  Unmap Product QMU to EHR PRIVATE API
 * 
 * @export
 * @param {any} facility
 * @returns
 */
function unmapEHRPrivatetoFacility(facilityId, ehrId, dispatch, clientQmeUp, close) {      
    let newObj = {
        facilityId : facilityId,
        ehrId : `${'QMUAPIEHRPRIVATE'}-${ehrId}`
    };
    clientQmeUp.put('/api/Facility/UnmapEHRtoFacility', newObj)
            .then(() => {
                
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success UnMapping of HIS Facility',
                    title: 'Success'
                })); 
            })
            .catch(error => {
                close();
                dispatch(productsDeletePhicEclaimsApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });

}




/**
 * Delete Product Phic Eclaims Form
 * 
 * @export
 * @param {any} productClientCredentialId
 * @param {any} closeDialog
 * @returns
 */
export const editClientSecret = (productClientCredentialId, closeDialog) => (dispatch, getState, {clientBeacon}) => {
    dispatch(productsEditClientSecretRequest());
    clientBeacon.put(`/api/Product/EditClientSecret?clientCredentialId=${productClientCredentialId}`)
        .then((response) => {
            dispatch(productsEditClientSecretSuccess(response.data));
            closeDialog();
            dispatch(Notifications.success({
                ...notificationOpts,
                message: 'Client access key successfully changed.',
                title: 'Success'
            }));     
        })
        .catch((error) => {
            dispatch(productsEditClientSecretError());
            dispatch(Notifications.error({
                ...notificationOpts,
                title: 'Error',
                message: error.data.exceptionMessage
            }));  
        });
};




    
/**
 * Delete Product Phic Eclaims Form
 * 
 * @export
 * @param {any} productId
 * @param {any} deleteProductPhicEclaimsForm
 * @returns
 */
export function deleteProductPhicEclaimsForm(productId, closePhicEclaimsFormDelete ) {
    return (dispatch, getState, {clientBeacon}) => {                
        dispatch(deleteProductPhicEclaimsFormRequest());
        clientBeacon.delete(`/api/Product/DeletePhicEclaimsForm?productId=${productId}`)
            .then(() => {                
                closePhicEclaimsFormDelete();
                dispatch(deleteProductPhicEclaimsFormSuccess(productId));
            })

            .catch(error => {
                dispatch(deleteProductPhicEclaimsFormError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                   
            });
    };
}

export function getListOfFacilities (clientId) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(manageQmuHisRequest());
        clientBeacon.get(`/api/Product/GetAllHisProduct?clientId=${clientId}`)
            .then(response => {
                dispatch(manageQmuHisSuccess(response.data));
            })
            .catch(error => {                     
                dispatch(manageQmuHisError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));
            }
                
            );

    };
}