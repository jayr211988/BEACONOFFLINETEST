import React from 'react';
import { Field } from 'redux-form';

// others
import Radium, { StyleRoot } from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import CustomDatePicker from '../../../shared-components/custom-material-ui/datepicker';
import { required, maxLength50,  validDate, maxDateShouldBeToday } from '../../../util/validation';
import { TextField } from 'redux-form-material-ui';
import CustomSelectField from '../../../shared-components/custom-material-ui/selectfield';
import MenuItem from 'material-ui/MenuItem';

import { initialData } from '../../../util/data';

const styles = {
    container: {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px'
    },

    containerTbl: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px',
        marginRight: '30px'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '20px'
    },
    table: {
        menu: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        borderBottom: '1px dashed rgb(216, 216, 216)'

    },
    subtitle: {
        color: colorPalette.primaryColor,
        fontSize: '14px',
        width: '286px',
        fontWeight: 600
    },
    body: {
        item: {
            fontSize: '12px',
            color: colorPalette.primaryTextColor,
            display: 'flex',
            marginBottom: '6px',

            label: {
                color: colorPalette.primaryColor,
           
            }
        }
    },
    lmpCont: {
        display: 'flex',
        alignItems: 'center',
    },
    perCol: {
        display: 'flex',
        alignItems: 'baseline'
    }
};

@Radium
class AccessPatientRecords extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            consentTypeVal: props.selectedCf2.aprConsentTypeCode ? props.selectedCf2.aprConsentTypeCode : initialData.consentType[0].code,
            relationshipToPatientVal : props.selectedCf2.aprRelationToPatientCode,
            reasonForSigningVal : props.selectedCf2.aprReasonForSigningCode,
            thumbMarkVal : props.selectedCf2.aprThumbmarkedByCode
        };

    }  

    onHandleChange(event, value){
        this.setState({
            consentTypeVal: value          
        });
    }

    onHandleChangeRelation(event, value){
        this.setState({
            relationshipToPatientVal : value
        });
    }   

    onHandleChangeReasonForSigning(event, value){
        this.setState({
            reasonForSigningVal : value
        });
    }  

    onHandleChangeThumbmark(event, value){
        this.setState({
            thumbMarkVal : value
        });
    }    

    onDisplayConsentType(items) {
        return items.map((item, index) => (
            <MenuItem
                key={index}
                value={item.code}
                primaryText={`${item.code} - ${item.value}`} />
        )
        );
    }

    onDisplayRelationshipToPatient(items) {
        return items.map((item, index) => (
            <MenuItem
                key={index}
                value={item.code}
                primaryText={`${item.code} - ${item.value}`} />
        )
        );
    }

    onDisplayReasonForSigning(items) {
        return items.map((item, index) => (
            <MenuItem
                key={index}
                value={item.code}
                primaryText={`${item.code} - ${item.value}`} />
        )
        );
    }

    onDisplayThumbMark(items) {
        return items.map((item, index) => (
            <MenuItem
                key={index}
                value={item.code}
                primaryText={`${item.code} - ${item.value}`} />
        )
        );
    }



    render() { 
        const { summaryMode } = this.props;
        return (         
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px' }]}>Access Patient Records</label>
                <section style={styles.containerTbl}>
                    <div style={styles.body}>
                        <div style={{ paddingBottom: '20px' }}>
                            
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', paddingLeft: '30px'}}>

                                    <div style={styles.perCol}>
                                        {!summaryMode ?
                                        <Field
                                            name="aprConsentTypeCode"
                                            hintText="Consent Type"
                                            floatingLabelText="Consent Type"
                                            component={CustomSelectField}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={required}
                                            onChange={this.onHandleChange.bind(this)}
                                        >                                      
                                            {this.onDisplayConsentType(initialData.consentType)}
                                        </Field>
                                        : 
                                        <Field
                                            name="aprConsentTypeValue"
                                            hintText="Consent Type"
                                            floatingLabelText="Consent Type"
                                            component={TextField}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={required}
                                            disabled={summaryMode}
                                        >                                      
                                        </Field> } 

                                    </div> 

                                    <div style={styles.perCol}>
                                        <Field
                                            name="aprDate"
                                            hintText="Date"
                                            mode="landscape"
                                            floatingLabelText="Date"
                                            maxDate={new Date()}
                                            component={CustomDatePicker}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            disabled={summaryMode}
                                            validate={[required, validDate, maxDateShouldBeToday]}
                                        />
                                    </div>
                                
                                    {  this.state.consentTypeVal == '1' || this.state.consentTypeVal == '2' ? null :
                                        <div style={styles.perCol}>
                                            {!summaryMode? <Field
                                                name="aprThumbmarkedByCode"
                                                hintText="Thumbmarked By"
                                                mode="landscape"
                                                floatingLabelText="Thumbmarked By"
                                                component={CustomSelectField}
                                                style={{ marginRight: '20px', width: '300px' }}
                                                validate={required}
                                                onChange={this.onHandleChangeThumbmark.bind(this)}
                                            >
                                            {this.onDisplayThumbMark(initialData.thumbMark)}
                                            </Field>
                                            :
                                            <Field
                                                name="aprThumbmarkedByValue"
                                                hintText="Thumbmarked By"
                                                mode="landscape"
                                                floatingLabelText="Thumbmarked By"
                                                component={TextField}
                                                style={{ marginRight: '20px', width: '300px' }}
                                                validate={required}
                                                disabled={summaryMode}
                                            >
                                            </Field>}
                                        </div>
                                       
                                    }

                                </div>
                               
                                <div style={{ display: 'flex', paddingLeft: '30px', marginTop: '18px' }}>
                                    { this.state.consentTypeVal == '1' ? null : 
                                    this.state.consentTypeVal == '2' ?
                                    <div>   
                                  <label style={styles.body.item.label}>FOR REPRESENTATIVE </label>
                                    <div style={styles.perCol}>

                                        {!summaryMode ? <Field
                                            name="aprRelationToPatientCode"
                                            hintText="Relationship to patient"
                                            mode="landscape"
                                            floatingLabelText="Relationship to patient"
                                            component={CustomSelectField}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={required}
                                            onChange={this.onHandleChangeRelation.bind(this)}
                                            >
                                        {this.onDisplayRelationshipToPatient(initialData.relationshipToPatient)}
                                        
                                        </Field>
                                        :
                                        <Field
                                            name="aprRelationToPatientValue"
                                            hintText="Relationship to patient"
                                            mode="landscape"
                                            floatingLabelText="Relationship to patient"
                                            component={TextField}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={required}
                                            disabled={summaryMode}
                                            >                                        
                                        </Field>}

                                    </div>
                                    </div>
                                    : null
                                }
                         

                                {this.state.relationshipToPatientVal != 'O' || this.state.consentTypeVal != '2' ? null : <div style={styles.perCol}>
                                        <Field
                                            name="aprRelationshipToPatientOthers"
                                            hintText="Specify if Others"
                                            mode="landscape"
                                            floatingLabelText="Specify if Others"
                                            component={TextField}
                                            disabled={summaryMode}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={[required, maxLength50]}
                                        />
                                    </div> 
                                    }
                                   
                               
                                </div> 
                                
                                <div style={{ display: 'flex', paddingLeft: '30px' }}>
                                     { this.state.consentTypeVal == '1' || this.state.consentTypeVal == '3' ? null : 
                                    <div style={styles.perCol}>
                                        {!summaryMode ? <Field
                                            name="aprReasonForSigningCode"
                                            hintText="Reason for signing"
                                            mode="landscape"
                                            floatingLabelText="Reason for signing"
                                            component={CustomSelectField}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={required}
                                            onChange={this.onHandleChangeReasonForSigning.bind(this)}
                                        >
                                        {this.onDisplayReasonForSigning(initialData.reasonForSigning)}                                     

                                        </Field>
                                        :
                                        <Field
                                            name="aprReasonForSigningValue"
                                            hintText="Reason for signing"
                                            mode="landscape"
                                            floatingLabelText="Reason for signing"
                                            component={TextField}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={required}
                                            disabled={summaryMode}
                                        >                                    

                                        </Field>}
                                    </div>
                                       }
                                       {this.state.reasonForSigningVal != 'O' || this.state.consentTypeVal != '2' ? null : 
                                         <div style={styles.perCol}>
                                        <Field
                                            name="aprReasonForSigningOthers"
                                            hintText="Specify if Others"
                                            mode="landscape"
                                            floatingLabelText="Specify if Others"
                                            component={TextField}
                                            disabled={summaryMode}
                                            style={{ marginRight: '20px', width: '300px' }}
                                            validate={[required, maxLength50]}
                                        />
                                         </div>
                                        }
                                  
                                </div>
                              
                            </div>


                        </div>


                    </div>



                </section>



            </StyleRoot>

        );
    }



}

export default AccessPatientRecords;