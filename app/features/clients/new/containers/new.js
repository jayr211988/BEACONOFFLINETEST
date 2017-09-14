import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsNew from '../components/new';
import {newClient} from '../duck';

@connect(
    (state) => state.clientsNewReducer,
    (dispatch) => ({ actions: bindActionCreators({newClient}, dispatch) })
)
class ClientsNewContainer extends React.Component {
    onSave(values, x, {reset}) {
        const { newClient } = this.props.actions;        

        values['firstname'] = values.contactFirstname;
        values['lastname'] = values.contactLastname;
        values['middlename'] = values.contactMiddlename;
        values['email'] = values.contactEmail;
        values['userName'] = values.contactEmail;

        newClient(values, reset);
    }    
    
    render() {
        const { actions, newClientRequestPending } = this.props;
        const { newClient } = actions;

        return (<ClientsNew newClient={newClient} newClientRequestPending={newClientRequestPending} onSubmit={this.onSave.bind(this)}/>);
    }
}
export default ClientsNewContainer;
