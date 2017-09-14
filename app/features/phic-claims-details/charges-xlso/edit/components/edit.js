import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import CustomDatePicker from '../../../../../shared-components/custom-material-ui/datepicker';
import CustomSelectField from '../../../../../shared-components/custom-material-ui/selectfield';


import { required, number, validDate } from '../../../../../util/validation';
// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

import { initialData } from '../../../../../util/data/';



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

    textFieldWrapper: {
        display: 'flex',
        alignItems: 'center',

        small: {
            color: colorPalette.primaryColor,
            width: '180px',
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


@reduxForm({
    form: 'xrayLabSuppliesAndOthersEditForm'
})

class XrayLabSuppliesAndOthersEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { closeDialog, handleSubmit } = this.props;
        return (
            <StyleRoot>
                <form onSubmit={handleSubmit}>
                    <h1 style={styles.title}>Xray, Lab, Supplies and Others - Edit</h1>
                    <p style={styles.subtitle}>Edit record for Xray, Lab, Supplies and Others</p>
                    <div style={styles.contentWrapper}>
                        <div style={{ display: 'flex' }}>
                            {/*<Field
                                name="type"
                                component={TextField}
                                hintText="Type"
                                floatingLabelText="Type"
                                style={styles.textFieldWrapper.mediumWidth}
                            />*/}

                            <Field
                                name="type"
                                component={CustomSelectField}
                                hintText="Type"
                                floatingLabelText="Type"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={required}>

                                {initialData.patientDiagnosticType.map((t, i) => (
                                    <MenuItem primaryText={t.value} value={t.code} key={i} />
                                ))}

                            </Field>

                            <Field
                                name="description"
                                component={TextField}
                                hintText="Description"
                                floatingLabelText="Description"
                                style={styles.textFieldWrapper.mediumWidth}
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Field
                                name="quantity"
                                component={TextField}
                                hintText="QTY"
                                floatingLabelText="QTY"
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={number}
                            />
                            <Field
                                name="renderDate"
                                hintText="Render Date"
                                floatingLabelText="Render Date"
                                component={CustomDatePicker}
                                style={styles.textFieldWrapper.mediumWidth}
                                validate={validDate}
                                maxDate={new Date()}
                                format={null}
                            />
                        </div>
                    </div>

                    { /** DIALOG ACTIONS */}
                    <div style={styles.buttonWrapper}>
                        <RaisedButton
                            label="Cancel"
                            style={styles.buttonWrapper.left}
                            onTouchTap={closeDialog.bind(this)}
                        />

                        <RaisedButton
                            type="submit"
                            label="Save"
                            style={styles.buttonWrapper.left}
                            secondary={true}
                        />
                    </div>

                </form>
            </StyleRoot>



        );

    }

}

export default XrayLabSuppliesAndOthersEdit;