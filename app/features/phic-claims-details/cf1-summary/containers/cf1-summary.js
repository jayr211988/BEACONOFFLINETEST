import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as duck from '../duck';
import {formValueSelector } from 'redux-form';

import Radium , {StyleRoot} from 'radium';

// *** dumb components
import Cf1Summary from '../components/cf1-summary';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';


const phicClaimsDetailsCf2FormSelector 
    = formValueSelector('phicClaimsDetailsCf2Form');

@connect (
    state => {
        // const { isFinalReady } = state.phicClaimsDetailsCf2Reducer;    

        const phicClaimsDetailsCf2FormValues =
            phicClaimsDetailsCf2FormSelector( state, 
                'grandTotal', 
                'admissionDate',
                'admissionTime',
                'dischargeDate',
                'dischargeTime',
                'totalHospitalFees',
                'hospitalFeesActualCharges'
            );
            
        return state = {
            phicClaimsDetailsCf2FormValues,
            // isFinalReady,
            ...state.phicClaimsDetailsCf1SummaryReducer
        };
    },
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf1SummaryContainer extends React.Component {

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf Cf1SummaryContainer
     */
    componentWillMount() {
        const { params, actions: { getPhicClaimsDetailsCf1Summary}} = this.props;              
        getPhicClaimsDetailsCf1Summary(params.claimId);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf1SummaryContainer
     */
    render() {
        const { 
            patientInfo, 
            membershipElegibilityInfo,
            params,
            getPhicClaimsDetailsCf1SummaryPending,
            validateMemberEligibilityRequestPending,
            getPBEFDocumentRequestPending,
            phicClaimsDetailsCf2FormValues,
            //isMemberElegible,
            selectedClaim,
            //memberClaimStatus,
            selectedTransmittal,
            documentList,
            isFinalReady,
            claimsIssuesTotal,

            actions: {
                // *** Actions
                validateMemberEligibility,
                finalizedElegibility,
                editPhicClaimsMembershipStatus,
                printPBEF
            }} = this.props;
        

        return (
            <StyleRoot>
                { getPhicClaimsDetailsCf1SummaryPending ? 
                    <LoadingIndicatorPerContainer />
                : 

                    selectedClaim ? 
                        <Cf1Summary 
                            patientInfo={patientInfo}
                            membershipElegibilityInfo={membershipElegibilityInfo}
                            //isMemberElegible={isMemberElegible}
                            validateMemberEligibility={validateMemberEligibility}
                            validateMemberEligibilityRequestPending={validateMemberEligibilityRequestPending}
                            getPBEFDocumentRequestPending={getPBEFDocumentRequestPending}
                            params={params}
                            selectedClaim={selectedClaim}
                            //memberClaimStatus={memberClaimStatus}
                            selectedTransmittal={selectedTransmittal}
                            documentList={documentList}
                            phicClaimsDetailsCf2FormValues={phicClaimsDetailsCf2FormValues}
                            isFinalReady={isFinalReady}
                            claimsIssuesTotal={claimsIssuesTotal}
                            finalizedElegibility = {finalizedElegibility}
                            editPhicClaimsMembershipStatus = {editPhicClaimsMembershipStatus}
                            printPBEF={printPBEF}
                        />          
                        : null                              
                }
            </StyleRoot>
        );
    }
}

export default Cf1SummaryContainer;