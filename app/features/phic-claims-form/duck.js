import Notifications from 'react-notification-system-redux';

// new
const PHIC_CLAIMS_FORM_HOSPITAL_CODE_REQUEST = 'PHIC_CLAIMS_FORM_HOSPITAL_CODE_REQUEST';
const PHIC_CLAIMS_FORM_HOSPITAL_CODE_SUCCESS = 'PHIC_CLAIMS_FORM_HOSPITAL_CODE_SUCCESS';
const PHIC_CLAIMS_FORM_HOSPITAL_CODE_ERROR = 'PHIC_CLAIMS_FORM_HOSPITAL_CODE_ERROR';

const PHIC_CLAIMS_GET_HOSPITAL_CODE_REQUEST = 'PHIC_CLAIMS_GET_HOSPITAL_CODE_REQUEST';
const PHIC_CLAIMS_GET_HOSPITAL_CODE_SUCCESS = 'PHIC_CLAIMS_GET_HOSPITAL_CODE_SUCCESS';
const PHIC_CLAIMS_GET_HOSPITAL_CODE_ERROR = 'PHIC_CLAIMS_GET_HOSPITAL_CODE_ERROR';

const PHIC_CLAIMS_EDIT_HOSPITAL_CODE_REQUEST = 'PHIC_CLAIMS_EDIT_HOSPITAL_CODE_REQUEST';
const PHIC_CLAIMS_EDIT_HOSPITAL_CODE_SUCCESS = 'PHIC_CLAIMS_EDIT_HOSPITAL_CODE_SUCCESS';
const PHIC_CLAIMS_EDIT_HOSPITAL_CODE_ERROR = 'PHIC_CLAIMS_EDIT_HOSPITAL_CODE_ERROR';

const PHIC_CLAIMS_DELETE_HOSPITAL_CODE_REQUEST = 'PHIC_CLAIMS_DELETE_HOSPITAL_CODE_REQUEST';
const PHIC_CLAIMS_DELETE_HOSPITAL_CODE_SUCCESS = 'PHIC_CLAIMS_DELETE_HOSPITAL_CODE_SUCCESS';
const PHIC_CLAIMS_DELETE_HOSPITAL_CODE_ERROR = 'PHIC_CLAIMS_DELETE_HOSPITAL_CODE_ERROR';

const PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_REQUEST = 'PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_REQUEST';
const PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_SUCCESS = 'PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_SUCCESS';
const PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_ERROR = 'PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_ERROR';

const PHIC_CLAIMS_UPDATE_PHIC_HCI_REQUEST = 'PHIC_CLAIMS_UPDATE_PHIC_HCI_REQUEST';
const PHIC_CLAIMS_UPDATE_PHIC_HCI_SUCCESS = 'PHIC_CLAIMS_UPDATE_PHIC_HCI_SUCCESS';
const PHIC_CLAIMS_UPDATE_PHIC_HCI_ERROR = 'PHIC_CLAIMS_UPDATE_PHIC_HCI_ERROR';

const PHIC_CLAIMS_CHECK_IF_HOSPITAL_CODE_HAS_DUPLICATE = 'PHIC_CLAIMS_CHECK_IF_HOSPITAL_CODE_HAS_DUPLICATE';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    addHospitalCodeRequest : false,
    getHospitalCodeRequest : false,
    deleteHospitalCodePendingRequest: false,
    listOfHospitalCode : [],
    isSamePHICPackage : false

}, action) => {
    switch (action.type) {       
    // new case 
    case PHIC_CLAIMS_FORM_HOSPITAL_CODE_REQUEST : 
        return state = {
            ...state,
            addHospitalCodeRequest: true
        };
    case PHIC_CLAIMS_FORM_HOSPITAL_CODE_SUCCESS : 
        return state = {
            ...state,
            addHospitalCodeRequest: false,
            listOfHospitalCode : action.payload

        };
    case PHIC_CLAIMS_FORM_HOSPITAL_CODE_ERROR : 
        return state = {
            ...state,
            addHospitalCodeRequest: false
        };

    // get list of hospital code
    case PHIC_CLAIMS_GET_HOSPITAL_CODE_REQUEST : 
        return state = {
            ...state,
            getHospitalCodeRequest: true
        };
    case PHIC_CLAIMS_GET_HOSPITAL_CODE_SUCCESS :         
        return state = {
            ...state,
            getHospitalCodeRequest: false,
            listOfHospitalCode : action.payload
        };
    case PHIC_CLAIMS_GET_HOSPITAL_CODE_ERROR : 
        return state = {
            ...state,
            getHospitalCodeRequest: false
        };
    // edit hospital code 
    case PHIC_CLAIMS_EDIT_HOSPITAL_CODE_REQUEST :
        return state = {
            ...state
        };
    case PHIC_CLAIMS_EDIT_HOSPITAL_CODE_SUCCESS : 
        return state = {
            ...state,
            listOfHospitalCode : state.listOfHospitalCode.map(t => {
                if (t.id === action.id) {
                    t.hospitalCode = action.newHospitalCode;
                }
                return t;
            })
        };
    case PHIC_CLAIMS_EDIT_HOSPITAL_CODE_ERROR : 
        return state = {
            ...state
        };
    // delete hospital code
    case PHIC_CLAIMS_DELETE_HOSPITAL_CODE_REQUEST : 
        return state = {
            ...state,
            deleteHospitalCodePendingRequest : true,   
        };
    case PHIC_CLAIMS_DELETE_HOSPITAL_CODE_SUCCESS :
        return state = {
            ...state,
            deleteHospitalCodePendingRequest : false,                             
            listOfHospitalCode: state.listOfHospitalCode.filter(x => x.id != action.id )
        };
    case PHIC_CLAIMS_DELETE_HOSPITAL_CODE_ERROR :
        return state = {
            ...state,
            deleteHospitalCodePendingRequest : false,   
        };
    // select hospital code
    case PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_REQUEST : 
        return state = {
            ...state
        };
    case PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_SUCCESS :         
        return state = {
            ...state,
            listOfHospitalCode : state.listOfHospitalCode.map(t => {
                t.primaryCode = action.payload == t.id;
                return t;
            }) 
        };
    case PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_ERROR : 
        return state = {
            ...state
        };
    // update PHCI HCI 
    case PHIC_CLAIMS_UPDATE_PHIC_HCI_REQUEST : 
        return state = {
            ...state
        };
    case PHIC_CLAIMS_UPDATE_PHIC_HCI_SUCCESS :            
        return state = {
            ...state,
            // should update listOfHospitalCode store upon editing of package or type
            listOfHospitalCode : state.listOfHospitalCode.map(t => {
                if (t.id === action.id) {        
                    t = action.data;   
                }
                return t;
            })
        };
    case PHIC_CLAIMS_UPDATE_PHIC_HCI_ERROR : 
        return state = {
            ...state
        };
    case PHIC_CLAIMS_CHECK_IF_HOSPITAL_CODE_HAS_DUPLICATE : 
        return state = {
            ...state,
            isSamePHICPackage : action.value
        };
    default : return state;
    } 
};

// new product
const newProductHospitalCodeRequest = () => ({
    type: PHIC_CLAIMS_FORM_HOSPITAL_CODE_REQUEST
});
const newProductHospitalCodeSuccess = (hospitalCodeDto) => ({
    type : PHIC_CLAIMS_FORM_HOSPITAL_CODE_SUCCESS,
    payload: hospitalCodeDto
});
const newProductHospitalCodeError =() => ({
    type: PHIC_CLAIMS_FORM_HOSPITAL_CODE_ERROR
});
// get list of hospital code
const getProductHospitalCodeRequest = () => ({
    type: PHIC_CLAIMS_GET_HOSPITAL_CODE_REQUEST
});
const getProductHospitalCodeSuccess = (response) => ({
    type: PHIC_CLAIMS_GET_HOSPITAL_CODE_SUCCESS,
    payload : response
});
const getProductHospitalCodeError = () => ({
    type: PHIC_CLAIMS_GET_HOSPITAL_CODE_ERROR
});
// edit hospital code
const editHospitalCodeRequest = () => ({
    type: PHIC_CLAIMS_EDIT_HOSPITAL_CODE_REQUEST
});
const editHospitalCodeSuccess = (id, newHospitalCode) => ({
    type : PHIC_CLAIMS_EDIT_HOSPITAL_CODE_SUCCESS,  
    id,
    newHospitalCode  
});
const editHospitalCodeError = () => ({
    type : PHIC_CLAIMS_EDIT_HOSPITAL_CODE_ERROR
});
// delete hospital code
const deleteHospitalCodeRequest = () => ({
    type: PHIC_CLAIMS_DELETE_HOSPITAL_CODE_REQUEST
});
const deleteHospitalCodeSuccess = (hospitalId) => ({
    type: PHIC_CLAIMS_DELETE_HOSPITAL_CODE_SUCCESS,    
    id: hospitalId
});
const deleteHospitalCodeError = () => ({
    type: PHIC_CLAIMS_DELETE_HOSPITAL_CODE_ERROR
});
// select primaryCode
const editHospitalCodePrimaryRequest = () => ({
    type: PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_REQUEST
});
const editHospitalCodePrimarySuccess = (id) => ({
    type: PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_SUCCESS,
    payload: id

});
const editHospitalCodePrimaryError = () => ({
    type: PHIC_CLAIMS_SELECT_PRIMARY_HOSPITAL_CODE_ERROR
});
// update phic and hci 
const updateListOfHospitalCodeRequest = () => ({
    type : PHIC_CLAIMS_UPDATE_PHIC_HCI_REQUEST
}); 
const updateListOfHospitalCodeSuccess = (id, data) => ({
    type : PHIC_CLAIMS_UPDATE_PHIC_HCI_SUCCESS,
    id,
    data
});
const updateListOfHospitalCodeError = () => ({
    type : PHIC_CLAIMS_UPDATE_PHIC_HCI_ERROR
});

// get list of hospital code
const checkIfPHICPackageIsDuplicate = (value) => ({
    type : PHIC_CLAIMS_CHECK_IF_HOSPITAL_CODE_HAS_DUPLICATE,
    value
});


export function isSamePackage(value) {
    return (dispatch) => {          
        dispatch(checkIfPHICPackageIsDuplicate(value));       
    };
}
export function AddHospitalCode(product,hospitalCodes) {    
    return (dispatch, getState, {clientBeacon}) => {  
        let primaryCode;

        hospitalCodes.length <= 0 ? primaryCode = true : primaryCode = false;

        const HospitalCodeDto = {
            hospitalCode : 'DUMMY-Code',
            PrimaryCode: primaryCode,        
            Product : product,
            AccreditationNumber : ''
        };   

        

        dispatch(newProductHospitalCodeRequest());
        clientBeacon.post('/api/Product/NewHospitalCode', HospitalCodeDto)

            .then((response) => {  
                dispatch(newProductHospitalCodeSuccess(response.data));
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'Success adding of Hospital Code',
                    title:  'Success'
                }));   
                                
            })
            .catch(error => {
                dispatch(newProductHospitalCodeError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: 'Error',
                    title: error.data.exceptionMessage
                }));
            });    
    };
}


/**
 *  Get List of Hospital Code
 * 
 * @export
 * @param {any} productId
 * @returns
 */
export function GetHospitalCode (productId) {
    return (dispatch, getState, {clientBeacon}) => {        
        
        dispatch(getProductHospitalCodeRequest());
        clientBeacon.get(`/api/Product/GetHospitalCodes?productId=${productId}`)
            .then(response => {
                dispatch(getProductHospitalCodeSuccess(response.data));
            }) 
            .catch(error => {
                dispatch(getProductHospitalCodeError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));   
            });  
    };
}



export function saveTolistOfHospitalCode (id, data, newData) {
    return (dispatch, getState, {clientBeacon}) => {        
        dispatch(updateListOfHospitalCodeRequest);        
        clientBeacon.put('/api/Product/EditPHICPackage', newData)
            .then(() => {                                             
                // dispatch(updateListOfHospitalCode (data));       
                dispatch(updateListOfHospitalCodeSuccess(id, data));
            })
            .catch (error => {

                dispatch(updateListOfHospitalCodeError);
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error',                    
                }));
            });
    };
}

// edit name of hospital code
export function EditHospitalCode (id, newHospitalCode, object, accreditationNumber) {
    return (dispatch, getState, {clientBeacon}) => {
                
        const HospitalCodeDto = {
            id : id,
            HospitalCode : newHospitalCode,
            Product : object,
            AccreditationNumber : accreditationNumber
        };                

        object.hospitalCode = newHospitalCode;
        object.accreditationNumber = accreditationNumber;  

        // prevent user from api call if the length is > 12
        if(object.hospitalCode.length > 12 && object.accreditationNumber.length >12){
            dispatch(Notifications.error({
                ...notificationOpts,
                message: 'Hospital Code and Accreditation Number must not be greater than 12 characters',
                title: 'Error'
            }));
            dispatch(editHospitalCodeSuccess(id, newHospitalCode));

        }else if(object.hospitalCode.length > 12){
            dispatch(Notifications.error({
                ...notificationOpts,
                message: 'Hospital Code must not be greater than 12 characters',
                title: 'Error'
            })); 
            dispatch(editHospitalCodeSuccess(id, newHospitalCode));
        }else if(object.accreditationNumber.length > 12){
            dispatch(Notifications.error({
                ...notificationOpts,
                message: 'Accreditation Number must not be greater than 12 characters',
                title: 'Error'
            })); 
            dispatch(editHospitalCodeSuccess(id, newHospitalCode));
        }else{
            dispatch(editHospitalCodeRequest());
            if (HospitalCodeDto.HospitalCode.length > 0 ) {
                clientBeacon.put('/api/Product/EditHospitalCode', HospitalCodeDto)
                    .then(() => {
                        dispatch(editHospitalCodeSuccess(id, newHospitalCode));
                    })
                    .catch(error => {
                        dispatch(editHospitalCodeError());
                        dispatch(Notifications.error({
                            ...notificationOpts,
                            message: error.data.exceptionMessage,
                            title: 'Error'
                        }));         
                    }); 
            }
        }
    };
}

export function DeleteHospitalCode (hospitalCode) {
    return (dispatch, getState, {clientBeacon}) => {
                                                           
        dispatch(deleteHospitalCodeRequest());
        
        clientBeacon.delete(`/api/Product/DeleteHospitalCode?id=${hospitalCode.id}`)
            .then(() => {        
                dispatch(deleteHospitalCodeSuccess(hospitalCode.id));        
        
            })
            .catch(error => {
                dispatch(deleteHospitalCodeError());
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));         
                
            });
    };
}

export function EditHospitalPrimaryCodeSelected (Id, selectedProduct) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(editHospitalCodePrimaryRequest());
        const selectedDto = {
            HospitalCodeId : Id,        
            ProductId: selectedProduct.id
        };
                

        clientBeacon.put('/api/Product/EditHospitalPrimarySelected', selectedDto) 
            .then (() =>{
                dispatch(editHospitalCodePrimarySuccess(Id));             
                
            })
            .catch(error => {
                dispatch(editHospitalCodePrimaryError());                
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: 'Error',
                    title: error.data.exceptionMessage
                }));
            });
    };
}


