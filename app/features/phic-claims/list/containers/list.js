import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import PhicClaimsList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

/**
 * PHIC Claims List Container
 * 
 * @class phicClaimsListContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicClaimsListContainer extends React.Component {

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicClaimsListContainer
     */
    componentWillMount() {
        
        const { 
        params, 
        actions : { 
            // *** Actions
            getPhicClaimsList,
            getSelectedTransmittal
        }} = this.props;
console.log(getSelectedTransmittal);
        getSelectedTransmittal(1);
        getPhicClaimsList(1);

        console.log(this.props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf phicClaimsListContainer
     */
    render() {
        const { 
            claimsList, 
            selectedTransmittal,
            selectedFacility,
            getPhicClaimsListRequestPending, 
            getSelectedTransmittalRequest,
            refreshPhicClaimsListRequestPending,
            deletePhicClaimRequestPending,
            params,
            uploadingFiles,            

            actions: {
                // *** Actions                
                refreshPhicClaimsList,
                sortPhicClaimsList,
                deletePhicClaim,
                getTransmittalStatusAndPackageType,
                addUploadingFiles,
                newPHICTransmittalOfflineMode,
                
                resetPatientInfoandMemberPin,
            }} = this.props;        
            
            console.log(this.props);
            {console.log(window.location.host)}
            {console.log(window.location)}
        return (
            <StyleRoot>
                <Helmet title="PHIC Claims"/>

                { getPhicClaimsListRequestPending || getSelectedTransmittalRequest? 
                    <LoadingIndicatorPerContainer />
                : 
                    <PhicClaimsList 
                        selectedFacility={selectedFacility}
                        claimsList={claimsList} 
                        selectedTransmittal={selectedTransmittal}
                        refreshPhicClaimsList={refreshPhicClaimsList}
                        refreshPhicClaimsListRequestPending={refreshPhicClaimsListRequestPending}                        
                        sortPhicClaimsList={sortPhicClaimsList}
                        deletePhicClaim={deletePhicClaim}                        
                        deletePhicClaimRequestPending={deletePhicClaimRequestPending}                      
                        params={params}
                        resetPatientInfoandMemberPin={resetPatientInfoandMemberPin}
                        getTransmittalStatusAndPackageType={getTransmittalStatusAndPackageType}
                        uploadingFiles={uploadingFiles}
                        addUploadingFiles={addUploadingFiles}
                        newPHICTransmittalOfflineMode={newPHICTransmittalOfflineMode}
                    />                
                }

            </StyleRoot>
        );
    }
}

export default PhicClaimsListContainer;
