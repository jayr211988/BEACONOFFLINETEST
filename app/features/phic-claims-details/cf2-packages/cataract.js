import React, { Component } from 'react';
import { Field } from 'redux-form';

import { TextField } from 'redux-form-material-ui';

import Radium, { StyleRoot } from 'radium';

// *** dumb components
import CustomDatePicker from '../../../shared-components/custom-material-ui/datepicker';

import { required, number, validDate, maxLength15 } from '../../../util/validation';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    container: {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px',
    },

    contentWrapper: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px',
        marginRight: '30px',
        padding: '0 15px 50px 15px'
    },

    title: {
        color: colorPalette.primaryColor,
        fontSize: '20px'
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
    },
};

/**
 * Cataract Package Component
 * 
 * @class CataractPackage
 * @extends {Component}
 */
@Radium
class CataractPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftContent: '',
            rightContent: ''
        };
    }

    componentDidMount() {
        this.setState({
            leftContent: this.refs.leftIOL ? this.refs.leftIOL.value : '',
            rightContent: this.refs.rightIOL ? this.refs.rightIOL.value : ''
        });
    }

    checkifLeftContent(event, val) {
        
        this.state.leftContent = val;

        if (val.length > 0) {
            this.setState({ leftContent: val }, () => { });
        } else if (val.length == 0) {
            this.setState({ leftContent: '' }, () => { });
        } else if (this.state.rightContent.length == 0) {
            this.setState({ rightContent: '' }, () => { });
        }
    }

    checkIfRightContent(event, val) {

        this.state.rightContent = val;

        if (val.length > 0) {
            this.setState({ rightContent: val }, () => { });
        } else if (val.length == 0) {
            this.setState({ rightContent: '' }, () => { });
        } else if (this.state.leftContent.length == 0) {
            this.setState({ leftContent: '' }, () => { });
        }

    }


    render() {
        const { summaryMode } = this.props;

        return (
            <StyleRoot style={styles.container}>
                <h1 style={styles.title}>Cataract Package</h1>

                <div style={styles.contentWrapper}>
                    <Field
                        name="cataractPreAuth"
                        hintText="Cataract Pre Auth No."
                        floatingLabelText="Cataract Pre Auth No."
                        component={TextField}
                        validate={[required, number, maxLength15]}
                        disabled={summaryMode}

                    />

                    <div style={styles.textFieldWrapper}>
                        <Field
                            name="cataractLeftIOLStickerNumber"
                            hintText="Left IOL Sticker No."
                            floatingLabelText="Left IOL Sticker No."
                            component={TextField}
                            style={styles.textFieldWrapper.defaultWidth}
                            validate={this.state.rightContent ? null : [required, maxLength15]}
                            disabled={summaryMode}
                            onChange={this.checkifLeftContent.bind(this)}
                            ref="leftIOL" withRef
                        />

                        <Field
                            name="cataractRightIOLStickerNumber"
                            hintText="Right IOL Sticker No."
                            floatingLabelText="Right IOL Sticker No."
                            component={TextField}
                            style={styles.textFieldWrapper.defaultWidth}
                            validate={this.state.leftContent ? null : [required, maxLength15]}
                            disabled={summaryMode}
                            onChange={this.checkIfRightContent.bind(this)}
                            ref="rightIOL" withRef
                        />
                    </div>

                    <div style={styles.textFieldWrapper}>
                        <Field
                            name="cataractLeftExpiryDate"
                            hintText="Left Expiry Date"
                            floatingLabelText="Left Expiry Date"
                            component={CustomDatePicker}
                            style={styles.textFieldWrapper.defaultWidth}
                            validate={this.state.rightContent ? null : [required, validDate]}
                            maxDate={new Date()}
                            format={null}
                            disabled={summaryMode}
                        />

                        <Field
                            name="cataractRightExpiryDate"
                            hintText="Right Expiry Date"
                            floatingLabelText="Right Expiry Date"
                            component={CustomDatePicker}
                            style={styles.textFieldWrapper.defaultWidth}
                            validate={this.state.leftContent ? null : [required, validDate]}
                            maxDate={new Date()}
                            format={null}
                            disabled={summaryMode}
                        />
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default CataractPackage;