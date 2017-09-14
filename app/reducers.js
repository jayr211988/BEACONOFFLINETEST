
// react + redux
import { reducer as notifications } from 'react-notification-system-redux';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// reducers
import loginReducer from './features/login/duck';
import forgotPasswordReducer from './features/forgot-password/duck';
import emailConfirmationReducer from './features/email-confirmation/duck';
import mainPageReducer from './features/main/duck';
import headerDropdownSwitchFacilityReducer from './features/main/duck';
import homeReducers from './features/home/duck';

import clientUsersListReducer from './features/client-users/list/duck';
import clientUsersDeleteReducer from './features/client-users/list/duck';
import clientUsersEditReducer from './features/client-users/edit/duck';
import clientUsersNewReducer from './features/client-users/new/duck';
import clientUsersManageAccessReducer from './features/client-users/manage-access/duck';

import clientsListReducer from './features/clients/list/duck';
import clientsDeleteReducer from './features/clients/list/duck';
import clientsEditReducer from './features/clients/edit/duck';
import clientsNewReducer from './features/clients/new/duck';

import clientProductsListReducer from './features/client-products/list/duck';

// users
import usersListReducer from './features/users/list/duck';
import usersEditReducer from './features/users/edit/duck';
import usersNewReducer from './features/users/new/duck';
import usersMyProfileReducer from './features/my-profile/duck';

import changePasswordReducer from './features/change-password/duck';
import phicClaimsIssuesListReducer from './features/phic-claims-issues/list/duck';
import phicTransmittalsListReducer from './features/phic-transmittals/list/duck';
import phicTransmittalsEditReducer from './features/phic-transmittals/edit/duck';
import phicTransmittalsNewReducer from './features/phic-transmittals/new/duck';
import phicTransmittalsIssuesListReducer from './features/phic-transmittals-issues/list/duck';

import phicClaimsListReducer from './features/phic-claims/list/duck';
import phicClaimsTransferClaimListReducer from './features/phic-claims-transfer-claim/list/duck';
import phicClaimsNewRequiredDocumentsReducer from './features/phic-claims/new-required-documents/duck';
import phicClaimsWithChequeWithVoucherVoucheringReducer from './features/phic-claims/with-check-with-voucher-vouchering/duck';
import phicClaimsDetailsCf2Reducer from './features/phic-claims-details/cf2/duck';
import phicClaimsDetailsCf2DischargeDiagnosisListReducer from './features/phic-claims-details/cf2-discharge-diagnosis/list/duck';
import phicClaimsDetailsCf2DischargeDiagnosisNewReducer from './features/phic-claims-details/cf2-discharge-diagnosis/new/duck';
import phicClaimsDetailsCf2DoctorsListReducer from './features/phic-claims-details/cf2-doctors/list/duck';
import phicClaimsDetailsCf2DoctorsNewReducer from './features/phic-claims-details/cf2-doctors/new/duck';
import phicClaimsDetailsCf2SurgicalProcedureListReducer from './features/phic-claims-details/cf2-surgical-procedure/list/duck';
import phicClaimsDetailsCf2SurgicalProcedureNewReducer from './features/phic-claims-details/cf2-surgical-procedure/new/duck';
import phicHospitalCodeReducer from './features/phic-claims-form/duck';

import phicClaimsDetailsMainReducer from './features/phic-claims-details/main/duck';
import phicClaimsDetailsCf1Reducer from './features/phic-claims-details/cf1-new/duck';
import phicClaimsDetailsCf1SummaryReducer from './features/phic-claims-details/cf1-summary/duck';
import phicClaimsDetailsCf1EditReducer from './features/phic-claims-details/cf1-edit/duck';
import phicClaimsDetailsCf2DischargeDiagnosisEditCustomDescriptionReducer from './features/phic-claims-details/cf2-discharge-diagnosis/edit-custom-description/duck';
import phicClaimsDetailsCf2SummaryReducer from './features/phic-claims-details/cf2-summary/duck';
import phicClaimsDetailsDocumentsListReducer from './features/phic-claims-details/documents/list/duck';
import phicClaimsDetailsDocumentsNewReducer from './features/phic-claims-details/documents/new/duck';
import phicClaimsDetailsAllCaseRatesListReducer from './features/phic-claims-details/cf2-all-case-rates/list/duck';
import phicClaimsDetailsChargesReducer from './features/phic-claims-details/charges/duck';
import phicClaimsDetailsChargesDrugsAndMedicinesListReducer from './features/phic-claims-details/charges-drugs-and-medicines/list/duck';
import phicClaimsDetailsChargesDrugsAndMedicinesNewReducer from './features/phic-claims-details/charges-drugs-and-medicines/new/duck';
import phicClaimsDetailsChargesDrugsAndMedicinesEditReducer from './features/phic-claims-details/charges-drugs-and-medicines/edit/duck';
import phicClaimsDetailsXrayLabSuppliesAndOtherListReducer from './features/phic-claims-details/charges-xlso/list/duck';
import phicClaimsDetailsXrayLabSuppliesAndOtherNewReducer from './features/phic-claims-details/charges-xlso/new/duck';
import phicClaimsDetailsXrayLabSuppliesAndOtherEditReducer from './features/phic-claims-details/charges-xlso/edit/duck';
import phicClaimsDetailsPaymentOfficiallReceipListReducer from './features/phic-claims-details/payments-official-receipt/list/duck';
import phicClaimsDetailsPaymentOfficialReceiptNewReducer from './features/phic-claims-details/payments-official-receipt/new/duck';
import phicClaimsDetailsPaymentOfficialReceiptEditReducer from './features/phic-claims-details/payments-official-receipt/edit/duck';

import phicClaimsDetailsPaymentOfficialReceiptDetailsNewReducer from './features/phic-claims-details/payments-official-receipt-details/new/duck';
import phicClaimsDetailsPaymentOfficialReceiptDetailsListReducer from './features/phic-claims-details/payments-official-receipt-details/list/duck';
import phicClaimsDetailsPaymentOfficialReceiptDetailsEditReducer from './features/phic-claims-details/payments-official-receipt-details/edit/duck';

import phicMemberInquiryReducer from './features/phic-member-inquiry/duck';
import phicTransactionsMainReducer from './features/phic-transactions/main/duck';
import phicTransactionsEclaimsListReducer from './features/phic-transactions/eclaims/duck';
import phicTransactionsEclaimsApiListReducer from './features/phic-transactions/eclaims-api/duck';
// products
import productListReducer  from './features/products/list/duck';
import productQmeUpAPIReducer from './features/products/new/duck';

// qmuAndHisBranches
import qmuAndHisBranchesListReducer from './features/qmeup-and-his-branches/list/duck';

//http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const appReducer = combineReducers({
    loginReducer,
    emailConfirmationReducer,
    forgotPasswordReducer,

    // *** Client Users
    clientUsersListReducer,
    clientUsersEditReducer,
    clientUsersDeleteReducer,
    clientUsersNewReducer,
    clientUsersManageAccessReducer,

    // *** Clients
    clientsListReducer,
    clientsDeleteReducer,
    clientsEditReducer,
    clientsNewReducer,

    // *** Client Products
    clientProductsListReducer,

    // users    
    usersListReducer,
    usersNewReducer,
    usersEditReducer,
    usersMyProfileReducer,

    // products
    productListReducer,
    productQmeUpAPIReducer,

    // qmuAndHisBranches
    qmuAndHisBranchesListReducer,


    // dialogHospitalCodeReducer, 
    mainPageReducer,        
    headerDropdownSwitchFacilityReducer,

    // productPageReducer,
    homeReducers,
    notifications,
    form,
    routing : routerReducer,
    changePasswordReducer,


    phicHospitalCodeReducer,
    phicClaimsIssuesListReducer,
    
    phicTransmittalsListReducer,
    phicTransmittalsEditReducer,
    phicTransmittalsNewReducer,
    phicTransmittalsIssuesListReducer,

    phicClaimsListReducer,
    phicClaimsTransferClaimListReducer,
    phicClaimsNewRequiredDocumentsReducer,
    phicClaimsWithChequeWithVoucherVoucheringReducer,
    phicClaimsDetailsMainReducer,

    phicClaimsDetailsCf2Reducer,
    phicClaimsDetailsCf2DischargeDiagnosisListReducer,
    phicClaimsDetailsCf2DischargeDiagnosisNewReducer,
    phicClaimsDetailsCf2DischargeDiagnosisEditCustomDescriptionReducer,
    phicClaimsDetailsCf2DoctorsListReducer,
    phicClaimsDetailsCf2DoctorsNewReducer,
    phicClaimsDetailsCf2SurgicalProcedureListReducer,
    phicClaimsDetailsCf2SurgicalProcedureNewReducer,
    phicClaimsDetailsCf1Reducer,
    phicClaimsDetailsCf1SummaryReducer,
    phicClaimsDetailsCf1EditReducer,

    
    phicClaimsDetailsCf2SummaryReducer,
    phicClaimsDetailsDocumentsListReducer,
    phicClaimsDetailsDocumentsNewReducer,
    phicClaimsDetailsAllCaseRatesListReducer,
    phicClaimsDetailsChargesReducer,
    phicClaimsDetailsChargesDrugsAndMedicinesListReducer,
    phicClaimsDetailsChargesDrugsAndMedicinesNewReducer,
    phicClaimsDetailsChargesDrugsAndMedicinesEditReducer,
    phicClaimsDetailsXrayLabSuppliesAndOtherListReducer,
    phicClaimsDetailsXrayLabSuppliesAndOtherNewReducer,
    phicClaimsDetailsXrayLabSuppliesAndOtherEditReducer,

    phicClaimsDetailsPaymentOfficiallReceipListReducer,
    phicClaimsDetailsPaymentOfficialReceiptNewReducer,
    phicClaimsDetailsPaymentOfficialReceiptEditReducer,
    phicClaimsDetailsPaymentOfficialReceiptDetailsNewReducer,
    phicClaimsDetailsPaymentOfficialReceiptDetailsListReducer,
    phicClaimsDetailsPaymentOfficialReceiptDetailsEditReducer,

    phicMemberInquiryReducer,
    phicTransactionsMainReducer,
    phicTransactionsEclaimsListReducer,
    phicTransactionsEclaimsApiListReducer
});


const rootReducer = (state, action) => {
    // if (action.type === 'APP_USER_LOGOUT') {
    //     state = undefined;
    // }
    return appReducer(state, action);
};

export default rootReducer;