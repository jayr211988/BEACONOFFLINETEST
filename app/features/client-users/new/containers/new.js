import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';

// *** dumb components
import ClientUsersNew from '../components/new';

import Radium, { StyleRoot } from 'radium';

/**
 * Client USers New Container
 * 
 * @class NewContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.clientUsersNewReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
@Radium
class ClientUsersNewContainer extends React.Component {
    constructor(props){
        super(props);
    }
    /**
     * Save New Client User
     * 
     * @param {any} values
     * 
     * @memberOf NewContainer
     */
    onSave(values,x,{reset}) {
        const { selectedFacility, actions: { newClientUser } } = this.props;
        
        newClientUser(
            values, 
            selectedFacility.id, 
            reset
        );
    }



    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf NewContainer
     */
    render() {
        const { actions: {checkIfEmailExist}, newClientUsersRequestPending, existingClientUserName, existingClientuserRequestPending } = this.props;

        return (
            <StyleRoot>
                <ClientUsersNew                      
                    checkIfEmailExist={checkIfEmailExist}
                    onSubmit={this.onSave.bind(this)}
                    newClientUsersRequestPending={newClientUsersRequestPending}
                    existingClientuserRequestPending={existingClientuserRequestPending}
                    existingClientUserName={existingClientUserName}
                />
            </StyleRoot>
        );
    }
}

export default ClientUsersNewContainer;
