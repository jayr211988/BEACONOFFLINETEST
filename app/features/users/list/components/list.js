import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import MouseTrap from 'mousetrap';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import UsersListItem from './list-item';
// import UsersDialogDelete from '../containers/users-dialog-delete';
import BasicDialog from '../../../../shared-components/basic-dialog';
import SubheaderListItem from '../../../../shared-components/subheader-list-item';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles 
import animation from '../../../../util/styles/animation';
import colorPalette from '../../../../util/styles/color-pallete';

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This user will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

const styles = {
    container : {
    },

    tableHeaderStyle : {
        backgroundColor: colorPalette.headerBgColor
    }  
};

@Radium
class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null,
            basicDialogOpts : basicDialogOpts,
            search : ''
        };
    }

    componentDidMount() {
        const { getAllUsers ,sortUsers } = this.props;

        Mousetrap.bind(['n'], this.onAdd.bind(this));
        Mousetrap.bind(['r'], ()=> getAllUsers());
        Mousetrap.bind(['s'], ()=> sortUsers());
    }

    onOpenDeleteDialog(user, event) {            
        event.preventDefault();

        this.setState({
            selectedUser : user,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `${user.fullname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteSelectedUser.bind(this), 
                        secondary : true
                    }
                ]
            }
        });                        
    }
        
    setSearch(search) {           
        this.setState({
            search: search
        });
    }

    onCloseBasicDialog() {

        this.setState({ 
            selectedUser : null,
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    onDeleteSelectedUser() {
        const {deleteSelectedUser} = this.props;        
        deleteSelectedUser(this.state.selectedUser.id, this.onCloseBasicDialog.bind(this) );
    }


    /**
     * Display List Of UsersList
     * 
     * @returns
     * 
     * @memberOf UsersList
     */
    onDisplayListOfUsers() {
        
        const {users} = this.props;                
        if (this.state.search.length > 0) {
            return users
                .filter(t => t.fullname && t.fullname.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                .map((user, index) => (
                    <UsersListItem  
                        key={index}     
                        user={user} 
                        openDeleteDialog={this.onOpenDeleteDialog.bind(this)}
                    />
                ));
        }

        

        return users.map(
            ( user, index ) => (
                <UsersListItem  
                    key={index}     
                    user={user} 
                    openDeleteDialog={this.onOpenDeleteDialog.bind(this)}
                />
            )
        );                                  
    }

    

    

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf UsersList
     */
    render() {

        const {users, sortUsers, getAllUsers, deleteUserPending} = this.props;                
        return (
            <StyleRoot>
                <Helmet title="Users" />

                { /** SUB HEADER */ }
                <SubheaderListItem 
                    title="Users"
                    itemCount={users.length}
                    onAdd={this.onAdd}
                    onSearchChange={this.setSearch.bind(this)}                    
                    onSortByName={sortUsers}
                    onRefresh={getAllUsers}
                />

                { /** TABLES */ }
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
                                <TableHeaderColumn> </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody 
                            showRowHover={true}
                            style={styles.TableBodyStyle}
                            displayRowCheckbox={false}>

                            { this.onDisplayListOfUsers() }

                        </TableBody>
                    </Table>
                </div>
    
              
                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ deleteUserPending }
                /> 

            </StyleRoot>
        );
    }

    onAdd() {
        browserHistory.push('/users/new');
    }
}

// *** props
UsersList.propTypes = {
    
};

export default UsersList;