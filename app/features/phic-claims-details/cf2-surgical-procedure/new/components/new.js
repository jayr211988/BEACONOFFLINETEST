import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { TextField } from 'redux-form-material-ui';
import CustomSelectField from '../../../../../shared-components/custom-material-ui/selectfield';
import CustomDatePicker from '../../../../../shared-components/custom-material-ui/datepicker';
import CustomAutoComplete from '../../../../../shared-components/custom-material-ui/auto-complete';
import CustomRadioButtonGroup from '../../../../../shared-components/custom-material-ui/radio-button-group';

import { required, validDate, maxLength6 } from '../../../../../util/validation';
import { initialData } from '../../../../../util/data/index';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';
 
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

    contentWrapper: {
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column'
    },

    textFieldWrapper : {
        width: '100%',
        display: 'flex',

        largeWidth: {
            //width: '40%',
            marginRight: '30px'
        },

        mediumWidth: {
            width: '180px',
            marginRight: '30px'
        },
    },

    textFieldWrapperAlignItems: {
        alignItems: 'flex-start'
    },

    radioButtonWrapper: {
        minHeight: '42px',
        display: 'flex',
        alignItems : 'center',
        paddingTop: '30px',
        
        radioButtonGroupStyle: {
            width: '30%',
            display: 'flex',
        },

        labelStyle: { 
            color : colorPalette.primaryTextColor,
            width: '20%' 
        },

        textFieldStyle : { 
            width: '50%', 
            marginTop: '-30px',
            marginLeft: '30px'
        },

        radioButtonStyle: {
            width: '90px'
        }
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    }
};

/**
 * Cf2 Surgical Procedure New Component
 * 
 * @class Cf2SurgicalProcedureNew
 * @extends {Component}
 */
@reduxForm({
    form: 'cf2SurgicalProcedureNewForm'
})
@Radium
class Cf2SurgicalProcedureNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRepetitive : null,
            rvsCode : '',
            rvsCodeDescription: ''
        };
    }

    /**
     * Display Menu Items
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onDisplayMenuItems(items) {
        return items.map((item, index) => (
            <MenuItem 
                key={index}
                value={item.code} 
                primaryText={`${item.code} - ${item.value}`} 
            />             
        ));
    }

    /**
     * Display Type Menu Items
     * 
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onDisplayTypeMenuItems() {
        return initialData.repetitiveProceduresType.map((item, index) => (
            <MenuItem 
                key={index}
                value={item.code} 
                primaryText={item.value}
            />             
        ));
    }

    /**
     * Display ICD10 Code Menu items
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onDisplayICD10MenuItems() {
        const { phicDischargeDiagnoses } = this.props;

        return phicDischargeDiagnoses.map((item, index) => (
            <MenuItem 
                key={index}
                value={item.icD10Code} 
                primaryText={item.icD10Code} 
            />             
        ));        
    }

    /**
     * Display Number of Sessions Menu Items
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onDisplayNumberOfSessions()  {    
        const items = [];

        for (var i = 1; i < 31; i++) 
            items.push ( <MenuItem key={i} value={i} primaryText={i} />);

        return items;
    }

    /**
     * Search RVS Code Description
     * 
     * @param {any} searchValue
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onSearchRvsCodeDescription(searchValue) {
        const { searchPhicClaimsDetailsCf2SurgicalProcedure } = this.props;

        if(!searchValue.length <= 0) 
            searchPhicClaimsDetailsCf2SurgicalProcedure(searchValue);    
    }

    /**
     * Search RVS Code 
     * 
     * @param {any} searchValue 
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onSearchRvsCode(searchValue) {
        const { searchPhicClaimsDetailsCf2SurgicalProcedure } = this.props;

        if(!searchValue.length <= 0) 
            searchPhicClaimsDetailsCf2SurgicalProcedure(searchValue);            
    }

    /**
     * Selected RVS Code Description
     * 
     * @param {any} surgicalProcedure
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onSelectRvsCodeDescription(surgicalProcedure) {

        this.setState({ rvsCode : surgicalProcedure.rvsCode });

        this.refs.rvsCode.getRenderedComponent()
            .props.input.onChange(surgicalProcedure.rvsCode);            
    }

    /**
     * Selected RVS Code
     * 
     * @param {any} surgicalProcedure 
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onSelectRvsCode(surgicalProcedure) {

        this.setState({ rvsCodeDescription : surgicalProcedure.name });

        this.refs.name.getRenderedComponent()
            .props.input.onChange(surgicalProcedure.name);            
    }

    /**
     * Select ICD10
     * 
     * @param {any} event
     * @param {any} icd10
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    onSelectIcd10(event, icd10) {
        const { phicDischargeDiagnoses } = this.props;

        const cid10Value = 
            phicDischargeDiagnoses.filter(t => t.icD10Code == icd10)[0].icD10Value;

        this.refs.icd10Value.getRenderedComponent()
            .props.input.onChange(cid10Value);        
    }

    onClickYesRepetitive(){
        this.setState({
            isRepetitive: 'Y'
        });

        const {sessionDate, lateralityCode} = this.refs;
        
        sessionDate ? sessionDate.getRenderedComponent().props.input.onChange('') : null;
        lateralityCode ? lateralityCode.getRenderedComponent().props.input.onChange('') : null;
        
    }

    onClickNoRepetitive(){
        this.setState({
            isRepetitive: 'N'
        });

        const {numberOfSessions, typeCode} = this.refs;
        
        numberOfSessions ? numberOfSessions.getRenderedComponent().props.input.onChange('') : null;
        typeCode ? typeCode.getRenderedComponent().props.input.onChange('') : null;
        
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureNew
     */
    render() {
        const { 
            closeDialog, 
            handleSubmit, 
            surgicalProcedureResult, 
            searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending } = this.props;
        //console.log(valid,'render');
        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>

                    <h1 style={styles.title} >Add New Surgical Procedure</h1>

                    <div style={styles.contentWrapper}>

                        { /** RVS CODE */ } 
                        <Field 
                            name="rvsCode"
                            ref="rvsCode"
                            withRef={true}
                            component={CustomAutoComplete}
                            hintText="RVS Code"
                            floatingLabelText="RVS Code"      
                            style={{ width: '45%' }}   
                            dataSource={surgicalProcedureResult}
                            dataSourceConfig={{ value: 'rvsCode', text: 'rvsCode' }} 
                            onUpdateInput={this.onSearchRvsCode.bind(this)}   
                            maxSearchResults={5}   
                            onNewRequest={this.onSelectRvsCode.bind(this)}
                            isCaseInsensitive={true}   
                            searchText={this.state.rvsCode}
                            isBusy={searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending}
                            validate={[required, maxLength6]}
        
                        />

                        { /** RVS CODE DESCRIPTION */ }
                        <Field 
                            name="name"
                            ref="name"
                            withRef={true}
                            component={CustomAutoComplete}
                            hintText="Name"
                            floatingLabelText="Name"   
                            fullWidth={true}     
                            dataSource={surgicalProcedureResult}
                            dataSourceConfig={{ value: 'rvsCode', text: 'name' }} 
                            onUpdateInput={this.onSearchRvsCodeDescription.bind(this)}   
                            maxSearchResults={5}   
                            onNewRequest={this.onSelectRvsCodeDescription.bind(this)}
                            isCaseInsensitive={true}   
                            searchText={this.state.rvsCodeDescription}
                            isBusy={searchPhicClaimsDetailsCf2SurgicalProcedureRequestPending}
        
                            validate={required}
                        />

                        { /** ICD10 CODE */ }
                        <Field                            
                            name="icd10Code" 
                            hintText="ICD10 Code"                                     
                            floatingLabelText="ICD10 Code"                                    
                            component={CustomSelectField}                                     
                            style={{ width: '45%' }}
                            validate={required}
        
                            onChange={this.onSelectIcd10.bind(this)}>

                            { this.onDisplayICD10MenuItems() }
                        </Field>

                        { /** ICD10 DESCRIPTION */ }
                        <Field 
                            name="icd10Value"
                            ref="icd10Value"
                            withRef={true}
                            hintText="ICD10 Value"
                            floatingLabelText="ICD10 Value"
                            fullWidth={true}
                            disabled={true}      
                            component={TextField}
                            validate={required}        
                            multiLine={true}
                            textareaStyle={{ color: colorPalette.primaryTextColor }}               
                        />


                        <div style={styles.radioButtonWrapper}>
                            <label style={styles.radioButtonWrapper.labelStyle}>Repetitive?</label>
                            
                            <Field                                            
                                component={CustomRadioButtonGroup} 
                                style={styles.radioButtonWrapper.radioButtonGroupStyle} 
                                name="repetitive"                          
                                validate={required}>

                                <RadioButton 
                                    value="Y" 
                                    label="Yes" 
                                    style={styles.radioButtonWrapper.radioButtonStyle} 
                                    onTouchTap={this.onClickYesRepetitive.bind(this)}
                                    //onTouchTap={() => { this.setState({ isRepetitive: 'Y' }); }}
                                    />
                                      
                                <RadioButton 
                                    value="N" 
                                    label="No" 
                                    style={styles.radioButtonWrapper.radioButtonStyle} 
                                    onTouchTap={this.onClickNoRepetitive.bind(this)}
                                    //onTouchTap={() => { this.setState({ isRepetitive: 'N' }); }}
                                    />     
                            </Field>
                        </div>

                        { /** IF REPETITIVE YES */ }
                        { this.state.isRepetitive ? this.state.isRepetitive == 'Y' ? 
                            <div style={[styles.textFieldWrapper]}>
                                <Field                            
                                    name="numberOfSessions" 
                                    hintText="Number Of Sessions"                                     
                                    floatingLabelText="Number Of Sessions"                                    
                                    component={CustomSelectField}                                     
                                    style={styles.textFieldWrapper.mediumWidth}
                                    validate={required}
                                    ref= "numberOfSessions" 
                                    withRef={true}>
                                    { this.onDisplayNumberOfSessions() }
                                </Field>    

                                <Field                            
                                    name="typeCode" 
                                    hintText="Type"                                     
                                    floatingLabelText="Type"                                    
                                    component={CustomSelectField}                                     
                                    fullWidth={true}
                                    validate={required}
                                    ref="typeCode" 
                                    withRef={true}>

                                    { this.onDisplayTypeMenuItems() } 
                                </Field>                                                                                   
                            </div>    
                            :

                            /** IF REPETITIVE NO */
                            <div style={[styles.textFieldWrapper, styles.textFieldWrapperAlignItems]}>
                                <Field
                                    name="sessionDate" 
                                    ref="sessionDate"
                                    withRef={true}
                                    hintText="Procedure Date"                                     
                                    floatingLabelText="Procedure Date"                                    
                                    component={CustomDatePicker}                                     
                                    style={styles.textFieldWrapper.largeWidth}
                                    validate={[required, validDate]}
                                    maxDate={new Date()}
                                    format={null}
                                />  

                                <Field                            
                                    name="lateralityCode" 
                                    ref="lateralityCode"
                                    withRef={true}
                                    hintText="Laterality"                                     
                                    floatingLabelText="Laterality"                                    
                                    component={CustomSelectField}                                     
                                    style={styles.textFieldWrapper.mediumWidth}
                                    validate={required}>

                                    { this.onDisplayMenuItems(initialData.laterality) }
                                </Field>
                            </div>                         
                        : null }                                                                                   
                    </div>

                    <div style={styles.buttonWrapper}>
                        <RaisedButton 
                            label="Cancel"
                            style={ styles.buttonWrapper.left }
                            onTouchTap={closeDialog.bind(this)}
                        />   

                        <RaisedButton 
                            type="submit"
                            label="Save"
                            style={ styles.buttonWrapper.left }
                            secondary={true }
                        />  
                    </div>  
                                       
                </form>
            </StyleRoot>
        );
    }
}
// *** props
Cf2SurgicalProcedureNew.propTypes = {
    closeDialog : PropTypes.func.isRequired
};

export default Cf2SurgicalProcedureNew;