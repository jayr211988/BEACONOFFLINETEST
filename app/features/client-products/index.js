import React from 'react';

import Radium, { StyleRoot } from 'radium';

/**
 * Client Products
 * 
 * @class ClientProducts
 * @extends {React.Component}
 */
@Radium
class ClientProducts extends React.Component {
    render() {
        const { children, selectedFacility, currentUser } = this.props;

        return ( <StyleRoot> { children && React.cloneElement(children, { selectedFacility, currentUser }) } </StyleRoot> );
    }
}
export default ClientProducts;
