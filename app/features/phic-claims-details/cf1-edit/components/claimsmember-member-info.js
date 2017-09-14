
// react + redux
import React from 'react';
import { Field } from 'redux-form';

// material
import { TextField  } from 'redux-form-material-ui';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';
import ActionDoneIcon from 'material-ui/svg-icons/action/done';
import AlertErrorOutlineIcon from 'material-ui/svg-icons/alert/error-outline';
import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';

import MenuItem from 'material-ui/MenuItem';
// 3rd party
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';
import { required, maxLength150, maxLength4, number, maxLength20, maxLength12, maxLength100 } from '../../../../util/validation';
import { initialData, memberTypes } from '../../../../util/data/index';

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
        const { patientInfo } = props;
        this.state = {
            disregardMemberType : patientInfo.memberTypeCode == memberTypes.employedPrivate || patientInfo.memberTypeCode == memberTypes.employerGovernment ? false : true ,
        
            employerName : patientInfo.memberEmployerName ? patientInfo.memberEmployerName : '',
            employerPen : patientInfo.memberPEN ? patientInfo.memberPEN : ''         
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

    render() {
        const { patientMemberPinRequest, employerInfo, patientInfo, validateEmployeeRequestPending } = this.props;
        return (
            <StyleRoot style={styles.container}>                
                <h1 style={styles.title}>Member Info</h1>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Field
                        hintText="Member "
                        floatingLabelText="Member Pin"                        
                        disabled={true}                                                          
                        style={styles.textFieldCont.textField}
                        name="memberpin"
                        inputStyle={styles.textFieldCont.inputFieldStyle}                        
                        component={TextField}
                    />
                    <Field
                        name="membertypecode"
                        floatingLabelText="Member Type"
                        component={CustomSelectField}
                        validate={required}
                        style={styles.textFieldCont.textField}
                        disabled={patientMemberPinRequest}
                        >
                        { initialData.memberTypes.map((t, i) => (<MenuItem key={i} value={t.code} primaryText={`${t.code} - ${t.value}`} onTouchTap={this.changeMemberType.bind(this, t.code)} />)) }
                    </Field>
                </div>
                <div style={{display: 'flex'}}>
                    <Field
                        hintText="Mailing Address"
                        floatingLabelText="Mailing Address"
                        style={styles.textFieldCont.mailingAddress}
                        component={TextField} 
                        name="membermailingaddress"
                        validate={[required, maxLength150]}
                        disabled={patientMemberPinRequest}
                    />
                    <Field
                        hintText="Zip Code "
                        floatingLabelText="Zip Code "
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="zipcode"
                        validate={[required, maxLength4, number]}
                        disabled={patientMemberPinRequest}
                    />
                </div>
                <div style={{display: 'flex'}}>
                    <Field
                        hintText="Landline"
                        floatingLabelText="Landline"
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="memberlandlinenumber"
                        validate={[required, maxLength20]}
                        disabled={patientMemberPinRequest}
                    />
                    <Field
                        hintText="Mobile"
                        floatingLabelText="Mobile"
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="membermobilenumber"
                        validate={[required, maxLength20]}
                        disabled={patientMemberPinRequest}
                    />
                    <Field
                        hintText="Email"
                        floatingLabelText="Email"
                        style={styles.textFieldCont.textField}
                        component={TextField} 
                        name="memberemail"
                        validate={[required,maxLength150]}
                        disabled={patientMemberPinRequest}
                    />
                </div>
                { this.state.disregardMemberType ? 
                    null :
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Field
                            hintText="PhilHealth Employer Number"
                            floatingLabelText="PhilHealth Employer Number"
                            style={styles.textFieldCont.textField}
                            component={TextField} 
                            name="memberPEN"
                            ref="memberpen"
                            withRef={true}
                            validate={[required, maxLength12, number]}
                            disabled={patientMemberPinRequest}
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
                            validate={[required, maxLength100]}
                            disabled={patientMemberPinRequest}
                            onBlur={this.searchEmployerName.bind(this)}
                        />

                        { employerInfo ? validateEmployeeRequestPending ? 
                            <LoadingIndicatorPerAction text="Validating..." style={styles.loadingIndicatorStyle}/>
                        :
                        <div>
                            { employerInfo.employer != null? 
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
                        </div>
                        : null }
                    </div>                        
         
                }
            </StyleRoot>
        );
    }

}
export default ClaimsMemberMemberInfo;