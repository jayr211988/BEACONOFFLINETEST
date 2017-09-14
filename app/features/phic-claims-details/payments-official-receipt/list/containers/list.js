import React from 'react';
import PaymentsList from '../components/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Radium, { StyleRoot } from 'radium';

import * as duck from '../duck';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';


@connect(
    state => state.phicClaimsDetailsPaymentOfficiallReceipListReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class PaymentsListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const {selectedClaim, actions: {getPHICPaymentsOfficialReceipt}} = this.props;
        getPHICPaymentsOfficialReceipt(selectedClaim.id);
    }

    componentWillReceiveProps(nextProps) {
        const {selectedClaim, selectedTransmittal, actions : {removeIssueOnPaymentItem}} = this.props;
        if (nextProps.phicPaymentOfficialReceipt) {
            
            removeIssueOnPaymentItem(nextProps.phicPaymentOfficialReceipt, selectedTransmittal.id, selectedClaim.id);
        }        
    }
 

    render() {
        const { phicPaymentOfficialReceipt, 
                selectedClaim, 
                selectedTransmittal,
                getPHICPaymentOfficialReceiptRequestPending, 
                summaryMode,
                actions: { 
                    deleletePHICPaymentsOfficialReceipt,
                    editPHICPaymentDetails,
                    deletePHICPaymentDetails,
                    newPHICPaymentDetails
                                      
                }} = this.props;    
        return (
            <div>
                {
                    getPHICPaymentOfficialReceiptRequestPending ?
                        null
                        :
                        <PaymentsList
                            phicPaymentOfficialReceipt={phicPaymentOfficialReceipt}
                            selectedClaim={selectedClaim}
                            deleletePHICPaymentsOfficialReceipt={deleletePHICPaymentsOfficialReceipt}
                            editPHICPaymentDetails={editPHICPaymentDetails}
                            deletePHICPaymentDetails={deletePHICPaymentDetails}
                            newPHICPaymentDetails={newPHICPaymentDetails}
                            selectedTransmittal={selectedTransmittal}
                            summaryMode={summaryMode}                     
                        />
                }
            </div>
        );
    }
}
export default PaymentsListContainer;
