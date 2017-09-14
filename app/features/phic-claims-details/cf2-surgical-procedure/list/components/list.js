import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import find from 'lodash/find';

import { FieldArray } from 'redux-form';

// *** material-ui components

import FlatButton from 'material-ui/FlatButton';

// *** material-ui icons
import AddIcon from 'material-ui/svg-icons/content/add';

// *** dumb components
import Cf2SurgicalProcedureListItemRepetitiveNo from './list-item-repetitive-no';
import Cf2SurgicalProcedureListItemRepetitiveYes from './list-item-repetitive-yes';
import BasicDialog from '../../../../../shared-components/basic-dialog';

// *** smart components
import Cf2SurgicalProcedureNewContainer from '../../new/containers/new';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    container: {
        padding: '40px 0'
    },

    titleWrapper: {
        display: 'flex',
        alignItems: 'center',

        title: {
            color: colorPalette.primaryColor,
            fontSize : '14px',
            width: '160px',
            fontWeight: 600
        },
    },

    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px'
    },

    listContainer: {
        //marginTop: '20px'
    }
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This Surgical Procedure will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

/**
 * PHIC Claims CF2 Surgical Procedure List Component
 * 
 * @class Cf2RvsCodesList
 * @extends {React.Component}
 */
@Radium
class Cf2SurgicalProcedureList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            surgicalProcedureIndex: null,
            selectedSurgicalProcedure: null,
            openCf2SurgicalProcedureNew : false,
            basicDialogOpts : basicDialogOpts,
            basicDialogPendingRequest: false
        };
    }

    /**
     * Delete Surgical Procedure
     * 
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    onDeletePhicClaimsDetailsCf2SurgicalProcedure(event) {
        event.preventDefault();

        const { 
            deletePhicClaimsDetailsCf2SurgicalProcedure, 
            fields } = this.props;

        deletePhicClaimsDetailsCf2SurgicalProcedure(
            this.state.selectedSurgicalProcedure.id,
            fields,
            this.state.surgicalProcedureIndex,
            this.onCloseBasicDialog.bind(this),
            this.changePendingRequest.bind(this)
        );
    }

    /**
     * Open Surgical Procedure Delete Dialog
     * 
     * @param {any} claim
     * @param {any} event
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    onOpenCf2SurgicalProcedureDeleteDialog(surgicalProcedure, index, event) {
        event.preventDefault();

        this.setState({
            selectedSurgicalProcedure : surgicalProcedure,
            surgicalProcedureIndex: index,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `${surgicalProcedure.name}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeletePhicClaimsDetailsCf2SurgicalProcedure.bind(this), 
                        secondary : true
                    }
                ]
            }            
        });
    }

    /**
     * Open Tagging of Case Rate Basic Dialog
     * 
     * @param {any} claim
     * @param {any} event
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    // onOpenNewPHICAllCaseRateDialog(surgicalProcedure, caseRateType, session, event) {
    //     event.preventDefault();
    //     const ordinalCaseRate = caseRateType == 0 ? '1st' : '2nd';
    //     const {newPHICAllCaseRate, selectedClaim, selectedTransmittal} = this.props;

    //     this.setState({
    //         selectedSurgicalProcedure : surgicalProcedure,
    //         basicDialogOpts: {
    //             ...basicDialogOpts,
    //             title: `Tag as ${ordinalCaseRate} case rate for`,
    //             subtitle: `Are you sure you want to tag ${surgicalProcedure.name} as ${ordinalCaseRate} case rate?`,
    //             highlightTitle : `${surgicalProcedure.rvsCode}`,
    //             open : false,
    //             closeDialog : this.onCloseBasicDialog.bind(this),

    //             actions: [
    //                 {
    //                     label : 'CANCEL',
    //                     action : this.onCloseBasicDialog.bind(this),
    //                 },
    //                 {
    //                     label : 'PROCEED',
    //                     action : newPHICAllCaseRate.bind(
    //                         this,
    //                         {
    //                             ...surgicalProcedure,
    //                             surgicalProcedure: surgicalProcedure.name,
    //                             caseRateType,
    //                             phicCf2Id: selectedClaim.id,
    //                             sourceType: 1,
    //                             sourceId: surgicalProcedure.id
    //                         },
    //                         this.onCloseBasicDialog.bind(this),
    //                         this.changePendingRequest.bind(this),
    //                         selectedTransmittal,
    //                         selectedClaim.id,
    //                         session
    //                         ), 
    //                     secondary : true
    //                 }
    //             ]
    //         }            
    //     });
    // }

    onOpenNewPHICAllCaseRateDialog(surgicalProcedure, caseRateType, session,close, changePending, selectedLaterality) {

        const {newPHICAllCaseRate, selectedClaim, selectedTransmittal, selectedCf2} = this.props;

        this.setState({
            selectedSurgicalProcedure : surgicalProcedure,
            basicDialogOpts: {
                ...basicDialogOpts,
                closeDialog : this.onCloseBasicDialog.bind(this)
            }            
        });

        newPHICAllCaseRate(
            {
                ...surgicalProcedure,
                surgicalProcedure: surgicalProcedure.name,
                caseRateType,
                phicCf2Id: selectedClaim.id,
                sourceType: 1,
                sourceId: surgicalProcedure.id
            },
            close,
            changePending,
            selectedTransmittal,
            selectedClaim.id,
            session,
            selectedLaterality,
            selectedCf2
            );
    }

    /**
     * Change pending request state for Basic Dialog component.
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogPendingRequest: pendingRequest
        });
    }

    /**
     * Open Surgical Procedure New Dialog
     * 
     * @param {any} event
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    onOpenCf2SurgicalProcedureNewDialog(event) {
        event.preventDefault();

        this.setState({ openCf2SurgicalProcedureNew: true });
    }

    /**
     * Close Surgical Procedure New Dialog
     * 
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    onCloseCf2SurgicalProcedureNewDialog() {
        this.setState({ 
            openCf2SurgicalProcedureNew: false,  
        });
    }
    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    onCloseBasicDialog() {

        this.setState({ 
            selectedSurgicalProcedure : null,
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    /**
     * Display List Of Surgical Procedure
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    onDisplayListOfSurgicalProcedure() {

        const { 
            phicAllCaseRates, 
            deletePHICAllCaseRate, 
            isClaimTypeAllCaseRate, 
            summaryMode, 
            selectedClaim,
            editLateralityOfSelectedSessions,
            editPhicSurgicalProcedureSessionLateralityRequestPending={editPhicSurgicalProcedureSessionLateralityRequestPending},
            fields } = this.props;    
        
        const firstCaseRate = find(phicAllCaseRates, t => t.caseRateType == 0);
        const secondCaseRate = find(phicAllCaseRates, t => t.caseRateType == 1);

      
        return fields.map((t, i) => {            
            const surgicalProcedure = fields.get(i);        

            if(!surgicalProcedure.removed) {
                if(surgicalProcedure.repetitive) {
                    return ( 
                        <FieldArray                              
                            component={Cf2SurgicalProcedureListItemRepetitiveYes}
                            index={i}
                            name={t}
                            key={i} 
                            surgicalProcedure={surgicalProcedure}
                            openCf2SurgicalProcedureDeleteDialog={this.onOpenCf2SurgicalProcedureDeleteDialog.bind(this)}
                            firstCaseRate={firstCaseRate}
                            secondCaseRate={secondCaseRate}
                            deletePHICAllCaseRate={deletePHICAllCaseRate}
                            onOpenNewPHICAllCaseRateDialog={this.onOpenNewPHICAllCaseRateDialog.bind(this)}
                            isClaimTypeAllCaseRate={isClaimTypeAllCaseRate}
                            summaryMode={summaryMode} 
                            selectedClaim={selectedClaim}
                            editLateralityOfSelectedSessions={editLateralityOfSelectedSessions}
                            editPhicSurgicalProcedureSessionLateralityRequestPending={editPhicSurgicalProcedureSessionLateralityRequestPending}                            
                        />
                    );
                }
                else 
                    return ( 
                        <FieldArray                              
                            component={Cf2SurgicalProcedureListItemRepetitiveNo}
                            index={i}
                            name={t}
                            key={i} 
                            surgicalProcedure={surgicalProcedure}
                            openCf2SurgicalProcedureDeleteDialog={this.onOpenCf2SurgicalProcedureDeleteDialog.bind(this)}
                            firstCaseRate={firstCaseRate}
                            secondCaseRate={secondCaseRate}
                            onOpenNewPHICAllCaseRateDialog={this.onOpenNewPHICAllCaseRateDialog.bind(this)}
                            deletePHICAllCaseRate={deletePHICAllCaseRate}
                            isClaimTypeAllCaseRate={isClaimTypeAllCaseRate}
                            summaryMode={summaryMode} 
                            selectedClaim={selectedClaim}
                            phicAllCaseRates={phicAllCaseRates}
                        />
                    );
            }
        });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    render() {
        const {
            fields, 
            selectedClaim, 
            phicDischargeDiagnoses, 
            summaryMode } = this.props;

        return (
            <StyleRoot style={styles.container}>

                <div style={styles.titleWrapper}>
                    <label style={styles.titleWrapper.title}>Surgical Procedure</label>
                    {!summaryMode? 
                          <FlatButton 
                            label="NEW"
                            icon={ <AddIcon /> }
                            labelPosition="after"
                            style={styles.flatButtonStyles}
                            onTouchTap={this.onOpenCf2SurgicalProcedureNewDialog.bind(this)}
                            disabled={phicDischargeDiagnoses.length <= 0 }
                        />
                    
                    : null}
                      
                </div>

                { /** LIST */ }
                <div style={styles.listContainer}>

                    { this.onDisplayListOfSurgicalProcedure() }
                </div>       
                
                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogPendingRequest }
                />       

                { /** NEW SURGICAL PROCEDURE DIALOG */ } 
                <Cf2SurgicalProcedureNewContainer 
                    fields={fields}
                    selectedClaim={selectedClaim}
                    phicDischargeDiagnoses={phicDischargeDiagnoses}
                    open={ this.state.openCf2SurgicalProcedureNew }
                    closeDialog={ this.onCloseCf2SurgicalProcedureNewDialog.bind(this) }
                />
            </StyleRoot>
        );
    }
}

// *** props
Cf2SurgicalProcedureList.propTypes = {
    summaryMode: PropTypes.bool
};

export default Cf2SurgicalProcedureList;
