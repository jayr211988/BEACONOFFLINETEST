import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {isBizBoxAdmin, isBizBoxUser} from '../../util/roles';
import UnauthorizedAccess from '../../shared-components/placeholders/unauthorized-access';


@Radium
class Users extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {

        const {children, currentUser} = this.props;
        
        return (
            <StyleRoot>
                { isBizBoxAdmin(currentUser) || isBizBoxUser(currentUser)
                    ? children 
                    : <UnauthorizedAccess />
                }
                {/** children, this.props.children && React.cloneElement(children) */}
            </StyleRoot>
        );
    }
}

export default Users;