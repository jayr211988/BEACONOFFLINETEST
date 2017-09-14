import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** dumb components
import PaymentOfficialReceiptEdit from '../components/edit';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
const styles = { 
    dialogBodyStyle : {
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },  
};

/**
 * official receipt Edit Container
 * 
 * @class PaymentOfficialReceiptEditContainer
 * @extends {React.Component}
 */

@connect(
    state => state.phicClaimsDetailsPaymentOfficialReceiptEditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)

@Radium
class PaymentOfficialReceiptEditContainer extends React.Component{
        /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PaymentOfficialReceiptEditContainer
     */
    render(){
        const {closeDialog, open, editPHICPaymentOfficialReceiptRequestPending } = this.props;
        return(
            <StyleRoot>
                <div>
                    <Dialog
                        open={ open }
                        modal={ false }
                        onRequestClose={closeDialog}
                        bodyStyle={styles.dialogBodyStyle}>                     

                        { /** LOADING INDICATOR */ }
                        { editPHICPaymentOfficialReceiptRequestPending ? 
                            <LoadingIndicatorPerContainer isDialog={true}/>
                        :
                            <PaymentOfficialReceiptEdit 
                                {...this.onSetDefaultValues()}
                                closeDialog={closeDialog}
                                onSubmit={this.onSave.bind(this)}
                            />                    
                        }
                    </Dialog>
                </div>
            </StyleRoot>
        );
    }
    onSave(formValues) {
        const { closeDialog, selectedClaim,
            actions: { editPHICPaymentOfficialReceipt} } = this.props;

        editPHICPaymentOfficialReceipt({
            ...formValues,
            phicClaimId: selectedClaim.id
        }, closeDialog);
    }

    onSetDefaultValues() {
        const { selectedOfficialReceipt } = this.props;

        return { 
            initialValues : selectedOfficialReceipt
        };
    }
}

export default PaymentOfficialReceiptEditContainer;