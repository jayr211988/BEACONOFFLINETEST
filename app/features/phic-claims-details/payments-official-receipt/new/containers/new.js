
import React, { PropTypes } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** dumb components
import OfficialReceiptNew from '../components/new';
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
 * official receipt New Container
 * 
 * @class OfficialReceiptNewContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsPaymentOfficialReceiptNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class OfficialReceiptNewContainer extends React.Component{
        /**
     * Render
     * 
     * @returns
     * 
     * @memberOf OfficialReceiptNewContainer
     */
    render(){
        const { closeDialog, open, selectedClaim, newPHICPaymentOfficialReceiptRequestPending } = this.props;
        

        return(
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}>                     

                    { /** LOADING INDICATOR */ }
                    { newPHICPaymentOfficialReceiptRequestPending ? 
                        <LoadingIndicatorPerContainer isDialog={true}/>
                    :
                        <OfficialReceiptNew 
                            closeDialog={closeDialog}
                            onSubmit={this.onSave.bind(this)}
                            selectedClaim={selectedClaim}
                        />                    
                    }
                </Dialog>
            </StyleRoot>
        );
    }
    onSave(values, x, {reset}) {
        const { closeDialog, selectedClaim, selectedTransmittal,
            actions: { newPHICPaymentOfficialReceipt } } = this.props;                
        newPHICPaymentOfficialReceipt({ ...values, phicClaimId: selectedClaim.id }, selectedClaim.id, selectedTransmittal, closeDialog, reset);
    }
}

// *** props
OfficialReceiptNewContainer.propTypes = {
    // selectedClaim : PropTypes.object.isRequired
};

export default OfficialReceiptNewContainer;