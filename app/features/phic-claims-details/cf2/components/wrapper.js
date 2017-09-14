import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { browserHistory } from 'react-router';

// *** material-ui components
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

// *** redux-form components
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import CustomSelectField from '../../../../shared-components/custom-material-ui/selectfield';
import CustomDatePicker from '../../../../shared-components/custom-material-ui/datepicker';
import CustomTimePicker from '../../../../shared-components/custom-material-ui/timepicker';

// *** dumb components
import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';
import ZBenefitsDialog from './zbenefits-dialog';
import CataractPackage from '../../cf2-packages/cataract';

// *** smart components
import Cf2DischargeDiagnosisListContainer from '../../cf2-discharge-diagnosis/list/containers/list';
import Cf2DoctorsListContainer from '../../cf2-doctors/list/containers/list';
import Cf2SurgicalProcedureListContainer from '../../cf2-surgical-procedure/list/containers/list';
import AllCaseRateListContainer from '../../cf2-all-case-rates/list/containers/list';
import Cf1NewContainer from '../../cf1-new/containers/cf1'

// packages
import MaternityPackage from '../../cf2-packages/maternity';
import NewBornCarePackage from '../../cf2-packages/newborn-care';
import HivAidsTreatmentPackage from '../../cf2-packages/hiv-aids-treatment';
import AnimalBitePackage from '../../cf2-packages/animal-bite';
import TbDotsPackage from '../../cf2-packages/tb-dots';

//access patient records
import AccessPatientRecords from '../../cf2-access-patient-records/access-patient-records';

// *** validation
import { required, number, minValue0, maxLength150, maxLength12, maxLength500, amountWithDecimal, validDate, validTime } from '../../../../util/validation';

import { claimStatus, transmittalStatus, phicPackage, claimType } from '../../../../util/data';

import CustomRadioButtonGroup from '../../../../shared-components/custom-material-ui/radio-button-group';

// ** others
import { initialData } from '../../../../util/data';
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

const styles = {
    container: {
        padding: '24px',
        backgroundColor: colorPalette.white,
        position: 'relative',
        minHeight: 'calc(100vh - 357px)'
    },

    labelWrapper: {
        paddingTop: '30px'
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 600,
        fontSize: '20px',
        barDivisions: {
            margin: '30px 0px 70px',
            padding: '5px 0',
            background: 'rgb(73, 144, 226)'
        }
    },

    subtitle: {
        color: colorPalette.primaryColor,
        fontSize: '14px',
        width: '286px',
        fontWeight: 600
    },

    textFieldWrapper: {
        display: 'flex',
        alignItems: 'center',
        height: '70px',

        mediumWidth: {
            width: '540px',
            marginRight: '30px'
        },

        defaultWidth: {
            marginRight: '30px',
        },
        extradefaultWidth: {
            marginRight: '30px',
            marginTop: '-25px'
        }
    },

    radioButtonWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',

        radioButtonGroupStyle: {
            display: 'flex',
        },

        radioButtonStyle: { width: '100px' },

        labelStyle: {
            color: colorPalette.primaryTextColor,
            width: '286px'
        },

        textFieldStyle: {
            width: '275px',
            marginTop: '-30px'
        }
    },


    buttonContainer: {
        width: '200px',
        position: 'absolute',
        margin: '40px',
        top: 0,
        right: 0
    },

    doesPatientHasEnoughBenefits: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    hasAttachedSOA: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        display: 'none'
    },
    enoughBenefitsCont: {
        transition: 'max-height 2s',

        hide: {
            maxHeight: '0px'
        },
        show: {
            maxHeight: '1000px'
        }
    },
    thisisReq: {
        fontSize: '12px',
        color: colorPalette.accentColor,
        marginRight: '20px'
    },
    zBenefits: {
        marginTop: '30px',
        displayText: {
            width: '100%'
        }
    },
    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px',
        marginLeft: '30px'
    },
    arrowUp: {
        position: 'fixed',
        zIndex: '10',
        bottom: '20px',
        right: '40px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        transition: 'background-color .5s',
        flexDirection: 'column',

        ':hover': {
            backgroundColor: 'rgba(0,0,0,0.08'
        },
        icon: {
            height: '50px',
            width: '50px',
            color: colorPalette.primaryTextColor
        },
    }
};

/**
 * CF2 Component
 * 
 * @class Cf2
 * @extends {React.Component}
 */
@reduxForm({
    form: 'phicClaimsDetailsCf2Form'
})
@Radium
class Cf2 extends React.Component {
    constructor(props) {
        super(props);

        const { selectedCf2 } = props;

        this.state = {
            isPatientReferred: selectedCf2.isPatientReferred == 'Y' ? true : false,

            isReferredFacilityAccreditaionCodeRequired: false,
            isPatientDistributionIsTransferred: selectedCf2.patientDispositionCode === 'T' ? true : null,
            isExpiredDateAndTimeRequired: selectedCf2.patientDispositionCode == 'E' ? true : null,
            attachedSOA: selectedCf2.hasAttachedSOA === 'N' ? true : selectedCf2.hasAttachedSOA === 'Y' ? false : null,
            enoughBenefits:
            selectedCf2.doesPatientHasEnoughBenefits === 'N' ? true : selectedCf2.doesPatientHasEnoughBenefits === 'Y' ? false : null,

            withExamination: selectedCf2.purchasesWithExaminations === 'Y' ? true : null,
            withDrugsMedSupplies: selectedCf2.purchasesWithDrugsMedSupplies === 'Y' ? true : null,

            //requiredClaimType: selectedCf2.claimType ===claimStatus.allCaseRate'1' ? true :  selectedCf2.claimType ===claimStatus.allCaseRate'0' ? false : null,            

            requiredClaimType: false,

            requiredHospitalDidPatientPay:
            selectedCf2.hospitalFeesDidPatientPay === 'N' ||
                selectedCf2.hospitalFeesDidPatientPay === 'Y' ? true : false,
            requiredHospitalPatientHasHMO:
            selectedCf2.hospitalFeesPatientHasHMO === 'N' ||
                selectedCf2.hospitalFeesPatientHasHMO === 'Y' ? true : false,
            requiredHospitalPatientHasOtherDeduct:
            selectedCf2.hospitalFeesPatientHasOtherDeductions === 'N' ||
                selectedCf2.hospitalFeesPatientHasOtherDeductions === 'Y' ? true : false,

            requiredProfDidPatientPay:
            selectedCf2.professionalFeesDidPatientPay === 'Y' ||
                selectedCf2.professionalFeesDidPatientPay === 'N' ? true : false,
            requiredProfPatientHasHMO:
            selectedCf2.professionalFeesPatientHasHMO === 'Y' ||
                selectedCf2.professionalFeesPatientHasHMO === 'N' ? true : false,
            requiredProfPatientHasOtherDeduct:
            selectedCf2.professionalFeesPatientHasOtherDeductions === 'Y' ||
                selectedCf2.professionalFeesPatientHasOtherDeductions === 'N' ? true : false,

            requiredWithDrugs:
            selectedCf2.purchasesWithDrugsMedSupplies === 'N' ||
                selectedCf2.purchasesWithDrugsMedSupplies === 'Y' ? true : false,
            requiredWithExamination:
            selectedCf2.purchasesWithExaminations === 'N' ||
                selectedCf2.purchasesWithExaminations === 'Y' ? true : false,

            openAddZBenefits: false,

            displayMoveToTop: false

        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.location.hash != '' && nextProps.location.hash != '#cf1Navigation') {
            this.setState({
                displayMoveToTop: true
            });
        } else {
            this.setState({
                displayMoveToTop: false
            });
        }

    }

    /**
     *  CHANGE PATIENT DISPOSITION
     * 
     * @param {any} code
     * 
     * @memberOf Cf2
     */
    changePatientDisposition(code) {

        if (code === 'T') {
            this.setState({
                isPatientDistributionIsTransferred: true,
                isExpiredDateAndTimeRequired: false

            });
        } else if (code === 'E') {
            this.setState({
                isExpiredDateAndTimeRequired: true,
                isPatientDistributionIsTransferred: false,
            });
        } else {
            this.setState({
                isPatientDistributionIsTransferred: false,
                isExpiredDateAndTimeRequired: false
            });
        }
    }


    /**
     * Display Menu Items
     * 
     * @param {any} items
     * 
     * @memberOf Cf2
     */
    onDisplayMenuItems(items) {
        return items.map((item, index) => (
            <MenuItem
                key={index}
                value={item.code}
                primaryText={`${item.code} - ${item.value}`} />
        )
        );
    }


    /**
     *  Display Patient Dispotiion in Menu Items
     * 
     * @returns
     * 
     * @memberOf Cf2
     */
    onDisplayPatientDisposition() {
        let patientDispositionVal = [];
        initialData.patientDisposition.map((item, index) => {
            patientDispositionVal.push(
                <MenuItem
                    key={index}
                    value={item.code}
                    primaryText={`${item.code} - ${item.value}`}
                    onTouchTap={this.changePatientDisposition.bind(this, item.code)}
                />
            );
        });
        return patientDispositionVal;
    }


    /**
     *  Displaying Patient Type on Menu Items
     * 
     * @returns
     * 
     * @memberOf Cf2
     */
    onDisplayPatientType() {
        let patientTypeVal = [];
        initialData.patientType.map((item, index) => {
            patientTypeVal.push(
                <MenuItem
                    key={index}
                    value={item.code}
                    primaryText={`${item.code} - ${item.value}`}
                />
            );
        });
        return patientTypeVal;
    }


    /**
     *  Open Add Z Benefits Dialog
     * 
     * 
     * @memberOf Cf2
     */
    onOpenAddZBenefits() {
        const { addToStateZBenefit } = this.props;
        this.setState({
            openAddZBenefits: true
        });

        addToStateZBenefit(initialData.zBenefits);
    }



    /**
     *  Close Add Z Benefits Dialog
     * 
     * 
     * @memberOf Cf2
     */
    onCloseAddZBenefits() {
        this.setState({
            openAddZBenefits: false
        });
    }


    /**
     * 
     * 
     * COMPUTATION FOR PATIENT HAS BENEFITS
     * @memberOf Cf2
     */
    onGrandTotalComputation() {
        const { totalHospitalFeesValue, totalProfessionalFeesValue } = this.refs;

        const hospital = totalProfessionalFeesValue.refs.connected.wrappedInstance.props.value;
        const professional = totalHospitalFeesValue.refs.connected.wrappedInstance.props.value;

        const total = parseFloat(hospital) + parseFloat(professional);

        this.refs.grandTotal.getRenderedComponent().props.input.onChange(total.toFixed(2));
    }

    clearHospitalFees() {
        const { totalHospitalFeesValue } = this.refs;
        if (totalHospitalFeesValue.value == 0) {
            totalHospitalFeesValue.getRenderedComponent().props.input.onChange('');
        }
    }

    clearProfessionalFees() {
        const { totalProfessionalFeesValue } = this.refs;
        if (totalProfessionalFeesValue.value == 0) {
            totalProfessionalFeesValue.getRenderedComponent().props.input.onChange('');
        }
    }

    /**
     * COMPUTATION FOR PATIENT DONT HAVE BENEFITS
     * 
     * HOSPITAL FEES
     * @memberOf Cf2
     */
    onExcessAmountComputationHospital() {
        const { hospitalFeesAmountAfterDiscountValue, hospitalFeesPhilHealthBenefitValue } = this.refs;

        const hospitalfeeAmountDiscount = hospitalFeesAmountAfterDiscountValue.refs.connected.wrappedInstance.props.value;
        const hospitalfeePhilhealth = hospitalFeesPhilHealthBenefitValue.refs.connected.wrappedInstance.props.value;

        const excess = parseFloat(hospitalfeeAmountDiscount) - parseFloat(hospitalfeePhilhealth);
        
        this.refs.hospitalFeesExcessAmount.getRenderedComponent().props.input.onChange(excess.toFixed(2));
    }

    clearHospitalActualCharges() {
        const { hospitalFeesActualChargesValue } = this.refs;
        if (hospitalFeesActualChargesValue.value == 0) {
            hospitalFeesActualChargesValue.getRenderedComponent().props.input.onChange('');
        }
    }

    clearHospitaAmountAfterDiscount() {
        const { hospitalFeesAmountAfterDiscountValue } = this.refs;
        if (hospitalFeesAmountAfterDiscountValue.value == 0) {
            hospitalFeesAmountAfterDiscountValue.getRenderedComponent().props.input.onChange('');
        }
    }

    clearHospitalPhilhealthBenefit() {
        const { hospitalFeesPhilHealthBenefitValue } = this.refs;
        if (hospitalFeesPhilHealthBenefitValue.value == 0) {
            hospitalFeesPhilHealthBenefitValue.getRenderedComponent().props.input.onChange('');
        }
    }

    /**
     * 
     * PROFESSIONAL FEES
     * 
     * @memberOf Cf2
     */
    onExcessAmountComputationProfessional() {
        const { professionalFeesAmountAfterDiscountValue, professionalFeesPhilHealthBenefitValue } = this.refs;

        const hospitalfeeAmountDiscount = professionalFeesAmountAfterDiscountValue.refs.connected.wrappedInstance.props.value;
        const hospitalfeePhilhealth = professionalFeesPhilHealthBenefitValue.refs.connected.wrappedInstance.props.value;

        const excess = parseFloat(hospitalfeeAmountDiscount) - parseFloat(hospitalfeePhilhealth);
        this.refs.professionalFeesExcessAmount.getRenderedComponent().props.input.onChange(excess.toFixed(2));
    }

    clearProfessionalActualCharges() {
        const { professionalFeesActualChargesValue } = this.refs;
        if (professionalFeesActualChargesValue.value == 0) {
            professionalFeesActualChargesValue.getRenderedComponent().props.input.onChange('');
        }
    }

    clearProfessionalAmountAfterDiscount() {
        const { professionalFeesAmountAfterDiscountValue } = this.refs;
        if (professionalFeesAmountAfterDiscountValue.value == 0) {
            professionalFeesAmountAfterDiscountValue.getRenderedComponent().props.input.onChange('');
        }
    }

    clearProfessionalPhilhealthBenefit() {
        const { professionalFeesPhilHealthBenefitValue } = this.refs;
        if (professionalFeesPhilHealthBenefitValue.value == 0) {
            professionalFeesPhilHealthBenefitValue.getRenderedComponent().props.input.onChange('');
        }
    }

    /**
     * Display Packges
     * 
     * 
     * @memberOf Cf2
     */
    onDisplayPackages() {
        const { selectedCf2, phicAllCaseRates, selectedClaim , newbornCare, hearingTest, screeningTest } = this.props;
        switch (selectedClaim.phicPackage) {

        case phicPackage.regular:
            return null;

        case phicPackage.maternity:
            return (<MaternityPackage />);

        case phicPackage.newbornCare:
            return (<NewBornCarePackage selectedCf2={selectedCf2} phicAllCaseRates={phicAllCaseRates}
             newbornCare={newbornCare} hearingTest={hearingTest} screeningTest={screeningTest} />);

        case phicPackage.animalBite:
            return (<AnimalBitePackage />);

        case phicPackage.cataract:
            return (<CataractPackage />);

        case phicPackage.tbDots:
            return (<TbDotsPackage />);

        case phicPackage.hivaidsTreatment:
            return (<HivAidsTreatmentPackage />);

        default: return null;
        }
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2
     */
    render() {

        const { handleSubmit,
            selectedClaim,
            selectedCf2,
            editPhicClaimDetailCf2RequestPending,
            listOfZBenefits,
            selectedTransmittal,
            selectedZBenefit,
            checkSelectedCheckboxOnZBenefit,
            updateSelectedZBenefit,
            phicAllCaseRates,
            initialValues } = this.props;
        return (
            <StyleRoot style={[styles.container, animation.fadeIn]} id={'cf2Save'}>
                
                <form onSubmit={handleSubmit} >
                    
                    <Cf1NewContainer />
                    <div style={styles.title.barDivisions} ></div>

                    <h1 style={styles.title} >CF2 - Claims Info</h1>

                    {selectedClaim.claimStatus !== claimStatus.inProcess ?
                        <div style={styles.buttonContainer}>

                            {editPhicClaimDetailCf2RequestPending ?

                                /** LOADING INDICATOR */
                                <LoadingIndicatorPerAction text="Saving..." />
                                :
                                /** SAVE BUTTON */
                                <div>
                                    <RaisedButton
                                        type="submit"
                                        label="SAVE"
                                        secondary={true}
                                        fullWidth={true}
                                    />

                                    <RaisedButton
                                        label="Navigate to Claims"
                                        onTouchTap={() => { browserHistory.push(`/phic-claims/${1}`); }}
                                        fullWidth={true} />
                                </div>
                            }
                        </div>
                        : null}

                    { /** CLAIM TYPE */}
                    {/**<div style={styles.radioButtonWrapper}>
                        <label style={styles.subtitle}>Claim Type</label>

                       
                        <Field 
                            name="claimTypee"
                            component={RadioButtonGroup} 
                            style={styles.radioButtonWrapper.radioButtonGroupStyle} 
                            validate={required}    
                      
                            onChange={(e, value) =>    (                                                            
                                value === '1' ? this.setState({requiredClaimType : true})
                                            : this.setState({requiredClaimType : false})
                            )}>

                            <RadioButton value='0' label="ALL CASE RATE" style={{width: '200px'}} disabled={editPhicClaimDetailCf2RequestPending} />
                            <RadioButton value='1' label="Z BENEFITS" style={{width: '200px'}} disabled={editPhicClaimDetailCf2RequestPending} />    
                        
                        </Field>      
                        {  this.state.requiredClaimType === true || this.state.requiredClaimType === false ? null : 
                            <p style={styles.thisisReq}>* Required</p>                                                                                             
                        }

                    </div>*/}

                    { /** [ TEMPORARY ONLY ] until PhilHealth can handle the ZBenifits flow */}
                    <label style={styles.subtitle} >
                        Claim Type:
                        <small style={{
                            fontWeight: 400,
                            marginLeft: '20px',
                            fontSize: '14px',
                            color: colorPalette.primaryTextColor
                        }}>
                            {selectedCf2.claimTypeDescription}</small>
                    </label>

                    { /** CONFINEMENT INFORMATION */}
                    <div style={styles.labelWrapper}>
                        <label style={styles.subtitle}>Confinement Information</label>
                    </div>
                    <div style={styles.radioButtonWrapper}>
                        <Field
                            name="patientTypeCode"
                            hintText="Patient Type"
                            floatingLabelText="Patient Type"
                            component={CustomSelectField}
                            style={styles.textFieldWrapper.extradefaultWidth}
                            validate={required}
                            autoWidth={true}
                            disabled={editPhicClaimDetailCf2RequestPending}>

                            {this.onDisplayPatientType()}
                        </Field>

                    </div>
                    <div style={styles.textFieldWrapper}>

                        <div style={styles.radioButtonWrapper}>
                            <label style={styles.radioButtonWrapper.labelStyle}>Is Patient Referred?</label>

                            { /** radiobutton */}
                            <Field
                                component={CustomRadioButtonGroup}
                                style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                name="isPatientReferred"
                                validate={required}>

                                <RadioButton
                                    value="Y"
                                    label="Yes"
                                    onTouchTap={() => { this.setState({ isPatientReferred: true }); }}
                                    style={styles.radioButtonWrapper.radioButtonStyle}
                                    disabled={editPhicClaimDetailCf2RequestPending} />

                                <RadioButton
                                    value="N"
                                    label="No"
                                    onTouchTap={() => { this.setState({ isPatientReferred: false }); }}
                                    style={styles.radioButtonWrapper.radioButtonStyle}
                                    disabled={editPhicClaimDetailCf2RequestPending} />
                            </Field>


                        </div>

                        {/** WILL SHOW IF PATIENT REFERRED IS YES  */}
                        {this.state.isPatientReferred ?

                            <Field
                                name="referrredFacilityAccreditationCode"
                                hintText="Referred Facility Accreditation Code"
                                floatingLabelText="Referred Facility Accreditation Code"
                                component={TextField}
                                style={{ marginLeft: '85px', marginBottom: '30px' }}
                                validate={[required, maxLength12]}
                                disabled={editPhicClaimDetailCf2RequestPending}
                            />
                            : null
                        }

                    </div>

                    <div style={styles.textFieldWrapper}>
                        <Field
                            name="accomodationTypeCode"
                            hintText="Accommodation Type"
                            floatingLabelText="Accommodation Type"
                            component={CustomSelectField}
                            style={styles.textFieldWrapper.defaultWidth}
                            validate={required}
                            disabled={editPhicClaimDetailCf2RequestPending}
                        >

                            {this.onDisplayMenuItems(initialData.accomodationType)}
                        </Field>
                    </div>
                    {/*<div style={{ display: 'flex' }}>
                        <Field
                            name="admissionDate"
                            hintText="Admission Date"
                            floatingLabelText="Admission Date"
                            component={CustomDatePicker}
                            style={styles.textFieldWrapper.mediumWidth}
                            validate={[required, validDate]}
                            maxDate={new Date()}
                            format={null}
                            disabled={editPhicClaimDetailCf2RequestPending}
                        />

                        <Field
                            name="admissionTime"
                            hintText="Admission Time"
                            floatingLabelText="Admission Time"
                            component={CustomTimePicker}
                            style={styles.textFieldWrapper.mediumWidth}
                            validate={[required, validTime]}
                            format={null}
                            disabled={editPhicClaimDetailCf2RequestPending}
                        />

                    </div>
                    <div style={{ display: 'flex' }}>
                        <Field
                            name="dischargeDate"
                            hintText="Discharge Date"
                            floatingLabelText="Discharge Date"
                            component={CustomDatePicker}
                            style={styles.textFieldWrapper.mediumWidth}
                            validate={[required, validDate]}
                            maxDate={new Date()}
                            format={null}
                            disabled={editPhicClaimDetailCf2RequestPending}
                        />


                        <Field
                            name="dischargeTime"
                            hintText="Discharge Time"
                            floatingLabelText="Discharge Time"
                            component={CustomTimePicker}
                            style={styles.textFieldWrapper.mediumWidth}
                            validate={[required, validTime]}
                            format={null}
                            disabled={editPhicClaimDetailCf2RequestPending}
                        />
                    </div>*/}

                    <div style={styles.textFieldWrapper}>
                        { /** selectfield */}
                        {/*<Field
                            name="patientDispositionCode"
                            hintText="Patient Disposition"
                            floatingLabelText="Patient Disposition"
                            component={CustomSelectField}
                            style={styles.textFieldWrapper.mediumWidth}
                            validate={required}
                            autoWidth={true}
                            disabled={editPhicClaimDetailCf2RequestPending}
                        >

                            {this.onDisplayPatientDisposition()}
                        </Field>*/}

                        {/*{this.state.isExpiredDateAndTimeRequired ?
                            <div style={{ display: 'flex' }}>
                                <Field
                                    name="expiredDate"
                                    hintText="Expired Date"
                                    floatingLabelText="Expired Date"
                                    component={CustomDatePicker}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, validDate]}
                                    format={null}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                />

                                <Field
                                    name="expiredTime"
                                    hintText="Expired Time"
                                    floatingLabelText="Expired Time"
                                    component={CustomTimePicker}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, validTime]}
                                    format={null}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                />

                            </div>
                            : null
                        }*/}
                    </div>

                    {/** WILL SHOW IF DISPOSITION IS TRANSFERRED */}
                    {this.state.isPatientDistributionIsTransferred ?

                        <div style={styles.textFieldWrapper}>
                            <Field
                                name="referralReason"
                                hintText="Referral Reasons"
                                floatingLabelText="Referral Reasons"
                                component={TextField}
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={required}
                                disabled={editPhicClaimDetailCf2RequestPending}
                            />

                            <Field
                                name="referralFacilityAccreditationCode"
                                hintText="Referral Facility Accreditation Code"
                                floatingLabelText="Referral Facility Accreditation Code"
                                component={TextField}
                                style={styles.textFieldWrapper.defaultWidth}
                                validate={[required, maxLength12]}
                                disabled={editPhicClaimDetailCf2RequestPending}
                            />
                        </div>
                        : null
                    }

                    { /** ADMISSION DIAGNOSIS */}
                    {/*<div style={styles.labelWrapper}>
                        <label style={styles.subtitle}>Admission Diagnosis</label>
                    </div>

                    <div>
                        <Field
                            name="admissionDiagnosis"
                            disabled={editPhicClaimDetailCf2RequestPending}
                            hintText="Admission Diagnosis"
                            floatingLabelText="Admission Diagnosis"
                            component={TextField}
                            style={styles.textFieldWrapper.mediumWidth}
                            validate={[required, maxLength500]}
                            multiLine={true}
                        />
                    </div>*/}

                    { /** DISCHARGE DIAGNOSIS */}
                    {/*<Cf2DischargeDiagnosisListContainer
                        selectedClaim={selectedClaim}
                        editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                        phicAllCaseRates={phicAllCaseRates}
                        selectedTransmittal={selectedTransmittal}
                        isClaimTypeAllCaseRate={selectedCf2.claimType == claimType.allCaseRate}
                    />*/}
 
                    {/*<FieldArray
                        name="surgicalProcedures"
                        initialValues={initialValues}
                        component={Cf2SurgicalProcedureListContainer}
                        selectedClaim={selectedClaim}
                        editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                        phicAllCaseRates={phicAllCaseRates}
                        selectedTransmittal={selectedTransmittal}
                        isClaimTypeAllCaseRate={selectedCf2.claimType == claimType.allCaseRate}
                        selectedCf2={selectedCf2}
                    />*/}

                    { /** DOCTORS */}
                    {/*<Cf2DoctorsListContainer
                        selectedClaim={selectedClaim}
                        editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                        selectedTransmittal={selectedTransmittal}
                    />*/}

                    {/*<div style={[styles.radioButtonWrapper, styles.hasAttachedSOA]}>
                        <label style={[styles.subtitle, { marginBottom: '15px' }]}>Has Attached SOA?</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Field
                                name="hasAttachedSOA"
                                component={RadioButtonGroup}
                                style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                onChange={(e, value) =>
                                    value == 'Y' ? this.setState({ attachedSOA: false })
                                        : this.setState({ attachedSOA: true })}
                            
                            >
                                <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                            </Field>
                            {this.state.attachedSOA === true || this.state.attachedSOA === false ? null :
                                <p style={styles.thisisReq}>* Required</p>
                            }
                        </div>
                    </div>*/}


                    {/*<div style={[styles.radioButtonWrapper, styles.doesPatientHasEnoughBenefits]}>
                        <label style={[styles.subtitle, { marginBottom: '15px' }]}>Does Patient Have Enough Benefits?</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Field
                                name="doesPatientHasEnoughBenefits"
                                component={RadioButtonGroup}
                                style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                onChange={(e, value) =>
                                    value == 'Y' ? this.setState({ enoughBenefits: false })
                                        : this.setState({ enoughBenefits: true })}
                                validate={required}
                            >

                                <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                            </Field>
                            {this.state.enoughBenefits === true || this.state.enoughBenefits === false ? null :
                                <p style={styles.thisisReq}>* Required</p>
                            }
                        </div>

                    </div>*/}

                    {this.state.enoughBenefits == null || this.state.enoughBenefits == true ?

                        null :
                        <div style={styles.textFieldWrapper}>
                            <Field
                                name="totalHospitalFees"
                                hintText="Total Hospital Fees"
                                floatingLabelText="Total Hospital Fees"
                                component={TextField}
                                style={styles.textFieldWrapper.defaultWidth}
                                validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                disabled={editPhicClaimDetailCf2RequestPending}
                                ref="totalHospitalFeesValue" withRef
                                onBlur={this.onGrandTotalComputation.bind(this)}
                                onClick={this.clearHospitalFees.bind(this)}
                            />

                            <Field
                                name="totalProfessionalFees"
                                hintText="Total Professional Fees"
                                floatingLabelText="Total Professional Fees"
                                component={TextField}
                                style={styles.textFieldWrapper.defaultWidth}
                                validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                disabled={editPhicClaimDetailCf2RequestPending}
                                ref="totalProfessionalFeesValue" withRef
                                onBlur={this.onGrandTotalComputation.bind(this)}
                                onClick={this.clearProfessionalFees.bind(this)}
                            />

                            <Field
                                name="grandTotal"
                                ref="grandTotal"
                                withRef={true}
                                hintText="Grand Total"
                                floatingLabelText="Grand Total"
                                component={TextField}
                                style={styles.textFieldWrapper.defaultWidth}
                                validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                disabled={true}
                            />
                        </div>

                    }
                    <br />

                    {this.state.enoughBenefits ?

                        <div style={[styles.enoughBenefitsCont, animation.fadeIn]}>
                            { /** HOSPITAL FEES */}
                            <div style={styles.labelWrapper}>
                                <label style={[styles.subtitle]}>Hospital Fees</label>
                            </div>
                            <div style={styles.textFieldWrapper}>
                                <Field
                                    name="hospitalFeesActualCharges"
                                    hintText="Actual Charges"
                                    floatingLabelText="Actual Charges"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, amountWithDecimal, maxLength12]}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                    ref="hospitalFeesActualChargesValue" withRef
                                    onClick={this.clearHospitalActualCharges.bind(this)}
                                />

                                <Field
                                    name="hospitalFeesAmountAfterDiscount"
                                    hintText="Amount after discount"
                                    floatingLabelText="Amount after discount"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                    ref="hospitalFeesAmountAfterDiscountValue" withRef
                                    onBlur={this.onExcessAmountComputationHospital.bind(this)}
                                    onClick={this.clearHospitaAmountAfterDiscount.bind(this)}
                                />

                                <Field
                                    name="hospitalFeesPhilHealthBenefit"
                                    hintText="PhilHealth Benefit"
                                    floatingLabelText="PhilHealth Benefit"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                    ref="hospitalFeesPhilHealthBenefitValue" withRef
                                    onBlur={this.onExcessAmountComputationHospital.bind(this)}
                                    onClick={this.clearHospitalPhilhealthBenefit.bind(this)}
                                />

                                <Field
                                    name="hospitalFeesExcessAmount"
                                    ref="hospitalFeesExcessAmount"
                                    withRef={true}
                                    hintText="Excess Amount"
                                    floatingLabelText="Excess Amount"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={true}
                                />
                            </div>

                            <div style={[styles.radioButtonWrapper, { marginTop: '15px' }]}>
                                <label style={styles.radioButtonWrapper.labelStyle}>Did Patient pay?</label>

                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="hospitalFeesDidPatientPay"
                                    validate={required}
                                    onChange={(e, value) =>
                                        value == 'Y' || value == 'N' ?
                                            this.setState({ requiredHospitalDidPatientPay: true })
                                            : null
                                    }
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>

                                {this.state.requiredHospitalDidPatientPay ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }
                            </div>

                            <div style={styles.radioButtonWrapper}>
                                <label style={styles.radioButtonWrapper.labelStyle}>Patient has HMO?</label>

                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="hospitalFeesPatientHasHMO"
                                    validate={required}
                                    onChange={(e, value) =>
                                        value == 'Y' || value == 'N' ?
                                            this.setState({ requiredHospitalPatientHasHMO: true }) : null
                                    }
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>
                                {this.state.requiredHospitalPatientHasHMO ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }
                            </div>

                            <div style={styles.radioButtonWrapper}>
                                <label style={styles.radioButtonWrapper.labelStyle}>Patient has other deductions?</label>

                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    validate={required}
                                    name="hospitalFeesPatientHasOtherDeductions"
                                    onChange={(e, value) =>
                                        value == 'Y' || value == 'N' ?
                                            this.setState({ requiredHospitalPatientHasOtherDeduct: true }) : null
                                    }
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>

                                {this.state.requiredHospitalPatientHasOtherDeduct ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }
                            </div>

                            { /** PROFESSIONAL FEES */}
                            <div style={styles.labelWrapper}>
                                <label style={[styles.subtitle]}>Professional Fees</label>
                            </div>
                            <div style={styles.textFieldWrapper}>
                                <Field
                                    name="professionalFeesActualCharges"
                                    hintText="Actual Charges"
                                    floatingLabelText="Actual Charges"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                    ref="professionalFeesActualChargesValue" withRef
                                    onClick={this.clearProfessionalActualCharges.bind(this)}
                                />

                                <Field
                                    name="professionalFeesAmountAfterDiscount"
                                    hintText="Amount after discount"
                                    floatingLabelText="Amount after discount"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                    ref="professionalFeesAmountAfterDiscountValue" withRef
                                    onBlur={this.onExcessAmountComputationProfessional.bind(this)}
                                    onClick={this.clearProfessionalAmountAfterDiscount.bind(this)}
                                />

                                <Field
                                    name="professionalFeesPhilHealthBenefit"
                                    hintText="PhilHealth Benefit"
                                    floatingLabelText="PhilHealth Benefit"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={editPhicClaimDetailCf2RequestPending}
                                    ref="professionalFeesPhilHealthBenefitValue" withRef
                                    onBlur={this.onExcessAmountComputationProfessional.bind(this)}
                                    onClick={this.clearProfessionalPhilhealthBenefit.bind(this)}
                                />


                                <Field
                                    name="professionalFeesExcessAmount"
                                    hintText="Excess Amount"
                                    floatingLabelText="Excess Amount"
                                    component={TextField}
                                    style={styles.textFieldWrapper.defaultWidth}
                                    validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                    disabled={true}
                                    ref="professionalFeesExcessAmount"
                                    withRef={true}
                                />
                            </div>

                            <div style={[styles.radioButtonWrapper, { marginTop: '15px' }]}>
                                <label style={styles.radioButtonWrapper.labelStyle}>Did Patient pay?</label>


                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="professionalFeesDidPatientPay"
                                    validate={required}
                                    onChange={(e, value) =>
                                        value == 'Y' || value == 'N' ?
                                            this.setState({ requiredProfDidPatientPay: true }) : null
                                    }
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>

                                {this.state.requiredProfDidPatientPay ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }
                            </div>

                            <div style={styles.radioButtonWrapper}>
                                <label style={styles.radioButtonWrapper.labelStyle}>Patient has HMO?</label>

                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="professionalFeesPatientHasHMO"
                                    validate={required}
                                    onChange={(e, value) =>
                                        value == 'Y' || value == 'N' ?
                                            this.setState({ requiredProfPatientHasHMO: true }) : null
                                    }
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>

                                {this.state.requiredProfPatientHasHMO ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }
                            </div>


                            <div style={styles.radioButtonWrapper}>
                                <label style={styles.radioButtonWrapper.labelStyle}>Patient has other deductions?</label>


                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="professionalFeesPatientHasOtherDeductions"
                                    validate={required}
                                    onChange={(e, value) =>
                                        value == 'Y' || value == 'N' ?
                                            this.setState({ requiredProfPatientHasOtherDeduct: true }) : null
                                    }>

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>

                                {this.state.requiredProfPatientHasOtherDeduct ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }
                            </div>

                            { /** PURCHASES */}
                            <div style={styles.labelWrapper}>
                                <label style={styles.subtitle}>Purchases</label>
                            </div>
                            <div style={styles.radioButtonWrapper}>
                                <label style={styles.radioButtonWrapper.labelStyle}>With Drugs / Medicines / Supplies ?</label>

                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="purchasesWithDrugsMedSupplies"
                                    onChange={(e, value) =>
                                        value == 'Y' ? this.setState({ withDrugsMedSupplies: true, requiredWithDrugs: true })
                                            : this.setState({ withDrugsMedSupplies: false, requiredWithDrugs: true })}
                                    validate={required}
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>
                                {this.state.requiredWithDrugs ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }

                                {this.state.withDrugsMedSupplies ?
                                    <Field
                                        name="purchasesWithDrugsMedSuppliesAmount"
                                        hintText="Amount"
                                        floatingLabelText="Amount"
                                        component={TextField}
                                        style={styles.radioButtonWrapper.textFieldStyle}
                                        validate={[required, number, minValue0, maxLength12, amountWithDecimal]}
                                        disabled={editPhicClaimDetailCf2RequestPending}
                                    />
                                    : null
                                }
                            </div>

                            { /** EXAMINATIONS */}
                            <div style={styles.radioButtonWrapper}>
                                <label style={styles.radioButtonWrapper.labelStyle}>With Examinations ?</label>

                                <Field
                                    component={RadioButtonGroup}
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle}
                                    name="purchasesWithExaminations"
                                    onChange={(e, value) =>
                                        value == 'Y' ? this.setState({ withExamination: true, requiredWithExamination: true })
                                            : this.setState({ withExamination: false, requiredWithExamination: true })}
                                    validate={required}
                                >

                                    <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                    <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} disabled={editPhicClaimDetailCf2RequestPending} />
                                </Field>

                                {this.state.requiredWithExamination ? null :
                                    <p style={styles.thisisReq}>* Required</p>
                                }

                                {this.state.withExamination ?

                                    <Field
                                        name="purchasesWithExaminationsAmount"
                                        hintText="Amount"
                                        floatingLabelText="Amount"
                                        component={TextField}
                                        style={styles.radioButtonWrapper.textFieldStyle}
                                        disabled={editPhicClaimDetailCf2RequestPending}
                                    />
                                    : null
                                }
                            </div>
                        </div>
                        : null
                    }

                    { /** PACKGES */}
                    {this.onDisplayPackages()}

                    {this.state.requiredClaimType === true ?

                        <div style={styles.zBenefits}>
                            <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px' }]}>Z Benefits</label>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '10px', width: '100%', flexDirection: 'column' }}>
                                <div style={styles.zBenefits.displayText}>
                                    <TextField
                                        style={[styles.textFieldWrapper.defaultWidth, { marginTop: '-25px', width: '100%' }]}
                                        disabled={true}
                                        inputStyle={{ color: colorPalette.primaryTextColor }}
                                        underlineDisabledStyle={{ display: 'none' }}
                                        value={selectedZBenefit[2] === null ? '' : `${selectedZBenefit[2]}`}
                                        fullWidth={true}
                                        id='selectedSZBenefit'
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        hintText="Z Benefits"
                                        floatingLabelText="Z Benefits"
                                        ref="zbenefit"
                                        style={[styles.textFieldWrapper.defaultWidth, { marginTop: '-25px' }]}
                                        disabled={true}
                                        inputStyle={{ color: colorPalette.primaryTextColor }}
                                        value={`${selectedZBenefit[0]} - ${selectedZBenefit[1]}`}
                                    />

                                    <FlatButton
                                        icon={<AddIcon />}
                                        labelPosition="after"
                                        style={styles.flatButtonStyles}
                                        disabled={editPhicClaimDetailCf2RequestPending}
                                        onTouchTap={this.onOpenAddZBenefits.bind(this)}
                                    />
                                </div>
                            </div>

                        </div>

                        : selectedCf2.claimType == claimType.allCaseRate ?
                            <AllCaseRateListContainer
                                phicAllCaseRates={phicAllCaseRates}
                                selectedClaim={selectedClaim} 
                                selectedCf2={selectedCf2}
                                />
                            : null}

                    {/*<AccessPatientRecords selectedCf2={selectedCf2} />*/}

                </form>

                {this.state.displayMoveToTop ?

                    <a href="#cf2Save" style={animation.fadeIn}>
                        <div style={styles.arrowUp}>
                            <ArrowUpward style={styles.arrowUp.icon} />
                        </div>
                    </a>
                    : null
                }
                <ZBenefitsDialog
                    open={this.state.openAddZBenefits}
                    close={this.onCloseAddZBenefits.bind(this)}
                    listOfZBenefits={listOfZBenefits}
                    updateSelectedZBenefit={updateSelectedZBenefit}

                    checkSelectedCheckboxOnZBenefit={checkSelectedCheckboxOnZBenefit}


                />

            </StyleRoot>
        );
    }
}

// *** props
Cf2.propTypes = {
    selectedClaim: PropTypes.object.isRequired,
    editPhicClaimDetailCf2RequestPending: PropTypes.bool,
    selectedCf2: PropTypes.object.isRequired
};
export default Cf2;