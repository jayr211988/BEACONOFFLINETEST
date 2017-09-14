import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Dialog from 'material-ui/Dialog';

// *** dumb components
import Cf2DischargeDiagnosisNew from '../components/new';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

const styles = {
    dialogBodyStyle: {
        padding: '24px'
    }
};

/**
 * C2f Container
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsCf2DischargeDiagnosisNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2DischargeDiagnosisNewContainer extends React.Component {

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const {open, actions: { searchICD10, clearPHICICD10s, newPHICDischargeDiagnosis },
                phicICD10s, searchICD10RequestPending, selectedClaim,
                newPHICDischargeDiagnosisRequestPending } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={this.close.bind(this)}>
                    
                    <Cf2DischargeDiagnosisNew
                        close={this.close.bind(this)}
                        clearPHICICD10s={clearPHICICD10s}
                        phicICD10s={phicICD10s}
                        searchICD10={searchICD10}
                        searchICD10RequestPending={searchICD10RequestPending}
                        selectedClaim={selectedClaim}
                        newPHICDischargeDiagnosis={newPHICDischargeDiagnosis}
                        newPHICDischargeDiagnosisRequestPending={newPHICDischargeDiagnosisRequestPending} 
                    />                    
                </Dialog>
            </StyleRoot>
        );
    }

    close() {
        const { actions: { clearPHICICD10s }, close } = this.props;

        clearPHICICD10s();
        close();
    }
}

export default Cf2DischargeDiagnosisNewContainer;
