import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import XrayLabSuppliesAndOthersList from '../components/list';

import Radium, { StyleRoot } from 'radium';

/**
 * Xray, Lab, Supply and Others Container
 * 
 * @class ChargesDrugsAndMedicinesListContainer
 * @extends {React.Component}
 */

@connect(
    state => state.phicClaimsDetailsXrayLabSuppliesAndOtherListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class XrayLabSuppliesAndOthersContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const {selectedClaim, actions: {getPHICChargesXLSO}} = this.props;
        
        getPHICChargesXLSO(selectedClaim.id);
    }


    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf XrayLabSuppliesAndOthersContainer
     */

    render(){
        const { phicChargesXLSOs, selectedClaim ,summaryMode,
                actions: {deletePHICXlso} } = this.props;
        
        return(
            <StyleRoot>
                <XrayLabSuppliesAndOthersList 
                phicChargesXLSOs={phicChargesXLSOs}
                selectedClaim={selectedClaim} 
                deletePHICXlso={deletePHICXlso} 
                summaryMode={summaryMode}/>
            </StyleRoot>
        );
    }
}

export default XrayLabSuppliesAndOthersContainer;