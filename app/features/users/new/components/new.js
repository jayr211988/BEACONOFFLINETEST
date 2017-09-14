import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import UsersNewForm from './form';
import MouseTrap from 'mousetrap';

import animation from '../../../../util/styles/animation';

@Radium
class UsersNew extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Mousetrap.bind(['c'], this.onCancel.bind(this));
    }

    render() {
        const {newUserRequestPending} = this.props;

        return (
            <StyleRoot style={animation.fadeIn}>
                <Helmet title="Users - Add User" />
                <UsersNewForm 
                    onCancel={this.onCancel.bind(this)}
                    onSubmit={this.onSave.bind(this)}
                    newUserRequestPending={newUserRequestPending}
                />               
            </StyleRoot>
        );
    }

    onCancel() {
        browserHistory.goBack();
    }

    onSave(values, x, {reset}) {                
        const {saveUser} = this.props;     
        saveUser(values, reset);        
    }
}


export default UsersNew;
