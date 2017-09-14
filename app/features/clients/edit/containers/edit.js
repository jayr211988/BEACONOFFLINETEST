import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';
import ClientsEdit from '../components/edit';
import LoadingScreenPerContainer from '../../../../shared-components/loading-indicator-per-container';

@connect(
    (state) => state.clientsEditReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
class ClientsEditContainer extends React.Component {
    
    componentWillMount() {
        const { actions, params } = this.props;
        const { getSelectedClient } = actions;

        getSelectedClient(params.id);
    }

    onSetDefaultValues() {
        const { selectedClient } = this.props;

        return { 
            initialValues : selectedClient
        };
    }

    onSubmit(values) {
        const { actions } = this.props;
        const { editClient } = actions;

        editClient(values);
    }

    render() {
        const { children, editClientsRequestPending, selectedClientsRequestPending,selectedClient } = this.props;

        return selectedClientsRequestPending
            ? (<LoadingScreenPerContainer />)
            : (<ClientsEdit children={children}
                    {...this.onSetDefaultValues()}
                    onSubmit={this.onSubmit.bind(this)}
                    selectedClient={selectedClient}
                    editClientsRequestPending={editClientsRequestPending} />);
    }
}
export default ClientsEditContainer;
