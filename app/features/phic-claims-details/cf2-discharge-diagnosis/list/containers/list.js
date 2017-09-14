import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import Cf2DischargeDiagnosisList from '../components/list';

import Radium, { StyleRoot } from 'radium';

/**
 * C2f Container
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsCf2DischargeDiagnosisListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2DischargeDiagnosisListContainer extends React.Component {

    // componentWillMount() {
    //     const { selectedClaim, actions: { getPHICDischargeDiagnoses } } = this.props;

    //     getPHICDischargeDiagnoses(selectedClaim.id);
    // }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const { selectedClaim, 
                phicDischargeDiagnoses, 
                editPhicClaimDetailCf2RequestPending,
                phicAllCaseRates,
                selectedTransmittal,
                isClaimTypeAllCaseRate,
                summaryMode,
                actions: {  editPrimaryPHICDischargeDiagnosis, 
                            deletePHICDischargeDiagnosis, 
                            editPHICDischargeDiagnosisCustomDescription,
                            newCaseRate,
                            deletePHICAllCaseRate } } = this.props;
        
        return (
            <StyleRoot>
                <Cf2DischargeDiagnosisList
                    selectedClaim={selectedClaim}
                    phicDischargeDiagnoses={phicDischargeDiagnoses}
                    editPrimaryPHICDischargeDiagnosis={editPrimaryPHICDischargeDiagnosis}
                    deletePHICDischargeDiagnosis={deletePHICDischargeDiagnosis}
                    editPHICDischargeDiagnosisCustomDescription={editPHICDischargeDiagnosisCustomDescription} 
                    editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                    phicAllCaseRates={phicAllCaseRates}
                    newCaseRate={newCaseRate}
                    deletePHICAllCaseRate={deletePHICAllCaseRate}
                    selectedTransmittal={selectedTransmittal}
                    isClaimTypeAllCaseRate={isClaimTypeAllCaseRate}
                    summaryMode={summaryMode}
                    />
            </StyleRoot>
        );
    }
}

export default Cf2DischargeDiagnosisListContainer;
