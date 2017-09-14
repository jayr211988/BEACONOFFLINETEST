import React, { PropTypes } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** dumb components
import XrayLabSuppliesAndOthersNew from '../components/new';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
const styles = { 
    dialogBodyStyle : {
        minHeight: '355px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },  
};

/**
 * Xray, Lab, Supplies and Others New Container
 * 
 * @class XrayLabSuppliesAndOthersNewContainer
 * @extends {React.Component}
 */

@connect(
    state => state.phicClaimsDetailsXrayLabSuppliesAndOtherNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class XrayLabSuppliesAndOthersNewContainer extends React.Component{
    
    render(){
        const { closeDialog, open, newPHICXLSORequestPending } = this.props;
        return (
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}> 

                    { /** LOADING INDICATOR */ }
                    {
                        newPHICXLSORequestPending ?
                        <LoadingIndicatorPerContainer isDialog={true}/>
                    :
                        <XrayLabSuppliesAndOthersNew 
                            closeDialog={closeDialog}
                            onSubmit={this.onSave.bind(this)}
                        />
                    }
                </Dialog>
            </StyleRoot>
        );
    }
    onSave(values, x, { reset }) {
        const { closeDialog, selectedClaim,
            actions: {newPHICXLSO} } = this.props;

        newPHICXLSO({
            ...values,
            phicClaimId: selectedClaim.id
        }, closeDialog, reset);
    }

}

export default XrayLabSuppliesAndOthersNewContainer;