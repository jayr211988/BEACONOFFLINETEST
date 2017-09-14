// react + redux
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, number,maxLength20} from '../../../util/validation';

// material
import {RadioButton, } from 'material-ui/RadioButton';
import { Checkbox, TextField, RadioButtonGroup } from 'redux-form-material-ui';
// others
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import animation from '../../../util/styles/animation';
import { onComputeTotalCaseRateAmountNewbornPackage } from '../../../util/helpers/helper';

const styles = {
    container : {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px'
    },
    subtitle: {
        color: colorPalette.primaryColor,
        fontSize : '14px',
        width: '286px',
        fontWeight: 600
    },
    containerTbl: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px',        
        marginRight: '30px',        
    },
    headerCheck : {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0 20px 30px',
        checkbox : {
            width: '300px'
        }
    },
    checkboxCont: {
        display: 'flex',
        paddingLeft: '30px',
        marginTop: '20px'
    },
    checkbox: {
        marginBottom: 16,
        label : {
            paddingLeft: '30px',
            color: colorPalette.primaryColor
        }
    },
    filter : {
        display: 'flex',
        alignItems: 'baseline',
        paddingLeft: '30px',        
        flexDirection: 'column',
        paddingBottom: '20px',
        label : {
            marginRight: '30px',
            color: colorPalette.primaryColor
        }
    },
    required: {
        color: colorPalette.accentColor,
        fontSize: '12px'
    }
};

 
@Radium
class NewBornCarePackage extends React.Component {

    constructor(props) {
        super(props);   
        const {selectedCf2} = this.props;

        this.state = {
            newBornEssentialCare : selectedCf2.newBornEssentialCare ? true : false,
            newBornHearingTest : selectedCf2.newBornHearingTest ? true : false,
            newBornScreeningTest: selectedCf2.newBornScreeningTest ? true : false
        };
    }

  

    newBornEssentialCare(isChecked){
        isChecked ? this.setState({newBornEssentialCare : true}) : this.setState({newBornEssentialCare : false});

        const { newbornCare, selectedCf2, phicAllCaseRates } = this.props;
        newbornCare(isChecked, selectedCf2, phicAllCaseRates );
        onComputeTotalCaseRateAmountNewbornPackage(null, selectedCf2, isChecked, phicAllCaseRates, 1000);
    }

    newBornHearingTest(isChecked){
        isChecked ? this.setState({newBornHearingTest : true}) : this.setState({newBornHearingTest : false});
        const { hearingTest, selectedCf2, phicAllCaseRates } = this.props;
        hearingTest(isChecked, selectedCf2, phicAllCaseRates);
        onComputeTotalCaseRateAmountNewbornPackage(null, selectedCf2, isChecked, phicAllCaseRates, 200);
    }

    newBornScreeningTest(isChecked){
        isChecked ? this.setState({newBornScreeningTest : true}) : this.setState({newBornScreeningTest : false});
        const { screeningTest, selectedCf2, phicAllCaseRates } = this.props;
        screeningTest(isChecked, selectedCf2, phicAllCaseRates);
        onComputeTotalCaseRateAmountNewbornPackage(null, selectedCf2, isChecked, phicAllCaseRates, 550);
    }

  
 

    render() {
        const { summaryMode } = this.props;
        return (
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px'}]}>NEWBORN CARE PACKAGE</label> 
                <section style={styles.containerTbl}>
                    <div style={styles.headerCheck}>                       
                        <Field
                            name="newBornEssentialCare"
                            label="Essential Newborn Care"
                            style={styles.headerCheck.checkbox}
                            component={Checkbox}
                            validate={required}
                            disabled={summaryMode}
                            onCheck={this.newBornEssentialCare.bind(this)}
                            /*onCheck={(e) => 
                                e ?  this.setState({newBornEssentialCare : true}) :
                                     this.setState({newBornEssentialCare : false})
                            }*/
                        />
                        <Field
                            name="newBornHearingTest"
                            label="Newborn Hearing Screening Test"
                            style={styles.headerCheck.checkbox}
                            component={Checkbox}
                            validate={required}
                            disabled={summaryMode}
                            onCheck={this.newBornHearingTest.bind(this)}
                            /*onCheck={(e) => 
                                e ? this.setState({newBornHearingTest : true}) :
                                    this.setState({newBornHearingTest : false})
                            }*/
                        />
                        <Field
                            name="newBornScreeningTest"
                            label="Newborn Screening Test"
                            style={styles.headerCheck.checkbox}
                            component={Checkbox}
                            validate={required}
                            disabled={summaryMode}
                            onCheck={this.newBornScreeningTest.bind(this)}
                            /*onCheck={(e) => 
                                e ?   this.setState({newBornScreeningTest : true}) :
                                      this.setState({newBornScreeningTest : false})
                            }*/
                        />   

                        {   !this.state.newBornEssentialCare && !this.state.newBornHearingTest && !this.state.newBornScreeningTest ? 

                            <p style={styles.required}>* Required</p>                                             
                            : 
                            null
                        }
                         
                    </div>

                    {  this.state.newBornEssentialCare  ?
                    
                        <div style={animation.fadeIn}> {/** FOR ESSENTIAL NEWBORN CARE */}
                            <label style={styles.checkbox.label}>FOR ESENTIAL NEW BORN CARE, CHECK APPLICABLE BOXES</label>
                            <div style={styles.checkboxCont}>
                                <div style={{width: '500px'}}>
                                    <Field
                                        name="newBornImmediateDrying"
                                        label="Immediate drying of newborn"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornEarlySkinToSkin"
                                        label="Early skin-to-skin contact"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornTimelyCordClamping"
                                        label="Timely cord clamping"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornEyeProphylaxis"
                                        label="Eye Prophylaxis"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornNonSeparationMotherBaby"
                                        label="Non-separation of Mother/Baby for early breastfeeding initiation"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />       
                                </div>
                                <div style={{width: '500px'}}>                     
                                    <Field
                                        name="newBornWeighing"
                                        label="Weighing of the newborn"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornVitaminKAdmin"
                                        label="Vitamin K administration"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornBCGVaccination"
                                        label="BCG Vaccination"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                    <Field
                                        name="newBornHepaB"
                                        label="Hepatitis B Vaccination"
                                        style={styles.checkbox}
                                        component={Checkbox}
                                        disabled={summaryMode}
                                    />
                                </div>
                            </div>
                        </div>
                    
                        : null
                     }

                     { this.state.newBornScreeningTest  ?
                        <div style={[styles.filter, animation.fadeIn]} >{/** FOR NEWBORN SCREENING TEST*/}
                            <p style={styles.filter.label}>FOR NEW BORN SCREENING TEST</p>
                            <Field 
                                name="newBornFilterCardNumber" 
                                component={TextField} 
                                hintText="Filter Card No."
                                floatingLabelText="Filter Card No."
                                style={{marginTop: '-30px'}}
                                validate={[required,number,maxLength20]}
                                disabled={summaryMode}
                            />
                         </div>                     
                         : null
                    }
                  
                </section>
            </StyleRoot>
        );
    }
}

export default NewBornCarePackage;