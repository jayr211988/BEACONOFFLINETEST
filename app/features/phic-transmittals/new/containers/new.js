import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Radium, { StyleRoot } from 'radium';

// *** dumb component 
import PhicTransmittalsNew from '../components/new';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

// *** custom css styles
const styles = {
    dialogBodyStyle : {
        minHeight: '430px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },  

    dialogContentStyle: {
        maxWidth: 'none',
        width: '514px'
    }
};

/**
 * Phic Transmittal New Container
 * 
 * @class PhicTransmittalsNewContainer
 * @extends {Component}
 */
@connect(
    state => state.phicTransmittalsNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicTransmittalsNewContainer extends Component {

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicTransmittalsNewContainer
     */
    componentWillMount() {
        const { 
            selectedFacility, 
            actions: { getPhicTransmittalHospitalCodeList } } = this.props;

        const productId = 
            selectedFacility.products.filter(t => t.productType == 2)[0].id;

        getPhicTransmittalHospitalCodeList(productId);
    }

    /**
     * Conver Phic Hci Type To Int
     * 
     * 
     * @memberOf PhicTransmittalsNewContainer
     */
    onConvertPhicHciTypeToInt(value) {
        const { hospitalCodeList } = this.props;

        return hospitalCodeList.filter(t => t.phichciTypeDescription == value)[0].phichciType;
    }

    /**
     * Save New Transmittal
     * 
     * @param {any} value
     * 
     * @memberOf PhicTransmittalsNewContainer
     */
    onSave(value) {
        const { 
            selectedFacility, 
            closeDialog,
            actions: { newPhicTransmittal }} = this.props;

        value['clientId'] = selectedFacility.id;
        value.phichciType = this.onConvertPhicHciTypeToInt(value.phichciType);

        newPhicTransmittal(
            value,
            closeDialog.bind(this)
        );
    }

    /**
     * Set Default Values
     * 
     * @returns 
     * 
     * @memberOf PhicTransmittalsNewContainer
     */
    onSetDefaultValues() {
        const { hospitalCodeList } = this.props;

        let defaultHospitaCodeValue = null;

        if(hospitalCodeList && hospitalCodeList.length > 0 ){

            defaultHospitaCodeValue = hospitalCodeList.filter(t => t.primaryCode)[0];

            return { 
                initialValues : {
                    phicPackage : defaultHospitaCodeValue.phicPackage.toString(),
                    phichciType : defaultHospitaCodeValue.phichciTypeDescription,
                    hospitalCode : defaultHospitaCodeValue.hospitalCode,
                    accreditationNumber : defaultHospitaCodeValue.accreditationNumber
                }
            };            
        }
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsNewContainer
     */
    render() {
        const { 
            open, 
            closeDialog,
            hospitalCodeList,
            phicTransmittalRequestPending } = this.props;

        return (
            <StyleRoot>
                <Dialog 
                    open={ open }
                    onRequestClose={closeDialog.bind(this)}
                    contentStyle={ styles.dialogContentStyle }
                    bodyStyle={styles.dialogBodyStyle}>

                    { /** LOADING INDICATOR */ }
                    { phicTransmittalRequestPending ? 
                        <LoadingIndicatorPerContainer isDialog={true}/>
                    : 
                        <PhicTransmittalsNew 
                            { ...this.onSetDefaultValues() }
                            hospitalCodeList={hospitalCodeList}
                            onSubmit={this.onSave.bind(this)}
                            closeDialog={closeDialog.bind(this)}
                        />                    
                    }
                </Dialog>
            </StyleRoot>
        );
    }
}

// *** props
PhicTransmittalsNewContainer.propTypes = {
    open : PropTypes.bool.isRequired,
    closeDialog : PropTypes.func.isRequired,
    selectedFacility : PropTypes.object.isRequired,
};

export default PhicTransmittalsNewContainer;