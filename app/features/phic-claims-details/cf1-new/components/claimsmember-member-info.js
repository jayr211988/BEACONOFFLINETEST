
// react + redux
import React from 'react';
import { Field } from 'redux-form';

// material
import { TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';
import ActionDoneIcon from 'material-ui/svg-icons/action/done';
import AlertErrorOutlineIcon from 'material-ui/svg-icons/alert/error-outline';
import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';

// 3rd party
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';
import { required, maxLength150, email, number, maxLength4, maxLength20, maxLength100, maxLength12 } from '../../../../util/validation';
import { initialData } from '../../../../util/data';


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
    textFieldCont: {
        display: 'block',

        textField : {
            marginRight: '30px'
        },
        inputFieldStyle: {
            color: 'initial'
        },
        mailingAddress: {
            width: '540px',
            marginRight: '30px'
        }
    },
    admissiondate: {                    
        margin: '24px 30px 0 0',
        width: '256px'        
    },
    warningMessage: {
    },
    warningIconMessage: {
        position: 'relative', 
        top: '7px',
        left: '-7px'
    },

    loadingIndicatorStyle: {
        height: '30px', 
        padding: 0, 
        marginTop: '12px' 
    } 
};

@Radium
class ClaimsMemberMemberInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disregardMemberType : true,
            validatingEmployer: false,
            
            employerName : '',
            employerPen : ''
        };
    }

    changeMemberType(memberTypeCode) {
        if (memberTypeCode === 'S' || memberTypeCode === 'G' ) {
            this.setState ({
                disregardMemberType : false
            });
        } else {
            this.setState ({
                disregardMemberType : true
            });
        }
    }
    
    memberTypes() {
        
        let memberTypesVal = [];
        initialData.memberTypes.map((val, index)=> {
            memberTypesVal.push(
                <MenuItem 
                    value={val.code} 
                    primaryText={`${val.code} - ${val.value}`} 
                    key={index} 
                    onTouchTap={this.changeMemberType.bind(this, val.code)}
                />
            );
        });                   
        
        return memberTypesVal;
    }

    searchEmployerName(e, name) {
        const { selectedTransmittal,getEmployerName } = this.props;
        
        this.setState({ employerName : name });

        if(this.state.employerPen.length != 0 && name.length != 0)
            getEmployerName(selectedTransmittal, this.state.employerPen, name);
    }

    searchEmployerPen(e, pen) {
        const {  getEmployerName, selectedTransmittal } = this.props;

        this.setState({ employerPen : pen });

        if(this.state.employerName.length != 0 && pen.length != 0)
            getEmployerName(selectedTransmittal, pen, this.state.employerName);

           
    }

    onCheckForEmployer() {
        const { checkForEmployer } = this.props;    

        checkForEmployer();
        
    }

    render() {

        const { patientMemberPinRequest, employerInfo, patientInfo ,validateEmployeeRequestPending } = this.props;
        
        return (
            <StyleRoot style={styles.container}>                
                <h1 style={styles.title}>Member Info</h1>
                <div style={{display: 'flex'}}>                    
                    <Field
                        name="membertypecode"
                        floatingLabelText=  "Member Type"                                                
                        component={CustomSelectField}
                        validate={required}    
                        disabled={patientMemberPinRequest}                                 
                        style={{width: '255px', marginRight: '30px'}}    
                        onChange={this.onCheckForEmployer.bind(this)}                    
                        >
                        {
                            this.memberTypes()
                        }                                                                      
                    </Field>

                                                                
                </div>
                <div style={{display: 'flex'}}>
                    <Field
                        hintText="Mailing Address"
                        floatingLabelText="Mailing Address"
                        style={styles.textFieldCont.mailingAddress}
                        component={TextField} 
                        name="membermailingaddress"
                        disabled={patientMemberPinRequest}             
                        validate={[required, maxLength150]}
                    />
                   
                    <Field
                        hintText="Zip Code "
                        floatingLabelText="Zip Code "
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="memberzipcode"
                        disabled={patientMemberPinRequest}             
                        validate={[required, maxLength4, number]}
                    />
                </div>
                <div style={{display: 'flex'}}>
                    <Field
                        hintText="Landline"
                        floatingLabelText="Landline"
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="memberlandlinenumber"
                        disabled={patientMemberPinRequest}             
                        validate={[required, maxLength20]}
                    />
                    <Field
                        hintText="Mobile"
                        floatingLabelText="Mobile"
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="membermobilenumber"
                        disabled={patientMemberPinRequest}             
                        validate={[required, maxLength20]}
                    />
                    <Field
                        hintText="Email"
                        floatingLabelText="Email"
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="memberemail"
                        disabled={patientMemberPinRequest}             
                        validate={[required,maxLength150]}
                    />
                </div>
                { this.state.disregardMemberType ? 
                    null
                    :
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Field
                            hintText="PhilHealth Employer Number"
                            floatingLabelText="PhilHealth Employer Number"
                            style={styles.textFieldCont.textField}
                            component={TextField} 
                            name="memberPEN"
                            ref="memberpen"
                            withRef={true}
                            disabled={patientMemberPinRequest}             
                            validate={[required, maxLength12, number]}
                            onBlur={this.searchEmployerPen.bind(this)}
                        />
                        <Field
                            hintText="Employer Name"
                            floatingLabelText="Employer Name"
                            style={styles.textFieldCont.textField}
                            component={TextField} 
                            name="memberemployername"
                            ref="memberemployername"  
                            withRef={true}                                  
                            disabled={patientMemberPinRequest}             
                            validate={[required, maxLength100]}
                            onBlur={this.searchEmployerName.bind(this)}
                        />

                        { employerInfo ? validateEmployeeRequestPending ? 
                            <LoadingIndicatorPerAction text="Validating..." style={styles.loadingIndicatorStyle}/>
                        :
                        <div>
                            { employerInfo.employer!=null ? 
                                <div style={styles.warningMessage}>
                                    <div>
                                        <ActionDoneIcon style={{color: colorPalette.primaryColor, ...styles.warningIconMessage}}/>
                                        <span style={[styles.warningTitle, {color: colorPalette.primaryColor}]}>Valid Employer</span>
                                    </div>
                                </div>
                                : 
                                <div style={styles.warningMessage}>
                                    <div>
                                        <AlertErrorOutlineIcon style={{color: colorPalette.accentColor, ...styles.warningIconMessage}}/>
                                        <span style={[styles.warningTitle, {color: colorPalette.accentColor}]}>We could not found the employer in PhilHealth database</span>
                                    </div>
                                </div>
                            }
                        </div> : null }
                    </div>
                
                }
            </StyleRoot>
        );
    }

}
export default ClaimsMemberMemberInfo;