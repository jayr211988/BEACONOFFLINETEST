import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton';

import { TextField, RadioButtonGroup } from 'redux-form-material-ui';

import CustomDatePicker from '../../../../../shared-components/custom-material-ui/datepicker';
import { required, number, maxLength14, minLength14 , maxLength60, maxLength5, maxLength12, validDate,letterWithSpecial} from '../../../../../util/validation';

import { normalizeAccreditation } from '../../../../../util/normalize';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    container: {
        width: '100%',
        height: '100%'
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
    },    

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },  

    contentWrapper: {
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column'
    },

    textFieldWrapper : {
        width: '100%',
        display: 'flex',

        mediumWidth: {
            width: '30%',
            marginRight: '30px'
        }
    },

    radioButtonWrapper: {
        minHeight: '42px',
        display: 'flex',
        alignItems : 'center',
        paddingTop: '30px',
        
        radioButtonGroupStyle: {
            width: '30%',
            display: 'flex',
        },

        labelStyle: { 
            color : colorPalette.primaryTextColor,
            width: '20%' 
        },

        textFieldStyle : { 
            width: '50%', 
            marginTop: '-30px',
            marginLeft: '30px'
        },

        radioButtonStyle: {
            width: '90px'
        }
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },   
};
/**
 * CF2 Doctors New Component
 * 
 * @class Cf2DoctorsNew
 * @extends {React.Component}
 */
@reduxForm({
    form: 'cf2DoctorsNewForm'
})
@Radium
class Cf2DoctorsNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCoPayAmountRequired: false
        };
    }
    
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2DoctorsNew
     */
    render() {
        const { closeDialog, handleSubmit } = this.props;

        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>

                    <h1 style={styles.title} >Add New Doctor</h1>
                    <p style={styles.subtitle}>Doctor should be accredited</p>

                    <div style={styles.contentWrapper}>
                        <Field 
                            name="accreditationNumber"
                            component={TextField}
                            hintText="Accreditation Number"
                            floatingLabelText="Accreditation Number"
                            style={{ width: '45%' }}
                            validate={[required, minLength14, maxLength14]}
                            normalize={normalizeAccreditation}
                        />
                        
                        <div style={styles.textFieldWrapper}>
                            <Field 
                                name="firstname"
                                component={TextField}
                                hintText="Firstname"
                                floatingLabelText="Firstname"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength60,letterWithSpecial]}
                            />
        
                            <Field 
                                name="lastname"
                                component={TextField}
                                hintText="Lastname"
                                floatingLabelText="Lastname"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength60,letterWithSpecial]}
                            />

                            <Field 
                                name="middlename"
                                component={TextField}
                                hintText="Middlename"
                                floatingLabelText="Middlename"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={maxLength60}
                            />

                            <Field 
                                name="suffix"
                                component={TextField}
                                hintText="Suffix"
                                floatingLabelText="Suffix"
                                style={{ width: '10%' }}
                                validate={[maxLength5,letterWithSpecial]}
                            />
                   
                        </div>
                         
                        <div style={{ width: '42.5%' }}>
                            <Field
                                name="doctorSignDate" 
                                hintText="Doctor Sign Date"                                     
                                floatingLabelText="Doctor Sign Date"                                    
                                component={CustomDatePicker}                                     
                                style={{ width: '45%' }}
                                validate={[required, validDate]}
                                maxDate={new Date()}
                                format={null}
                            /> 
                        </div>

                        { /** WITH CO PAY */ }
                        <div style={styles.radioButtonWrapper}>
                            <label style={styles.radioButtonWrapper.labelStyle}>With Co pay?</label>

                            <Field 
                                onChange={ (e, value) => { 
                                    value == 'Y' ? 
                                    this.setState({ isCoPayAmountRequired: true }) : 
                                    this.setState({ isCoPayAmountRequired : false }); }}

                                component={RadioButtonGroup} 
                                style={styles.radioButtonWrapper.radioButtonGroupStyle} 
                                validate={required}
                                name="withCoPay">

                                <RadioButton value="Y" label="Yes" style={styles.radioButtonWrapper.radioButtonStyle} />
                                <RadioButton value="N" label="No" style={styles.radioButtonWrapper.radioButtonStyle} />
                            </Field>

                            { this.state.isCoPayAmountRequired ? 
                                <Field 
                                    name="coPayAmount"
                                    component={TextField}
                                    hintText="Co Pay Amount"
                                    floatingLabelText="Co Pay Amount"
                                    validate={[required, number, maxLength12]}
                                    style={styles.radioButtonWrapper.textFieldStyle}
                                />                              
                            : null }
                        </div>                                               
                    </div>                                        

                    { /** DIALOG ACTIONS */ }
                    <div style={styles.buttonWrapper}>
                        <RaisedButton 
                            label="Close"
                            style={ styles.buttonWrapper.left }
                            onTouchTap={closeDialog.bind(this)}
                        />   

                        <RaisedButton 
                            type="submit"
                            label="Save and Create New"
                            style={ styles.buttonWrapper.left }
                            secondary={true }
                        />                              
                    </div>    
                </form>            
            </StyleRoot>
        );
    }
}

// *** props
Cf2DoctorsNew.propTypes = {
    closeDialog : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func
};

export default Cf2DoctorsNew;