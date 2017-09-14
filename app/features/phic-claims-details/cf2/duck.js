import Notifications from 'react-notification-system-redux';

// *** extended function
import { getPhicClaimsIssuesCount } from '../../phic-claims-issues/list/duck';

const PHIC_CLAIMS_DETAILS_CF2_EDIT_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_EDIT_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_EDIT_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_EDIT_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_EDIT_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_EDIT_ERROR';

const PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST = 'PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST';
const PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESSS = 'PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESSS';
const PHIC_CLAIMS_DETAILS_CF2_SELECTED_ERROR = 'PHIC_CLAIMS_DETAILS_CF2_SELECTED_ERROR';

const PHIC_CLAIMS_LIST_OF_ZBENEFITS = 'PHIC_CLAIMS_LIST_OF_ZBENEFITS';
//const PHIC_CLAIMS_SELECTED_ZBENEFITS = 'PHIC_CLAIMS_SELECTED_ZBENEFITS';
const PHIC_CLAIMS_SELECTED_CHECKBOX_IN_ZBENEFIT = 'PHIC_CLAIMS_SELECTED_CHECKBOX_IN_ZBENEFIT';
const PHIC_CLAIMS_UPDATE_SELECTED_ZBENEFITS = 'PHIC_CLAIMS_UPDATE_SELECTED_ZBENEFITS';
const PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS';
const PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS = 'PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS';

const PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY = 'PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY';
const CF2_SAVE_INFORMATION_DETAILS = 'CF2_SAVE_INFORMATION_DETAILS';

const GET_UPDATE_NEWBORN_CARE = 'GET_UPDATE_NEWBORN_CARE';
const GET_UPDATE_HEARING_TEST = 'GET_UPDATE_HEARING_TEST';
const GET_UPDATE_SCREENING_TEST = 'GET_UPDATE_SCREENING_TEST';

const UPDATE_PHICALLCASERATE_NEWBORN = 'UPDATE_PHICALLCASERATE_NEWBORN';


const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    selectedCf2: null,    
    getSelectedPhicClaimDetailCf2RequestPending : true,
    editPhicClaimDetailCf2RequestPending : false,
    listOfZBenefits: [],
    selectedZBenefit : [],
    phicAllCaseRates: [],
    checkboxValue: 0
    //isFinalReady : false,
    // newborn: false,
    // hearingTest: false,
    // screeningTest: false,

}, action) => {
    
    switch (action.type) 
    {
    case PHIC_CLAIMS_DETAILS_CF2_EDIT_REQUEST : 
        return state = {
            ...state,
            editPhicClaimDetailCf2RequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_EDIT_SUCCESS : 
        return state = {
            ...state,
            editPhicClaimDetailCf2RequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_EDIT_ERROR :
        return state = {
            ...state,
            editPhicClaimDetailCf2RequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST :
        return state = {
            ...state,
            getSelectedPhicClaimDetailCf2RequestPending : true
        };

    case PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESSS : 
        const selectedCf2 = action.selectedCf2;
        selectedCf2.cataractLeftExpiryDate = selectedCf2.cataractLeftExpiryDate && new Date(selectedCf2.cataractLeftExpiryDate);
        selectedCf2.cataractRightExpiryDate = selectedCf2.cataractRightExpiryDate && new Date(selectedCf2.cataractRightExpiryDate);
        return state = {
            ...state,
            selectedCf2 : action.selectedCf2,
            getSelectedPhicClaimDetailCf2RequestPending : false
        };

    case PHIC_CLAIMS_DETAILS_CF2_SELECTED_ERROR : 
        return state = {
            ...state,
            getSelectedPhicClaimDetailCf2RequestPending : false
        };
    case PHIC_CLAIMS_LIST_OF_ZBENEFITS : 
        return state = {
            ...state,
            listOfZBenefits : action.zBenefits
        };
    // case PHIC_CLAIMS_SELECTED_ZBENEFITS :        
    //     return state = {
    //         ...state,
    //         selectedZBenefit : action.selectedBenefit
    //     };
    case PHIC_CLAIMS_SELECTED_CHECKBOX_IN_ZBENEFIT :        
        return state = {
            ...state,
            listOfZBenefits : state.listOfZBenefits.map((t) => {
                t.items.map((q) => {
                    if (q.code === action.code) {
                        q.checked = true;
                    } else {
                        q.checked = false;
                    }
                    return q;                                
                });
                return t;
            })
        }; 
    case PHIC_CLAIMS_UPDATE_SELECTED_ZBENEFITS :
        return state = {
            ...state,
            selectedZBenefit : action.selectedValue
        };
    case PHIC_CLAIMS_DETAILS_CF2_NEW_CASE_RATE_SUCCESS:
        return state = {
            ...state,
            phicAllCaseRates: [...state.phicAllCaseRates, action.payload]
        };
    case PHIC_CLAIMS_DETAILS_CF2_ALL_CASE_RATES_GET_ALL_CASE_RATES_SUCCESS:
        return {
            ...state,
            phicAllCaseRates: action.payload
        };
    case PHIC_CLAIMS_DETAILS_CF2_DELETE_PHIC_ALL_CASE_RATE_SUCCESS:
        return {
            ...state,
            phicAllCaseRates: state.phicAllCaseRates.filter(t => t.id != action.payload)
        };

    case PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY : 
        return state = {
            ...state,
            isFinalReady : action.ready
        };

    case GET_UPDATE_NEWBORN_CARE: 
        return state = {
            ...state,
            selectedCf2 : { ...action.selectedCf2, newBornEssentialCare : action.newborn}
        };

    case GET_UPDATE_HEARING_TEST:
        return {
            ...state,
            selectedCf2 : { ...action.selectedCf2, newBornHearingTest : action.hearing}
        };

    case GET_UPDATE_SCREENING_TEST:
        return {
            ...state,
            selectedCf2 : { ...action.selectedCf2, newBornScreeningTest : action.screening}
        };
    
    case UPDATE_PHICALLCASERATE_NEWBORN:
        return {
            ...state,
            phicAllCaseRates: state.phicAllCaseRates.filter(x => {
                if(x.id == action.phicAllCaseRates[0].id) {
                    x.caseRateAmount = action.phicAllCaseRates[0].caseRateAmount;
                    return x;
                }
                return x;
            })
        };

    default : return state;
    }
};

// *** EDIT PHIC CLAIMS DETAILS CF2
const editPhicClaimDetailCf2Request = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_EDIT_REQUEST
});

const editPhicClaimDetailCf2Success = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_EDIT_SUCCESS
});

const editPhicClaimDetailCf2Error = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_EDIT_ERROR
});

// *** GET SELECTED PHIC CLAIMS DETAILS CF2
const getSelectedPhicClaimDetailCf2Request = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SELECTED_REQUEST,
});

const getSelectedPhicClaimDetailCf2Success = (selectedCf2) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SELECTED_SUCCESSS,
    selectedCf2
});

const getSelectedPhicClaimDetailCf2Error = () => ({
    type : PHIC_CLAIMS_DETAILS_CF2_SELECTED_ERROR 
});

const addToStateZBenefits = (zBenefits) => ({
    type: PHIC_CLAIMS_LIST_OF_ZBENEFITS,
    zBenefits 
});

// const getSelectedZBenefits = (selectedBenefit) => ({
//     type: PHIC_CLAIMS_SELECTED_ZBENEFITS,
//     selectedBenefit    
// });



const checkSelectedZBenefit = (code) => ({
    type: PHIC_CLAIMS_SELECTED_CHECKBOX_IN_ZBENEFIT,
    code
});

const updateZBenefit = (selectedValue) => ({
    type: PHIC_CLAIMS_UPDATE_SELECTED_ZBENEFITS,
    selectedValue
});

const isFinalReady = (value) => ({
    type : CF2_SAVE_INFORMATION_DETAILS,
    value
});

// IS FINAL READY
const isFinalReadyRequest = (ready) => ({
    type : PHIC_CLAIMS_DETAILS_CF2_IS_FINAL_READY,
    ready
});




/**
 *  Check desired checkbox on zBenefit
 * 
 * @export
 * @param {any} code
 * @returns
 */
export function checkSelectedCheckboxOnZBenefit(code) {
    return (dispatch) => {
        dispatch(checkSelectedZBenefit(code));        
    };
}


export function updateSelectedZBenefit(code, value, desc) {
    return (dispatch) => {        

        let selectedValue = [];                
        selectedValue.push(code);                
        selectedValue.push(value);
        selectedValue.push(desc);        
                
        dispatch(updateZBenefit(selectedValue));
    };
}

/**
 *  This will move the initial Data of zBenefits to State when Opening the Dialog
 * 
 * @export
 * @param {any} listOfZBenefits
 * @returns
 */
export function addToStateZBenefit (listOfZBenefits) {
    return (dispatch) => {
        dispatch(addToStateZBenefits(listOfZBenefits));
    };
}


/**
 * Edit PHIC Claims Details CF2
 * 
 * @export
 * @param {any} cf2
 * @returns
 */
export function editPhicClaimDetailCf2 ( cf2Dto, transmittalId, claimId, phicAllCaseRates) {
    return (dispatch, getState, {clientBeacon}) => {        
        dispatch(editPhicClaimDetailCf2Request());      
        if (phicAllCaseRates !== undefined){
            cf2Dto.allCaseRate = [];
            let newPhicAllCaseRates = !phicAllCaseRates[0] ? null : phicAllCaseRates[0];
            cf2Dto.allCaseRate.push(newPhicAllCaseRates);
        }
        
       // let cf2DtoNew = phicAllCaseRates.push(cf2Dto);
        clientBeacon.put('/api/PHICCF2/EditPHICCF2', cf2Dto)
            .then(() => {
                dispatch(editPhicClaimDetailCf2Success());     
                dispatch(Notifications.success({
                    ...notificationOpts,
                    message:'CF2 Record has been successfully saved!',
                    title: 'Success'
                }));  

                // *** count issues
                dispatch(isFinalReady(true));
                dispatch(isFinalReadyRequest(true));  
                dispatch(getPhicClaimsIssuesCount(claimId));                         
            })

            .catch(error => {
                dispatch(editPhicClaimDetailCf2Error());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'
                }));                
            });          
    };
}

/**
 * Get Selected Phic Claims Details Cf2
 * 
 * @export
 * @returns
 */
export function getSelectedPhicClaimDetailCf2(claimId) {
    return (dispatch, getState, { clientBeacon }) => {        

        // dispatch(getSelectedPhicClaimDetailCf2Request());

        // clientBeacon.get(`/api/PHICCF2/GetPHICCF2ById?claimId=${claimId}`)
        //     .then(response => {
                
        //         dispatch(getSelectedPhicClaimDetailCf2Success(response.data));                     
        //     })

        //     .catch(error => {
        //         dispatch(getSelectedPhicClaimDetailCf2Error());

        //         dispatch(Notifications.error({
        //             ...notificationOpts,
        //             message: error.data.exceptionMessage,
        //             title: 'Error'
        //         }));               
        //     });
        dispatch(getSelectedPhicClaimDetailCf2Success({}))

        console.log('test here test');
    };
}


/**
 * Action Type on click of checkbox newbornCare, hearingTest, screeningTest
 * 
 * @export
 * @param {any} newborn 
 * @param {any} selectedCf2 
 * @param {any} phicAllCaseRates 
 * @returns 
 */
export function newbornCare (newborn, selectedCf2, phicAllCaseRates){
    return{
        type: GET_UPDATE_NEWBORN_CARE,
        newborn,
        selectedCf2,
        phicAllCaseRates
    };
}
export function hearingTest (hearing, selectedCf2, phicAllCaseRates){
    return{
        type: GET_UPDATE_HEARING_TEST,
        hearing,
        selectedCf2,
        phicAllCaseRates
    };
}
export function screeningTest (screening, selectedCf2, phicAllCaseRates){
    return{
        type: GET_UPDATE_SCREENING_TEST,
        screening,
        selectedCf2,
        phicAllCaseRates
    };
}

//TODO REY

// /**
//  * Newborn Package for Tagged Case Rate
//  * 
//  * @export
//  * @param {any} isChecked 
//  * @param {any} phicAllCaseRates 
//  * @param {any} selectedCf2 
//  * @param {any} value 
//  * @returns 
//  */
// export function onComputeTotalCaseRateAmount(isChecked, phicAllCaseRates, selectedCf2, value) {
//     let defaultValue = phicAllCaseRates.length !== 0 ? phicAllCaseRates[0].caseRateAmount !== 1750 ? 0 : 1750 : 1750;

//     if (phicAllCaseRates.length !== 0) {

//         if (isChecked) {
//             phicAllCaseRates[0].caseRateAmount -= defaultValue + value;
//         }
//         else {
//             phicAllCaseRates[0].caseRateAmount -= value;
//             phicAllCaseRates[0].caseRateAmount = phicAllCaseRates[0].caseRateAmount == 0 ? 1750 : phicAllCaseRates[0].caseRateAmount;
//         }
//     }

//     return{
//         type: UPDATE_PHICALLCASERATE_NEWBORN,
//         isChecked,
//         selectedCf2,
//         phicAllCaseRates
//     };
// }