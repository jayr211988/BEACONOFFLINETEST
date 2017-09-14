import React from 'react';

import Radium, { StyleRoot } from 'radium';
import { isBizBoxAdmin, isBizBoxUser } from '../../util/roles';
import UnauthorizedAccess from '../../shared-components/placeholders/unauthorized-access';

/**
 * Clients Main
 * 
 * @class Clients
 * @extends {React.Component}
 */
@Radium
class Clients extends React.Component {
    render() {
        const { children, currentUser } = this.props;

        return ( <StyleRoot>
                    { isBizBoxAdmin(currentUser) || isBizBoxUser(currentUser)
                        ? children
                        : <UnauthorizedAccess />
                    }
                </StyleRoot>
        );
    }
}
export default Clients;
