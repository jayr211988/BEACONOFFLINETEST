import React, { Component, PropTypes } from 'react';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import Radium, { StyleRoot } from 'radium';

// *** smart components
import PhicTransmittalsIssuesListContainer from './list/containers/list';

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
 * @class PhicTransmittalsIssues
 * @extends {Component}
 */
@Radium
class PhicTransmittalsIssues extends Component {
    render() {
        const { closeDialog, open, selectedTransmittal } = this.props;
        
        return (
            <StyleRoot>
                <Dialog                 
                    open={ open }
                    onRequestClose={closeDialog}
                    bodyStyle={styles.dialogBodyStyle}>
                                
                    <PhicTransmittalsIssuesListContainer 
                        closeDialog={closeDialog} 
                        selectedTransmittal={selectedTransmittal}
                    /> 
                </Dialog>                
            </StyleRoot>
        );
    }
}

// *** props
PhicTransmittalsIssues.propTypes  = {
    selectedTransmittal : PropTypes.object,
    open : PropTypes.bool.isRequired,
    closeDialog : PropTypes.func.isRequired
};

export default PhicTransmittalsIssues;