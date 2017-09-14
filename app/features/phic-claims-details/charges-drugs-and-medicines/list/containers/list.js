import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import ChargesDrugsAndMedicinesList from '../components/list';

import Radium, { StyleRoot } from 'radium';

/**
 * Drugs and Medicines Container
 * 
 * @class ChargesDrugsAndMedicinesListContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsChargesDrugsAndMedicinesListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ChargesDrugsAndMedicinesListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { selectedClaim, actions: { getPHICChargesDrugsAndMedicines } } = this.props;

        getPHICChargesDrugsAndMedicines(selectedClaim.id);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChargesDrugsAndMedicinesListContainer
     */
    render() {    
        const { phicChargesDrugsAndMedicines, selectedClaim, summaryMode,
            actions: {deletePHICChargesDrugsAndMedicines} } = this.props;

        return (
            <StyleRoot>
                <ChargesDrugsAndMedicinesList
                    selectedClaim={selectedClaim}
                    phicChargesDrugsAndMedicines={phicChargesDrugsAndMedicines}
                    deletePHICChargesDrugsAndMedicines={deletePHICChargesDrugsAndMedicines} 
                    summaryMode={summaryMode}/>
            </StyleRoot>
        );
    }
}

export default ChargesDrugsAndMedicinesListContainer;
