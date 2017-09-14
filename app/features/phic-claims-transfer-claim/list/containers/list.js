import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Radium, { StyleRoot } from 'radium';

// *** dumb components
import PhicClaimsTransferClaim from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

// *** custom css styles
const styles = { 
    container : {
        width: '100%',
        height: '100%'
    }
};

/**
 * Claims Transfer List Container
 * 
 * @class PhicClaimsTransferClaimListContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsTransferClaimListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicClaimsTransferClaimListContainer extends React.Component {
    
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicClaimsTransferClaimListContainer
     */
    componentWillMount() {
        const { 
            selectedFacility,
            selectedClaim, 
            selectedTransmittal,
            actions : { getTransmittalStatusAndPackageType } } = this.props;

        getTransmittalStatusAndPackageType(
            selectedFacility.id, 
            selectedTransmittal.id, 
            selectedClaim.phicPackage
        );
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsTransferClaimListContainer
     */
    render() {
        const { 
            closeDialog,
            transferClaimRequestPending,
            availableListToTransfer,
            selectedClaim,
            actions : { transferClaim } } = this.props;

        return (
            <StyleRoot style={styles.container}>

                { /** LOADING INDICATOR*/ }
                { transferClaimRequestPending ? 
                     <LoadingIndicatorPerContainer isDialog={true} />
                : 
                    <PhicClaimsTransferClaim 
                        transferClaim={transferClaim}
                        selectedClaim={selectedClaim}
                        closeDialog={closeDialog}
                        availableListToTransfer={availableListToTransfer}
                    /> 
                }
            </StyleRoot>
        );
    }
}

// *** props
PhicClaimsTransferClaimListContainer.propTypes = {
    closeDialog : PropTypes.func.isRequired,
    selectedClaim : PropTypes.object
};

export default PhicClaimsTransferClaimListContainer;
