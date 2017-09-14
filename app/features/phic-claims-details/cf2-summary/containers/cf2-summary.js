import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as duck from '../duck';

import Radium, {StyleRoot} from 'radium';

import Cf2Summary from '../components/cf2-summary';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

import moment from 'moment';

@connect (
    state => state.phicClaimsDetailsCf2SummaryReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2SummaryContainer extends React.Component {

    componentWillMount() {
        const {selectedClaim, actions: {getPhicClaimsDetailsCf2Summary}} = this.props;   

        getPhicClaimsDetailsCf2Summary(selectedClaim.id);
    }

    onConvertToLocal(name) {
        const { patientCF2Info } = this.props;
        const property = patientCF2Info[name];

        if(property)
            return moment.utc(property).toDate();
    }

    onSetDefaultValues() {
        const { patientCF2Info } = this.props;     
        
        patientCF2Info.aprDate =this.onConvertToLocal('aprDate');
        patientCF2Info.animalBiteDay0ARV = this.onConvertToLocal('animalBiteDay0ARV');
        patientCF2Info.animalBiteDay7ARV = this.onConvertToLocal('animalBiteDay7ARV');
        patientCF2Info.animalBiteDay3ARV = this.onConvertToLocal('animalBiteDay3ARV');
        patientCF2Info.animalBiteRIG = this.onConvertToLocal('animalBiteRIG');
        patientCF2Info.animalBiteOthers = this.onConvertToLocal('animalBiteOthers');
        patientCF2Info.mcP1stCheckupDate = this.onConvertToLocal('mcP1stCheckupDate');
        patientCF2Info.mcP2ndCheckupDate = this.onConvertToLocal('mcP2ndCheckupDate'); 
        patientCF2Info.mcP3rdCheckupDate = this.onConvertToLocal('mcP3rdCheckupDate'); 
        patientCF2Info.mcP4thCheckupDate = this.onConvertToLocal('mcP4thCheckupDate');            
        
        return {
            initialValues : patientCF2Info
        };     
    }

    render () {
        const {patientCF2Info, selectedTransmittal, selectedClaim, phicAllCaseRates, getPhicClaimsDetailsCf1SummaryPending} = this.props;

        return (
            <StyleRoot>
                { getPhicClaimsDetailsCf1SummaryPending ? 
                    <LoadingIndicatorPerContainer /> :

                    <Cf2Summary 
                        {...this.onSetDefaultValues()} 
                        patientCF2Info={patientCF2Info} 
                        selectedTransmittal={selectedTransmittal} 
                        selectedClaim={selectedClaim}
                        phicAllCaseRates={phicAllCaseRates}
                    />
                }

            </StyleRoot>
        );
    }
}

export default Cf2SummaryContainer;