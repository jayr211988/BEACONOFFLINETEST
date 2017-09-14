import Notifications from 'react-notification-system-redux';
import { browserHistory } from 'react-router';


const PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_REQUEST = 'PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_REQUEST';
const PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_SUCCESS = 'PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_SUCCESS';
const PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_ERROR = 'PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_ERROR';

const PHIC_CLAIMS_TRANSFER_CLAIM_REQUEST = 'PHIC_CLAIMS_TRANSFER_CLAIM_REQUEST';
const PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS = 'PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS';
const PHIC_CLAIMS_TRANSFER_CLAIM_ERROR = 'PHIC_CLAIMS_TRANSFER_CLAIM_ERROR';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

export default (state = {
    availableListToTransfer: [],
    transferClaimRequestPending: true

}, action) => {
    switch (action.type) {

    case PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_REQUEST:
        return state ={
            ...state,
            transferClaimRequestPending: true
        };

    case PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_SUCCESS:
        return state ={
            ...state,
            availableListToTransfer: action.transmittalList,
            transferClaimRequestPending: false
        };

    case PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_ERROR:
        return state ={
            ...state,
            transferClaimRequestPending: false
        };

    case PHIC_CLAIMS_TRANSFER_CLAIM_REQUEST :
        return state = {
            ...state,
            transferClaimRequestPending: true
        };

    case PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS :
        return state = {
            ...state,
            transferClaimRequestPending: false,
        };

    case PHIC_CLAIMS_TRANSFER_CLAIM_ERROR :
        return state = {
            ...state,
            transferClaimRequestPending: false
        };

    default: return state;
    }
};

const getTransmittalStatusAndPackageTypeRequest = () => ({
    type: PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_REQUEST
});

const getTransmittalStatusAndPackageTypeSucess = (transmittalList) => ({
    type: PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_SUCCESS,
    transmittalList
});

const getTransmittalStatusAndPackageTypeError = () => ({
    type: PHIC_CLAIMS_SAME_TRANSMITTAL_STATUS_AND_PACKAGE_TYPE_ERROR
});

export function getTransmittalStatusAndPackageType(clientId, transmittalId, packageType){
    return (dispatch, getState, {clientBeacon}) => {
        dispatch(getTransmittalStatusAndPackageTypeRequest());

        clientBeacon.get(`api/PHICClaim/GetSameTransmittalStatusAndPackageType?clientId=${clientId}&transmittalId=${transmittalId}&packageType=${packageType}`)
            .then(response => {
                dispatch(getTransmittalStatusAndPackageTypeSucess(response.data));
            })

            .catch(error => {
                dispatch(getTransmittalStatusAndPackageTypeError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'                    
                })); 
            });
    };
}

const transferClaimRequest = () => ({
    type : PHIC_CLAIMS_TRANSFER_CLAIM_REQUEST
});

const transferClaimSuccess = (claimId) => ({
    type : PHIC_CLAIMS_TRANSFER_CLAIM_SUCCESS,
    claimId
});

const transferClaimError = () => ({
    type : PHIC_CLAIMS_TRANSFER_CLAIM_ERROR
});

/**
 * Transfer Claim
 * 
 * @export
 * @param {any} claimId 
 * @param {any} transmittalId 
 * @param {any} transmittalNumber 
 * @param {any} closeDialog 
 * @returns 
 */
export function transferClaim(claimId, transmittalId, transmittalNumber, closeDialog) {
    return (dispatch, getState, { clientBeacon }) => {

        dispatch(transferClaimRequest());

        clientBeacon.put(`api/PHICClaim/EditPHICClaimTransmittal?claimId=${claimId}&transmittalId=${transmittalId}`)

            .then(() => {
                closeDialog();
                dispatch(transferClaimSuccess(claimId));

                dispatch(Notifications.success({
                    ...notificationOpts,
                    message: `Claim no. ${claimId} are successfully transferred to Transmittal no. ${transmittalNumber}`,
                    title: 'Success'                    
                }));                    
            })

            .catch(error => {
                closeDialog();
                dispatch(transferClaimError());

                dispatch(Notifications.error({
                    ...notificationOpts,
                    message: error.data.exceptionMessage,
                    title: 'Error'                    
                }));                 
            });
    };
}