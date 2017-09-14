import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsList from '../components/list';
import * as duck from '../duck';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

@connect(
    (state) => state.clientsListReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
class ClientsListContainer extends React.Component {
    
    componentWillMount() {
        const { actions } = this.props;
        const { getClientsList } = actions;

        getClientsList();
    }

    render() {
        const { 
            clientsListRequestPending, 
            refreshClientsListRequestPending,
            deleteClientsRequestPending,
            resendInviteRequestPending,
            clientsListFilterRequestPending,
            clientsList, 

            actions: { 
                // *** Actions
                sortClients, 
                getClientByProductType,
                refreshClientsList,
                deleteClient,
                resendInvite
        }} = this.props;

        return clientsListRequestPending
            ? (<LoadingIndicatorPerContainer />)
            : (<ClientsList
                    clientsList={clientsList}
                    sortClients={sortClients}
                    deleteClient={deleteClient}
                    deleteClientsRequestPending={deleteClientsRequestPending}
                    refreshClientsListRequestPending={refreshClientsListRequestPending}
                    resendInviteRequestPending={resendInviteRequestPending}
                    clientsListFilterRequestPending={clientsListFilterRequestPending}
                    refreshClientsList={refreshClientsList}
                    resendInvite={resendInvite}
                    getClientByProductType={getClientByProductType} />)
        ;
    }
}
export default ClientsListContainer;
