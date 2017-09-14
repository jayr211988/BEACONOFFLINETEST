import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from '../components/list';
import {getAllUsers, sortUsers, deleteSelectedUser} from '../duck';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

@connect(
    (state) => state.usersListReducer,
    (dispatch) => ({ actions: bindActionCreators({getAllUsers, sortUsers, deleteSelectedUser}, dispatch) })
)
class UsersListContainer extends React.Component {

    componentWillMount() {               
        const { actions } = this.props;
        const {getAllUsers} = actions;        
        getAllUsers();
        
    }
    render() {
        const { users, 
                getAllUsersPending,
                deleteUserPending,
                actions: {sortUsers, getAllUsers, deleteSelectedUser} } = this.props;          

        return  getAllUsersPending 
            ? (<LoadingIndicatorPerContainer />)        
            : (<UsersList 
                    users={users}
                    sortUsers={sortUsers}
                    getAllUsers={getAllUsers}
                    deleteUserPending={deleteUserPending}
                    deleteSelectedUser={deleteSelectedUser}

                />);
    }
}
export default UsersListContainer;
