
import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, FieldArray } from 'redux-form';

import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

import moment from 'moment';

// smart components
import Cf2DischargeDiagnosisListContainer from '../../cf2-discharge-diagnosis/list/containers/list';
import Cf2DoctorsListContainer from '../../cf2-doctors/list/containers/list';
import Cf2SurgicalProcedureListContainer from '../../cf2-surgical-procedure/list/containers/list';
import AllCaseRateListContainer from '../../cf2-all-case-rates/list/containers/list';
import AccessPatientRecords from '../../cf2-access-patient-records/access-patient-records';

import { phicPackage, claimType } from '../../../../util/data';

// packages
import MaternityPackage from '../../cf2-packages/maternity';
import NewBornCarePackage from '../../cf2-packages/newborn-care';
import HivAidsTreatmentPackage from '../../cf2-packages/hiv-aids-treatment';
import AnimalBitePackage from '../../cf2-packages/animal-bite';
import TbDotsPackage from '../../cf2-packages/tb-dots';
import CataractPackage from '../../cf2-packages/cataract';

const styles = {
    container: {
        padding: '24px',
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        position: 'relative'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 600,      
        fontSize: '20px',
        marginLeft: '12px'
    },  
    table : {
        title: {
            color: colorPalette.primaryColor,
            fontSize: '14px',
            width: '250px',
            padding: '5px 10px',
            fontWeight: 600
        },
        titleAnother: {
            color: colorPalette.primaryColor,
            fontSize: '14px',
            width: '250px',
            padding: '20px 10px 5px 10px',
            fontWeight: 600
        },

        option: {
            fontSize: '12px',                        
            padding: '5px 10px',
            width: '250px',

        },
        value: {
            fontSize: '14px',                        
            padding: '5px 20px'
        },
        valueAnother: {
            fontSize: '14px',                        
            padding: '20px 5px 5px 5px'
        }
    },

    tableTitle: {
        color: colorPalette.primaryColor,
        fontSize: '16px',
        textAlign: 'left',
        width: '200px',
        padding: '10px',
        margin: '20px 0 0 0'
    },

    buttonContainer: {
        width: '200px',
        position: 'absolute',
        margin: '40px',
        top: 0,
        right: 0
    }
};


// *** Packages
const packages = {
    Regular : 0,
    Maternity : 1,
    AnimalBite : 2,
    NewbornCare : 3,
    TbDots : 4,
    Cataract : 5,
    // HivAidsTreatment : 6 hide for now
};

@reduxForm({
    form: 'phicClaimsDetailsCf2SummaryForm'
})
@Radium
class Cf2Summary extends React.Component {


    /**
     * Display Packages
     * 
     * @returns 
     * 
     * @memberOf Cf2Summary
     */
    onDisplayPackages() {
        const { patientCF2Info, selectedClaim } = this.props;        

        switch (selectedClaim.phicPackage) {
        case phicPackage.maternity:
            return (<MaternityPackage summaryMode={true} />);

        case phicPackage.newbornCare:
            return (<NewBornCarePackage selectedCf2={patientCF2Info} summaryMode={true} />);

        case phicPackage.animalBite:
            return (<AnimalBitePackage summaryMode={true} />);

        case phicPackage.cataract:
            return (<CataractPackage summaryMode={true} />);

        case phicPackage.tbDots:
            return (<TbDotsPackage summaryMode={true} />);

        case phicPackage.hivaidsTreatment:
            return (<HivAidsTreatmentPackage summaryMode={true} />);

        default: return null;
        }
    }

    render() {
        const { 
            selectedClaim,
            patientCF2Info,
            editPhicClaimDetailCf2RequestPending,
            selectedTransmittal,
            phicAllCaseRates,
            initialValues
                } = this.props;

        return (
            <StyleRoot style={[styles.container, animation.fadeIn]}>
                <h1 style={styles.title}> CF2 - Eligibility Information</h1>
                <table style={{width: '70%'}}>
                    <tbody>
                        <tr>
                            <td style={styles.table.title}>Claim Type</td>
                            <td style={styles.table.value}>{patientCF2Info.claimTypeDescription}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.titleAnother}>Confinement Information</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Patient Type</td>
                            <td style={styles.table.value}>{patientCF2Info.patientTypeValue}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Is Patient Referred</td>
                            <td style={styles.table.value}>{patientCF2Info.isPatientReferred === 'Y' ? 'Yes' : 'No'}</td>                            
                                
                            <td style={styles.table.option}>
                                { patientCF2Info.isPatientReferred === 'Y' ? 
                                    'Referred Facility Accreditation Code' 
                                : null }
                                </td>
                            <td style={styles.table.value}>
                                { patientCF2Info.isPatientReferred === 'Y' ? 
                                    patientCF2Info.referrredFacilityAccreditationCode
                                : null }
                            </td>                                                                                     
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Accommodation Type</td>
                            <td style={styles.table.value}>{patientCF2Info.accomodationTypeValue}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Admission Date and Time</td>
                            <td style={[styles.table.value, { width: '280px' }]} >{moment(moment.utc(patientCF2Info.admissionDateTime).toDate()).format('MMMM DD YYYY, h:mm a')}</td>
                        </tr>

                        <tr>
                            <td style={styles.table.option}>Discharge Date and Time</td>
                            <td style={[styles.table.value, { width: '280px' }]} >{moment(moment.utc(patientCF2Info.dischargeDateTime).toDate()).format('MMMM DD YYYY, h:mm a')}</td>
                        </tr>
                        
                        <tr>
                            <td style={styles.table.option}>Patient Disposition</td>
                            <td style={styles.table.value}>{`${patientCF2Info.patientDispositionCode} - ${patientCF2Info.patientDispositionValue}`}</td>
                        </tr>

                        { patientCF2Info.patientDispositionCode === 'E' ?                        
                            <tr>
                                <td style={styles.table.option}>Expired Date and Time</td>
                                <td style={styles.table.value}>{patientCF2Info.expiredDateTime}</td>
                            </tr>
                            
                            : null
                        }
                        { patientCF2Info.patientDispositionCode === 'T' ?                        
                            <tr>
                                <td style={styles.table.option}>Referral Reasons</td>
                                <td style={styles.table.value}>{patientCF2Info.referralReason}</td>                                
                            </tr>
                            : null
                        }
                        { patientCF2Info.patientDispositionCode === 'T' ?                        
                            <tr>
                                <td style={styles.table.option}>Referral Facility Accrediation Code</td>
                                <td style={styles.table.value}>{patientCF2Info.referralFacilityAccreditationCode}</td>
                            </tr>
                            : null 
                        }
                        
                        <tr>
                            <td style={styles.table.option}>Admission Diagnosis</td>
                            <td style={styles.table.value}>{patientCF2Info.admissionDiagnosis}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.titleAnother}>Does Patient Have Enough Benefits</td>
                            <td style={styles.table.valueAnother}>{patientCF2Info.doesPatientHasEnoughBenefits === 'Y' ? 'Yes' : 'No'}</td>
                        </tr>

                        { patientCF2Info.doesPatientHasEnoughBenefits === 'Y' ?
                        <tr>
                            <td style={styles.table.option}>Total Hospital Fees</td>
                            <td style={styles.table.value}> {patientCF2Info.totalHospitalFees}</td>
                        </tr> 
                        :  null }

                        { patientCF2Info.doesPatientHasEnoughBenefits === 'Y' ?
                        <tr>
                            <td style={styles.table.option}>Total Professional Fees</td>
                            <td style={styles.table.value}> {patientCF2Info.totalProfessionalFees}</td>
                        </tr> 
                        :  null }

                        { patientCF2Info.doesPatientHasEnoughBenefits === 'Y' ?
                        <tr>
                            <td style={styles.table.option}>Grand Total</td>
                            <td style={styles.table.value}> {patientCF2Info.grandTotal}</td>
                        </tr> 
                        : null }
                    </tbody>
                </table>

                { patientCF2Info.doesPatientHasEnoughBenefits === 'Y' ? null : 
                     <table style={{width: '65%'}}>
                    <tbody>
                        <tr>
                            <td style={styles.table.titleAnother}>Hospital Fees</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Actual Charges</td>
                            <td style={styles.table.value}> {patientCF2Info.hospitalFeesActualCharges} </td>
                            <td style={styles.table.option}>Did Patient Pay</td>
                            <td style={styles.table.value}>{patientCF2Info.hospitalFeesDidPatientPay === 'Y'? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Amount after Discount</td>
                            <td style={styles.table.value}> {patientCF2Info.hospitalFeesAmountAfterDiscount}</td>
                            <td style={styles.table.option}>Patient has HMO</td>
                            <td style={styles.table.value}>{patientCF2Info.hospitalFeesPatientHasHMO === 'Y' ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>PhilHealth Benefits</td>
                            <td style={styles.table.value}> {patientCF2Info.hospitalFeesPhilHealthBenefit}</td>
                            <td style={styles.table.option}>Patient has other deductions</td>
                            <td style={styles.table.value}>{patientCF2Info.hospitalFeesPatientHasOtherDeductions === 'Y' ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Excess Amount</td>
                            <td style={styles.table.value}> {patientCF2Info.hospitalFeesExcessAmount}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.titleAnother}>Professional Fees</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Actual Charges</td>
                            <td style={styles.table.value}> {patientCF2Info.professionalFeesActualCharges}</td>
                            <td style={styles.table.option}>Did Patient Pay</td>
                            <td style={styles.table.value}>{patientCF2Info.professionalFeesDidPatientPay === 'Y' ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Amount after Discount</td>
                            <td style={styles.table.value}> {patientCF2Info.professionalFeesAmountAfterDiscount}</td>
                            <td style={styles.table.option}>Patient has HMO</td>
                            <td style={styles.table.value}>{patientCF2Info.professionalFeesPatientHasHMO === 'Y' ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>PhilHealth Benefits</td>
                            <td style={styles.table.value}> {patientCF2Info.professionalFeesPhilHealthBenefit}</td>
                            <td style={styles.table.option}>Patient has other deductions</td>
                            <td style={styles.table.value}>{patientCF2Info.professionalFeesPatientHasOtherDeductions === 'Y' ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>Excess Amount</td>
                            <td style={styles.table.value}> {patientCF2Info.professionalFeesExcessAmount}</td>
                        </tr>
                        <tr>
                            <td style={styles.table.titleAnother}>Purchase Fees</td>
                        </tr>
                        <tr>
                            <td style={styles.table.option}>With Drugs / Medicines / Supplies</td>
                            <td style={styles.table.value}>{patientCF2Info.purchasesWithDrugsMedSupplies === 'Y'? 'Yes' : 'No'}</td>
                            <td style={styles.table.option}>Amount</td>
                            <td style={styles.table.value}> {patientCF2Info.purchasesWithDrugsMedSuppliesAmount}</td>                            
                        </tr>
                        <tr>
                            <td style={styles.table.option}>With Examination</td>
                            <td style={styles.table.value}>{patientCF2Info.purchasesWithExaminations === 'Y' ? 'Yes' : 'No'}</td>       
                            <td style={styles.table.option}>Amount</td>
                            <td style={styles.table.value}> {patientCF2Info.purchasesWithExaminationsAmount}</td>                       
                        </tr>
                    </tbody>
                </table> }

                { /** DISCHARGE DIAGNOSIS */}
                <Cf2DischargeDiagnosisListContainer
                    selectedClaim={selectedClaim}
                    editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                    phicAllCaseRates={phicAllCaseRates}
                    selectedTransmittal={selectedTransmittal}
                    isClaimTypeAllCaseRate={patientCF2Info.claimType == 0}
                    summaryMode={true}
                />

                { /** SURGICAL PROCEDURE */}
                <FieldArray 
                    name="surgicalProcedures"
                    initialValues={initialValues}
                    component={Cf2SurgicalProcedureListContainer}
                    selectedClaim={selectedClaim}
                    editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                    phicAllCaseRates={phicAllCaseRates}
                    selectedTransmittal={selectedTransmittal}
                    isClaimTypeAllCaseRate={patientCF2Info.claimType == claimType.allCaseRate}      
                    summaryMode={true}               
                />

                {/*CF2 DOCTORS*/}
                <Cf2DoctorsListContainer
                    selectedClaim={selectedClaim}
                    editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                    selectedTransmittal={selectedTransmittal}
                    summaryMode={true}
                />     

                { /** PACKGES */ }
                { this.onDisplayPackages() }   

                { /** ALL CASE RATE */ }
                <AllCaseRateListContainer
                    phicAllCaseRates={phicAllCaseRates}
                    selectedClaim={selectedClaim} 
                    summaryMode={true}
                />       

                <AccessPatientRecords 
                    selectedCf2={patientCF2Info}
                    summaryMode={true}
                />               
            </StyleRoot>
        );
    }
}

// *** props
Cf2Summary.propTypes = {
    summaryMode: PropTypes.bool
};

export default Cf2Summary;
