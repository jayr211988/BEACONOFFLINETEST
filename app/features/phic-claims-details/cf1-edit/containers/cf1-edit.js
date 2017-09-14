
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import moment from 'moment';
import Radium, {StyleRoot} from 'radium';
import { initialData, memberTypes } from '../../../../util/data/index';


import Cf1EditWrapper from '../components/wrapper';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';


@connect (
    state => state.phicClaimsDetailsCf1EditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)

@Radium
class Cf1EditContainer extends React.Component {

    constructor (props) {
        super(props);
    }

    componentWillMount() {
        const {actions: {getCF1ById}, params} = this.props;
        
        getCF1ById(params.claimId);
    }

    getMemberTypeValue(memberTypeCode) {
        let memberTypeValue;
        initialData.memberTypes.some(t => {
            if (t.code == memberTypeCode) {
                memberTypeValue = t.value;
            }
        });
        return memberTypeValue;
    }

    getPatientIsValue(patientIsCode) {
        let patientIsValue;
        initialData.patientIs.some(t => {
            if (t.code == patientIsCode) {
                patientIsValue = t.value;
            }
        });
        return patientIsValue;
    }
    
    onSave(formValues) {
        // patientInformation.birthday = moment(patientInformation.birthday).format('MM-DD-YYYY');

        const {patientMemberPin, patientInfo, params,employerInfo, actions: {validateMemberEligibility, getMemberPIN}, selectedTransmittal} = this.props;
       
        
        let dto = {
            memberLastname: formValues.memberlastname,
            memberFirstname: formValues.memberfirstname,
            memberMiddlename: formValues.membermiddlename,            
            memberSuffix: formValues.membersuffix,
            memberBirthday: moment(formValues.memberbirthday).toDate(),
            admissionDate: moment(formValues.admissionDate).toDate(),
            dischargeDate: moment(formValues.dischargeDate).toDate(),  
            phicIdentity: {
                hospitalCode: selectedTransmittal.hospitalCode
            },
            patientIsCode: patientInfo.patientIsCode,
            patientIsValue: this.getPatientIsValue(formValues.patientIsCode),
            memberTypeValue: this.getMemberTypeValue(formValues.membertypecode),
        };

        if(formValues.membertypecode == memberTypes.employedPrivate 
        || formValues.membertypecode == memberTypes.employerGovernment) {

            dto['validEmployer'] =  employerInfo.employer != null ? true : false;
        }
        else {
            formValues['memberPEN'] = null,
            formValues['memberemployername'] = null;
        }

        if (patientInfo.patientIsCode == 'M') {
            dto = {
                ...dto,
                memberLastname: formValues.patientlastname,
                memberFirstname: formValues.patientfirstname,
                memberMiddlename: formValues.patientmiddlename,
                memberSuffix: formValues.patientsuffix,
                memberBirthday: moment(formValues.patientbirthday).toDate(),
                patientIsCode: 'M',
                patientIsValue: 'Member',
            };
        }

        getMemberPIN(dto, params.transmittalId, patientInfo.id, formValues);
    }



    onSetDefaultValues() {
     
        const { patientInfo } = this.props;
     
        return {
            initialValues: {
                dependantpin: patientInfo.patientPin,
                patientlastname: patientInfo.patientLastname,
                patientfirstname: patientInfo.patientFirstname,
                patientmiddlename: patientInfo.patientMiddlename,
                patientsuffix: patientInfo.patientSuffix,
                patientbirthday: moment.utc(patientInfo.patientBirthday).toDate(),
                patientgender: patientInfo.patientGender,
                memberpin: patientInfo.memberPin,
                membertypecode: patientInfo.memberTypeCode,
                membermailingaddress: patientInfo.memberMailingAddress,
                zipcode: patientInfo.memberZipCode,
                memberlandlinenumber: patientInfo.memberLandLineNumber,
                membermobilenumber: patientInfo.memberMobileNumber,
                memberemail: patientInfo.memberEmail,
                memberPEN: patientInfo.memberPEN,
                memberemployername: patientInfo.memberEmployerName,
                patientIsCode: patientInfo.patientIsCode,
                patientisdependant: patientInfo.patientIsCode,
                memberlastname: patientInfo.memberLastname,
                memberfirstname: patientInfo.memberFirstname,
                membermiddlename: patientInfo.memberMiddlename,
                membersufix: patientInfo.memberSuffix,
                memberbirthday: moment.utc(patientInfo.memberBirthday).toDate(),
                membergender: patientInfo.memberGender,
                dischargedate: moment.utc(patientInfo.dischargeDate).toDate(),
                admissiondate: moment.utc(patientInfo.admissionDate).toDate(),
                patientis: 'Member'
            }
        };
    }

    render() {
        
        const {claimType, patientMemberPin, patientMemberPinRequest, patientInfo, getCF1ByIdRequestPending, params, selectedTransmittal, employerInfo,validateEmployeeRequestPending,
        actions: {getEmployerName} } = this.props;


        return (
            <StyleRoot>
                { getCF1ByIdRequestPending
                    ? <LoadingIndicatorPerContainer />
                    :
                        <Cf1EditWrapper 
                            onSubmit={this.onSave.bind(this)}
                            {...this.onSetDefaultValues()}
                            claimType={claimType}                            
                            patientInfo={patientInfo}
                            patientMemberPin={patientMemberPin}
                            patientMemberPinRequest={patientMemberPinRequest}
                            patientIs={patientInfo.patientIs}
                            params={params}
                            selectedTransmittal={selectedTransmittal}
                            getEmployerName={getEmployerName}
                            employerInfo={employerInfo}
                            validateEmployeeRequestPending={validateEmployeeRequestPending}
                        />
                }
            </StyleRoot>
        );
    }
}

export default Cf1EditContainer;
