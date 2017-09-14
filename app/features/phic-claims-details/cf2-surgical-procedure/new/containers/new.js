import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import { utc } from 'moment';

// *** dumb components
import Cf2SurgicalProcedureNew from '../components/new';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

import { initialData } from '../../../../../util/data/index';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
const styles = { 
    dialogBodyStyle : {
        minHeight: '504px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },  
};

/**
 * C2f Container Surgical Procedure New
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsCf2SurgicalProcedureNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2SurgicalProcedureNewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSurgicalProcedure: null
        };
    }

    /**
     * Get Surgical Procedure Name
     * 
     * @param {any} val
     * 
     * @memberOf Cf2SurgicalProcedureNewContainer
     */
    onGetSurgicalProcedureName(val) {
        const { surgicalProcedureResult } = this.props;

        return surgicalProcedureResult.filter(t => t.rvsCode == val)[0].name;
    }

    /**
     * Get Value
     * 
     * @param {any} arr
     * @param {any} val
     * 
     * @memberOf Cf2SurgicalProcedureNewContainer
     */
    onGetValue(arr, val) {
        if(val)
            return arr.filter(t => t.code == val)[0].value;

        return null;
    }

    /**
     * Save Surgical Procedure
     * 
     * @param {any} value
     * 
     * @memberOf Cf2SurgicalProcedureNewContainer
     */
    onSave(value) {
        const { 
            fields,
            selectedClaim, 
            closeDialog,
            actions: { newPhicClaimsDetailsCf2SurgicalProcedure }} = this.props;

        value['cf2Id'] = selectedClaim.id;

        value['lateralityValue'] = 
            this.onGetValue(initialData.laterality, value.lateralityCode);
            
        value['typeValue'] =
            this.onGetValue(initialData.repetitiveProceduresType, value.typeCode);

        if(value.sessionDate) 
            value.sessionDate = utc(value.sessionDate).toDate();

        
        //value.repetitive = value.repetitive == 'Y' ? true : false;
        

        newPhicClaimsDetailsCf2SurgicalProcedure(
            value,
            fields,
            closeDialog.bind(this)
        );
    }

    /**
     * On Select Surgical Procedure
     * 
     * @param {any} surgicalProcedure
     * 
     * @memberOf Cf2SurgicalProcedureNewContainer
     */
    onSelectSurgicalProcedure(surgicalProcedure) {

        this.setState({ selectedSurgicalProcedure : surgicalProcedure });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureNewContainer
     */
    render() {
        const { 
            closeDialog, 
            open, 
            surgicalProcedureResult,
            phicDischargeDiagnoses, 
            searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending,
            newPhicClaimsDetailsCf2SurgicalProcedureRequestPending,
        
            // *** Actions
            actions: { 
                searchPhicClaimsDetailsCf2SurgicalProcedure } } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}>          

                    { newPhicClaimsDetailsCf2SurgicalProcedureRequestPending ? 
                        <LoadingIndicatorPerContainer isDialog={true} />
                    : 

                    <Cf2SurgicalProcedureNew 
                        onSubmit={this.onSave.bind(this)}
                        closeDialog={closeDialog} 
                        surgicalProcedureResult={surgicalProcedureResult}
                        phicDischargeDiagnoses={phicDischargeDiagnoses}
                        selectSurgicalProcedure={this.onSelectSurgicalProcedure.bind(this)}
                        selectedSurgicalProcedure={this.state.selectedSurgicalProcedure}
                        searchPhicClaimsDetailsCf2SurgicalProcedure={searchPhicClaimsDetailsCf2SurgicalProcedure}
                        searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending={searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending}
                    />                     
                    }       
                </Dialog>                
            </StyleRoot>
        );
    }
}

export default Cf2SurgicalProcedureNewContainer;
