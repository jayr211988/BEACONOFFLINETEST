import React from 'react';
import Radium, {StyleRoot} from 'radium';
import { reduxForm, Field } from 'redux-form';

//material
import { TextField } from 'redux-form-material-ui';
import CustomDatePicker from '../../../shared-components/custom-material-ui/datepicker';

//validations
import { required, maxLength5 , letterWithSpecial, maxLength60, validDate, maxDateShouldBeToday } from '../../../util/validation';
import { capitalizeFirstLetter } from '../../../util/normalize';

//dumb components
import SubHeader from '../components/subheader';

import colorPalette from '../../../util/styles/color-pallete';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';

import PHICMemberValid from './phic-member-valid';
import PHICMemberInvalid from './phic-member-invalid';


const styles = {
    container : {
        marginBottom: '30px',
        width: '100%'
    },

    cont : {
        padding: '24px', 
        margin: '0 50px', 
        backgroundColor: colorPalette.white, 
        height: 'calc(100vh - 296px)'
    },

    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cont: {
            display: 'flex',
            alignItems: 'flex-start',
            backgroundColor: '#fafafa',
            border: 'dashed 1px #979797',
            padding: '10px',
            width: '600px'
        },
        icon : {
            color: colorPalette.primaryColor,
            width: '30px',
            height: '30px',
            marginRight: '10px',
            marginTop: '10px',
            
        },
        msgCont: {

        },
        msg : {
            color: colorPalette.primaryColor,
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '5px'
        },

        textInside: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '50px',
            marginTop: '20px',            
            padding: '20px'
        },
        nameCont : {
            display: 'flex',
            width: '300px',
            justifyContent: 'space-between',
            marginTop: '20px'
        }
    }
};

@reduxForm({
    form: 'memberInquiryForm'
})

@Radium
class PHICMemberInquiry extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {             
            memberInquiry : 'Inquiry'
            
        };

    }

    render() {
        const { handleSubmit, patientInfo,  onBack, patientMemberPin, patientMemberPinRequest } = this.props;
        return (
            
            <StyleRoot style={styles.container}> 
               
               <form onSubmit={handleSubmit}>
                        <SubHeader
                        patientMemberPinRequest= {patientMemberPinRequest}
                        patientInfo={patientInfo}
                        onBack= {onBack}/>

        <div style={styles.cont}>            
               
            {!patientInfo ?  

            <div>    
                <div style={styles.item.cont}>  
                    <InfoOutline style={styles.item.icon}/>                      
                    <div>
                        <p style={styles.item.msg}>Please enter the PhilHealth Member Info you want to verify</p>
                        <p style={{marginTop: '5px'}}>This module is for quickly verifying a member, the information entered 
                            here won't be saved
                        </p>
                    </div>
                </div>                         
                <div>               
                    <div style={{display: 'flex'}}>
                        <Field
                            hintText="Last Name"
                            floatingLabelText="Last Name"
                            style={{marginRight: '30px'}}
                            name="memberlastname"
                            component={TextField} 
                            validate={[required, maxLength60, letterWithSpecial]}
                            normalize={capitalizeFirstLetter}

                        />

                        <Field
                            hintText="First Name"
                            floatingLabelText="First Name"                        
                            name="memberfirstname"
                            component={TextField} 
                            validate={[required, maxLength60, letterWithSpecial]}
                            normalize={capitalizeFirstLetter}
                            
                        />
                    </div>
                    <div style={{display: 'flex'}}>
                            <Field
                                hintText="Middle Name"
                                floatingLabelText="Middle Name"
                                style={{marginRight: '30px'}}
                                name="membermiddlename"
                                validate={[maxLength60, letterWithSpecial]}
                                component={TextField}
                                normalize={capitalizeFirstLetter}
                                
                            />
                            <Field
                                hintText="Suffix"
                                floatingLabelText="Suffix"
                                name="membersuffix"
                                component={TextField}                      
                                validate={[maxLength5, letterWithSpecial]}
                                normalize={capitalizeFirstLetter}

                            />

                    </div>
                    <div style={{display: 'flex'}}>
                            <Field
                                name="memberbirthday"                     
                                hintText="Birthday" 
                                mode="landscape"
                                maxDate={new Date()}      
                                component={CustomDatePicker}                                          
                                validate={[required,validDate,maxDateShouldBeToday]}  
                                floatingLabelText="Birthday"
                                />

                    </div>
                </div>
            </div>

            : 
            
            patientMemberPin.memberPIN ? 
               <PHICMemberValid patientInfo={patientInfo} patientMemberPin={patientMemberPin}/>                
               :  <PHICMemberInvalid patientInfo={patientInfo} patientMemberPin={patientMemberPin}/>

             }

                   

          </div>
         
               </form>
            </StyleRoot>  
              
        );
    }
}

export default PHICMemberInquiry;