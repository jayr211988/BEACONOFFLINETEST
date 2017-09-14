import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import find from 'lodash/find';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

// *** material-ui icons
import AddIcon from 'material-ui/svg-icons/content/add';

import Cf2DischargeDiagnosisNewContainer from '../../new/containers/new';
import Cf2DischargeDiagnosisEditCustomDescriptionContainer from '../../edit-custom-description/containers/edit-custom-description';

// *** dumb components
import Cf2DischargeDiagnosisListItem from './list-item';
import BasicDialog from '../../../../../shared-components/basic-dialog';

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
    }
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This Claims will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

/**
 * PHIC Claims Details CF2 Discharge Diagnosis List Component
 * 
 * @class Cf2DischargeDiagnosisList
 * @extends {React.Component}
 */
@Radium
class Cf2DischargeDiagnosisList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDischargeDiagnosis : null,
            basicDialogOpts : basicDialogOpts,
            openAddDischargeDiagnosisDialog: false,
            openEditCustomDescriptionDialog: false
        };
    }

    /**
     * Display List Of Discharge Diagnosis
     * 
     * @returns
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    onDisplayListOfDischargeDiagnosis() {
        const { phicDischargeDiagnoses, editPrimaryPHICDischargeDiagnosis, 
            editPhicClaimDetailCf2RequestPending, selectedClaim, 
            phicAllCaseRates, deletePHICAllCaseRate, isClaimTypeAllCaseRate, summaryMode } = this.props;
        const firstCaseRate = find(phicAllCaseRates, t => t.caseRateType == 0);
        const secondCaseRate = find(phicAllCaseRates, t => t.caseRateType == 1);

        return phicDischargeDiagnoses.map((dischargeDiagnosis, index) => (
            <Cf2DischargeDiagnosisListItem 
                key={index} 
                dischargeDiagnosis={dischargeDiagnosis}
                editPrimaryPHICDischargeDiagnosis={editPrimaryPHICDischargeDiagnosis}
                selectedClaim={selectedClaim}
                openRemoveDialog={this.onOpenRemoveDialog.bind(this)}
                openAddCustomDescriptionDialog={this.onOpenAddCustomDescriptionDialog.bind(this)}
                openDeleteCustomDescription={this.onOpenDeleteCustomDescription.bind(this)}
                editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                firstCaseRate={firstCaseRate}
                secondCaseRate={secondCaseRate}
                onOpenNewCaseRateDialog={this.onOpenNewCaseRateDialog.bind(this)}
                deletePHICAllCaseRate={deletePHICAllCaseRate}
                isClaimTypeAllCaseRate={isClaimTypeAllCaseRate}
                summaryMode={summaryMode}
            />
        ));        
    }

    /**
     * Open Phic Dialog Delete
     * 
     * @param {any} claim
     * @param {any} event
     * 
     * @memberOf PhicClaimsList
     */
    onOpenRemoveDialog(dischargeDiagnosis) {
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                open: true,
                highlightTitle: dischargeDiagnosis.icD10Code,
                subtitle: `${dischargeDiagnosis.icD10CustomDescription||dischargeDiagnosis.icD10Value} will be permanently removed to this claim.`,
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onRemoveDischargeDiagnosis.bind(this), 
                        secondary : true
                    }
                ]
            },
            selectedDischargeDiagnosis: dischargeDiagnosis
        });
    }

    /**
     * Open Delete Custom Description Dialog
     * 
     * @param {any} dischargeDiagnosis
     * 
     * @memberOf PhicClaimsList
     */
    onOpenDeleteCustomDescription(dischargeDiagnosis) {
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                title: 'Do you want to revert the description for',
                open: true,
                highlightTitle: dischargeDiagnosis.icD10Code,
                subtitle: `${dischargeDiagnosis.icD10CustomDescription} will revert to ${dischargeDiagnosis.icD10Value}.`,
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REVERT',
                        action : this.onRemoveCustomDescription.bind(this), 
                        secondary : true
                    }
                ]
            },
            selectedDischargeDiagnosis: dischargeDiagnosis
        });
    }

    /**
     * Open Tag as New Case Rate Dialog
     * 
     * @param {any} dischargeDiagnosis
     * 
     * @memberOf PhicClaimsList
     */
    onOpenNewCaseRateDialog(dischargeDiagnosis, caseRateType) {
        const { newCaseRate, selectedClaim, selectedTransmittal } = this.props;
        const ordinalCaseRate = caseRateType == 0 ? '1st' : '2nd';
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                title: `Tag as ${ordinalCaseRate} case rate for`,
                open: true,
                highlightTitle: dischargeDiagnosis.icD10Code,
                subtitle: `Are you sure you want to tag ${dischargeDiagnosis.icD10CustomDescription||dischargeDiagnosis.icD10Value} as ${ordinalCaseRate} case rate?`,
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'PROCEED',
                        action : newCaseRate.bind(
                            this,
                            {
                                ...dischargeDiagnosis,
                                caseRateType,
                                phicCf2Id: selectedClaim.id,
                                sourceType: 0,
                                sourceId: dischargeDiagnosis.id
                            },
                            this.onCloseBasicDialog.bind(this),
                            this.changePendingRequest.bind(this),
                            selectedTransmittal,
                            selectedClaim.id
                            ), 
                        secondary : true
                    }
                ]
            },
            selectedDischargeDiagnosis: dischargeDiagnosis
        });
    }

    /**
     * Change Pending Request State
     * 
     * @param {any} dischargeDiagnosis
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                isPending: pendingRequest
            }
        });
    }

    /**
     * Open Add Custom Description Dialog
     * 
     * @param {any} dischargeDiagnosis
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    onOpenAddCustomDescriptionDialog(dischargeDiagnosis) {
        this.setState({
            openEditCustomDescriptionDialog: true,
            selectedDischargeDiagnosis: dischargeDiagnosis
        });
    }

    /**
     * Close Add Custom Dialog
     * 
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    closeAddCustomDescriptionDialog() {
        this.setState({
            openEditCustomDescriptionDialog: false,
            selectedDischargeDiagnosis: null
        });
    }

    /**
     * Delete Phic Discharge Diagnosis
     * 
     * @param {any} claim
     * @param {any} event
     * 
     * @memberOf PhicClaimsList
     */
    onRemoveDischargeDiagnosis() {
        const { deletePHICDischargeDiagnosis, selectedClaim } = this.props;

        const changePendingRequest = (pendingRequest) => {
            this.setState({
                basicDialogOpts: {
                    ...this.state.basicDialogOpts,
                    isPending: pendingRequest
                }
            });
        };

        deletePHICDischargeDiagnosis(
            this.state.selectedDischargeDiagnosis.id,
            selectedClaim.id,
            changePendingRequest.bind(this),
            this.onCloseBasicDialog.bind(this));
    }

    /**
     * Delete Phic Discharge Diagnosis Custom Description
     * 
     * 
     * @memberOf PhicClaimsList
     */
    onRemoveCustomDescription() {
        const { editPHICDischargeDiagnosisCustomDescription } = this.props;

        editPHICDischargeDiagnosisCustomDescription(
            this.state.selectedDischargeDiagnosis.id,
            this.changePendingRequest.bind(this),
            this.onCloseBasicDialog.bind(this));
    }
    
    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    onCloseBasicDialog() {
        this.setState({ 
            selectedDischargeDiagnosis : null,
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    /**
     * Open add discharge diagnosis
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    openAddDiagnosis() {
        this.setState({
            openAddDischargeDiagnosisDialog: true
        });
    }

    /**
     * Close add discharge diagnosis
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    closeAddDiagnosis() {
        this.setState({
            openAddDischargeDiagnosisDialog: false
        });
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2DischargeDiagnosisList
     */
    render() {
        const { selectedClaim, summaryMode, editPhicClaimDetailCf2RequestPending } = this.props;
        
        return (
            <StyleRoot style={styles.container}>

                <div style={styles.titleWrapper}>
                    <label style={styles.titleWrapper.title}>Discharge Diagnosis</label>
                    {!summaryMode ? 
                      <FlatButton 
                        label="NEW"
                        icon={ <AddIcon /> }
                        labelPosition="after"
                        style={styles.flatButtonStyles}
                        onTouchTap={this.openAddDiagnosis.bind(this)}
                        disabled={editPhicClaimDetailCf2RequestPending}
                    />
                    : null}
                  
                </div>

                <Table>     
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>

                        <TableRow style={styles.tableHeaderStyle}>
                            <TableHeaderColumn>ICD10 CODE</TableHeaderColumn>
                            <TableHeaderColumn>DESCRIPTION</TableHeaderColumn>
                            <TableHeaderColumn>PRIMARY?</TableHeaderColumn>
                            <TableHeaderColumn style={{width: '48px'}}> </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        style={styles.tableBodyStyle}
                        displayRowCheckbox={false}>

                        { this.onDisplayListOfDischargeDiagnosis() }

                    </TableBody>
                    
                </Table>
                

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogOpts.isPending }
                />
                
                { /** ADD DIALOG */ }
                <Cf2DischargeDiagnosisNewContainer
                    open={this.state.openAddDischargeDiagnosisDialog}
                    close={this.closeAddDiagnosis.bind(this)}
                    selectedClaim={selectedClaim} />

                { /** EDIT CUSTOM DESCRIPTION DIALOG */ }
                <Cf2DischargeDiagnosisEditCustomDescriptionContainer
                    open={this.state.openEditCustomDescriptionDialog}
                    close={this.closeAddCustomDescriptionDialog.bind(this)}
                    selectedDischargeDiagnosis={this.state.selectedDischargeDiagnosis}
                    selectedClaim={selectedClaim}
                     />
            </StyleRoot>
        );
    }
}

// *** props
Cf2DischargeDiagnosisList.propTypes = {
    summaryMode : PropTypes.bool
};

export default Cf2DischargeDiagnosisList;
