import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';

import { TextField } from 'redux-form-material-ui';

import CustomDatePicker from '../../../../../shared-components/custom-material-ui/datepicker';
import { required, number, maxLength50, maxLength10, maxLength20, maxLength30, validDate} from '../../../../../util/validation';

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
        margin: 0
    },    

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },  

    contentWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },

    textFieldWrapper : {
        width: '100%',
        display: 'flex',

        mediumWidth: {
            width: '310px',
            marginRight: '50px'
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
 * Drugs And Medicines New Component
 * 
 * @class ChargesDrugsAndMedicinesNew
 * @extends {React.Component}
 */
@reduxForm({
    form: 'chargesDrugsAndMedicinesNewForm'
})
@Radium
class ChargesDrugsAndMedicinesNew extends React.Component {
    constructor(props) {
        super(props);
    }
    
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChargesDrugsAndMedicinesNew
     */
    render() {
        const { closeDialog, handleSubmit } = this.props;

        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>

                    <h1 style={styles.title} >Drugs and Medicines - New</h1>
                    <p style={styles.subtitle}>Create new record for Drugs and Medicines</p>

                    <div style={styles.contentWrapper}>
                        <div style={{display: 'flex'}}>
                            <Field 
                                name="itemId"
                                component={TextField}
                                hintText="Item ID"
                                floatingLabelText="Item ID"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength20]}
                            />
                            <Field 
                                name="brandName"
                                component={TextField}
                                hintText="Brand Name"
                                floatingLabelText="Brand Name"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength50]}
                            />
                        </div>
                        <div style={{display: 'flex'}}>
                            <Field 
                                name="genericName"
                                component={TextField}
                                hintText="Generic Name"
                                floatingLabelText="Generic Name"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength50]}
                            />
                            <Field 
                                name="quantity"
                                component={TextField}
                                hintText="QTY"
                                floatingLabelText="QTY"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, number, maxLength10]}
                            />
                        </div>
                        <div style={{display: 'flex'}}>
                            <Field 
                                name="preparation"
                                component={TextField}
                                hintText="Preparation"
                                floatingLabelText="Preparation"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength30]}
                            />
                            <Field
                                name="renderDate" 
                                hintText="Render Date"                                     
                                floatingLabelText="Render Date"                                    
                                component={CustomDatePicker}
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, validDate]}
                                maxDate={new Date()}
                                format={null}
                            /> 
                        </div>                                    
                    </div>                                        

                    { /** DIALOG ACTIONS */ }
                    <div style={styles.buttonWrapper}>
                        <RaisedButton 
                            label="CLOSE"
                            style={ styles.buttonWrapper.left }
                            onTouchTap={closeDialog.bind(this)}
                        />   

                        <RaisedButton 
                            type="submit"
                            label="SAVE AND CREATE NEW"
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
ChargesDrugsAndMedicinesNew.propTypes = {
    closeDialog : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func
};

export default ChargesDrugsAndMedicinesNew;