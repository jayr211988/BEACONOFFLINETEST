import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';

const PHIC_CLAIMS_LIST_REQUEST = 'PHIC_CLAIMS_LIST_REQUEST';
const PHIC_CLAIMS_LIST_SUCCESS = 'PHIC_CLAIMS_LIST_SUCCESS';
const PHIC_CLAIMS_LIST_ERROR = 'PHIC_CLAIMS_LIST_ERROR';

const PHIC_CLAIMS_SELECTED_TRANSMITTAL_REQUEST = 'PHIC_CLAIMS_SELECTED_TRANSMITTAL_REQUEST';
const PHIC_CLAIMS_SELECTED_TRANSMITTAL_SUCCESS = 'PHIC_CLAIMS_SELECTED_TRANSMITTAL_SUCCESS';
const PHIC_CLAIMS_SELECTED_TRANSMITTAL_ERROR = 'PHIC_CLAIMS_SELECTED_TRANSMITTAL_ERROR';

const PHIC_CLAIMS_REFRESH_REQUEST = 'PHIC_CLAIMS_REFRESH_REQUEST';
const PHIC_CLAIMS_REFRESH_SUCCESS = 'PHIC_CLAIMS_REFRESH_SUCCESS';
const PHIC_CLAIMS_REFRESH_ERROR = 'PHIC_CLAIMS_REFRESH_ERROR';

const PHIC_CLAIMS_SORT_REQUEST = 'PHIC_CLAIMS_SORT_REQUEST';

const PHIC_CLAIMS_DELETE_REQUEST = 'PHIC_CLAIMS_DELETE_REQUEST';
const PHIC_CLAIMS_DELETE_SUCCESS = 'PHIC_CLAIMS_DELETE_SUCCESS';
const PHIC_CLAIMS_DELETE_ERROR = 'PHIC_CLAIMS_DELETE_ERROR';

const PHIC_CLAIMS_IS_PATIENT_OR_MEMBER = 'PHIC_CLAIMS_IS_PATIENT_OR_MEMBER';

// *** Foreign Action Type
const PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS = 'PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS';

const PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS = 'PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    uploadingFiles: [],
    claimsList: [],
    claimsType: null,
    selectedTransmittal: null,
    getPhicClaimsListRequestPending : true,
    getSelectedTransmittalRequest : true,
    refreshPhicClaimsListRequestPending : false,
    deletePhicClaimRequestPending : false

}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_LIST_REQUEST : 
        return state = {
            ...state,
            getPhicClaimsListRequestPending : true
        };

    case PHIC_CLAIMS_LIST_SUCCESS : 
        return state = {
            ...state,
            claimsList : action.claimsList,
            getPhicClaimsListRequestPending : false
        };

    case PHIC_CLAIMS_LIST_ERROR :
        return state = {
            ...state,
            getPhicClaimsListRequestPending : false
        };

    case PHIC_CLAIMS_SELECTED_TRANSMITTAL_REQUEST : 
        return state = {
            ...state,
            getSelectedTransmittalRequest : true
        };

    case PHIC_CLAIMS_SELECTED_TRANSMITTAL_SUCCESS :
        return state = {
            ...state,
            selectedTransmittal : action.transmittal,
            getSelectedTransmittalRequest : false
        };

    case PHIC_CLAIMS_SELECTED_TRANSMITTAL_ERROR : 
        return state = {
            ...state,
            getSelectedTransmittalRequest : false
        };

    case PHIC_CLAIMS_REFRESH_REQUEST : 
        return state = {
            ...state,
            refreshPhicClaimsListRequestPending : true
        };

    case PHIC_CLAIMS_REFRESH_SUCCESS : 
        return state = {
            ...state,
            claimsList : action.claimsList,
            refreshPhicClaimsListRequestPending : false
        };

    case PHIC_CLAIMS_REFRESH_ERROR :
        return state = {
            ...state,
            refreshPhicClaimsListRequestPending : false
        };
    
    case PHIC_CLAIMS_SORT_REQUEST : 
        return state = {
            ...state,
            claimsList: state.claimsList
                .map(t => t)
                .sort((t, u) => {
                    if (t.id > u.id) return 1;
                    if (t.id < u.id) return -1;
                    return 0;
                })   
        };

    case PHIC_CLAIMS_DELETE_REQUEST : 
        return state = {
            ...state,
            deletePhicClaimRequestPending : true
        };

    case PHIC_CLAIMS_DELETE_SUCCESS :
        return state = {
            ...state,
            claimsList : state.claimsList.filter( claim => claim.id !== action.claimId ),
            deletePhicClaimRequestPending : false
        };

    case PHIC_CLAIMS_DELETE_ERROR : 
        return state = {
            ...state,
            deletePhicClaimRequestPending : false
        };

    case PHIC_CLAIMS_IS_PATIENT_OR_MEMBER :
        return state = {
            ...state,
            claimsType: action.payload
        }; 

    case PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS :
        return state = {
            ...state,
            claimsList : state.claimsList.filter(t => t.id !== action.claimId)
        };

    case PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS:
        return {
            ...state,
            uploadingFiles: state.uploadingFiles.concat(action.payload)
        };

    default: return state;
    }
};

// *** GET PHIC CLAIMS
const getPhicClaimsListRequest = () => ({
    type : PHIC_CLAIMS_LIST_REQUEST
});

const getPhicClaimsListSuccess = ( claimsList ) => ({
    type : PHIC_CLAIMS_LIST_SUCCESS,
    claimsList
});

const getPhicClaimsListError = () => ({
    type : PHIC_CLAIMS_LIST_ERROR
});

// *** GET SELECTED TRANSMITTAL
const getSelectedTransmittalRequest = () => ({
    type : PHIC_CLAIMS_SELECTED_TRANSMITTAL_REQUEST
});

const getSelectedTransmittalSuccess = ( transmittal ) => ({
    type : PHIC_CLAIMS_SELECTED_TRANSMITTAL_SUCCESS,
    transmittal
});

const getSelectedTransmittalError = () => ({
    type : PHIC_CLAIMS_SELECTED_TRANSMITTAL_ERROR
});

// *** REFRESH PHIC CLAIMS
const refreshPhicClaimsListRequest = () => ({
    type : PHIC_CLAIMS_REFRESH_REQUEST
});

const refreshPhicClaimsListSuccess = ( claimsList ) => ({
    type : PHIC_CLAIMS_REFRESH_SUCCESS,
    claimsList
});

const refreshPhicClaimsListError = () => ({
    type : PHIC_CLAIMS_REFRESH_ERROR
});

// *** SORT PHIC CLAIMS
const sortPhicClaimsListRequest = () => ({
    type : PHIC_CLAIMS_SORT_REQUEST
}); 

// **** DELETE PHIC CLAIMS
const deletePhicClaimRequest = () => ({
    type : PHIC_CLAIMS_DELETE_REQUEST
});

const deletePhicClaimSuccess = ( claimId ) => ({
    type : PHIC_CLAIMS_DELETE_SUCCESS,
    claimId
});

const deletePhicClaimError = () => ({
    type : PHIC_CLAIMS_DELETE_ERROR
});


// // *** GET CLAIMS VALUE
// const getClaimsValue = (claimsIs) => ({
//     type: PHIC_CLAIMS_IS_PATIENT_OR_MEMBER,
//     payload: claimsIs
// });



// // *** RESET PATIENT INFO AND MEMBER PIN ON ADD
// const resetPatientInfoMemberPin = () => ({
//     type: PHIC_CLAIMS_RESET_PATIENTINFO_MEMBERPIN
// });

/**
 * Get PHIC Claims List
 * 
 * @export
 * @param {any} transmittalId
 * @returns
 */
export function getPhicClaimsList( transmittalId ) {
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(getPhicClaimsListRequest());

        let fakeClaimList = [{
            claimIssuesTotal:1,
            claimSeriesLhio:null,
            claimStatus:0,
            claimStatusDescription:"MEMBER NOT VALID",
            createdBy:"gstarr",
            createdById:17,
            dateCreated:"2017-07-12T05:23:05.837",
            dateUpdated:"2017-07-12T05:23:05.837",
            deniedReasons:null,
            id:620,
            isFinal:false,
            phicPackage:3,
            phicPackageDescription:"NEWBORN CARE",
            phiccF1:{
                admissionDate:"2017-07-11T16:00:00",
                createdBy:"gstarr",
                createdById:17,
                dateCreated:"2017-07-12T05:23:05.837",
                dateUpdated:"2017-07-12T05:23:05.837",
                dischargeDate:"2017-07-11T16:00:00",
                eligibilityDocuments:null,
                eligibilityIsNHTS:null,
                eligibilityIsOk:null,
                eligibilityRemainingDays:null,
                eligibilityTrackingNumber:null,
                eligibilityWith3Over6:null,
                eligibilityWith9Over12:null,
                eligibleAsOf:null,
                id:620,
                memberBirthday:"2017-07-05T16:00:00",
                memberEmail:"4",
                memberEmployerName:null,
                memberFirstname:"Wag",
                memberFullname:"Wag N/A Test",
                memberGender:"M",
                memberGenderName:"Male",
                memberLandLineNumber:"4",
                memberLastname:"Test",
                memberMailingAddress:"44",
                memberMiddlename:"N/A",
                memberMobileNumber:"4",
                memberPEN:null,
                memberPin:"",
                memberSuffix:"",
                memberTypeCode:"PS",
                memberTypeValue:"Non Paying Private",
                memberZipCode:"4",
                patientBirthday:"2017-07-05T16:00:00",
                patientFirstname:"Wag",
                patientFullname:"Wag N/A Test",
                patientGender:"M",
                patientGenderName:"Male",
                patientIsCode:"M",
                patientIsValue:"Member",
                patientLastname:"Test",
                patientMiddlename:"N/A",
                patientPin:"",
                patientSuffix:"",
                pbefToken:"0517477c47628970348c39e0476d09e7",
                updatedBy:null,
                updatedById:0,
                validEmployer:null,
                version:0
            },
            phiccF2:null,
            returnDeficiencies:null,
            updatedBy:null,
            updatedById:0,
            version:0,
        }];
        getPhicClaimsListSuccess(fakeClaimList);
        clientBeacon.get(`/api/PHICClaim/GetAllPHICClaimByPHICTransmittalId?transmittalId=${transmittalId}`)
            .then(response => {
                dispatch(getPhicClaimsListSuccess(response.data));   
            })

            .catch(error => {
                dispatch(getPhicClaimsListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                })); 
            });
    };
}

/**
 * GET selected PHIC Transmittal
 * 
 * @export
 * @param {any} transmittalId
 * @returns
 */
export function getSelectedTransmittal( transmittalId ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(getSelectedTransmittalRequest());

        let fakeData = {
            accreditationNumber: "H91004604",
            createdBy:"gstarr",
            createdById: 17,
            dateCreated:"2017-07-20T23:58:02.43",
            dateUpdated : "2017-07-20T23:58:04.05",
            eTicketNumber: null,
            hospitalCode:"262729",
            id: 625,
            phicPackage:0,
            phicPackageDescription:"REGULAR",
            phichciType:1,
            phichciTypeDescription: "LEVEL 1",
            remarks:null,
            totalClaims:0,
            transmissionControlNumber: null,
            transmittalClaims:null,
            transmittalIssueTotal:0,
            transmittalNumber:"170721000625",
            transmittalStatus:0,
            transmittalStatusDescription:"DRAFT",
            transmittedBy:null,
            transmittedById:0,
            transmittedDateTime:null,
            updatedBy:"gstarr",
            updatedById:17, 
            version: 1
        }
        console.log(fakeData);
        dispatch(getSelectedTransmittalSuccess(fakeData));

        // clientBeacon.get(`/api/PHICTransmittal/GetPHICTransmittalById?transmittalId=${transmittalId}`)
        //     .then(response => {
        //         dispatch(getSelectedTransmittalSuccess(response.data));


        //     })
        //     .catch(error => {
        //         dispatch(getSelectedTransmittalError());

        //         dispatch(Notifications.error({
        //             ...notificationOpts,
        //             message: error.data.exceptionMessage,
        //             title: 'Error'
        //         })); 
        //     });
    };
}

/**
 * Refresh PHIC Claims List
 * 
 * @export
 * @param {any} transmittalId
 * @returns
 */
export function refreshPhicClaimsList( transmittalId ) {
    return ( dispatch, getState, {clientBeacon} ) => {

        dispatch(refreshPhicClaimsListRequest());

        clientBeacon.get(`/api/PHICClaim/GetAllPHICClaimByPHICTransmittalId?transmittalId=${transmittalId}`)
            .then(response => {
                dispatch(refreshPhicClaimsListSuccess(response.data));
            })

            .catch(error => {
                dispatch(refreshPhicClaimsListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'                    
                })); 
            });
    };
}

/**
 * Sort PHIC Claims List
 * 
 * @export
 * @returns
 */
export function sortPhicClaimsList () {
    return ( dispatch ) => {

        dispatch(sortPhicClaimsListRequest());
    };
}

/**
 * Delete PHIC Claim
 * 
 * @export
 * @param {any} claimId
 * @param {any} closeBasicDialog
 * @returns
 */
export function deletePhicClaim( claimId, closeBasicDialog ) {
    return (dispatch, getState, {clientBeacon}) => {

        dispatch(deletePhicClaimRequest());

        clientBeacon.delete(`/api/PHICClaim/DeletePHICClaim?claimId=${claimId}`)
            .then(() => {
                closeBasicDialog();
                dispatch(deletePhicClaimSuccess(claimId)); 

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: `Claim no. ${claimId} successfully removed`,
                    title: 'Success'
                }));                 
            })

            .catch(error => {
                closeBasicDialog();
                dispatch(deletePhicClaimError());

                if(error.data.exceptionMessage.includes('REFERENCE')){
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: 'Transmittal has a processed claim/s. Transmittal cannot be removed.',
                        title: 'Error'
                    })); 
                }else{
                    dispatch(Notifications.error({
                        ...notificationOpts,
                        message: error.data.exceptionMessage,
                        title: 'Error'
                    })); 
                } 
            });
    };
}

export const addUploadingFiles = (files) => {
    return {
        payload: files,
        type: PHIC_CLAIMS_DETAILS_DOCUMENTS_NEW_EXCEL_UPLOAD_PHIC_DOCUMENTS
    };
};


export function newPHICTransmittalOfflineMode( value, files,closeDialog) {
    return (dispatch, getState, {clientBeacon}) => {
        const headers = {
            'ContentType': 'multipart/form-data'
        };
        
        const formData = new FormData();
        files.forEach((t, i) => {
            formData.append(`documenttype_${i}`, t.documentType);
            formData.append(`documentvalue_${i}`, t.documentValue);
            formData.append(`file_${i}`, t);
        });
        
        clientBeacon.post(`api/PHICTransmittal/NewPHICTransmittalOffline?transmittalId=${value.transmittalId}`, formData, headers)
            .then(response => {
                //dispatch(newPhicTransmittalSuccess(response.data));
                //closeDialog();

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: 'new PHIC Transmittal added',
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