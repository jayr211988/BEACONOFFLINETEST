import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import Cf2SurgicalProcedureList from '../components/list';

import Radium, { StyleRoot } from 'radium';

/**
 * Container Surgical Procedure List
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => {  
        const { phicDischargeDiagnoses } = state.phicClaimsDetailsCf2DischargeDiagnosisListReducer;

        return {
            ...state.phicClaimsDetailsCf2SurgicalProcedureListReducer,
            phicDischargeDiagnoses
        };
    },
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2SurgicalProcedureListContainer extends React.Component {

    /**
     * Set Default Values
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureListContainer
     */
    onSetDefaultValues() {
        const { initialValues, surgicalProceduresList } = this.props;        
        initialValues['surgicalProcedures'] = surgicalProceduresList;

        return initialValues;
    }

    /**
     * component Will Mount
     * 
     * 
     * @memberOf Cf2SurgicalProcedureListContainer
     */
    // componentWillMount() {
    //     const { 
    //         selectedClaim, 
    //         actions: { getPhicClaimsDetailsCf2SurgicalProcedureList } } = this.props;

    //     getPhicClaimsDetailsCf2SurgicalProcedureList(selectedClaim.id);
    // }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const { 
            selectedClaim, 
            phicDischargeDiagnoses, 
            surgicalProceduresList,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending,
            deletePhicClaimsDetailsCf2SurgicalProcedureRequestPending,
            editPhicSurgicalProcedureSessionLateralityRequestPending,
            phicAllCaseRates,
            selectedTransmittal,
            isClaimTypeAllCaseRate,
            summaryMode,
            selectedCf2,
            fields,
            actions: {
                // *** Actions
                deletePhicClaimsDetailsCf2SurgicalProcedure,
                editLateralityOfSelectedSessions,
                newPHICAllCaseRate,
                deletePHICAllCaseRate
            }} = this.props;
        return (
            <StyleRoot>
                { !getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending ? 
                    <Cf2SurgicalProcedureList
                        { ...this.onSetDefaultValues() }
                        selectedClaim={selectedClaim} 
                        phicDischargeDiagnoses={phicDischargeDiagnoses}
                        surgicalProceduresList={surgicalProceduresList}
                        deletePhicClaimsDetailsCf2SurgicalProcedureRequestPending={deletePhicClaimsDetailsCf2SurgicalProcedureRequestPending}
                        editPhicSurgicalProcedureSessionLateralityRequestPending={editPhicSurgicalProcedureSessionLateralityRequestPending}
                        deletePhicClaimsDetailsCf2SurgicalProcedure={deletePhicClaimsDetailsCf2SurgicalProcedure}
                        editLateralityOfSelectedSessions={editLateralityOfSelectedSessions}
                        phicAllCaseRates={phicAllCaseRates}
                        newPHICAllCaseRate={newPHICAllCaseRate}
                        deletePHICAllCaseRate={deletePHICAllCaseRate}
                        selectedTransmittal={selectedTransmittal}
                        isClaimTypeAllCaseRate={isClaimTypeAllCaseRate}
                        summaryMode={summaryMode}
                        selectedCf2={selectedCf2}   
                        fields={fields}             
                    />  
                    : null
                }
            </StyleRoot>
        );
    }
}

export default Cf2SurgicalProcedureListContainer;
