import React, { Component, PropTypes } from 'react';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import Radium, { StyleRoot } from 'radium';

// *** smart components
import PhicClaimsTransferClaimContainer from './list/containers/list';

// *** custom css styles
const styles = { 
    dialogBodyStyle : {
        minHeight: '728px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    }
};

/**
 * Phic Claims Transfer Dialog
 * 
 * @class PhicClaimsTransferClaimDialog
 * @extends {Component}
 */
@Radium
class PhicClaimsTransferClaimDialog extends Component {
    render() {
        const { closeDialog, open, selectedClaim, selectedTransmittal, selectedFacility } = this.props;
        
        return (
            <StyleRoot>
                <Dialog                 
                    open={ open }
                    onRequestClose={closeDialog}
                    bodyStyle={styles.dialogBodyStyle}>
                                
                    <PhicClaimsTransferClaimContainer 
                        closeDialog={closeDialog} 
                        selectedFacility={selectedFacility}
                        selectedTransmittal={selectedTransmittal}
                        selectedClaim={selectedClaim}
                    /> 
                </Dialog>                
            </StyleRoot>
        );
    }
}

// *** props
PhicClaimsTransferClaimDialog.propTypes  = {
    selectedClaim : PropTypes.object,
    open : PropTypes.bool.isRequired,
    closeDialog : PropTypes.func.isRequired
};

export default PhicClaimsTransferClaimDialog;