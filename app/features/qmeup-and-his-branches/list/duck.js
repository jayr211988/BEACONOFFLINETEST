import Notifications from 'react-notification-system-redux';

const QMU_HIS_BRANCHES_MAPPING_REQUEST = 'QMU_HIS_BRANCHES_MAPPING_REQUEST';
const QMU_HIS_BRANCHES_MAPPING_SUCCESS = 'QMU_HIS_BRANCHES_MAPPING_SUCCESS';
const QMU_HIS_BRANCHES_MAPPING_ERROR = 'QMU_HIS_BRANCHES_MAPPING_ERROR';

const PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST = 'PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST';
const PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS = 'PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS';
const PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR = 'PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR';

const PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS = 'PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_SUCCESS';
const PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR = 'PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_ERROR';
const PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST = 'PRODUCTS_PHIC_ECLAIMS_API_EDIT_CLIENT_SECRET_REQUEST';

//Foreign Action Type
const PRODUCTS_NEW_QMU_TO_HIS_API = 'PRODUCTS_NEW_QMU_TO_HIS_API';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    manageQmuHIsPending: false,
    ProductsBasicDialogPending: false,
    qmuForHis: null
}, action) => {
    
    switch (action.type) {

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

    case PRODUCTS_NEW_QMU_TO_HIS_API :   
        return state = {
            ...state,
            manageQmuHIsPending : false,
            qmuForHis : [...state.qmuForHis, action.payload] 
        };

    case PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST:
        state = {
            ...state,
            ProductsBasicDialogPending: true,      
            deletePhicEclaimsApiRequestPending: true
        };
        return state;
    case PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS:
        return state = {
            ...state,
            ProductsBasicDialogPending: false,      
            qmuForHis : state.qmuForHis.filter(product => product.id != action.payload),

        };
    case PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR :
        return state = {
            ...state,
            ProductsBasicDialogPending: false,      
        };
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
            qmuForHis: state.qmuForHis.map(t => {
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

    default : return state;    
    }

  
};

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

const productsDeleteQMUtoHISApiRequest = () => ({
    type: PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_REQUEST
});

const productsDeleteQMUtoHISApiSuccess = (productId) => ({
    type : PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_SUCCESS,
    payload : productId
});

const productsDeleteQMUtoHISApiError = () => ({
    type : PRODUCTS_PHIC_ECLAIMS_API_DELETE_PHIC_ECLAIMS_API_ERROR
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


/**
 * 
 * 
 * @export
 * @param {any} clientId 
 * @returns 
 */
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



 /**
 *  DELETE QMU TO HIS
 * 
 * @param {any} productClientCredentialId 
 * @param {any} productId 
 * @param {any} closeDialog 
 */
export const deleteQMUtoHISApi = (facilityId, qmuMappingId, productClientCredentialId,  productId, close) => (dispatch, getState, {clientBeacon, clientQmeUp}) => {    
    dispatch(productsDeleteQMUtoHISApiRequest());        

    const deleteQMU = () => {
        clientBeacon.delete(`/api/Product/DeleteQMUtoHISAPI?clientCredentialId=${productClientCredentialId}&productId=${productId}`)
            .then(() => {    
                dispatch(productsDeleteQMUtoHISApiSuccess(productId));
                close();               
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Product successfully removed.',
                    title: 'Success'
                }));   
            })
            .catch((error) => {         
                dispatch(productsDeleteQMUtoHISApiError());   
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
        close
    );
};



 /**
 *  EDIT QMU TO HIS ACCESS KEY
 * 
 * @param {any} productClientCredentialId 
 * @param {any} productId 
 * @param {any} closeDialog 
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
                dispatch(productsDeleteQMUtoHISApiError());   
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                        
            });
        

}