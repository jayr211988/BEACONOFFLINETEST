import React, { Component, PropTypes } from 'react';
import first from 'lodash/first';
import { Field, change } from 'redux-form';
import Radium, { StyleRoot } from 'radium';
import { utc } from 'moment';

// **** material-ui components
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CustomSelectField from '../../../../../shared-components/custom-material-ui/selectfield';
import { TextField } from 'redux-form-material-ui';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Filter1 from 'material-ui/svg-icons/image/filter-1';
import Filter2 from 'material-ui/svg-icons/image/filter-2';

//*** dumb components
import LateralityDialog from './laterality-dialog';

import { required } from '../../../../../util/validation';

import { initialData } from '../../../../../util/data/index';
import Tag from '../../../../../shared-components/tag';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

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
            paddingRight: '20px',

            value: {
                color: colorPalette.primaryTextColor,
                display: 'inline-block',
                minWidth: '200px',                
            }
        }
    },
};

/**
 * List Item RepetitiveYes
 * 
 * @class Cf2SurgicalProcedureListItemRepetitiveNo
 * @extends {Component}
 */
@Radium
class Cf2SurgicalProcedureListItemRepetitiveNo extends Component {
    constructor(props) {
        super(props); 

        const  { surgicalProcedure } = props;

        this.state = {
            openLateralityDialog: false,
            basicDialogPendingRequest: false,
            session : first(surgicalProcedure.sessions)
        };
    }

    /**
     * Display Menu Items
     * 
     * @param {any} items
     * @returns
     *  
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveNo
     */
    onDisplayMenuItems(items) {
        return items.map((t, i) => (
            <MenuItem 
                key={i}
                value={t.code} 
                primaryText={t.value} 
                onTouchTap={this.onSelectLaterality.bind(this, t)}
            /> 
        ));
    }


    /**
     * Select Laterality
     * 
     * @param {any} value 
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveNo
     */
    onSelectLaterality(value) {
        const { surgicalProcedure } = this.props;

        const session = first(surgicalProcedure.sessions);

        this.setState({
            session : {
                ...session,
                lateralityCode : value.code,
                lateralityValue : value.value
            }
        });
        // const { fields } = this.props;

        // this.refs[`${fields.name}.sessions[0].lateralityValue`]
        //     .getRenderedComponent().props.input.onChange(value);
    }

    /**
     * Is Case Rate Exist
     * 
     * @param {any} caseRate
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveNo
     */
    isCaseRateExists(caseRate) {
        const { surgicalProcedure } = this.props;
        
        return caseRate && caseRate.sourceId == surgicalProcedure.id && caseRate.sourceType == 1;
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
    changePendingRequestOne(pendingRequest) {
        this.setState({
            basicDialogPendingRequest: pendingRequest
        });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveNo
     */
    render() {
        const { 
            index,
            selectedClaim,
            surgicalProcedure, 
            openCf2SurgicalProcedureDeleteDialog, 
            firstCaseRate, 
            secondCaseRate, 
            onOpenNewPHICAllCaseRateDialog, 
            deletePHICAllCaseRate, 
            isClaimTypeAllCaseRate,
            summaryMode,
            fields } = this.props;        
            
        // const session = first(surgicalProcedure.sessions);

        return (
            <StyleRoot style={styles.container}>
                
                <div style={styles.header}>
                    { /** ACTION */ }
                    {!summaryMode ? 
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
                            ? firstCaseRate || this.isCaseRateExists(secondCaseRate)
                                ? secondCaseRate || this.isCaseRateExists(firstCaseRate)
                                    ?  <MenuItem 
                                            leftIcon={ <Filter2 color={colorPalette.secondaryTextColor} /> } 
                                            primaryText="Tag as 2nd Case Rate"
                                            onTouchTap={this.onOpenLateralityDialog.bind(this, surgicalProcedure, 1, this.state.session)}
                                        />
                                    :
                                        <MenuItem 
                                            leftIcon={ <Filter2 color={colorPalette.secondaryTextColor} /> } 
                                            primaryText="Tag as 2nd Case Rate"
                                            onTouchTap={this.onOpenLateralityDialog.bind(this, surgicalProcedure, 1, this.state.session)}
                                        />
                                : 
                                <MenuItem 
                                    leftIcon={ <Filter1 color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Tag as 1st Case Rate"
                                    onTouchTap={this.onOpenLateralityDialog.bind(this, surgicalProcedure, 0, this.state.session)}
                                />
                            : null
                        }
                        <MenuItem 
                            leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                            onTouchTap={(openCf2SurgicalProcedureDeleteDialog.bind(this, surgicalProcedure, index))}
                            primaryText="Remove" 
                        />
                    </IconMenu> : null}
                    


                    { /** RIGHT HOLDER */ }
                    <div style={styles.headerWrapper}>
                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>ICD10 CODE</small>
                            <label style={styles.labelWrapper.value}>{ surgicalProcedure.icD10Code }</label>
                        </div>

                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>NAME</small>
                            <label style={styles.labelWrapper.value}>
                                <span title={surgicalProcedure.name}>{ surgicalProcedure.name }</span>
                            </label>
                        </div>

                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>RVS CODE</small>
                            <label style={styles.labelWrapper.value}>{ surgicalProcedure.rvsCode }</label>
                        </div>

                     
                    </div>

                    { /** LEFT HOLDER */ }
                    <div style={styles.headerWrapper}>
                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>REPETITIVE</small>
                            <div style={styles.labelWrapper.valueContainer}>
                                <label style={styles.labelWrapper.valueContainer.value}>NO</label>
                                { firstCaseRate && this.isCaseRateExists(firstCaseRate)
                                    ? <Tag summaryMode={summaryMode} labelText="1ST CASE RATE" handleDelete={deletePHICAllCaseRate.bind(this, firstCaseRate.id, selectedClaim.id)} />
                                    : null
                                }
                                { secondCaseRate && this.isCaseRateExists(secondCaseRate)
                                    ? <Tag summaryMode={summaryMode} labelText="2ND CASE RATE" handleDelete={deletePHICAllCaseRate.bind(this, secondCaseRate.id, selectedClaim.id)} />
                                    : null
                                }
                            </div>
                        </div>   

                        <div style={styles.labelWrapper}>    
                            <small style={styles.labelWrapper.title}>PROCEDURE DATE</small>
                            <label style={styles.labelWrapper.valueContainer}>{ utc(surgicalProcedure.sessions[0].sessionDate).format('YYYY-MM-DD') }</label>
                        </div>

                        <div style={[styles.labelWrapper, { margin: '-10px 0', alignItems: 'center' }]}>    
                            <small style={[styles.labelWrapper.title, { width: '100px' }]}>LATERALITY</small>

                            {!summaryMode ? 
                              <Field           
                                withRef={true}                       
                                name={`${fields.name}.sessions[0].lateralityCode`}          
                                ref={`${fields.name}.sessions[0].lateralityCode`}              
                                hintText="Select Laterality"
                                component={CustomSelectField}  
                                isOnTable={true}    
                                validate={required}
                                disabled={this.isCaseRateExists(firstCaseRate) || this.isCaseRateExists(secondCaseRate)  ? true : false  }
                                iconStyle={{fill: colorPalette.secondaryTextColor}}>

                                { this.onDisplayMenuItems(initialData.laterality) }
                            </Field>
                            :  null }   
                            
                            <Field             
                                withRef={true}                     
                                name={`${fields.name}.sessions[0].lateralityValue`}
                                ref={`${fields.name}.sessions[0].lateralityValue`}
                                component={TextField} 
                                disabled={summaryMode}
                                style={!summaryMode ? { display: 'none' } : null}
                            />
                        
                        </div>
                    </div>
                </div>  

                <LateralityDialog
                        open={this.state.openLateralityDialog}
                        proceed={onOpenNewPHICAllCaseRateDialog}
                        surgicalProcedure={surgicalProcedure}
                        session={this.state.session}
                        summaryMode={summaryMode}
                        fields={fields}
                        caseRateNumber={
                            isClaimTypeAllCaseRate
                                ? firstCaseRate || this.isCaseRateExists(secondCaseRate)
                                    ? secondCaseRate || this.isCaseRateExists(firstCaseRate)
                                        ? 1
                                        : 1
                                    : 0
                                : null
                        }
                        close={this.onCloseLateralityDialog.bind(this)}
                        changePending={this.changePendingRequestOne.bind(this)}
                        isPending={ this.state.basicDialogPendingRequest } />                           
            </StyleRoot>
        );
    }
}

// *** props
Cf2SurgicalProcedureListItemRepetitiveNo.propTypes = {
    surgicalProcedure : PropTypes.object.isRequired,
    openCf2SurgicalProcedureDeleteDialog : PropTypes.func.isRequired,
    summaryMode : PropTypes.bool    
};

export default Cf2SurgicalProcedureListItemRepetitiveNo;