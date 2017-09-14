import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import MouseTrap from 'mousetrap';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import ClientUsersListItem from './list-item';
import SubheaderListItem from '../../../../shared-components/subheader-list-item';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import BasicDialog from '../../../../shared-components/basic-dialog';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles 
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

import ClientUsersManageAccessContainer from '../../manage-access/containers/manage-access';

const styles = {
    container : {
        
    },

    tableHeaderStyle : {
        backgroundColor: colorPalette.headerBgColor
    }    
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This user will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

/**
 * Client Users List Component 
 * 
 * @class Users
 * @extends {React.Component}
 */
@Radium
class ClientUsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientUsersDialogDelete : false,
            selectedClientUser : null,
            basicDialogOpts : basicDialogOpts,
            search : '',
            openManageAccessDialog: false
        };
    }

    componentDidMount() {
        const { sortUsers } = this.props;

        Mousetrap.bind(['n'], this.onAdd.bind(this));
        Mousetrap.bind(['r'], this.onRefreshList.bind(this));
        Mousetrap.bind(['s'], ()=> sortUsers());
    }

    /**
     * Delete Client User
     * 
     * @param {any} event
     * 
     * @memberOf ClientUsersList
     */
    onDeleteClientUser(event) {
        event.preventDefault();

        const { deleteClientUser } = this.props;

        deleteClientUser(
            this.state.selectedClientUser.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Grant Admin Access
     * 
     * @param {any} event
     * 
     * @memberOf ClientUsersList
     */
    onGrantAdminAccess(event) {
        event.preventDefault();

        const { grantAdminAccess, selectedFacility } = this.props;

        grantAdminAccess(
            this.state.selectedClientUser.id,
            selectedFacility.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Revoke Admin Access
     * 
     * @param {any} event
     * 
     * @memberOf ClientUsersList
     */
    onRevokeAdminAccess(event) {
        event.preventDefault();

        const { revokeAdminAccess, selectedFacility } = this.props;

        revokeAdminAccess(
            this.state.selectedClientUser.id,
            selectedFacility.id,
            this.onCloseBasicDialog.bind(this)         
        );
    }

    /**
     * Open Client Users Dialog Delete
     * 
     * @param {any} event
     * @param {any} selectedClientUser
     * 
     * @memberOf ClientUsersList
     */
    onOpenClientUsersDialogDelete(clientUser, event) {
        event.preventDefault();

        this.setState({
            selectedClientUser : clientUser,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `${clientUser.firstname} ${clientUser.lastname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteClientUser.bind(this), 
                        secondary : true
                    }
                ]
            }
        });
    }

    /**
     * Open Client Users Dialog Grant Admin Access
     * 
     * @param {any} clientUser
     * @param {any} event
     * 
     * @memberOf ClientUsersList
     */
    onOpenClientUsersDialogGrantAdminAccess(clientUser, event) {
        event.preventDefault();

        this.setState({
            selectedClientUser : clientUser,
            basicDialogOpts: {
                ...basicDialogOpts,
                title : 'Grant admin access to',
                subtitle : null,                
                highlightTitle : `${clientUser.firstname} ${clientUser.lastname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'GRANT',
                        action : this.onGrantAdminAccess.bind(this), 
                        secondary : true
                    }
                ]
            }
        });        
    }

    /**
     * Open Client Users Dialog Revoke Admin Access
     * 
     * @param {any} clientUser
     * @param {any} event
     * 
     * @memberOf ClientUsersList
     */
    onOpenClientUsersDialogRevokeAdminAccess(clientUser, event) {
        event.preventDefault();

        this.setState({
            selectedClientUser : clientUser,
            basicDialogOpts: {
                ...basicDialogOpts,
                title : 'Revoke admin access for',
                subtitle : null,                
                highlightTitle : `${clientUser.firstname} ${clientUser.lastname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REVOKE',
                        action : this.onRevokeAdminAccess.bind(this), 
                        secondary : true
                    }
                ]
            }
        });        
    }

    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf ClientUsersList
     */
    onCloseBasicDialog() {

        this.setState({ 
            selectedClientUser : null,
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    /**
     * Close Client Users Dialog Delete
     * 
     * 
     * @memberOf ClientUsersList
     */
    onCloseClientUsersDialogDelete() {

        this.setState({
            clientUsersDialogDelete : false,
            selectedClientUser : null
                      
        });
    }

    setSearch(search) {           
        this.setState({
            search: search
        });
    }

    /**
     * Refresh List
     * 
     * 
     * @memberOf ClientUsersList
     */
    onRefreshList() {
        const { refreshClientUsersList, selectedFacility } = this.props;

        refreshClientUsersList(selectedFacility.id);
    }

    onSortByNameList() {

    }

    onAdd() {
        browserHistory.push('/client-users/new');
    }

    /**
     * Display List Of Users
     * 
     * @returns
     * 
     * @memberOf Client Users List
     */
    onDisplayListOfUsers() {
        const { clientUsersList, selectedFacility, currentUser, resendInvitationEmail} = this.props;

        if (this.state.search.length > 0) {
            return clientUsersList
                .filter(t => t.fullname && t.fullname.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                .map((user, index) => (
                    <ClientUsersListItem 
                        key={index}
                        user={user}
                        currentUser={currentUser}
                        selectedFacility={selectedFacility}
                        onOpenManageAccessDialog={this.onOpenManageAccessDialog.bind(this)}
                        openClientUsersDialogDelete={this.onOpenClientUsersDialogDelete.bind(this)}
                        openClientUsersDialogGrantAdminAccess={this.onOpenClientUsersDialogGrantAdminAccess.bind(this)}
                        openClientUsersDialogRevokeAdminAccess={this.onOpenClientUsersDialogRevokeAdminAccess.bind(this)}
                        resendInvitationEmail={resendInvitationEmail}
                    />    
                ));
        }
        return clientUsersList.map(( user, index ) => (
            <ClientUsersListItem 
                key={index}
                user={user}
                currentUser={currentUser}
                selectedFacility={selectedFacility}
                openClientUsersDialogDelete={this.onOpenClientUsersDialogDelete.bind(this)}
                onOpenManageAccessDialog={this.onOpenManageAccessDialog.bind(this)}
                openClientUsersDialogGrantAdminAccess={this.onOpenClientUsersDialogGrantAdminAccess.bind(this)}
                openClientUsersDialogRevokeAdminAccess={this.onOpenClientUsersDialogRevokeAdminAccess.bind(this)} 
                resendInvitationEmail={resendInvitationEmail}               
            />            
        ));
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Client Users List
     */
    render() {
        const { refreshClientUsersListRequestPending, clientUsersList, basicDialogRequestPending,sortUsers, selectedFacility } = this.props;

        return (
            <StyleRoot>
                <Helmet title="Users" />

                { /** SUB HEADER */ }
                <SubheaderListItem 
                    title="Users"
                    itemCount={ clientUsersList.length }
                    onAdd={ this.onAdd }
                    onRefresh={ this.onRefreshList.bind(this) }                    
                    onSortByName={sortUsers}
                    onSearchChange={this.setSearch.bind(this)}    
                />

                { /** REFRESH INDICATOR */    
                refreshClientUsersListRequestPending ? 
                    <LoadingIndicatorPerContainer />

                :  /** TABLE */ 
                <div style={[styles.container, animation.fadeIn]}>    
                    <Table
                        fixedHeader={true}
                        height="calc(100vh - 328px)">
                        
                        <TableHeader 
                            style={styles.tableHeaderStyle}
                            adjustForCheckbox={false}
                            displaySelectAll={false}>

                            <TableRow>
                                <TableHeaderColumn>NAME</TableHeaderColumn>
                                <TableHeaderColumn>USERNAME</TableHeaderColumn>
                                <TableHeaderColumn>EMAIL</TableHeaderColumn>
                                <TableHeaderColumn>LAST UPDATE</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '100px'}} > </TableHeaderColumn>
                                <TableHeaderColumn style={{width: '100px'}}> </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody 
                            style={styles.TableBodyStyle}
                            showRowHover={true}
                            displayRowCheckbox={false}>

                            { this.onDisplayListOfUsers() }

                        </TableBody>
                    </Table>
                </div>
                }

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ basicDialogRequestPending }
                /> 

                { /** MANAGE ACCESS DIALOG */ }
                { this.state.selectedClientUser
                    ? 
                        <ClientUsersManageAccessContainer
                            open={this.state.openManageAccessDialog}
                            close={this.onCloseManageAccessDialog.bind(this)}
                            selectedClientUser={this.state.selectedClientUser}
                            selectedFacility={selectedFacility} />
                    : null
                }

            </StyleRoot>
        );
    }

    onOpenManageAccessDialog(clientUser) {
        this.setState({
            openManageAccessDialog: true,
            selectedClientUser: clientUser
        });
    }

    onCloseManageAccessDialog() {
        this.setState({
            openManageAccessDialog: false
        });
    }
}

// *** props
ClientUsersList.propTypes = {
    refreshClientUsersListRequest : PropTypes.bool,
    refreshClientUsersList : PropTypes.func
};

export default ClientUsersList;