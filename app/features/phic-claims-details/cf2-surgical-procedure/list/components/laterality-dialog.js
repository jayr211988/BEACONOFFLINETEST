import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

import Radium, { StyleRoot } from 'radium';


// icon
import Dialog from 'material-ui/Dialog';
import CustomSelectField from '../../../../../shared-components/custom-material-ui/selectfield';
// *** material-ui components
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { initialData } from '../../../../../util/data/index';
import { required } from '../../../../../util/validation';

// *** dumb components
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    containerStyle: {
        padding: '20px 35px',
        position: 'relative',

    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
        margin: 0
    },

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px',
    },
    required: {
        color: colorPalette.accentColor,
        fontSize: '12px'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bodySection: {
        display: 'flex',
        flexDirection: 'column'
    },
    dialogBodyStyle: {
        padding: '0'
    },
    customContentStyle: {
        width: '100%'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
        marginRight: '15px',
        marginBottom: '20px',
        left: {
            marginLeft: '12px'
        }
    },
    tagContainer: {
        marginBottom: '30px'
    },
    tagTitle: {
        fontWeight: '400',
        fontSize: '18px',
        color: colorPalette.primaryTextColor
    },
    surgicalRvsCode: {
        fontWeight: '600',
        color: 'rgb(237, 35, 59)'
    },
    tagTitleMessage: {
        fontSize: '14px'
    },
    loadingIndicator: {
        minHeight: '365px',
        display: 'flex',
        justifyContent: 'center' 
    }
};


@Radium
class LateralityDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            selectedLaterality: null,
            transferLaterality: null
        });
    }

    selectedLateralityFunc(value) {
        this.setState({
            selectedLaterality: value
        });
    }



    onDisplayMenuItems() {

        const { surgicalProcedure } = this.props;
        let choices = [];
        let checkifExist = 0;

        surgicalProcedure.sessions.map((t) => {

            let data = {};
            data.code = t.lateralityCode;
            data.value = t.lateralityValue;
            checkifExist = choices.findIndex(x => x.code == data.code);
            if (checkifExist == -1) {
                switch (data.code) {
                case 'L':
                    data.value = 'Left';
                    break;
                case 'R':
                    data.value = 'Right';
                    break;
                case 'B':
                    data.value = 'Both';
                    break;
                case 'N':
                    data.value = 'N/A';
                    break;
                }
                choices.push(data);
            }
        });
        return choices.map((t, i) => (
            <MenuItem
                key={i}
                value={t.code}
                primaryText={t.value}
                onTouchTap={this.selectedLateralityFunc.bind(this, t.value)}
            />
        ));

    }



    onOpenTagAsCaseRate() {

        const { proceed, surgicalProcedure, session, caseRateNumber, close, changePending } = this.props;
        this.setState({
            selectedLaterality: null
        });
        this.refs.tagLaterality ? this.refs.tagLaterality.getRenderedComponent().props.input.onChange('') : null;

        if (this.state.selectedLaterality || !surgicalProcedure.repetitive) {

            //todo REY
            // let x = [];
            // x.push(session);
            //surgicalProcedure.sessions = x;

            proceed(
                surgicalProcedure,
                caseRateNumber,
                session,
                close,
                changePending,
                surgicalProcedure.repetitive ? this.state.selectedLaterality : session.lateralityValue
            );
        }

    }

    render() {
        const { open, caseRateNumber, surgicalProcedure, summaryMode, isPending } = this.props;
        
        const ordinalCaseRate = caseRateNumber == 0 ? '1st' : '2nd';

        return (
            <StyleRoot style={styles.container}>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    contentStyle={styles.customContentStyle}
                    onRequestClose={this.close.bind(this)}
                >

                    {isPending ?
                        /** LOADING INDICATOR */
                        <div style={styles.loadingIndicator}>
                            <LoadingIndicatorPerContainer isDialog={true} />
                        </div>
                        :
                        <div style={styles.bodySection}>
                            <div>
                                <div style={styles.containerStyle}>
                                    <div style={styles.tagContainer}>
                                        <h1 style={styles.tagTitle}>Tag as {ordinalCaseRate} case rate for <span style={styles.surgicalRvsCode}>{surgicalProcedure.rvsCode}</span> ?</h1>
                                        <p style={styles.tagTitleMessage}>Are you sure you want to tag {surgicalProcedure.name} as {ordinalCaseRate} case rate?</p>
                                    </div>
                                    {
                                        surgicalProcedure.repetitive ?
                                            <div>
                                                <h1 style={styles.title} >Laterality</h1>
                                                <p style={styles.subtitle}>Please select the proper laterality for the case rate.</p>
                                                {
                                                    this.state.selectedLaterality ?
                                                        null :
                                                        <p style={styles.required}>* Laterality Type is Required</p>
                                                }
                                                <div>
                                                    <Field
                                                        name="tagLaterality"
                                                        ref="tagLaterality"
                                                        withRef={true}
                                                        hintText="Select Laterality"
                                                        isOnTable={false}
                                                        component={CustomSelectField}
                                                        disabled={summaryMode}
                                                        validate={required}
                                                        iconStyle={{ fill: colorPalette.secondaryTextColor }}>
                                                        {this.onDisplayMenuItems()}
                                                    </Field>
                                                </div>
                                            </div> : null
                                    }
                                </div>
                            </div>

                            <div style={styles.buttonWrapper}>
                                <RaisedButton
                                    label="Cancel"
                                    style={styles.buttonWrapper.left}
                                    onTouchTap={this.close.bind(this)}
                                />

                                <RaisedButton
                                    type="submit"
                                    label="Proceed"
                                    style={styles.buttonWrapper.left}
                                    onTouchTap={this.onOpenTagAsCaseRate.bind(this)}
                                    secondary={true}
                                />
                            </div>
                        </div>
                    }

                </Dialog>
            </StyleRoot>

        );
    }

    close() {
        const { close } = this.props;
        this.refs.tagLaterality ? this.refs.tagLaterality.getRenderedComponent().props.input.onChange('') : null;
        this.setState({
            selectedLaterality : false
        });
        close();
    }

}

export default LateralityDialog;