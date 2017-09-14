
// react + redux
import React from 'react';
import {  Field } from 'redux-form';
// material
import { TextField} from 'redux-form-material-ui';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';

import MenuItem from 'material-ui/MenuItem';

import CustomDatePicker from '../../../../shared-components/custom-material-ui/datepicker';
import Radium, {StyleRoot} from 'radium';
// custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import { required, maxLength60, letterWithSpecial, validDate, maxDateShouldBeToday} from '../../../../util/validation';
import { capitalizeFirstLetter } from '../../../../util/normalize';

const styles = {
    container: {
        marginTop: '20px'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,      
        marginBottom: '-10px',
        fontSize: '14px'
    },
    textFieldCont : {
        display: 'flex',
        textField: {
            marginRight: '30px'
        }
    },
    birthdayCont: {
        display: 'flex',
        alignItems: 'flex-end',

        birthday: {            
            margin: '24px 30px 0 0'
        }
    }    
};


@Radium
class ClaimsDependentPatientInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            gender: 1
        };
    }


    render() {
        const {patientMemberPinRequest} = this.props;
        
        return (
            <StyleRoot style={styles.container}>
                <h1 style={styles.title}>Patient Info</h1>
                <div style={styles.textFieldCont}>
                    <Field
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        style={styles.textFieldCont.textField}
                        name="patientlastname"
                        component={TextField} 
                        validate={[required, maxLength60, letterWithSpecial]}
                        disabled={patientMemberPinRequest}
                        normalize={capitalizeFirstLetter}

                    />

                    <Field
                        hintText="First Name"
                        floatingLabelText="First Name"
                        style={styles.textFieldCont.textField}
                        name="patientfirstname"
                        component={TextField} 
                        disabled={patientMemberPinRequest}
                        validate={[required,letterWithSpecial]}
                        normalize={capitalizeFirstLetter}

                    />
                    <Field
                        hintText="Middle Name"
                        floatingLabelText="Middle Name"
                        style={styles.textFieldCont.textField}
                        name="patientmiddlename"
                        disabled={patientMemberPinRequest}
                        component={TextField}
                        normalize={capitalizeFirstLetter}

                    />
                    <Field
                        hintText="Suffix"
                        floatingLabelText="Suffix"
                        style={styles.textFieldCont.textField}
                        name="patientsuffix"                        
                        disabled={patientMemberPinRequest}
                        validate={letterWithSpecial}
                        component={TextField}
                        normalize={capitalizeFirstLetter}
                                                 
                    />

                </div>
                <div style={styles.birthdayCont}>
                    <Field
                        name="patientbirthday"
                        floatingLabelText="Birthday"
                        hintText="Birthday" 
                        mode="landscape" 
                        style={styles.birthdayCont.birthday}
                        maxDate={new Date()}      
                        component={CustomDatePicker}                                          
                        validate={[required,validDate,maxDateShouldBeToday]}  
                        disabled={patientMemberPinRequest}                        
                        />
                    <Field
                        name="patientgender"
                        floatingLabelText="Gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        component={CustomSelectField}
                        validate={required}
                        disabled={patientMemberPinRequest}
                        style={{width: '270px', marginRight: '30px'}}
                        >
                        <MenuItem value={'M'} primaryText="Male" />
                        <MenuItem value={'F'} primaryText="Female" />
                        
                    </Field>
                </div>

                

                <div style={{display: 'flex'}}>
                    <Field
                        name="admissiondate"
                        floatingLabelText="Admission Date"
                        hintText="Admission Date" 
                        mode="landscape"
                        maxDate={new Date()}      
                        component={CustomDatePicker}                                          
                        validate={[required,validDate,maxDateShouldBeToday]}                                      
                        style={{width: '270px', marginRight: '30px'}}
                        disabled={patientMemberPinRequest}
                        />
                        
                    <Field
                        name="dischargedate"
                        floatingLabelText="Discharge Date"
                        hintText="Discharge Date" 
                        mode="landscape"                         
                        maxDate={new Date()}      
                        component={CustomDatePicker}                                          
                        validate={[required,validDate,maxDateShouldBeToday]}                                        
                        style={{width: '270px', marginRight: '30px'}}
                        disabled={patientMemberPinRequest}
                        />
                </div>
            </StyleRoot>
        );
    }
}

export default ClaimsDependentPatientInfo;