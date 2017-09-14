import React, { Component, PropTypes } from 'react';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import Radium, { StyleRoot } from 'radium';

// *** smart components
import PhicClaimsIssuesListContainer from './list/containers/list';

// *** custom css styles
const styles = { 
    dialogBodyStyle : {
        minHeight: '650px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    }
};

/**
 * Phic Claims Issues Dialog
 * 
 * @class PhicClaimsIssues
 * @extends {Component}
 */
@Radium
class PhicClaimsIssues extends Component {
    render() {
        const { closeDialog, open, selectedClaim, headerMessage, errorMessage, errorDescription } = this.props;
        
        return (
            <StyleRoot>
                <Dialog                 
                    open={ open }
                    onRequestClose={closeDialog}
                    bodyStyle={styles.dialogBodyStyle}>
                                
                    <PhicClaimsIssuesListContainer 
                        closeDialog={closeDialog} 
                        selectedClaim={selectedClaim}
                        headerMessage={headerMessage}
                        errorMessage={errorMessage}
                        errorDescription={errorDescription}
                    /> 
                </Dialog>                
            </StyleRoot>
        );
    }
}

// *** props
PhicClaimsIssues.propTypes  = {
    selectedClaim : PropTypes.object,
    open : PropTypes.bool.isRequired,
    closeDialog : PropTypes.func.isRequired
};

export default PhicClaimsIssues;