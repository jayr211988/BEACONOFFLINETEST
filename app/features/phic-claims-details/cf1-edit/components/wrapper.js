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
import ClaimsMemberPatientInfo from './claimsmember-patient-info';
import ClaimsMemberMemberInfo from './claimsmember-member-info';
import ClaimsDependentPatientInfo from './claimsdependent-patient-info';
import ClaimsDependentMemberInfo from './claimsdependent-member-info';
import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';

//** reused component 
import { required,maxLength12,number } from '../../../../util/validation';
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/color-pallete';

import { initialData } from '../../../../util/data/index';

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
    },
    btnCancel : {
        backgroundColor: colorPalette.whiteSmoke             
    }
};

@reduxForm({
    form: 'cf1EditForm'
})

@Radium
class Cf1EditWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
 
    onCancel() {
        const { params } = this.props;

        browserHistory.push(`/phic-claims/${params.transmittalId}`);
    }
    
    render() {

        const { handleSubmit,
                patientMemberPinRequest,
                patientInfo,
                selectedTransmittal,
                getEmployerName,
                employerInfo,
                validateEmployeeRequestPending } = this.props;
        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}> 
                    <div style={styles.eligibility}>
                        <h1 style={styles.title}>CF1 - Eligibility Check</h1>
                        

                        { patientMemberPinRequest ? 
                            <LoadingIndicatorPerAction text="Validating..."/>
                            : 
                            <div style={styles.eligibility.buttonCont}>
                                <RaisedButton label="Cancel" labelStyle={{letterSpacing: '0.5px'}} labelColor={colorPalette.primaryColor} style={{marginBottom: '10px'}} buttonStyle={styles.btnCancel} onTouchTap={this.onCancel.bind(this)}/>
                                <RaisedButton label="VALIDATE MEMBERSHIP" labelStyle={{letterSpacing: '0.5px'}} secondary={true} type="submit"/>                               
                            </div>
                        }
                    
                    </div>
                    
                    {/*<div style={styles.radioButtonWrapper}>
                        <label style={styles.subTitle}>Is Patient is Member ? </label>
                        { patientInfo.patientIsCode === 'M' ? 
                            <label style={styles.resultSubTitle}>Yes</label>
                            : 
                            <label style={styles.resultSubTitle}>No</label>
                        }
                    </div>*/}


                { patientInfo.patientIsCode === 'M' ?
                    <div style={[styles.textFieldCont, animation.fadeIn]}>
                        <div>
                            <Field
                                name="patientis" 
                                hintText="Patient Is"                                     
                                floatingLabelText="Patient Is"                                    
                                disabled={true}
                                component={TextField}                                     
                                style={styles.textFieldCont.textField}
                                inputStyle={styles.textFieldCont.inputFieldStyle}
                            />
                        </div>
                        <ClaimsMemberPatientInfo 
                            patientMemberPinRequest={patientMemberPinRequest} 
                            selectedTransmittal={selectedTransmittal} 
                            getEmployerName={getEmployerName} 
                            employerInfo={employerInfo}
                            patientInfo={patientInfo}
                            validateEmployeeRequestPending={validateEmployeeRequestPending}/>

                        <ClaimsMemberMemberInfo 
                            patientMemberPinRequest={patientMemberPinRequest} 
                            selectedTransmittal={selectedTransmittal} 
                            getEmployerName={getEmployerName} 
                            employerInfo={employerInfo}
                            patientInfo={patientInfo}
                            validateEmployeeRequestPending={validateEmployeeRequestPending}/>
                    </div>
                    :
                    <div style={[styles.textFieldCont, animation.fadeIn]}>                                                                          
                        <div style={{display: 'flex'}}>
                            <Field
                                name="patientisdependant"
                                floatingLabelText="Patient Is"
                                component={CustomSelectField}
                                validate={required}
                                style={{width: '270px', marginRight: '30px'}}
                                disabled={patientMemberPinRequest}
                                >
                                { initialData.patientIs.map((t, i) => (<MenuItem key={i} value={t.code} primaryText={`${t.code} - ${t.value}`} />)) }
                            </Field>
                            <Field
                                name="dependantpin" 
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
                            employerInfo={employerInfo}
                            patientInfo={patientInfo}
                            validateEmployeeRequestPending={validateEmployeeRequestPending}
                        />
                        <ClaimsDependentMemberInfo                                 
                            patientMemberPinRequest={patientMemberPinRequest}  
                            selectedTransmittal={selectedTransmittal} 
                            getEmployerName={getEmployerName} 
                            employerInfo={employerInfo}
                            patientInfo={patientInfo}
                            validateEmployeeRequestPending={validateEmployeeRequestPending}                     
                        />
                    </div>
                }
            </form>
            </StyleRoot>
        );
    }

}

export default Cf1EditWrapper;