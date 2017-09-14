import React, { PropTypes } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** dumb components
import ChargesDrugsAndMedicinesNew from '../components/new';
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
 * Drugs and Medicines New Container
 * 
 * @class ChargesDrugsAndMedicinesNewContainer
 * @extends {React.Component}
 */

@connect(
    state => state.phicClaimsDetailsChargesDrugsAndMedicinesNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ChargesDrugsAndMedicinesNewContainer extends React.Component {

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChargesDrugsAndMedicinesNewContainer
     */
    render() {
        const { closeDialog, open, newPHICChargesDrugAndMedicineRequestPending } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}>                     

                    { /** LOADING INDICATOR */ }
                    { newPHICChargesDrugAndMedicineRequestPending ? 
                        <LoadingIndicatorPerContainer isDialog={true}/>
                    :
                        <ChargesDrugsAndMedicinesNew 
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
            actions: {newPHICChargesDrugAndMedicine} } = this.props;

        newPHICChargesDrugAndMedicine({
            ...values,
            phicClaimId: selectedClaim.id
        }, closeDialog, reset);
    }
}

// *** props
ChargesDrugsAndMedicinesNewContainer.propTypes = {
    // selectedClaim : PropTypes.object.isRequired
};

export default ChargesDrugsAndMedicinesNewContainer;