import React from 'react';

import Radium, { StyleRoot } from 'radium';

/**
 * 
 * 
 * @class ClientUsers
 * @extends {React.Component}
 */
@Radium
class ClientUsers extends React.Component {
    render() {
        const { children, selectedFacility, currentUser } = this.props;

        return ( <StyleRoot> { children && React.cloneElement(children, { selectedFacility, currentUser }) } </StyleRoot> );
    }
}
export default ClientUsers;
