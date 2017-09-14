import React, { PropTypes } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import moment from 'moment';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** dumb components
import ChargesDrugsAndMedicinesEdit from '../components/edit';
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
 * @class ChargesDrugsAndMedicinesEditContainer
 * @extends {React.Component}
 */

@connect(
    state => state.phicClaimsDetailsChargesDrugsAndMedicinesEditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ChargesDrugsAndMedicinesEditContainer extends React.Component {

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChargesDrugsAndMedicinesEditContainer
     */
    render() {
        const { closeDialog, open, editPHICChargesDrugAndMedicineRequestPending } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}
                    >                     

                    { /** LOADING INDICATOR */ }
                    { editPHICChargesDrugAndMedicineRequestPending ? 
                        <LoadingIndicatorPerContainer isDialog={true}/>
                    :
                        <ChargesDrugsAndMedicinesEdit
                            {...this.onSetDefaultValues()}
                            closeDialog={closeDialog}
                            onSubmit={this.onSave.bind(this)}
                        />                    
                    }
                </Dialog>
            </StyleRoot>
        );
    }

    onSave(formValues) {
        const { closeDialog, actions: {editPHICChargesDrugAndMedicine} } = this.props;

        editPHICChargesDrugAndMedicine(formValues, closeDialog);
    }

    onSetDefaultValues() {
        const { selectedDrugAndMedicine } = this.props;

        return { 
            initialValues : selectedDrugAndMedicine
        };
    }
}

// *** props
ChargesDrugsAndMedicinesEditContainer.propTypes = {
    // selectedClaim : PropTypes.object.isRequired
};

export default ChargesDrugsAndMedicinesEditContainer;