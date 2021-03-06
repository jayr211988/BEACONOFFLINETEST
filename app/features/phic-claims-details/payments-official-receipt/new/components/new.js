import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';

import { TextField } from 'redux-form-material-ui';

import CustomDatePicker from '../../../../../shared-components/custom-material-ui/datepicker';
import { required, number, maxLength20, maxLength10  , validDate} from '../../../../../util/validation';

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
 * Official Receipt New Component
 * 
 * @class OfficialReceiptNew
 * @extends {React.Component}
 */
@reduxForm({
    form: 'OfficialReceiptNewForm'
})
@Radium
class OfficialReceiptNew extends React.Component{
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf OfficialReceiptNew
     */

    render(){
        const {closeDialog, handleSubmit } = this.props;
         
        return(
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>

                    <h1 style={styles.title} >Official Receipt - New</h1>
                    <p style={styles.subtitle}>Create new record for Official Receipt</p>

                    <div style={styles.contentWrapper}>
                        <div style={{display: 'flex'}}>
                            <Field 
                                name="orNumber"
                                component={TextField}
                                hintText="OR NUMBER"
                                floatingLabelText="OR NUMBER"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, maxLength20]}
                            />
                            <Field
                                name="orDate" 
                                hintText="OR DATE"                                     
                                floatingLabelText="OR DATE"                                    
                                component={CustomDatePicker}
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, validDate]}
                                maxDate={new Date()}
                                format={null}
                            />
                        </div>
                        <div style={{display: 'flex'}}>
                            <Field 
                                name="amount"
                                component={TextField}
                                hintText="AMOUNT"
                                floatingLabelText="AMOUNT"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, number, maxLength10]}
                            />
                            <Field 
                                name="vatExemptSale"
                                component={TextField}
                                hintText="VAT EXEMPT SALE"
                                floatingLabelText="VAT EXEMPT SALE"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, number, maxLength10]}
                            />

                        </div>
                        <div style={{display: 'flex'}}>
                            <Field 
                                name="vat"
                                component={TextField}
                                hintText="VAT"
                                floatingLabelText="VAT"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={[required, number, maxLength10]}
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
OfficialReceiptNew.propTypes = {
    closeDialog : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func
};

export default OfficialReceiptNew;