import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import { browserHistory } from 'react-router';

// *** material-ui components
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import SecurityIcon from 'material-ui/svg-icons/hardware/security';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';

// *** material-ui icons
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    container: {
        height: '75px',
        paddingLeft: '20px',        
        display: 'flex',
        alignItems: 'center',
        minWidth: '200px'
    },

    textHolder: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 12px'
    },

    label: {
        color: colorPalette.white,
        fontSize: '14px',
        lineHeight: '1.6em'
    },

    small: {
        color: colorPalette.whiteTransparent,
        lineHeight: '1.6em',
        letterSpacing: '.2px'
    }, 
    logoutLoading : {
        display: 'flex',
        alignItems: 'center',

        text: {
            margin: '0 0 0 22px',
            fontSize: '16px'            
        }
    }  
};

/**
 * Header Part Dropdown User Account Component
 * 
 * @class HeaderDropdownUserAccount
 * @extends {React.Component}
 */
@Radium
class HeaderDropdownUserAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    onRedirectTo(route) {
        browserHistory.push(route);
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf HeaderDropdownUserAccount
     */
    render() {
        const { currentUser, 
                logoutUser,
                mainCurrentUserLogoutRequest} = this.props;             
        
        return (
            <StyleRoot>
                <div style={styles.container}>
                    <Avatar 
                        name={currentUser.fullname} round={true} 
                        size={50}    
                        color={colorPalette.secondaryTextColor}
                        style={{overflow: 'hidden'}}
                    />

                    <div style={styles.textHolder}>
                        <label style={styles.label}>{currentUser.fullname}</label>
                        <small style={styles.small}>{currentUser.userName}</small>
                    </div>

                    { /** DROP DOWN MENU */ }
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <ArrowDropDownIcon color={colorPalette.white}/>
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        touchTapCloseDelay={0}
                        >


                        <MenuItem primaryText="My Profile" leftIcon={<EditorModeEdit/>} onTouchTap={this.onRedirectTo.bind(this, '/my-profile')} />
                        <MenuItem primaryText="Change Password" leftIcon={<SecurityIcon/>} onTouchTap={this.onRedirectTo.bind(this, '/change-password')} />
                        {
                            mainCurrentUserLogoutRequest ?  
                                <MenuItem innerDivStyle={styles.logoutLoading}>                                    
                                    <CircularProgress size={35} thickness={4} />
                                    <p style={styles.logoutLoading.text}>Please wait ... </p>                                    
                                </MenuItem>
                            : 
                            <MenuItem primaryText="Signout" onTouchTap={logoutUser} leftIcon={<LogoutIcon/>}/>
                        }
                    
                    </IconMenu>                            
                </div>               
            </StyleRoot>
        );
    }
}

// *** props
HeaderDropdownUserAccount.propTypes = {


};

export default HeaderDropdownUserAccount;