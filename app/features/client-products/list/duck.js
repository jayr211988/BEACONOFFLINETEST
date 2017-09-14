import Notifications from 'react-notification-system-redux';

const CLIENT_PRODUCTS_REFRESH_REQUEST = 'CLIENT_PRODUCTS_REFRESH_REQUEST';
const CLIENT_PRODUCTS_REFRESH_SUCCESS = 'CLIENT_PRODUCTS_REFRESH_SUCCESS';
const CLIENT_PRODUCTS_REFRESH_ERROR = 'CLIENT_PRODUCTS_REFRESH_ERROR';

const CLIENT_PRODUCTS_LIST_REQUEST = 'CLIENT_PRODUCTS_LIST_REQUEST';
const CLIENT_PRODUCTS_LIST_SUCCESS = 'CLIENT_PRODUCTS_LIST_SUCCESS';
const CLIENT_PRODUCTS_LIST_ERROR = 'CLIENT_PRODUCTS_LIST_ERROR';

const CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST';
const CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS';
const CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR';

const CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_REQUEST = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_REQUEST';
const CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_SUCCESS = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_SUCCESS';
const CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_ERROR = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_ERROR';

const CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_REQUEST = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_ERROR';
const CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_SUCCESS = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_SUCCESS';
const CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_ERROR = 'CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_ERROR';

// 5/12/2017 TO DO REY
// const CLIENTS_REFRESH_COUNT_OF_HOSPITAL_CODE = 'CLIENTS_REFRESH_COUNT_OF_HOSPITAL_CODE';
// const CLIENTS_SELECTED_HOSPITAL_PRIMARY_CODE = 'CLIENTS_SELECTED_HOSPITAL_PRIMARY_CODE';


const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default function reducer(state = {
    clientProductsList : [],
    getClientProductsListRequestPending : true,
    refreshClientProductsListRequestPending : false,
    clientProductsBasicDialogPending : false

}, action = {}) {
    switch (action.type) {
    case CLIENT_PRODUCTS_REFRESH_REQUEST : 
        return state = {    
            ...state,
            refreshClientProductsListRequestPending : true
        };

    case CLIENT_PRODUCTS_REFRESH_SUCCESS :
        return state = {
            ...state,
            refreshClientProductsListRequestPending : false,
            clientProductsList : action.clientProductsList
        };

    case CLIENT_PRODUCTS_REFRESH_ERROR :
        return state = {
            ...state,
            refreshClientProductsListRequestPending : false
        };

    case CLIENT_PRODUCTS_LIST_REQUEST :
        return state = {
            ...state,
            getClientProductsListRequestPending: true
        };

    case CLIENT_PRODUCTS_LIST_SUCCESS : 
        return state = {
            ...state,
            getClientProductsListRequestPending : false,
            clientProductsList: action.payload
        };

    case CLIENT_PRODUCTS_LIST_ERROR : 
        return state = {
            ...state,
            getClientProductsListRequestPending : false
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST :
        return state = {
            ...state,
            clientProductsBasicDialogPending : true
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS :
        return state = {
            ...state,
            clientProductsList: state.clientProductsList.map(t => {
                if (!t.productClientCredentials) return t;

                t.productClientCredentials = t.productClientCredentials.map(u => {
                    if (u.id == action.payload.id) u.clientSecret = action.payload.clientSecret;
                    return u;
                });
                return t;
            }),
            clientProductsBasicDialogPending : false,
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR : 
        return state = {
            ...state,
            clientProductsBasicDialogPending : false
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_REQUEST : 
        return state = {
            ...state,
            clientProductsBasicDialogPending : true
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_SUCCESS :
        return state = {
            ...state,
            clientProductsList: state.clientProductsList.filter(product => product.id != action.productId),
            clientProductsBasicDialogPending : false,
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_ERROR :
        return state ={
            ...state,
            clientProductsBasicDialogPending : false
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_REQUEST :
        return state = {
            ...state,
            clientProductsBasicDialogPending : true
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_SUCCESS :
        return state = {
            ...state,
            clientProductsList: state.clientProductsList.filter(product => product.id != action.productId),
            clientProductsBasicDialogPending : false
        };

    case CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_ERROR :
        return state = {
            ...state,
            clientProductsBasicDialogPending : false
        };

    default : return state;
    }
}

// *** GET CLIENT PRODUCTS LIST
const getClientProductsListRequest = () => ({
    type: CLIENT_PRODUCTS_LIST_REQUEST
});

const getClientProductsListSuccess = (products) => ({
    type: CLIENT_PRODUCTS_LIST_SUCCESS,
    payload: products
});

const getClientProductsListError = () => ({
    type: CLIENT_PRODUCTS_LIST_ERROR,
});

// **** REFRESH CLIENT PRODUCTS LIST
const refreshClientProductsListRequest = () => ({
    type : CLIENT_PRODUCTS_REFRESH_REQUEST
});

const refreshClientProductsListSuccess = ( clientProductsList ) => ({
    type : CLIENT_PRODUCTS_REFRESH_SUCCESS,
    clientProductsList
});

const refreshClientProductsListError = () => ({
    type : CLIENT_PRODUCTS_REFRESH_ERROR
});

// *** EDIT CLIENT SECRET
const editPhicEclaimsApiClientSecretSuccess = (response) => ({
    type: CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS,
    payload: response
});

const editPhicEclaimsApiClientSecretError = () => ({
    type: CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR
});

const editPhicEclaimsApiClientSecretRequest = () => ({
    type: CLIENT_PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST
});

// *** DELETE PHIC ECLAIMS API
const deletePhicEclaimsApiRequest = () => ({
    type: CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_REQUEST
});

const deletePhicEclaimsApiSuccess = (productId) => ({
    type: CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_SUCCESS,
    productId
});
const deletePhicEclaimsApiError = () => ({
    type: CLIENT_PRODUCTS_PHIC_ECLAIMS_API_DELETE_ERROR
});

// *** DELETE PHIC ECLAIMS
const deletePhicEclaimsRequest = () => ({
    type : CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_REQUEST
});

const deletePhicEclaimsSuccess = (productId) => ({
    type : CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_SUCCESS,
    productId,
});

const deletePhicEclaimsError = () => ({
    type : CLIENT_PRODUCTS_PHIC_ECLAIMS_DELETE_ERROR
});

// 5/12/2017 TO DO REY
// const refreshCountOfHospitalCode = (listOfHospitalCode) => ({
//     type : CLIENTS_REFRESH_COUNT_OF_HOSPITAL_CODE,
//     payload: listOfHospitalCode
// });

// const selectedHospitalPrimaryCode = (hospitalCodeName) => ({
//     type: CLIENTS_SELECTED_HOSPITAL_PRIMARY_CODE,
//     payload: hospitalCodeName
// });


/**
 * REFRESH CLIENT PRODUCTS LIST
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function refreshClientProductsList ( clientId ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(refreshClientProductsListRequest());

        clientBeacon.get(`/api/Product/GetAllProducts?clientId=${clientId}`)

            .then(response => {
                dispatch(refreshClientProductsListSuccess(response.data));
            })

            .catch(error => {
                dispatch(refreshClientProductsListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                    
                }));                 
            });
    };
}

/**
 * GET CLIENT PRODUCTS LIST
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function getClientProductsList ( clientId ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(getClientProductsListRequest());

        clientBeacon.get(`/api/Product/GetAllProducts?clientId=${clientId}`)

            .then(response => {
                dispatch(getClientProductsListSuccess(response.data));
            })

            .catch(error => {
                dispatch(getClientProductsListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                 
            });
    };
}

/**
 * EDIT PHIC ECLAIMS CLIENT SECRET
 * 
 * @export
 * @param {any} productClientCredentialId
 * @param {any} closeDialog
 * @returns
 */
export function editPhicEclaimsApiClientSecret (productClientCredentialId, closeBasicDialog) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(editPhicEclaimsApiClientSecretRequest());

        clientBeacon.put(`/api/Product/EditClientSecret?clientCredentialId=${productClientCredentialId}`)
            .then((response) => {
                closeBasicDialog();
                dispatch(editPhicEclaimsApiClientSecretSuccess(response.data));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Client access key successfully changed.',
                    title: 'Success'
                }));     
            })
            .catch((error) => {
                closeBasicDialog();
                dispatch(editPhicEclaimsApiClientSecretError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
                }));  
            });
    };
}

/**
 * DELETE PHIC ECLAIMS API
 * 
 * @export
 * @param {any} productClientCredentialId
 * @param {any} closeDialog
 * @param {any} productId
 * @returns
 */
export function deletePhicEclaimsApi (productClientCredentialId, productId, closeBasicDialog) {
    return  (dispatch, getState, {clientBeacon}) => {
        dispatch(deletePhicEclaimsApiRequest());

        clientBeacon.delete(`/api/Product/DeletePHICEclaimsAPI?clientCredentialId=${productClientCredentialId}&productId=${productId}`)
            .then(() => {
                closeBasicDialog();
                dispatch(deletePhicEclaimsApiSuccess(productId));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Product successfully removed.',
                    title: 'Success'
                }));   
            })
            .catch((error) => {
                closeBasicDialog();
                dispatch(deletePhicEclaimsApiError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    title: 'Error',
                    message: error.data.exceptionMessage
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
export function deletePhicEclaims( productId, closeBasicDialog ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(deletePhicEclaimsRequest());

        clientBeacon.delete(`/api/Product/DeletePhicEclaimsForm?productId=${productId}`)
            .then(() => {
                closeBasicDialog();
                dispatch(deletePhicEclaimsSuccess(productId));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Product successfully removed.',
                    title: 'Success'                    
                }));                
            })

            .catch(error => {
                closeBasicDialog();
                dispatch(deletePhicEclaimsError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                   
            });
    };
}



// Get total Hospital Code Count when Modal is close / open
// export function totalHospitalCodeCount() {
//     return (dispatch, getState) => {        
//         setTimeout(() => {
//             const {listOfHospitalCode} = getState().clientProductsPhicEclaimsFormListReducer;
//             dispatch(refreshCountOfHospitalCode(listOfHospitalCode));
            
//             listOfHospitalCode.map(function(val) {
//                 if (val.primaryCode === true) {
//                     dispatch(selectedHospitalPrimaryCode(val.hospitalCode));                   
//                 }
//             });
//         }, 1000);
//     };
// }
