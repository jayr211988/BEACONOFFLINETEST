import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// *** dumb components
import PhicTransactionsEclaimsList from '../components/list';
import Radium, { StyleRoot } from 'radium';
import {hasPHICECLAIMS} from '../../../../util/rules';
import { hasPHICEclaimsAccess, isClientUser } from '../../../../util/roles';
import UnauthorizedAccess from '../../../../shared-components/placeholders/unauthorized-access';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import * as duck from '../duck';
import moment from 'moment';

const defaultFilter = {
    dateFrom: moment().add({months: -3}).startOf('day').toDate(),
    dateTo : moment().endOf('day').toDate(),
    selectedDateRangeLabel : '3 MONTHS AGO',
    selectedStatusLabel : 'ALL'
};

/**
 * 
 * 
 * @class PhicTransactionsContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.phicTransactionsEclaimsListReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
@Radium
class PhicTransactionsEclaimsContainer extends React.Component{

    componentWillMount() {
        const { selectedFacility, actions: {getPhicTransactionsEclaims} } = this.props;

        getPhicTransactionsEclaims(
            selectedFacility.id, 
            null, 
            defaultFilter.dateFrom, 
            defaultFilter.dateTo);
    }

    render(){
        const { 
            search,
            currentUser, 
            selectedFacility, 
            phicTransactionsEclaimsList, 
            getPhicTransactionsEclaimsRequestPending, 
            actions: {getPhicTransactionsEclaims} } = this.props;

        return(
            <StyleRoot>
                { hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility) ? 
                    
                    getPhicTransactionsEclaimsRequestPending ? 
                        <LoadingIndicatorPerContainer />
                    :
                     <PhicTransactionsEclaimsList
                        defaultFilter={defaultFilter}
                        phicTransactionsEclaimsList={phicTransactionsEclaimsList}
                        getPhicTransactionsEclaims={getPhicTransactionsEclaims}
                        selectedFacility={selectedFacility}
                        getPhicTransactionsEclaimsRequestPending={getPhicTransactionsEclaimsRequestPending} 
                        search={search}
                        />
                        
                        
                    : <UnauthorizedAccess />
                }
            </StyleRoot>
        );
    }
}
export default PhicTransactionsEclaimsContainer;
