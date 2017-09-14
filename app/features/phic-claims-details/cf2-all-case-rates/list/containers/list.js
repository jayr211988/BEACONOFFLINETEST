import React from 'react';
import Radium, {StyleRoot} from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import AllCaseRateList from '../components/list';

@connect (
    state => state.phicClaimsDetailsAllCaseRatesListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class AllCaseRateListContainer extends React.Component {
    componentWillMount() {
        const { 
            selectedClaim,
            actions: {
                getPHICAllCaseRates
            }} = this.props;
        getPHICAllCaseRates(selectedClaim.id);
    }
    
    render() {
        const { phicAllCaseRates, selectedClaim, summaryMode, 
                deletePHICAllCaseRateRequestPending, newborn,
                hearing, screening, selectedCf2, actions: { deletePHICAllCaseRate } } = this.props;
        return (
            <StyleRoot>
                <AllCaseRateList
                    selectedClaim={selectedClaim}
                    summaryMode={summaryMode}
                    phicAllCaseRates={phicAllCaseRates}
                    deletePHICAllCaseRate={deletePHICAllCaseRate}
                    deletePHICAllCaseRateRequestPending={deletePHICAllCaseRateRequestPending} 
                    newbornCare={newborn}
                    hearingTest={hearing}
                    screeningTest={screening}
                    newSelectedCf2={selectedCf2}
                    />
            </StyleRoot>
        );
    }
}

export default AllCaseRateListContainer;