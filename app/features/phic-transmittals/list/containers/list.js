import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import PhicTransmittalsList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import UnauthorizedAccess from '../../../../shared-components/placeholders/unauthorized-access';

import Radium, { StyleRoot } from 'radium';

import {hasPHICECLAIMS} from '../../../../util/rules';
import {hasPHICEclaimsAccess} from '../../../../util/roles';

import moment from 'moment';

// *** default filter
const defaultFilter = {
    dateFrom: moment().add({months: -1}).startOf('day').toDate(),
    dateTo : moment().endOf('day').toDate(),
    selectedDateRangeLabel : 'LAST MONTH',
    selectedStatusLabel : 'ALL'
};

/**
 * PHIC Transmittals List Container
 * 
 * @class PhicTransmittalsListContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicTransmittalsListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicTransmittalsListContainer extends React.Component {

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicTransmittalsListContainer
     */
    componentWillMount() {

        const { 
            selectedFacility, 
            actions: { getPhicTransmittalsList } } = this.props;

        getPhicTransmittalsList(
            selectedFacility.id, 
            null, 
            defaultFilter.dateFrom,
            defaultFilter.dateTo
        );
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsListContainer
     */
    render() {
        const { 
            transmittalsList, 
            selectedFacility, 
            getPhicTransmittalsListRequestPending,
            refreshPhicTransmittalsRequestPending,
            basicDialogRequestPending,
            currentUser,
            uploadingFiles,

            actions : {
                // *** Actions
                refreshPhicTransmittals,
                deletePhicTransmittal,
                submitPhicTransmittal,
                verifyClaimStatus,
                setToComplete,
                getPHICTransmittalStatusById,
                newPHICTransmittalOfflineMode,
                addUploadingFiles
            }} = this.props;

        return (
            <StyleRoot>
                <Helmet title="PHIC Transmittals"/>

                { hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility) ?

                    getPhicTransmittalsListRequestPending ? 
                        < LoadingIndicatorPerContainer />                
                    : 
                    <PhicTransmittalsList
                        defaultFilter={defaultFilter}
                        transmittalsList={transmittalsList} 
                        selectedFacility={selectedFacility}
                        refreshPhicTransmittals={refreshPhicTransmittals}
                        deletePhicTransmittal={deletePhicTransmittal}
                        refreshPhicTransmittalsRequestPending={refreshPhicTransmittalsRequestPending}
                        basicDialogRequestPending={basicDialogRequestPending}
                        submitPhicTransmittal={submitPhicTransmittal}
                        verifyClaimStatus={verifyClaimStatus}
                        setToComplete={setToComplete}
                        currentUser={currentUser}
                        getPHICTransmittalStatusById={getPHICTransmittalStatusById}
                        newPHICTransmittalOfflineMode={newPHICTransmittalOfflineMode}
                        addUploadingFiles={addUploadingFiles}
                        uploadingFiles={uploadingFiles}
                    /> 

                    : <UnauthorizedAccess />
                }
            </StyleRoot>
        );
    }
}

export default PhicTransmittalsListContainer;
