import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import colorPalette from '../../../../../util/styles/color-pallete';

// *** dumb components
import Cf2DischargeDiagnosisEditCustomDescription from '../components/edit-custom-description';

import Radium, { StyleRoot } from 'radium';

const styles = {
    dialogBodyStyle: {
        padding: '24px'
    },
    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'
        
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tableLike: {
        header: {
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            fontSize: '14px',
            hospital: {
                width: '60%'
                
            },
            primary: {

            }
        },
        body: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            text: {
                width: '40%'
            },
            radio: {
                width: 'initial'
            }
        },

        buttonContainer: {
            display: 'flex',
            marginTop: '30px',
            justifyContent: 'space-between',
            alignItems: 'center'

        }
    }
};

/**
 * C2f Container
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsCf2DischargeDiagnosisEditCustomDescriptionReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2DischargeDiagnosisEditCustomDescriptionContainer extends React.Component {

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const {open, selectedDischargeDiagnosis, editPhicDischargeDiagnosisCustomDescriptionRequestPending } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={this.close.bind(this)}>

                    <div style={styles.titleContainer}>
                        <div>
                            <h1 style={styles.title}>Discharge Diagnosis - Custom Description</h1>
                            <p style={{fontSize: '14px', marginBottom: 0}}>Modify Discharge Diagnosis' Custom Description</p>
                        </div>      
                        <div>
                            <IconButton onTouchTap={this.close.bind(this)}>
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                    
                    <Cf2DischargeDiagnosisEditCustomDescription
                        close={this.close.bind(this)}
                        selectedDischargeDiagnosis={selectedDischargeDiagnosis}
                        {...this.onSetDefaultValues()}
                        onSubmit={this.onSubmit.bind(this)}
                        editPhicDischargeDiagnosisCustomDescriptionRequestPending={editPhicDischargeDiagnosisCustomDescriptionRequestPending} />

                </Dialog>
            </StyleRoot>
        );
    }

    onSetDefaultValues() {
        const { selectedDischargeDiagnosis } = this.props;
        return {
            initialValues: selectedDischargeDiagnosis
        };
    }

    close() {
        const { close } = this.props;

        close();
    }

    onSubmit(formValues) {
        const { actions: { editPHICDischargeDiagnosisCustomDescription }, close } = this.props;

        editPHICDischargeDiagnosisCustomDescription(formValues, close);
    }
}

export default Cf2DischargeDiagnosisEditCustomDescriptionContainer;
