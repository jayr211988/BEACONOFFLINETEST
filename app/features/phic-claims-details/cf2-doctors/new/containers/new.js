import React, { PropTypes } from 'react';
import { formValueSelector } from 'redux-form';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** dumb components
import Cf2DoctorsNew from '../components/new';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
const styles = { 
    dialogBodyStyle : {
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },  
};

/**
 * CF2 Doctors New Container
 * 
 * @class cf2DoctorsNewContainer
 * @extends {React.Component}
 */
const phicClaimsDetailsCf2FormSelector 
    = formValueSelector('phicClaimsDetailsCf2Form');

@connect(
    state => {
        const phicClaimsDetailsCf2FormValues 
            = phicClaimsDetailsCf2FormSelector(state, 'admissionDate', 'dischargeDate');

        return state = {
            phicClaimsDetailsCf2FormValues,
            ...state.phicClaimsDetailsCf2DoctorsNewReducer,
        };
    },
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class cf2DoctorsNewContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Save Doctor
     * 
     * @param {any} value
     * 
     * @memberOf cf2DoctorsNewContainer
     */
    onSave(value) {
        const { 
            selectedClaim, 
            closeDialog,
            selectedTransmittal,
            actions: { 
                // *** Actions
                validateDoctorAccreditation 
            },
            phicClaimsDetailsCf2FormValues: { 
                // *** Selector Values
                admissionDate, 
                dischargeDate 
            }} = this.props;

        value['admissionDate'] = admissionDate,
        value['dischargeDate'] = dischargeDate,
        value['accredited'] = false;
        value['id'] = selectedClaim.id;

        validateDoctorAccreditation(
            value,
            closeDialog.bind(this),
            selectedTransmittal.hospitalCode,
            selectedClaim.id
        );
    }
    
    onSetDefaultValues() {
        const { doctorInfo, errorInfo } = this.props;
        
        return { 
            initialValues : errorInfo ? doctorInfo : null,
           
        };
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf cf2DoctorsNewContainer
     */
    render() {
        const {  open, validateDoctorAccreditationRequestPending, closingDialog } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={this.onCloseDialog.bind(this)}
                    >                     

                    { /** LOADING INDICATOR */ }
                    { validateDoctorAccreditationRequestPending ? 
                        <LoadingIndicatorPerContainer isDialog={true}/>
                    :
                        <Cf2DoctorsNew    
                            { ...this.onSetDefaultValues() }                     
                            closeDialog={this.onCloseDialog.bind(this)} 
                            onSubmit={this.onSave.bind(this)}
                            closingDialog={closingDialog}
                        />                    
                    }
                </Dialog>
            </StyleRoot>
        );
    }

    onCloseDialog() {
        const { closeDialog, closingDialog, actions: {clearDoctorAccreditationError} } = this.props;

        clearDoctorAccreditationError();
        closingDialog();
        //closeDialog();
    }
}

// *** props
cf2DoctorsNewContainer.propTypes = {
    selectedClaim : PropTypes.object.isRequired
};

export default cf2DoctorsNewContainer;