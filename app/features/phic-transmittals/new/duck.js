import Notifications from 'react-notification-system-redux';

const PHIC_TRANSMITTALS_NEW_REQUEST = 'PHIC_TRANSMITTALS_NEW_REQUEST';
const PHIC_TRANSMITTALS_NEW_SUCCESS = 'PHIC_TRANSMITTALS_NEW_SUCCESS';
const PHIC_TRANSMITTALS_NEW_ERROR = 'PHIC_TRANSMITTALS_NEW_ERROR';

const PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_REQUEST = 'PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_REQUEST';
const PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_SUCCESS = 'PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_SUCCESS';
const PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_ERROR = 'PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    phicTransmittalRequestPending : false,
    hospitalCodeList : []

}, action) => {
    switch (action.type) {

    case PHIC_TRANSMITTALS_NEW_REQUEST : 
        return state = {
            ...state,
            phicTransmittalRequestPending : true
        };

    case PHIC_TRANSMITTALS_NEW_SUCCESS : 
        return state = {
            ...state,
            phicTransmittalRequestPending : false,
        };

    case PHIC_TRANSMITTALS_NEW_ERROR :
        return state = {
            ...state,
            phicTransmittalRequestPending : false
        };

    case PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_REQUEST :
        return state = {
            ...state,
            phicTransmittalRequestPending : true
        };

    case PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_SUCCESS :
        return state = {
            ...state,
            hospitalCodeList : action.hospitalCodeList,
            phicTransmittalRequestPending : false
        };

    case PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_ERROR :
        return state = {
            ...state,
            phicTransmittalRequestPending : false
        };

    default: return state;
    }
};

// *** NEW PHIC TRANSMITTAL
const newPhicTransmittalRequest = () => ({
    type : PHIC_TRANSMITTALS_NEW_REQUEST
});

const newPhicTransmittalSuccess = ( transmittal ) => ({
    type : PHIC_TRANSMITTALS_NEW_SUCCESS,
    transmittal
});

const newPhicTransmittalError = () => ({
    type : PHIC_TRANSMITTALS_NEW_ERROR
});

// *** GET LIST OF HOSPITAL CODE
const getPhicTransmittalHospitalCodeListRequest = () => ({
    type : PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_SUCCESS    
});

const getPhicTransmittalHospitalCodeListSuccess = (hospitalCodeList) => ({
    type : PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_SUCCESS,
    hospitalCodeList
});

const getPhicTransmittalHospitalCodeListError = () => ({
    type : PHIC_TRANSMITTALS_HOSPITAL_CODE_LIST_ERROR
});

 /**
 * New PHIC Transmittal
 * 
 * @export
 * @param {any} clientId
 * @returns
 */
export function newPhicTransmittal( value, closeDialog) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(newPhicTransmittalRequest());

        clientBeacon.post('/api/PHICTransmittal/NewPHICTransmittal', value)

            .then(response => {
                dispatch(newPhicTransmittalSuccess(response.data));
                closeDialog();

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'new PHIC Transmittal added',
                    title: 'Success'
                })); 
            })
            .catch(error => {
                dispatch(newPhicTransmittalError());
                closeDialog();
                
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                    
            });
    };
}


/**
 * Get Phic Transmittal Hospital Code List
 * 
 * @export
 * @param {any} productId
 * @returns
 */
export function getPhicTransmittalHospitalCodeList(productId) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(getPhicTransmittalHospitalCodeListRequest());

        let fakeDataHospitalCodeList = [
            {
                accreditationNumber:"H91004604",
                createdBy:null,
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.393",
                dateUpdated:"2017-06-16T02:28:15.393",
                hospitalCode:"262729",
                id:2,
                phicPackage:0,
                phicPackageDescription:"REGULAR",
                phichciType:1,
                phichciTypeDescription:"LEVEL 1",
                primaryCode:true,
                updatedBy:null,
                updatedById:0,
                version:0
            },
            {
                accreditationNumber:"H91004604",
                createdBy:null,
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.393",
                dateUpdated:"2017-06-16T02:28:15.393",
                hospitalCode:"262729",
                id:4,
                phicPackage:1,
                phicPackageDescription:"MATERNITY",
                phichciType:1,
                phichciTypeDescription:"LEVEL 1",
                primaryCode:false,
                updatedBy:null,
                updatedById:0,
                version:0
            },
            {
                accreditationNumber:"H91004604",
                createdBy:null,
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.393",
                dateUpdated:"2017-06-16T02:28:15.393",
                hospitalCode:"262729",
                id:1,
                phicPackage:2,
                phicPackageDescription:"ANIMAL BITE",
                phichciType:1,
                phichciTypeDescription:"LEVEL 1",
                primaryCode:false,
                updatedBy:null,
                updatedById:0,
                version:0
            },
            {
                accreditationNumber:"H91004604",
                createdBy:null,
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.393",
                dateUpdated:"2017-06-16T02:28:15.393",
                hospitalCode:"262729",
                id:5,
                phicPackage:3,
                phicPackageDescription:"NEWBORN CARE",
                phichciType:1,
                phichciTypeDescription:"LEVEL 1",
                primaryCode:false,
                updatedBy:null,
                updatedById:0,
                version:0
            },
            {
                accreditationNumber:"H91004604",
                createdBy:null,
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.393",
                dateUpdated:"2017-06-16T02:28:15.393",
                hospitalCode:"262729",
                id:6,
                phicPackage:4,
                phicPackageDescription:"TB DOTS",
                phichciType:1,
                phichciTypeDescription:"LEVEL 1",
                primaryCode:false,
                updatedBy:null,
                updatedById:0,
                version:0
            },
            {
                accreditationNumber:"H91004604",
                createdBy:null,
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.393",
                dateUpdated:"2017-06-16T02:28:15.393",
                hospitalCode:"262729",
                id:3,
                phicPackage:5,
                phicPackageDescription:"CATARACT",
                phichciType:1,
                phichciTypeDescription:"LEVEL 1",
                primaryCode:false,
                updatedBy:null,
                updatedById:0,
                version:0
            }
        ];

        dispatch(getPhicTransmittalHospitalCodeListSuccess(fakeDataHospitalCodeList));

        // clientBeacon.get(`/api/Product/GetHospitalCodes?productid=${productId}`)

        // .then(response => {
        //     dispatch(getPhicTransmittalHospitalCodeListSuccess(response.data));
        // })

        // .catch(error => {
        //     dispatch(getPhicTransmittalHospitalCodeListError());

        //     dispatch(Notifications.error({
        //         ...notificationOpts,
        //         message: error.data.exceptionMessage,
        //         title: 'Error'
        //     }));             
       // });
    };
}