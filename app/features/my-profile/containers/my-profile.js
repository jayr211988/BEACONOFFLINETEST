import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditUserProfile from '../components/my-profile';
import * as duck from '../duck';
import Radium, { StyleRoot } from 'radium';

import LoadingScreenPerContainer from '../../../shared-components/loading-indicator-per-container';

@connect(
    (state) => state.usersMyProfileReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
@Radium
class MyProfileContainer extends React.Component {
    
    componentWillMount() {  
        const {getSelectedUserById} = this.props.actions;
        const {currentUser} = this.props;
        getSelectedUserById(currentUser.id);
    }
    
    onSave(values) {
        
        const { actions} = this.props;
        
        const {editSelectedUser} = actions;    
        
        const {id} = this.props.currentUser;

        values['id'] = id;

        values.fullname = values.middlename ? `${values.firstname} ${values.middlename} ${values.lastname}` : `${values.firstname} ${values.lastname}` 

        editSelectedUser(values);
    }

    onSetDefaultValues() {
        const {currentUser} = this.props;          
        
        return {
            initialValues : {
                firstname: currentUser.firstname ,
                lastname: currentUser.lastname  ,
                middlename : currentUser.middlename,
                email : currentUser.email ,
                userName : currentUser.userName,   
                fullname : currentUser.fullname,
                notifyWhenTransmittalIsProcessed: currentUser.notifyWhenTransmittalIsProcessed
            }   
        };
    }

    render() {

        const {getSelectedUserByIdPending, saveEditUserPending, currentUser, selectedFacility} = this.props;

        return (
            <StyleRoot>
                { getSelectedUserByIdPending ? 
                    <LoadingScreenPerContainer />                
                :                                        
                    <EditUserProfile 
                        currentUser={currentUser}
                        selectedFacility={selectedFacility}
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

export default MyProfileContainer;
