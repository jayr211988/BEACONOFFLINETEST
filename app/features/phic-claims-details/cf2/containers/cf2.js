import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import moment from 'moment';

import { initialData , phicPackage, fakePropsData } from '../../../../util/data';

// *** dumb components
import Cf2 from '../components/wrapper';
import LoadingScreenPerContainer from '../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

/**
 * C2f Container
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsCf2Reducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2Container extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf Cf2Container
     */
    componentWillMount() {        
        const { 
            selectedClaim,
            params,            
            
            actions: { 
                // *** Actions
                getSelectedPhicClaimDetailCf2
            }} = this.props;        
        
        getSelectedPhicClaimDetailCf2(params.claimId);
    }
    
    /**
     * Set Default Values
     * 
     * 
     * @memberOf Cf2Container
     */
    onSetDefaultValues() {
        const { selectedCf2 } = this.props;           
        
        // selectedCf2['admissionDate'] = this.onConvertToLocal('admissionDateTime');
        // selectedCf2['admissionTime'] = this.onConvertToLocal('admissionDateTime');
        // selectedCf2['dischargeDate'] = this.onConvertToLocal('dischargeDateTime');
        // selectedCf2['dischargeTime'] = this.onConvertToLocal('dischargeDateTime');
        // selectedCf2['expiredDate'] = this.onConvertToLocal('expiredDateTime');
        // selectedCf2['expiredTime'] = this.onConvertToLocal('expiredDateTime');
        // selectedCf2['aprDate'] = this.onConvertToLocal('aprDate');
        // selectedCf2['animalBiteDay0ARV'] = this.onConvertToLocal('animalBiteDay0ARV');
        // selectedCf2['animalBiteDay7ARV'] = this.onConvertToLocal('animalBiteDay7ARV');
        // selectedCf2['animalBiteDay3ARV'] = this.onConvertToLocal('animalBiteDay3ARV');
        // selectedCf2['animalBiteRIG'] = this.onConvertToLocal('animalBiteRIG');
        // selectedCf2['animalBiteOthers'] = this.onConvertToLocal('animalBiteOthers');
        // selectedCf2['mcP1stCheckupDate'] = this.onConvertToLocal('mcP1stCheckupDate');
        // selectedCf2['mcP2ndCheckupDate'] = this.onConvertToLocal('mcP2ndCheckupDate'); 
        // selectedCf2['mcP3rdCheckupDate'] = this.onConvertToLocal('mcP3rdCheckupDate'); 
        // selectedCf2['mcP4thCheckupDate'] = this.onConvertToLocal('mcP4thCheckupDate');
        // selectedCf2.aprConsentTypeCode = selectedCf2.aprConsentTypeCode ? selectedCf2.aprConsentTypeCode : '1';            

        // switch(selectedCf2.claimType) {
        // case 1:
        //     selectedCf2.claimType = '1'; 
        //     break;
        // case 0:
        //     selectedCf2.claimType = '0';
        //     break;
        // }          
        
        // return {
        //     initialValues : selectedCf2
        // };     
    }

    /**
     * Convert to Local
     * 
     * @param {any} name
     * @returns
     * 
     * @memberOf Cf2Container
     */
    onConvertToLocal(name) {
        const { selectedCf2 } = this.props;
        const property = selectedCf2[name];

        if(property)
            return moment.utc(property).toDate();
    }
        
    /**
     * Get Value on Array
     * 
     * @param {any} arr
     * @param {any} val
     * @returns
     * 
     * @memberOf Cf2Container
     */
    onGetValue(arr, val) {
        if(val) return arr.filter(t => t.code == val)[0].value;
    }


    onGetClaimTypeDescription(val) {
        if (val === '1') {
            return 'All Case Rate';
        } else {
            return 'Z - Benefits';
        }
    }
    // onGetPatientTypeValue(code) {
    //     switch(code) {
    //     case 'I' :
    //         return 'InPatient';                
    //     case 'O' :
    //         return 'OutPatient';                
    //     case 'E' :
    //         return 'Emergency';
    //     }        
    // }

    /**
     * Concat Date and Time
     * 
     * @param {any} date
     * @param {any} time
     * 
     * @memberOf Cf2Container
     */
    onConcatDateAndTime(date, time) {
        if(date && time) {

            if(typeof time !== 'string')
                time = moment(time).format('hh:mm A');

            if(typeof date !== 'string')
                date = moment(date).format('YYYY-MM-DD');

            return moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm:ss A').toDate();
        }
    }
    
    /**
     * Edit CF2
     * 
     * @param {any} value
     * 
     * @memberOf Cf2Container
     */
    onEdit(value) {   
        console.log(value); 
        const { 
            selectedClaim, 
            params,
            phicAllCaseRates,
            //selectedZBenefit,
            actions: { editPhicClaimDetailCf2 }} = this.props;  
            
        let fakeId = 1;
        
        let jsonse = JSON.stringify(value);
        let element = document.createElement("a");
        let file = new Blob([jsonse], {type: "application/json"});
        //let fileName = new File([file], "" + fakeId + ".json")
        
        element.href = URL.createObjectURL(file);
        element.download = fakeId+"-transmittal.json";
        element.click();     
        // const selectedphicPackage  = this.props.selectedClaim.phicPackage;

        // value['id'] = selectedClaim.id;        
        // value['claimTypeDescription'] = this.onGetClaimTypeDescription(value.claimtype);

        // value['accomodationTypeValue'] = 
        //     this.onGetValue(initialData.accomodationType, value.accomodationTypeCode);

        // value['patientDispositionValue'] = 
        //     this.onGetValue(initialData.patientDisposition, value.patientDispositionCode);
        
        // value['admissionDateTime'] = 
        //     this.onConcatDateAndTime(value.admissionDate, value.admissionTime);

        // value['dischargeDateTime'] = 
        //     this.onConcatDateAndTime(value.dischargeDate, value.dischargeTime);

        // value['expiredDateTime'] = 
        //     this.onConcatDateAndTime(value.expiredDate, value.expiredTime);

        // this.onGetPatientTypeValue(value.patientTypeCode);

        // value['patientTypeValue'] = 
        //     this.onGetValue(initialData.patientType, value.patientTypeCode);

        // value['aprConsentTypeValue'] = 
        //     this.onGetValue(initialData.consentType , value.aprConsentTypeCode);    

        // value['aprRelationToPatientValue'] =
        //     this.onGetValue(initialData.relationshipToPatient , value.aprRelationToPatientCode);

        // value['aprReasonForSigningValue'] =
        //     this.onGetValue(initialData.reasonForSigning , value.aprReasonForSigningCode);

        // value['aprThumbmarkedByValue'] =
        //     this.onGetValue(initialData.thumbMark , value.aprThumbmarkedByCode);


        // if (selectedphicPackage == phicPackage.newbornCare) {
        //     if (value.newBornEssentialCare || value.newBornHearingTest || value.newBornScreeningTest )  {
        //         editPhicClaimDetailCf2(value, params.transmittalId, params.claimId, phicAllCaseRates);
        //     } else {
        //         return;
        //     }
        // } else {
        //     editPhicClaimDetailCf2(value, params.transmittalId, params.claimId);
        // }
                
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const { 
            selectedClaim,
            getSelectedPhicClaimDetailCf2RequestPending,
            editPhicClaimDetailCf2RequestPending,
            selectedCf2,
            listOfZBenefits,            
            selectedTransmittal,
            //selectedZBenefit,
            phicAllCaseRates,            
            actions: {addToStateZBenefit, checkSelectedCheckboxOnZBenefit, updateSelectedZBenefit, 
            newbornCare, hearingTest, screeningTest }
        } = this.props;      
        console.log(this.props);
        console.log(window.location.host);
        console.log(window.location);
        return (
            <StyleRoot>
                { /** LOADING INDICATOR */ }
                { false ? 
                    <LoadingScreenPerContainer />
                : 
                    <Cf2 
                        { ...this.onSetDefaultValues() }
                        onSubmit={this.onEdit.bind(this)} 
                        selectedClaim={fakePropsData.selectedClaim} 
                        editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                        selectedCf2={fakePropsData.selectedCf2}
                        listOfZBenefits={fakePropsData.listOfZBenefits}
                        addToStateZBenefit={addToStateZBenefit}                                             
                        selectedTransmittal={fakePropsData.selectedTransmittal}
                        checkSelectedCheckboxOnZBenefit={checkSelectedCheckboxOnZBenefit}                                                
                        //selectedZBenefit={selectedZBenefit}
                        updateSelectedZBenefit={updateSelectedZBenefit}
                        phicAllCaseRates={fakePropsData.phicAllCaseRates}
                        location={location}
                        newbornCare={newbornCare}
                        hearingTest={hearingTest}
                        screeningTest={screeningTest}
                    />
                }
            </StyleRoot>
        );
    }
}

export default Cf2Container;
