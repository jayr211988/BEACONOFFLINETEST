import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// *** dumb components
import PhicTransactionsEclaimsApiList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import UnauthorizedAccess from '../../../../shared-components/placeholders/unauthorized-access';

import Radium, { StyleRoot } from 'radium';
import { hasPHICECLAIMS, hasPHICECLAIMSAPI } from '../../../../util/rules';
import { hasPHICEclaimsAccess } from '../../../../util/roles';

import * as duck from '../duck';
import moment from 'moment';

// *** default filter
const defaultFilter = {
    dateFrom: moment().add({months: -3}).startOf('day').toDate(),
    dateTo : moment().endOf('day').toDate(),
    selectedDateRangeLabel : '3 MONTHS AGO',
    selectedStatusLabel : 'ALL'
};

/**
 * PHIC Transactions Eclaims Api Container
 * 
 * @class PhicTransactionsEclaimsApiContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.phicTransactionsEclaimsApiListReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
@Radium
class PhicTransactionsEclaimsApiContainer extends React.Component{
    
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicTransactionsEclaimsApiContainer
     */
    componentWillMount() {
        const { selectedFacility, actions : { getPhicTransactionsEclaimsApi } } = this.props;

        getPhicTransactionsEclaimsApi(
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
     * @memberOf PhicTransactionsEclaimsApiContainer
     */
    render(){
        const { 
            search,
            currentUser, 
            selectedFacility, 
            transactionsEclaimsApiList, 
            getPhicTransactionsEclaimsApiRequestPending, 
            
            actions: {
                getPhicTransactionsEclaimsApi }} = this.props;

        return(
            <StyleRoot>
                <Helmet title="Transactions API" />

                { hasPHICECLAIMSAPI(selectedFacility)  ?

                    getPhicTransactionsEclaimsApiRequestPending ? 
                        // *** LOADING INDICATOR
                        <LoadingIndicatorPerContainer />
                        :
                        <PhicTransactionsEclaimsApiList
                            defaultFilter={defaultFilter}
                            transactionsEclaimsApiList={transactionsEclaimsApiList}
                            getPhicTransactionsEclaimsApi={getPhicTransactionsEclaimsApi}
                            selectedFacility={selectedFacility} 
                            search={search}
                        /> 

                    : <UnauthorizedAccess />
                }
            </StyleRoot>
        );
    }
}
export default PhicTransactionsEclaimsApiContainer;
