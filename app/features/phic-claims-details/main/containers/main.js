import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import PhicClaimDetailsMain from '../components/main';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import { productType } from '../../../../util/rules';
import Radium, { StyleRoot } from 'radium';

/**  
 *
 * @class PhicClaimsDetailsMainContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsMainReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) })
)
@Radium
class PhicClaimsDetailsMainContainer extends React.Component {

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicClaimsDetailsMainContainer
     */
    componentWillMount() {

        const {
            params, 
            actions: {
                // *** Actions            
                getSelectedTransmittal,
                getPHICClaim
            }} = this.props;

        
        getSelectedTransmittal(params.transmittalId);

        if (params.cf1mode == 'edit' || params.cf1mode == 'summary' || params.cf2mode === 'summary') {
            getPHICClaim(params.claimId);
        }
    }

    componentWillUnmount() {
        const { resetPHICClaimFields } = this.props.actions;
        resetPHICClaimFields();
    }

    /**
     * Render     
     *
     * @memberOf PhicClaimsDetailsMainContainer
     */
    render() {

        const {
            selectedTransmittal,
            //isMemberElegible,
            //memberClaimStatus,
            claimsIssuesTotal,
            selectedClaim,
            hospitalCodes,
            getSelectedTransmittalRequestPending,
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending,
            getPhicClaimsDetailsCf1SummaryPending,
            getSelectedPhicClaimDetailCf2RequestPending,
            getPHICAllCaseRateRequestPending,
            getPHICChargesDrugsAndMedicinesRequestPending,
            getPHICDocumentsRequestPending,
            getPHICClaimRequestPending,
            location,
            params
        } = this.props;

        if(getSelectedTransmittalRequestPending || getPHICClaimRequestPending)
            return ( <LoadingIndicatorPerContainer fixedHeader={true}/> );

        return (
            <StyleRoot>
                <PhicClaimDetailsMain
                    claimsIssuesTotal={claimsIssuesTotal}
                    //memberClaimStatus={memberClaimStatus}
                    //isMemberElegible={isMemberElegible}
                    hospitalCodes={hospitalCodes}
                    selectedTransmittal={selectedTransmittal}
                    selectedClaim={params.cf1mode == 'edit' || params.cf1mode == 'summary' ? selectedClaim : null}
                    params={params}
                    summaryMode={ selectedClaim ? selectedClaim.claimStatus >= 4 : null }
                    getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending={getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending}
                    getPhicClaimsDetailsCf1SummaryPending={getPhicClaimsDetailsCf1SummaryPending}
                    getSelectedPhicClaimDetailCf2RequestPending={getSelectedPhicClaimDetailCf2RequestPending}
                    getPHICAllCaseRateRequestPending={getPHICAllCaseRateRequestPending}
                    getPHICChargesDrugsAndMedicinesRequestPending={getPHICChargesDrugsAndMedicinesRequestPending}
                    getPHICDocumentsRequestPending={getPHICDocumentsRequestPending}
                    location={location}
                /> 
            </StyleRoot>
        );
    }
}

export default PhicClaimsDetailsMainContainer;
