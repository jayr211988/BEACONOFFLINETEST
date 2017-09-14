
import { logoutUserSession } from '../../util/auth';
import Notifications from 'react-notification-system-redux';

const MAIN_USER_INFO_REQUEST = 'MAIN_USER_INFO_REQUEST';
const MAIN_USER_INFO_SUCCESS = 'MAIN_USER_INFO_SUCCESS';

const MAIN_USER_LOGOUT_REQUEST = 'MAIN_USER_LOGOUT_REQUEST';
const MAIN_USER_LOGOUT_SUCCESS = 'MAIN_USER_LOGOUT_SUCCESS';

const MAIN_USER_FACILTIES_REQUEST = 'MAIN_USER_FACILTIES_REQUEST';
const MAIN_USER_FACILTIES_SUCCESS = 'MAIN_USER_FACILTIES_SUCCESS';

const MAIN_GET_SELECTED_FACILITY_REQUEST = 'MAIN_GET_SELECTED_FACILITY_REQUEST';
const MYPROFILE_EDIT_USER_SUCCESS = 'MYPROFILE_EDIT_USER_SUCCESS';



const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default function reducer(state = {
    mainCurrentUserInfoRequest: true,
    mainCurrentUserLogoutRequest: false,
    mainUserFaciliesRequest: true,
    currentUser: null

}, action = {}) {
    switch (action.type) {
    case MAIN_USER_INFO_REQUEST:
        return state = {
            ...state, mainCurrentUserInfoRequest: true
        };

    case MAIN_USER_INFO_SUCCESS:
        return state = {
            ...state, mainCurrentUserInfoRequest: false,
            currentUser: action.currentUser
        };

    case MAIN_USER_LOGOUT_REQUEST:
        return state = {
            ...state, mainCurrentUserLogoutRequest: true
        };

    case MAIN_USER_LOGOUT_SUCCESS:
        return state = {
            ...state, mainCurrentUserLogoutRequest: false
        };

    case MAIN_USER_FACILTIES_REQUEST:
        return state = {
            ...state,
            mainUserFaciliesRequest: true
        };

    case MAIN_USER_FACILTIES_SUCCESS:
        return state = {
            ...state,
            facilities: action.facilities,
            mainUserFaciliesRequest: false,
            selectedFacility: action.facilities[0]
        };

    case MAIN_GET_SELECTED_FACILITY_REQUEST:
        return state = {
            ...state,
            selectedFacility: action.selectedFacility
        };
    case MYPROFILE_EDIT_USER_SUCCESS:
        const currentUser = { ...state.currentUser };

        currentUser.email = action.user.email,
            currentUser.lastname = action.user.lastname,
            currentUser.firstname = action.user.firstname,
            currentUser.middlename = action.user.middlename,
            currentUser.userName = action.user.userName,
            currentUser.fullname = action.user.fullname;

        return state = {
            ...state,
            currentUser: currentUser
        };

    default: return state;
    }
}

// *** GET CURRENT USER INFO
const getmainCurrentUserInfoRequest = () => ({
    type: MAIN_USER_INFO_REQUEST
});

const getCurrentUserInfoSuccess = (currentUser) => ({
    type: MAIN_USER_INFO_SUCCESS,
    currentUser
});

// *** LOGOUT
const logoutSessionRequest = () => ({
    type: MAIN_USER_LOGOUT_REQUEST
});

const logoutSessionSuccess = () => ({
    type: MAIN_USER_LOGOUT_SUCCESS
});

// *** GET CURRENT USER FACILITIES
const getCurrentUserFaciltiesRequest = () => ({
    type: MAIN_USER_FACILTIES_REQUEST
});

const getCurrentUserFaciltiesSuccess = (facilities) => ({
    type: MAIN_USER_FACILTIES_SUCCESS,
    facilities: facilities
});

// *** GET SELECTED FACILITY
const getSelectedFacilityRequest = (selectedFacility) => ({
    type: MAIN_GET_SELECTED_FACILITY_REQUEST,
    selectedFacility
});

/**
 * GET CURRENT USER INFO
 * 
 * @export
 * @returns
 */
export function getCurrentUserInfo() {
    return function (dispatch, getState, {clientBeacon}) {

        dispatch(getmainCurrentUserInfoRequest());

        let fakeDataJson = {
            active:true,
            createdBy:"Seed",
            createdById:0,
            dateCreated:"2017-06-16T02:28:15.36",
            dateUpdated:"2017-07-21T02:48:47.0577911Z",
            email:"gstarr@mailinator.com",
            emailConfirmToken:"",
            emailConfirmed:true,
            firstname:"Gringo",
            fullname:"Gringo Starr",
            id:1,
            lastname:"Starr",
            middlename:null,
            notifyWhenTransmittalIsProcessed:false,
            roles:[],
            updatedBy:"BEACON2 AUTH SERVER",
            updatedById:0,
            userName:"gstarr",
            version:0
        }
        dispatch(getCurrentUserInfoSuccess(fakeDataJson));
        // clientBeacon.get('api/Account/GetCurrentUserInformation')

        //     .then(response => {
        //         dispatch(getCurrentUserInfoSuccess(response.data));

        //     })
        //     .catch(error => {
        //         dispatch(Notifications.error({
        //             ...notificationOpts,
        //             message: error.data.exceptionMessage,
        //             title: 'Error'
        //         }));
        //     });
    };
}

/**
 * LOGOUT
 * 
 * @export
 * @returns
 */
export function logoutUser() {
    return function (dispatch) {

        dispatch(logoutSessionRequest());

        setTimeout(() => {
            //http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
            dispatch({ type: 'APP_USER_LOGOUT' });
            dispatch(logoutSessionSuccess());
            logoutUserSession();
        }, 2000);

    };
}

/**
 * GET CURRENT USER FACILITIES
 * 
 * @export
 * @returns
 */
export function getFacilities(userId) {
    return function (dispatch, getState, {clientBeacon}) {

        dispatch(getCurrentUserFaciltiesRequest());

        clientBeacon.get(`api/Account/GetAllClientsByUserId?userId=${userId}`)

            .then(response => {
                dispatch(getCurrentUserFaciltiesSuccess(response.data));
            })

            .catch(function (error) {
                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error Getting Clients'
                }));
            });
    };
}

/**
 * GET SELECTED FACILITY
 * 
 * @export
 * @param {any} selectedFacility
 * @returns
 */
export function getSelectedFacility(selectedFacility) {
    return (dispatch) => {

        dispatch(getSelectedFacilityRequest(selectedFacility));
    };
}
