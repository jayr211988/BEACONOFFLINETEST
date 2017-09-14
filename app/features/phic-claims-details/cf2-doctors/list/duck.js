import Notifications from 'react-notification-system-redux';

import { getPhicClaimsIssuesCount } from '../../../phic-claims-issues/list/duck';

const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_ERROR';

// *** Foreign action type
const PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    doctorsList : [],
    basicDialogRequestPending : false,
    getPhicClaimsDetailsCf2DoctorsListRequestPending : true

}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_REQUEST :
        return state = {
            ...state
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_SUCCESS : 
        return state = {
            ...state,
            doctorsList : action.doctorsList,
            getPhicClaimsDetailsCf2DoctorsListRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_ERROR :
        return state = {
            ...state,
            getPhicClaimsDetailsCf2DoctorsListRequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_NEW_SUCCESS : 
        return state = {
            ...state,
            doctorsList : [ action.doctor, ...state.doctorsList ]
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_REQUEST : 
        return state = {
            ...state,
            basicDialogRequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_SUCCESS :
        return state = {
            ...state,
            basicDialogRequestPending : false,
            doctorsList : state.doctorsList.filter(doctor => doctor.id !== action.doctorId),
        };

    case PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_ERROR :
        return state = {
            ...state,
            basicDialogRequestPending : false
        };

    default: return state;
    }
};

// *** GET PHIC CLAIMS DETAILS DOCTORS
const getPhicClaimsDetailsCf2DoctorsListRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_REQUEST
});

const getPhicClaimsDetailsCf2DoctorsListSuccess = (doctorsList) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_SUCCESS,
    doctorsList
});

const getPhicClaimsDetailsCf2DoctorsListError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_LIST_ERROR
});

// *** DELETE PHIC CLAIMS DETAILS 
const deletePhicClaimsDetailsCf2DoctorRequest = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_REQUEST
});

const deletePhicClaimsDetailsCf2DoctorSuccess = (doctorId) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_SUCCESS,
    doctorId
}); 

const deletePhicClaimsDetailsCf2DoctorError = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_DOCTORS_DELETE_ERROR
});

/**
 * Get Phic Claims Details Doctors
 * 
 * @export
 * @param {any} claimId
 * @returns
 */
export function getPhicClaimsDetailsCf2DoctorsList(claimId) {
    return (dispatch, getState, { clientBeacon }) => {
        
        dispatch(getPhicClaimsDetailsCf2DoctorsListRequest());

        clientBeacon.get(`api/PHICDoctor/GetAllPHICDoctorByClaimId?claimId=${claimId}`)

            .then(response => {
                dispatch(getPhicClaimsDetailsCf2DoctorsListSuccess(response.data));
            })

            .catch(error => {
                dispatch(getPhicClaimsDetailsCf2DoctorsListError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                     
            });
    };
}

/**
 * Delete PHIC Claims Details CF2 Doctor
 * 
 * @export
 * @param {any} doctorId
 * @returns
 */
export function deletePhicClaimsDetailsCf2Doctor(selectedDoctor, claimId, closeBasicDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(deletePhicClaimsDetailsCf2DoctorRequest());

        clientBeacon.delete(`/api/PHICDoctor/DeletePHICDoctor?doctorId=${selectedDoctor.id}`)   

            .then(() => {
                closeBasicDialog();
                dispatch(deletePhicClaimsDetailsCf2DoctorSuccess(selectedDoctor.id));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: `Doctor ${selectedDoctor.fullname}, Successfully removed`,
                    title: 'Success'
                }));      

                dispatch(getPhicClaimsIssuesCount(claimId));             
            })

            .catch(error => {
                closeBasicDialog();
                dispatch(deletePhicClaimsDetailsCf2DoctorError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));   
            });
    };
}