import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ActionInfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';


import { TextField } from 'redux-form-material-ui';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';

import { required } from '../../../../util/validation';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    container: {
        width: '100%',
        height: '100%'
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
    },    

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },  

    textFieldWrapper: {
        display: 'flex',
        alignItems: 'center',

        small: {
            color : colorPalette.primaryColor,
            width: '320px',
            fontSize: '12px'
        }
    },

    contentWrapper: {
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column'
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },

    textFieldInputStyle : {
        color: colorPalette.primaryColor,
        fontSize : '12px'
    }
};

/**
 * Phic Transmittal New Component
 * 
 * @class PhicTransmittalsNew
 * @extends {Component}
 */
@reduxForm({
    form: 'phicTransmittalsNewForm'
})
@Radium
class PhicTransmittalsNew extends Component {
    
    /**
     * Display Hosipital Code Menu Items
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsNew
     */
    onDisplayPackageTypeMenuItems() {
        const { hospitalCodeList } = this.props;
        return hospitalCodeList.map((t, i) => (
            
            t.hospitalCode == 'DUMMY-Hospital-Code' || t.phichciTypeDescription == '' ?
                null
            :
                <MenuItem
                    key={i} 
                    primaryText={t.phicPackageDescription} 
                    value={t.phicPackage.toString()}
                    onTouchTap={this.onChangePackageType.bind(this, t)}
                />
            
        ));
    }

    /**
     * Change Hospital Code
     * 
     * @param {any} hispitalCode
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsNew
     */
    onChangePackageType(packageType, event) {
        event.preventDefault();

        this.refs.hospitalCode.getRenderedComponent()
            .props.input.onChange(packageType.hospitalCode);

       
        this.refs.accreditationNumber.getRenderedComponent()
        .props.input.onChange(packageType.accreditationNumber);

        this.refs.phichciType.getRenderedComponent()
            .props.input.onChange(packageType.phichciTypeDescription);            
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsNew
     */
    render() {
        const { closeDialog, handleSubmit } = this.props;

        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div style={{display:'flex', alignItems:'flex-start', justifyContent: 'space-between'}}>
                        <div>
                            <h1 style={styles.title} >New PHIC Transmittal</h1>
                            <p style={styles.subtitle}>The type of PHIC Transmittal</p>
                        </div>
                    {
                        this.onDisplayPackageTypeMenuItems().length == 0 ?
                            <div style={{display:'flex', alignItems:'center', margin: '12px 0', fontSize : '14px'}}>
                                <ActionInfoOutlineIcon color={colorPalette.accentColor}/>
                                <label style={{color: colorPalette.accentColor, marginLeft:'5px'}} >Please Configure Hospital Codes</label>
                            </div>
                            :
                            null
                    }
 
                    </div>
                    <div style={styles.contentWrapper}>

                    
                        <Field                            
                            name="phicPackage"
                            hintText="Select the package type"                                     
                            floatingLabelText="Select the package type"                                    
                            component={CustomSelectField}                           
                            fullWidth={true}
                            validate={required}
                            disabled={this.onDisplayPackageTypeMenuItems().length == 0 ? true : false}>
                            
                            { this.onDisplayPackageTypeMenuItems() }
                        </Field>

                        <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>HOSPITAL CODE</small>

                            <Field 
                                name="hospitalCode"
                                ref="hospitalCode"
                                withRef={true}
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>

                        <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>ACCREDITATION NUMBER</small>

                            <Field 
                                name="accreditationNumber"
                                ref="accreditationNumber"
                                withRef={true}
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>

                        <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>INSTITUTION TYPE</small>

                            <Field 
                                name="phichciType"
                                ref="phichciType"
                                withRef={true}
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>

                        <Field 
                            name="remarks"
                            hintText="Remarks"
                            floatingLabelText="Remarks"
                            fullWidth={true}     
                            component={TextField} 
                            multiLine={true}
                            disabled={this.onDisplayPackageTypeMenuItems().length == 0 ? true : false}         
                        />
                    </div>

                    { /** DIALOG ACTIONS */ }
                    <div style={styles.buttonWrapper}>
                        <RaisedButton 
                            title="Shortcut Key: [ESC]"
                            label="Cancel"
                            style={ styles.buttonWrapper.left }
                            onTouchTap={closeDialog.bind(this)}
                        />   

                        <RaisedButton 
                            type="submit"
                            label="Save"
                            style={ styles.buttonWrapper.left }
                            secondary={ true }
                        />                              
                    </div>                     
                </form>
            </StyleRoot>
        );
    }
}

export default PhicTransmittalsNew;