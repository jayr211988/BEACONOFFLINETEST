
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import OfficialReceiptDetailsList from '../components/list';

import Radium, { StyleRoot } from 'radium';

/**
 * Drugs and Medicines Container
 * 
 * @class ChargesDrugsAndMedicinesListContainer
 * @extends {React.Component}
 */

@connect(
    state => state.phicClaimsDetailsPaymentOfficialReceiptDetailsListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)

@Radium
class OfficialReceiptDetailsContainer extends React.Component{
    constructor(props) {
        super(props);
    }

        /**
     * Render
     * 
     * @returns
     * 
     * @memberOf OfficialReceiptDetailsContainer
     */

    

    render(){
        const {
            selectedClaim,  listOfPaymentDetails,  officialReceipt, 
            selectedDetail,  officialReceiptItems, editPHICPaymentDetails,
            deletePHICPaymentDetails, newPHICPaymentDetails, selectedTransmittal,
            phicPaymentOfficialReceipt,
            summaryMode,
            actions : {saveToListOfPayment, getListOfPaymentDetails,  deleletePHICPaymentsOfficialReceiptDetails, saveSelectedDetailToEdit }           

            } = this.props;                    
        
        return(
            <StyleRoot>
                <OfficialReceiptDetailsList
                    selectedClaim={selectedClaim}
                    listOfPaymentDetails={listOfPaymentDetails}
                    saveToListOfPayment={saveToListOfPayment}
                    officialReceipt={officialReceipt}
                    getListOfPaymentDetails={getListOfPaymentDetails}
                    deleletePHICPaymentsOfficialReceiptDetails={deleletePHICPaymentsOfficialReceiptDetails}
                    selectedDetail={selectedDetail}
                    saveSelectedDetailToEdit={saveSelectedDetailToEdit}
                    officialReceiptItems={officialReceiptItems}
                    editPHICPaymentDetails={editPHICPaymentDetails}
                    deletePHICPaymentDetails={deletePHICPaymentDetails}
                    newPHICPaymentDetails={newPHICPaymentDetails}
                    selectedTransmittal={selectedTransmittal}
                    phicPaymentOfficialReceipt={phicPaymentOfficialReceipt}
                    summaryMode={summaryMode}
                />
            </StyleRoot>
        );
    }
}

export default OfficialReceiptDetailsContainer;