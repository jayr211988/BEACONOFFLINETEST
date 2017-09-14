import React, { Component, PropTypes } from 'react';
import first from 'lodash/first';

import { FieldArray } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

// **** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Filter1 from 'material-ui/svg-icons/image/filter-1';
import Filter2 from 'material-ui/svg-icons/image/filter-2';
import CircularProgress from 'material-ui/CircularProgress';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

//*** dumb components
import Cf2SurgicalProcedureListItemRepetitiveYesListItem from './list-item-repetitive-yes-list-item';
import LateralityDialog from './laterality-dialog';

import Tag from '../../../../../shared-components/tag';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';


const styles = {
    container: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px'
    },

    header: {
        display: 'flex',
        padding: '15px 20px',
        position: 'relative',

        iconMenuStyle :{
            position: 'absolute',
            right: 0,
            top: 0
        }          
    },

    headerWrapper: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column'
    },

    contentWrapper: {
        padding: '10px 20px 20px 20px',

        titleHolder :{
            padding: '5px 0',
        }
    },

    labelWrapper: {
        width: '100%',
        display: 'flex',
        margin: '5px 0',
        minHeight: '24px',
        lineHeight: '1.4em',
        alignItems: 'center',

        title: {
            minWidth: '125px',
            color: colorPalette.primaryColor,
        },

        valueContainer: {
            width: '100%',
            paddingRight: '20px'
        },

        value: {
            color: colorPalette.primaryTextColor,
            display: 'inline-block',
            minWidth: '200px'            
        }
    },
    loadingLaterality : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(222, 222, 222, .8)',
        flexDirection: 'column',

        text: {
            color: colorPalette.primaryTextColor,
            fontSize: '13px',
            textTransform: 'uppercase'

        }


    }
    
     
};

/**
 * List Item Repetitive Yes
 * 
 * @class Cf2SurgicalProcedureListItemRepetitiveYes
 * @extends {Component}
 */
@Radium
class Cf2SurgicalProcedureListItemRepetitiveYes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openLateralityDialog: false,
            basicDialogPendingRequest: false,
            selectedLaterality : null
        };
    }




    changeSelectedLaterality(index) {
        this.setState({
            selectedLaterality : index
        });
    }

    /**
     * Display List Of Sessions
     * 
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveYes
     */
    onDisplayListOfSessions() {
        const { 
            firstCaseRate, 
            secondCaseRate, 
            onOpenNewPHICAllCaseRateDialog, 
            fields,
            editLateralityOfSelectedSessions,            
            summaryMode, surgicalProcedure } = this.props;  


    
        return fields.getAll().sessions.map((t, i) => {

            return (
                <FieldArray 
                    component={Cf2SurgicalProcedureListItemRepetitiveYesListItem}
                    name={`${fields.name}.sessions[${i}]`}
                    key={i} 
                    session={t} 
                    firstCaseRate={firstCaseRate}
                    secondCaseRate={secondCaseRate}
                    onOpenNewPHICAllCaseRateDialog={onOpenNewPHICAllCaseRateDialog}
                    editLateralityOfSelectedSessions={editLateralityOfSelectedSessions}                    
                    summaryMode={summaryMode}
                    surgicalProcedure={surgicalProcedure}                     
                />   
            );   
        });
    }

    onDisplayListCaseRate() {

        const { fields } = this.props;

        return  fields.getAll().sessions.map((t, i) => (
            <MenuItem 
                key={i}
                value={t.code} 
                primaryText={t.value} 
            /> 
        ));
    }

    onOpenLateralityDialog() {
        this.setState({
            openLateralityDialog: true
        });
    } 

    onCloseLateralityDialog() {
        this.setState({
            openLateralityDialog: false
        });
    }

    /**
     * Change pending request state for Surgical Dialog Cse Rate component.
     * 
     * @memberOf Cf2SurgicalProcedureList
     */
    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogPendingRequest: pendingRequest
        });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveYes
     */
    render() {
        const { 
            fields,
            selectedClaim,
            index,
            surgicalProcedure, 
            openCf2SurgicalProcedureDeleteDialog,             
            firstCaseRate, 
            secondCaseRate, 
            deletePHICAllCaseRate, 
            onOpenNewPHICAllCaseRateDialog, 
            isClaimTypeAllCaseRate, 
            editPhicSurgicalProcedureSessionLateralityRequestPending,
            summaryMode } = this.props;

        
        const isCaseRateExists = (caseRate) => {
            return caseRate && caseRate.sourceId == surgicalProcedure.id && caseRate.sourceType == 1;
        };

        const session = first(surgicalProcedure.sessions);

        return (
            <StyleRoot style={styles.container}>

                <div style={styles.header}>
                    { /** ACTION */ }
                    { !summaryMode ? 
                      <IconMenu
                        style={styles.header.iconMenuStyle}
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                        
                        { isClaimTypeAllCaseRate
                            ? firstCaseRate || isCaseRateExists(secondCaseRate)
                                ? secondCaseRate || isCaseRateExists(firstCaseRate)
                                    ? <MenuItem 
                                        leftIcon={ <Filter2 color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="Tag as 2nd Case Rate"
                                        onTouchTap={this.onOpenLateralityDialog.bind(this, surgicalProcedure, 1, session)}
                                    />
                                    :
                                    <MenuItem 
                                        leftIcon={ <Filter2 color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="Tag as 2nd Case Rate"
                                        onTouchTap={this.onOpenLateralityDialog.bind(this, surgicalProcedure, 1, session)}
                                    />
                                : 
                                <MenuItem 
                                    leftIcon={ <Filter1 color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Tag as 1st Case Rate"
                                    //onTouchTap={onOpenNewPHICAllCaseRateDialog.bind(this, surgicalProcedure, 0, session)}
                                    onTouchTap={this.onOpenLateralityDialog.bind(this, surgicalProcedure, 0, session)}
                                />
                            : null
                        }

                        
                        <MenuItem 
                            leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                            onTouchTap={(openCf2SurgicalProcedureDeleteDialog.bind(this, surgicalProcedure, index))}
                            primaryText="Remove" 
                        />
                        
                    </IconMenu>  : null}
                  


                    { /** RIGHT HOLDER */ }
                    <div style={styles.headerWrapper}>
                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>ICD10 CODE</small>
                            <label style={styles.labelWrapper.value}>{ surgicalProcedure.icD10Code }</label>
                        </div>

                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>NAME</small>
                            <label style={styles.labelWrapper.value}>
                                <span title={surgicalProcedure.name}>
                                    { surgicalProcedure.name }
                                </span>
                            </label>
                        </div>
                    </div>

                    { /** LEFT HOLDER */ }
                    <div style={styles.headerWrapper}>
                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>RVS CODE</small>
                            <div style={styles.labelWrapper.valueContainer}>
                                <label style={styles.labelWrapper.value}>{ surgicalProcedure.rvsCode }</label>
                                { firstCaseRate && isCaseRateExists(firstCaseRate)
                                    ? <Tag labelText="1ST CASE RATE" handleDelete={deletePHICAllCaseRate.bind(this, firstCaseRate.id, selectedClaim.id)} />
                                    : null
                                }
                                { secondCaseRate && isCaseRateExists(secondCaseRate)
                                    ? <Tag labelText="2ND CASE RATE" handleDelete={deletePHICAllCaseRate.bind(this, secondCaseRate.id, selectedClaim.id)} />
                                    : null
                                }
                            </div>
                            
                        </div>

                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>REPETITIVE</small>
                            <label style={styles.labelWrapper.value}>YES</label>
                        </div>
                    </div>     
                </div>    

                <div style={styles.contentWrapper}>
                    <div style={styles.contentWrapper.titleHolder}>
                        <small style={styles.labelWrapper.title}>SESSIONS</small>
                    </div>
                    <div style={{position: 'relative'}}>
                        {   
                            editPhicSurgicalProcedureSessionLateralityRequestPending ? 
                            <div style={[styles.loadingLaterality, animation.fadeIn]}>
                                <CircularProgress size={60} thickness={7} />
                                <p style={styles.loadingLaterality.text}>Please Wait ... </p>
                            </div>
                            : null
                        }
                        <Table>
                            <TableHeader 
                                style={styles.tableHeaderStyle}
                                adjustForCheckbox={false}
                                displaySelectAll={false}>

                                <TableRow>
                                    <TableHeaderColumn>SESSION NO#</TableHeaderColumn>
                                    <TableHeaderColumn>DATE</TableHeaderColumn>
                                    <TableHeaderColumn>TYPE</TableHeaderColumn>
                                    <TableHeaderColumn>LATERALITY</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody 
                                style={styles.TableBodyStyle}
                                showRowHover={true}
                                displayRowCheckbox={false}>

                                { this.onDisplayListOfSessions() }
                            </TableBody>
                        </Table>
                    </div>
                </div>  

                <LateralityDialog
                        open={this.state.openLateralityDialog}
                        proceed={onOpenNewPHICAllCaseRateDialog}
                        surgicalProcedure={surgicalProcedure}
                        selectedLaterality={this.changeSelectedLaterality.bind(this)}
                        session={session}
                        summaryMode={summaryMode}
                        fields={fields}
                        caseRateNumber={
                            isClaimTypeAllCaseRate
                                ? firstCaseRate || isCaseRateExists(secondCaseRate)
                                    ? secondCaseRate || isCaseRateExists(firstCaseRate)
                                        ? 1
                                        : 1
                                    : 0
                                : null
                        }
                        close={this.onCloseLateralityDialog.bind(this)}
                        changePending={this.changePendingRequest.bind(this)}
                        isPending={ this.state.basicDialogPendingRequest } />                
            </StyleRoot>
        );
    }
}

// *** props
Cf2SurgicalProcedureListItemRepetitiveYes.propTypes = {
    surgicalProcedure : PropTypes.object.isRequired,
    openCf2SurgicalProcedureDeleteDialog : PropTypes.func.isRequired,
    summaryMode : PropTypes.bool
};

export default Cf2SurgicalProcedureListItemRepetitiveYes;