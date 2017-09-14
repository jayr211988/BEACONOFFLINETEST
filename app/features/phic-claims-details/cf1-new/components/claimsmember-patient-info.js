
// react + redux
import React from 'react';
import {  Field } from 'redux-form';
// material
import { TextField } from 'redux-form-material-ui';
import CustomDatePicker from '../../../../shared-components/custom-material-ui/datepicker';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';

import MenuItem from 'material-ui/MenuItem';


import Radium, {StyleRoot} from 'radium';
// custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import { required, maxLength60, maxLength5, letterWithSpecial, validDate,maxDateShouldBeToday } from '../../../../util/validation';
import { capitalizeFirstLetter } from '../../../../util/normalize';

const styles = {
    container: {
        marginTop: '50px'
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
        alignItems: 'center',

        birthday: {            
            margin: '0 30px 0 0'
        }
    }    
};


@Radium
class ClaimsMemberPatientInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            gender: 1
        };
    }
    
    handleChange = (event, index, value) => this.setState({
        gender : value
    });



    render() {

        const { patientMemberPinRequest } = this.props;
        return (
            <StyleRoot style={styles.container}>
                <h1 style={styles.title}>Patient Info</h1>
                <div style={styles.textFieldCont}>
                    <Field
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        style={styles.textFieldCont.textField}
                        name="memberlastname"
                        component={TextField} 
                        validate={[required, maxLength60, letterWithSpecial]}     
                        label="testing"           
                        disabled={patientMemberPinRequest}
                        normalize={capitalizeFirstLetter}        
                    />

                    <Field
                        hintText="First Name"
                        floatingLabelText="First Name"
                        style={styles.textFieldCont.textField}
                        name="memberfirstname"
                        component={TextField} 
                        validate={[required, maxLength60, letterWithSpecial]}
                        disabled={patientMemberPinRequest}
                        normalize={capitalizeFirstLetter}           
                    />
                    <Field
                        hintText="Middle Name"
                        floatingLabelText="Middle Name"
                        style={styles.textFieldCont.textField}
                        name="membermiddlename"
                        component={TextField} 
                        validate={[maxLength60]}
                        disabled={patientMemberPinRequest}
                        normalize={capitalizeFirstLetter}          
                    />
                    <Field
                        hintText="Suffix"
                        floatingLabelText="Suffix"
                        style={styles.textFieldCont.textField}
                        name="membersuffix"
                        component={TextField}    
                        validate={[maxLength5, letterWithSpecial]}           
                        disabled={patientMemberPinRequest}
                        normalize={capitalizeFirstLetter}                    

                    />

                </div>
                <div style={styles.birthdayCont}>
                    <Field
                        name="memberbirthday"                     
                        hintText="Birthday" 
                        mode="landscape" 
                        floatingLabelText="Birthday"
                        style={styles.birthdayCont.birthday}
                        maxDate={new Date()}      
                        component={CustomDatePicker}                                          
                        validate={[required,validDate,maxDateShouldBeToday]}     
                        disabled={patientMemberPinRequest}                                               
                        
                        />
                   
                    <Field
                        name="membergender"
                        floatingLabelText="Gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        disabled={patientMemberPinRequest}        
                        component={CustomSelectField}
                        validate={required}
                        style={{width: '255px', marginRight: '30px'}}
                        
                        >
                        <MenuItem value={'M'} primaryText="Male" />
                        <MenuItem value={'F'} primaryText="Female" />
                        
                    </Field>
                </div>
                <div style={{display: 'flex'}}>
                    <Field
                        floatingLabelText="Admission Date"
                        name="admissiondate"                     
                        hintText="Admission Date" 
                        mode="landscape"                         
                        maxDate={new Date()}   
                        style={{marginRight: '20px', width: '265px'}}
                        component={CustomDatePicker}                                          
                        validate={[required,validDate,maxDateShouldBeToday]}     
                        disabled={patientMemberPinRequest}                                                      
                        format={null}
                    />
                    <Field
                        floatingLabelText="Discharge Date"
                        name="dischargedate"                     
                        hintText="Discharge Date" 
                        mode="landscape"                         
                        maxDate={new Date()}   
                        style={{ width: '265px'}}
                        component={CustomDatePicker}                                          
                        validate={[required,validDate,maxDateShouldBeToday]}                                                
                        format={null}
                        disabled={patientMemberPinRequest}             
                    />      
                </div>
            </StyleRoot>
        );
    }
}

export default ClaimsMemberPatientInfo;