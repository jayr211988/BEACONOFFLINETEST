import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { required } from '../../../../util/validation';
// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

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

    contentWrapper: {
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column'
    },

    textFieldWrapper: {
        display: 'flex',
        alignItems: 'center',

        small: {
            color : colorPalette.primaryColor,
            width: '320px',
            fontSize: '12px'
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
 * 
 * 
 * @class PhicTransmittalEdit
 * @extends {React.Component}
 */
@reduxForm({
    form: 'phicTransmittalEditForm'
})

class PhicTransmittalEdit extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const { closeDialog, handleSubmit } = this.props;
        return (
            <StyleRoot style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title}>Edit Transmittal</h1>

                    <div style={styles.contentWrapper}>
                        <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>PACKAGE TYPE</small>

                            <Field 
                                name="packageTypeCode"
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>
                        <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>HOSPITAL CODE</small>

                            <Field 
                                name="hospitalCode"
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>

                         <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>ACCREDITATION NUMBER</small>

                            <Field 
                                name="accreditationNumber"
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>

                        <div style={styles.textFieldWrapper}>
                            <small style={styles.textFieldWrapper.small}>INSTITUTION TYPE</small>

                            <Field 
                                name="hcitypeCode"
                                component={TextField}
                                fullWidth={true}
                                underlineShow={false}
                                inputStyle={styles.textFieldInputStyle}
                                style={{ height: '30px' }}
                                disabled={true}
                            />
                        </div>

                         <Field 
                            name="remarks"
                            component={TextField}
                            hintText="Remarks"
                            floatingLabelText="Remarks"
                            fullWidth={true}
                            multiLine={true}
                        />

                    </div>

                    { /** DIALOG ACTIONS */ }
                    <div style={styles.buttonWrapper}>
                        <RaisedButton 
                            label="Cancel"
                            style={ styles.buttonWrapper.left }
                            onTouchTap={closeDialog.bind(this)}
                        />   

                        <RaisedButton 
                            type="submit"
                            label="Save"
                            style={ styles.buttonWrapper.left }
                            secondary={true }
                        />                              
                    </div> 

                </form>

            </StyleRoot>  
        );

    }

}

export default PhicTransmittalEdit;