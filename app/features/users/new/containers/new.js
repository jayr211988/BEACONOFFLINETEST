import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersNew from '../components/new';
import * as duck from '../duck';

@connect(
    (state) => state.usersNewReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

class UsersNewContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {newUserRequestPending} = this.props;
        const {saveUser} = this.props.actions;

        return (<UsersNew 
                    saveUser={saveUser} 
                    newUserRequestPending={newUserRequestPending}
                />);
    }
}
export default UsersNewContainer;
