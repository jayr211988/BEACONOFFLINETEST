import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';

// *** dumb components
import ClientUsersList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import UnauthorizedAccess from '../../../../shared-components/placeholders/unauthorized-access';
import {isClientUser} from '../../../../util/roles';

import Radium, { StyleRoot } from 'radium';

/**
 * Client User List Container
 * 
 * @class ClientUsersListContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.clientUsersListReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
@Radium
class ClientUsersListContainer extends React.Component {

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf ClientUsersListContainer
     */
    componentWillMount() {
        const { actions : {  getClientUsersList }, selectedFacility } = this.props;

        getClientUsersList(selectedFacility.id);
    }
    

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ClientUsersListContainer
     */
    render() {
        const { 
            clientUsersListRequestPending, 
            refreshClientUsersListRequestPending, 
            basicDialogRequestPending,
            selectedFacility, 
            clientUsersList,
            currentUser,
            actions : { 
                // *** Actions
                sortUsers,
                refreshClientUsersList,
                deleteClientUser,
                grantAdminAccess,
                revokeAdminAccess,
                resendInvitationEmail
            }} = this.props;

        return (

            <StyleRoot>
                { clientUsersListRequestPending ?
                    <LoadingIndicatorPerContainer />
                : isClientUser(currentUser, selectedFacility)
                        ? <UnauthorizedAccess />
                        :
                        <ClientUsersList 
                            currentUser={currentUser}
                            clientUsersList={ clientUsersList }
                            deleteClientUser={deleteClientUser}
                            selectedFacility={selectedFacility}
                            sortUsers={sortUsers}
                            basicDialogRequestPending={basicDialogRequestPending}
                            refreshClientUsersListRequestPending={refreshClientUsersListRequestPending}
                            refreshClientUsersList={ refreshClientUsersList }
                            grantAdminAccess={grantAdminAccess}
                            revokeAdminAccess={revokeAdminAccess}
                            resendInvitationEmail={resendInvitationEmail}
                        />
                }
            </StyleRoot>
        );
    }
}
export default ClientUsersListContainer;
