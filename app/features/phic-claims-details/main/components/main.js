import React from 'react';
import Helmet from 'react-helmet';
import Radium, { StyleRoot } from 'radium';

import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
configureAnchors({offset: -265});
// *** dumb components

// *** smart components
import Subheader from './subheader';
import Cf1SummaryContainer from '../../cf1-summary/containers/cf1-summary';
import Cf1NewContainer from '../../cf1-new/containers/cf1';
import Cf1EditContainer from '../../cf1-edit/containers/cf1-edit';
import Cf2Container from '../../cf2/containers/cf2';
import Cf2SummaryContainer from '../../cf2-summary/containers/cf2-summary';
import ChargesContainer from '../../charges/containers/charges';
import DocumentsListContainer from '../../documents/list/containers/list';
import Payments from '../../payments';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import { claimStatus, transmittalStatus } from '../../../../util/data';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

const styles = {
    container : {
        backgroundColor: colorPalette.lightBgColor,
        padding: '265px 35px 10px',
        minHeight: 'calc(100vh - 530px)'
    },

    loadingContainer: {
        backgroundColor: 'white', 
        position: 'fixed', 
        zIndex: '11', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
};

/**
 * 
 * 
 * @class PhicClaimDetailsMain
 * @extends {React.Component}
 */
@Radium
class PhicClaimDetailsMain extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            openClaimsIssuesDialog : false,

            selectedClaim : null 
        };    
    }

    onCloseClaimsIssuesDialog() {
        this.setState({
            openClaimsIssuesDialog : false
        });
    }

    componentWillReceiveProps(nextProps) {        
        this.setState({
            selectedClaim : nextProps.selectedClaim
        });
    }

    render() {
        const { 
            params, 
            selectedTransmittal, 
            selectedClaim, 
            claimsIssuesTotal, 
            location,
            //isMemberElegible, 
            //memberClaimStatus, 
            
            getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending, 
            getPhicClaimsDetailsCf1SummaryPending, 
            getPHICChargesDrugsAndMedicinesRequestPending, 
            getPHICDocumentsRequestPending } = this.props;
                    
        return(          
            <StyleRoot >
                {/*TODO REY FOR REFACTORING*/}
                { !selectedClaim ? null : 
                selectedClaim.claimStatus == claimStatus.eligible || selectedClaim.claimStatus == claimStatus.inProcess ||
                selectedClaim.claimStatus == claimStatus.return || selectedClaim.claimStatus == claimStatus.denied || selectedClaim.claimStatus == claimStatus.withCheque
                 || selectedClaim.claimStatus == claimStatus.withVoucher || selectedClaim.claimStatus == claimStatus.vouchering || selectedClaim.claimStatus == claimStatus.conditional ? 
               
                 getPhicClaimsDetailsCf2SurgicalProcedureListRequestPending || getPhicClaimsDetailsCf1SummaryPending
                 || getPHICChargesDrugsAndMedicinesRequestPending || getPHICDocumentsRequestPending
                 ?  <div style={styles.loadingContainer}>
                        <LoadingIndicatorPerContainer />
                    </div> :                     
                    null
                

                     :null
                 }

                <Helmet title="PHIC Claims Details"/>       

                { /** SUBHEADER */ }
                <Subheader 
                    selectedTransmittal={selectedTransmittal} 
                    selectedClaim={selectedClaim}
                    params={params} 
                    //isMemberElegible={isMemberElegible} 
                    //memberClaimStatus={memberClaimStatus}
                    claimsIssuesTotal={claimsIssuesTotal}
                />
                
                <div style={styles.container}>

                    { /** CF1 New Container */ }
                    { params.cf1mode !== 'summary' && params.cf1mode !== 'edit' ?
                        <ScrollableAnchor id={'cf1Navigation'}>                                                
                            <Cf1NewContainer 
                                params = {params}
                                selectedTransmittal={selectedTransmittal}
                            />
                        </ScrollableAnchor>
                    : null 
                    }

                    { /** CF1 Summary Container */ }
                    { selectedClaim && params.cf1mode === 'summary' ?
                        <ScrollableAnchor id={'cf1Navigation'}>                        
                            <Cf1SummaryContainer 
                                params={params} 
                                selectedClaim={selectedClaim} 
                                //isMemberElegible={isMemberElegible}
                                selectedTransmittal={selectedTransmittal}
                                //memberClaimStatus={memberClaimStatus}
                                claimsIssuesTotal={claimsIssuesTotal}
                            />
                        </ScrollableAnchor>
                        : null 
                    }
                    
                    { /** CF1 Edit Container */ }
                    { params.cf1mode === 'edit'  ?
                        <ScrollableAnchor id={'cf1Navigation'}>                                                
                            <Cf1EditContainer 
                                params={params}
                                selectedTransmittal={selectedTransmittal}
                            />
                        </ScrollableAnchor>
                    : null
                    }

                    { /** CF2 Container */ }
                    { this.state.selectedClaim 
                    && (this.state.selectedClaim.claimStatus == claimStatus.eligible || this.state.selectedClaim.claimStatus == claimStatus.conditional)
                    && (selectedTransmittal.transmittalStatus == transmittalStatus.transmitError || selectedTransmittal.transmittalStatus == transmittalStatus.draft) 
                     ? 

                        <ScrollableAnchor id={'cf2Navigation'}> 
                            <Cf2Container 
                                selectedClaim={selectedClaim} 
                                params={params}
                                selectedTransmittal={selectedTransmittal}
                                location={location}
                            />
                        </ScrollableAnchor >
                    : null 
                    }

                    { /** CF2 Summary Container */ }
                    { selectedClaim
                    && selectedTransmittal.transmittalStatus != transmittalStatus.draft && selectedTransmittal.transmittalStatus != transmittalStatus.transmitError ? 

                        <ScrollableAnchor id={'cf2Navigation'}> 
                            <Cf2SummaryContainer 
                                selectedClaim={selectedClaim} 
                                selectedTransmittal={selectedTransmittal}/>
                        </ScrollableAnchor>
                    : null
                    }

                    {/**for editing or transmittal status is DRAFT*/}
                    { selectedClaim 
                    && (selectedClaim.claimStatus == claimStatus.eligible || selectedClaim.claimStatus == claimStatus.conditional)  
                    && (selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError) ? 

                        <ScrollableAnchor id={'charges'}>
                            <ChargesContainer 
                                selectedClaim={selectedClaim} 
                                summaryMode={false}
                            />
                        </ScrollableAnchor>
                    : null
                    }
                    
                    {/**for editing or transmittal status is any except DRAFT*/}
                    { selectedClaim 
                    && (selectedTransmittal.transmittalStatus != transmittalStatus.draft && selectedTransmittal.transmittalStatus != transmittalStatus.transmitError) ? 

                        <ScrollableAnchor id={'charges'}>
                            <ChargesContainer 
                                selectedClaim={selectedClaim} 
                                summaryMode={true}
                            />
                        </ScrollableAnchor>
                    : null
                    }

                    {/**for editing or transmittal status is DRAFT*/}
                    { selectedClaim
                    && (selectedClaim.claimStatus == claimStatus.eligible || selectedClaim.claimStatus == claimStatus.conditional)  
                    && (selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError) ?

                        <ScrollableAnchor id={'payments'}>
                            <Payments 
                                selectedClaim={selectedClaim} 
                                selectedTransmittal={selectedTransmittal}
                                summaryMode={false} />
                        </ScrollableAnchor>
                    : null
                    }

                    {/**for editing or transmittal status is any except DRAFT*/}
                    { selectedClaim                 
                    && (selectedTransmittal.transmittalStatus != transmittalStatus.draft && selectedTransmittal.transmittalStatus != transmittalStatus.transmitError) ? 

                        <ScrollableAnchor id={'payments'}>
                            <Payments 
                                selectedClaim={selectedClaim} 
                                selectedTransmittal={selectedTransmittal}
                                summaryMode={true} />
                        </ScrollableAnchor>
                    : null
                    }

                    {/**for editing or transmittal status is DRAFT*/}
                    { selectedClaim
                    && (selectedClaim.claimStatus == claimStatus.eligible || selectedClaim.claimStatus == claimStatus.conditional) 
                    && (selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError) ? 

                        <ScrollableAnchor id={'documentsNavigation'}>
                            <DocumentsListContainer 
                                selectedClaim={selectedClaim}
                                selectedTransmittal={selectedTransmittal}
                                summaryMode={false} 
                            />
                        </ScrollableAnchor>
                    : null
                    }

                    {/**for editing or transmittal status is any except DRAFT*/}
                    { selectedClaim 
                    && (selectedTransmittal.transmittalStatus != transmittalStatus.draft && selectedTransmittal.transmittalStatus != transmittalStatus.transmitError) ? 

                        <ScrollableAnchor id={'documentsNavigation'}>
                            <DocumentsListContainer 
                                selectedClaim={selectedClaim}
                                selectedTransmittal={selectedTransmittal}
                                summaryMode={true} />
                        </ScrollableAnchor>
                    : null
                    }
                </div>  
            </StyleRoot>
        );
    }
}

export default PhicClaimDetailsMain;