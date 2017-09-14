import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersEdit from '../components/edit';
import * as duck from '../duck';
import Radium, { StyleRoot } from 'radium';

import LoadingScreenPerContainer from '../../../../shared-components/loading-indicator-per-container';

@connect(
    (state) => state.usersEditReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class UsersEditContainer extends React.Component {

    componentWillMount() {                 
        const {getSelectedUserById} = this.props.actions;
        const {params} =this.props;
        
        getSelectedUserById(params.id);
    }
    onSave(values) {
        const { actions} = this.props;
        
        const {editSelectedUser} = actions;    
        const {id} = this.props.params;
        values['id'] = id;
        editSelectedUser(values);
    }

    onSetDefaultValues() {
        const {selectedUser} = this.props;        
                        
        return {
            initialValues : {
                firstname: selectedUser.firstname ,
                lastname: selectedUser.lastname  ,
                middlename : selectedUser.middlename  ,
                email : selectedUser.email ,
                userName : selectedUser.userName             
            }   
        };
              
    }

    render() {

        const {getSelectedUserByIdPending, saveEditUserPending} = this.props;
        

        return (
            <StyleRoot>
                { getSelectedUserByIdPending ? 
                    <LoadingScreenPerContainer />                
                :                                        
                    <UsersEdit 
                        
                        {...this.onSetDefaultValues()}
                        onSubmit={this.onSave.bind(this)}
                        getSelectedUserByIdPending={getSelectedUserByIdPending}
                        saveEditUserPending={saveEditUserPending}
                    />                
                }


            </StyleRoot>
        );
    }
}
export default UsersEditContainer;
