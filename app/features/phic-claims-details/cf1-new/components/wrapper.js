

import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Radium, {StyleRoot} from 'radium';
import { browserHistory } from 'react-router';
// material

import { TextField } from 'redux-form-material-ui';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

//** dumb components
import Cf1SummaryContainer from '../../cf1-summary/containers/cf1-summary';
import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';

import ClaimsDependentPatientInfo from './claimsdependent-patient-info';
import ClaimsDependentMemberInfo from './claimsdependent-member-info';

import ClaimsMemberPatientInfo from './claimsmember-patient-info';
import ClaimsMemberMemberInfo from './claimsmember-member-info';

import { initialData } from '../../../../util/data';

//** reused component 
import { required,maxLength12,number } from '../../../../util/validation';
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/color-pallete';

const styles = {
    container : {
        padding: '24px',        
        backgroundColor: colorPalette.white,
        marginBottom: '30px'
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 600,
        fontSize: '20px',
    },
    subTitle: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        width: '280px',
        fontSize: '14px'
    },
    resultSubTitle: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        width: '280px',
        fontSize: '24px'
    },

    radioButtonWrapper: {
        display: 'flex',
        alignItems : 'center',
        padding: '12px 0',        

        radioButtonGroupStyle: {
            display: 'flex'
        }
    },
    textFieldCont : {
        display: 'block',
        marginTop: '-50px',
        textField : {
            marginRight: '30px'
        },
        inputFieldStyle: {
            color: 'initial'
        }        
    },
    eligibility : {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        buttonCont: {
            display: 'flex',
            flexDirection: 'column',
        },
        loadingCont : {
            display: 'flex',            
            alignItems: 'center'

        }
    }
};
//phicClaimsDetailsCf2Form
@reduxForm({
    form: 'phicClaimsDetailsCf2Form'
})

@Radium
class Cf1Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }   

    onCancel() {
        browserHistory.goBack();
    }

    patientIsTypeForDependent() {
        
        let patientIsVal = [];
        initialData.patientIs.map((val, index)=> {
            patientIsVal.push(
                <MenuItem value={val.code} primaryText={`${val.code} - ${val.value}`} key={index}/>
            );
        });                    
        return patientIsVal;
    }

    render() {

        const { handleSubmit,                 
                patientMemberPinRequest, 
                patientMemberPin,
                patientInfo,
                params,
                selectedTransmittal,
                getEmployerName,
                checkForEmployer,
                employerInfo,
                validateEmployeeRequestPending  } = this.props;                  
        
        return (
            <StyleRoot style={styles.container}>

                 {false? 
                    <Cf1SummaryContainer 
                        patientInfo={patientInfo}
                        patientMemberPin={patientMemberPin}
                        handleSubmit={handleSubmit}
                        
                    />
                    :  
                    <div> {/* form 2 onSubmit={handleSubmit}*/}
                        <div style={styles.eligibility}>
                            <h1 style={styles.title}>CF1 - Eligibility Check</h1>
                            
                            {/*{ patientMemberPinRequest ? 
                                <LoadingIndicatorPerAction text="Validating..."/>
                                : 
                                <div style={styles.eligibility.buttonCont}>
                                    <RaisedButton label="Cancel" labelStyle={{letterSpacing: '0.5px'}} labelColor={colorPalette.primaryColor} style={{marginBottom: '10px'}}  onTouchTap={this.onCancel.bind(this)} buttonStyle={styles.cancelBtn}/>
                                    <RaisedButton label="VALIDATE MEMBERSHIP" labelStyle={{letterSpacing: '0.5px'}} secondary={true} type="submit"/>                               
                                </div>
                            }*/}
                        
                        </div>
                    
                        {/*<div style={styles.radioButtonWrapper}>
                            <label style={styles.subTitle}>Is Patient is Member ? </label>
                            { params.cf1mode === 'new-claim-member' ? 
                                <label style={styles.resultSubTitle}>Yes</label>
                                : 
                                <label style={styles.resultSubTitle}>No</label>
                            }                        
                                        
                        </div>*/}
                    
                    { true ?  
                    
                        <div style={[styles.textFieldCont, animation.fadeIn]}>                                    
                            <div>
                                <Field
                                    name="patientis" 
                                    hintText=""                                     
                                    floatingLabelText="Patient Is"                                    
                                    disabled={true}
                                    component={TextField}                                     
                                    style={styles.textFieldCont.textField}
                                    inputStyle={styles.textFieldCont.inputFieldStyle}
                                    disabled={true}
                                />
                            </div>   

                            <ClaimsMemberPatientInfo
                                patientMemberPinRequest={patientMemberPinRequest}
                                selectedTransmittal={selectedTransmittal} 
                                getEmployerName={getEmployerName}
                                checkForEmployer={checkForEmployer} 
                                employerInfo={employerInfo}
                                patientInfo={patientInfo}
                                validateEmployeeRequestPending={validateEmployeeRequestPending}
                            />                                        
                                                
                            <ClaimsMemberMemberInfo                                 
                                patientMemberPinRequest={patientMemberPinRequest} 
                                selectedTransmittal={selectedTransmittal} 
                                getEmployerName={getEmployerName} 
                                checkForEmployer={checkForEmployer}
                                employerInfo={employerInfo}
                                patientInfo={patientInfo}
                                validateEmployeeRequestPending={validateEmployeeRequestPending}                         
                            />   

                        </div>

                        :                            
                                                            
                        <div style={[styles.textFieldCont, animation.fadeIn]}>                                                                          
                            <div style={{display: 'flex'}}>
                                <Field
                                    name="patientiscode"
                                    floatingLabelText="Patient Is"
                                    value={this.state.gender}
                                    onChange={this.handleChange}
                                    component={CustomSelectField}
                                    validate={required}
                                    style={{width: '255px', marginRight: '30px'}}
                                    disabled={patientMemberPinRequest}
                                    >
                                    {
                                        this.patientIsTypeForDependent()
                                    }
                                    
                                    
                                </Field>
                                <Field
                                    name="patientpin" 
                                    hintText="Patient PIN"
                                    floatingLabelText="Patient PIN"
                                    style={styles.textFieldCont.textField}
                                    component={TextField} 
                                    validate={[required,maxLength12,number]}
                                    disabled={patientMemberPinRequest}
                                />
                            </div>  

                            <ClaimsDependentPatientInfo
                                patientMemberPinRequest={patientMemberPinRequest}
                                selectedTransmittal={selectedTransmittal} 
                                getEmployerName={getEmployerName} 
                                checkForEmployer={checkForEmployer}
                                employerInfo={employerInfo}
                                patientInfo={patientInfo}
                                validateEmployeeRequestPending={validateEmployeeRequestPending}   
                            />      
                            <ClaimsDependentMemberInfo 
                                patientMemberPinRequest={patientMemberPinRequest}
                                selectedTransmittal={selectedTransmittal} 
                                getEmployerName={getEmployerName} 
                                checkForEmployer={checkForEmployer}
                                employerInfo={employerInfo}
                                patientInfo={patientInfo}
                                validateEmployeeRequestPending={validateEmployeeRequestPending}   
                            />                  
                        </div>
                        
                    }
                </div>

                }

                
            </StyleRoot>
        );
    }

}

export default Cf1Wrapper;