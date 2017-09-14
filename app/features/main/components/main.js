import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {isBizBoxUser, isClientUser,isClientAdmin} from '../../../util/roles';

import HeaderUser from './header-user';
import HeaderClientUser from './header-client-user';

const styles = {
    layoutWrapper: {
        minWidth: '1280px'
    },
    contentWrapper: {
        
    }
};

@Radium
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        // const {logoutUser} = this.props.actions;
        const { currentUser, 
                logoutUser,
                selectedFacility,
                mainCurrentUserLogoutRequest,location,
                } = this.props;
        
        return (
            <StyleRoot>
                <div style={styles.layoutWrapper}>                                      

                    { isBizBoxUser(currentUser)  ? 
                    <HeaderUser 
                        location = {location}
                        currentUser = {currentUser}
                        logoutUser={logoutUser}
                        mainCurrentUserLogoutRequest={mainCurrentUserLogoutRequest}
                    />                    
                     :                                                            
                    <HeaderClientUser
                        location = {location}
                        currentUser = {currentUser}
                        logoutUser={logoutUser}
                        selectedFacility={selectedFacility}
                        mainCurrentUserLogoutRequest={mainCurrentUserLogoutRequest}
                    />
                    }

                    { (isClientUser(currentUser, selectedFacility) || isClientAdmin(currentUser, selectedFacility)) && selectedFacility && this.props.children && React.cloneElement(this.props.children, {currentUser, selectedFacility} ) }                    
                    { isBizBoxUser(currentUser) && this.props.children && React.cloneElement(this.props.children, {currentUser, selectedFacility} ) }                    
                </div>
            </StyleRoot>
        );
    }
}
export default Main;
