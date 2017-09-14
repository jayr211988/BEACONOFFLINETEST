
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import moment from 'moment';
import Radium, {StyleRoot} from 'radium';

import { initialData, memberTypes } from '../../../../util/data';


import Cf1Wrapper from '../components/wrapper';


@connect (
    state => state.phicClaimsDetailsCf1Reducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)



@Radium
class Cf1NewContainer extends React.Component {

    constructor (props) {
        super(props);        
    }

    // componentWillMount() {
    //     const {actions: {checkForClaims}} = this.props;        
    //     checkForClaims();        
    // }


 

    checkPatientIsValue(code){
        let patientisvalue = '';             
        initialData.patientIs.some((val) => {
            if (val.code === code) {                
                patientisvalue = val.value;
            }
        });         
        return patientisvalue;
    }

    checkIfMemberType(code) {
        let memberTypeValue = '';
        initialData.memberTypes.some((val) => {
            if(val.code === code) {
                memberTypeValue = val.value;
            }
        });
        return memberTypeValue;
    }


    
    
    onSave(patientInformation) {   

        const { selectedTransmittal, employerInfo } = this.props;    

        !patientInformation.membermiddlename ? patientInformation.membermiddlename = 'N/A' : patientInformation.membermiddlename;

        patientInformation.memberbirthday = moment(patientInformation.memberbirthday).toDate();
        patientInformation.patientbirthday = moment(patientInformation.patientbirthday).toDate();
        patientInformation.admissiondate = moment(patientInformation.admissiondate).toDate();
        patientInformation.dischargedate = moment(patientInformation.dischargedate).toDate();
        patientInformation.phicIdentity = { 'hospitalCode' : selectedTransmittal.hospitalCode };

        const {params, actions: { getMemberPIN}} = this.props;  
             
        if(patientInformation.membertypecode == memberTypes.employedPrivate 
        || patientInformation.membertypecode == memberTypes.employerGovernment) {

            patientInformation['validEmployer'] =  employerInfo.employer != null ? true : false;
        }

        if (params.cf1mode === 'new-claim-dependent') {                        
            patientInformation.patientisvalue = this.checkPatientIsValue(patientInformation.patientiscode);                        
            patientInformation.membertypevalue = this.checkIfMemberType(patientInformation.membertypecode);     
            patientInformation.memberfullname = `${patientInformation.memberfirstname} ${!patientInformation.membermiddlename ? 'N/A' : patientInformation.membermiddlename} ${patientInformation.memberlastname}`;                               
            !patientInformation.patientmiddlename ? patientInformation.patientmiddlename = 'N/A' : patientInformation.patientmiddlename;
        } else {
            
            patientInformation.patientiscode = 'M';
            patientInformation.patientisvalue = 'Member';        
            patientInformation.memberfullname = `${patientInformation.memberfirstname} ${!patientInformation.membermiddlename ? 'N/A' : patientInformation.membermiddlename} ${patientInformation.memberlastname}`;                    
            patientInformation.membertypevalue = this.checkIfMemberType(patientInformation.membertypecode);            
            patientInformation.patientbirthday = patientInformation.memberbirthday;
            patientInformation.patientlastname = patientInformation.memberlastname;
            patientInformation.patientfirstname = patientInformation.memberfirstname;
            patientInformation.patientmiddlename = !patientInformation.membermiddlename ? 'N/A' : patientInformation.membermiddlename;
            patientInformation.patientsuffix = patientInformation.patientsuffix ? patientInformation.patientsuffix : '' ;        
            patientInformation.membersuffix = patientInformation.membersuffix ? patientInformation.membersuffix : '' ;        
            patientInformation.patientgender = patientInformation.membergender;         
        }    
               
        getMemberPIN(patientInformation, params.transmittalId, params.cf1mode);        
    }    

    onSetDefaultValues() {
        return {
            initialValues: {
                patientis: 'M - Member' // hardcoded value for display

            }
        };                            
    }

    render() {
        
        const { patientMemberPin, patientMemberPinRequest, patientInfo, params, selectedTransmittal, employerInfo,validateEmployeeRequestPending,
        actions: {getEmployerName ,checkForEmployer }} = this.props;
    
        return (
            <StyleRoot>
                <Cf1Wrapper 
                    onSubmit={this.onSave.bind(this)}
                    {...this.onSetDefaultValues()}                                             
                    patientInfo={patientInfo}
                    patientMemberPin={patientMemberPin}
                    patientMemberPinRequest={patientMemberPinRequest}
                    params={params}
                    selectedTransmittal={selectedTransmittal}
                    getEmployerName={getEmployerName}
                    checkForEmployer={checkForEmployer}
                    employerInfo={employerInfo}
                    validateEmployeeRequestPending={validateEmployeeRequestPending}
                />
            </StyleRoot>
        );
    }
}

export default Cf1NewContainer;
