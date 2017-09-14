import React from 'react';
import { browserHistory } from 'react-router';
import MouseTrap from 'mousetrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';

// *** dumb components
import ClientUsersEdit from '../components/edit';
import LoadingScreenPerContainer from '../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

/**
 * Client User Edit Container
 * 
 * @class EditContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.clientUsersEditReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class ClientUsersEditContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        Mousetrap.bind(['c'], this.onCancel.bind(this));
    }
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf EditContainer
     */
    componentWillMount() {
        const { getSelectedClientUser } = this.props.actions;
        const { params } = this.props;

        getSelectedClientUser(params.id);
    }

    /**
     * Set Default Values
     * 
     * @returns
     * 
     * @memberOf ClientUsersEditContainer
     */
    onSetDefaultValues() {
        const { selectedClientUser } = this.props;

        return { 
            initialValues : {
                firstname : selectedClientUser.firstname,
                lastname : selectedClientUser.lastname,
                middlename : selectedClientUser.middlename,
                email : selectedClientUser.email,
                username : selectedClientUser.userName
            }
        };
    }

    /**
     * Save Client User
     * 
     * @param {any} values
     * 
     * @memberOf ClientUsersEditContainer
     */
    onSave(values) {
        const { editClientUser } = this.props.actions;
        const { id } = this.props.params;

        values['id'] = id;

        editClientUser(values);
    }

    /**
     * Cancel
     * 
     * 
     * @memberOf ClientUsersEditContainer
     */
    onCancel() {
        browserHistory.goBack();
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ClientUsersEditContainer
     */
    render() {
        const { selectedClientUsersRequestPending, editClientUserRequestPending } = this.props;

        return (
            <StyleRoot>
                { selectedClientUsersRequestPending ?
                    <LoadingScreenPerContainer />
                : 
                    <ClientUsersEdit 
                        { ...this.onSetDefaultValues() } 
                        onSubmit={ this.onSave.bind(this) }
                        onCancel={ this.onCancel.bind(this) }
                        editClientUserRequestPending={editClientUserRequestPending}
                    />
                }
            </StyleRoot>
        );
    }
}

export default ClientUsersEditContainer;
