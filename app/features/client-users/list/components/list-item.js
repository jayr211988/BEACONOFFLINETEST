import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import { browserHistory } from 'react-router';
import moment from 'moment';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import StarsIcon from 'material-ui/svg-icons/action/stars';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import DoNotDisturbOnIcon from 'material-ui/svg-icons/notification/do-not-disturb-on';
import EmailIcon from 'material-ui/svg-icons/communication/email';

import { isClientAdmin } from '../../../../util/roles';
import { isCurrentUser } from '../../../../util/helpers/helper';

import Radium from 'radium';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    userWrapper: {
        paddingTop : '10px',
        paddingBottom: '10px',

        a: {
            paddingLeft: '12px',
            color: colorPalette.primaryColor
        }   
    },

    indicatorWrapper: {
        width: '100px',
        textAlign: 'right',

        icon: {
            marginLeft: '20px'
        },

        resendIcon: {
            marginLeft: '13px'
        }
    },

    actionWrapper: {
        textAlign: 'right',
        width: '100px'
    }
};

/**
 * Users Item Component
 * 
 * @class UsersItem
 * @extends {React.Component}
 */
@Radium
class ClientUsersListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Edit User
     * 
     * @param {any} event
     * 
     * @memberOf ClientUsersListItem
     */
    editUser(event) {
        event.preventDefault();

        const { user } = this.props;
        browserHistory.push(`client-users/edit/${user.id}`);
    }

    resendInvitationEmail(event){
        event.preventDefault();

        const { resendInvitationEmail, user } = this.props;
        resendInvitationEmail(user);       

    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf UsersItem
     */
    render() {
        const { 
            user, 
            selectedFacility,
            currentUser,
            openClientUsersDialogGrantAdminAccess,
            openClientUsersDialogRevokeAdminAccess,
            openClientUsersDialogDelete,
            onOpenManageAccessDialog } = this.props;

        return (
            <TableRow hoverable={true}>

                { /** NAME AND AVATAR */ }
                <TableRowColumn style={styles.userWrapper}>
                    <Avatar 
                        color={ colorPalette.secondaryTextColor }
                        name={ `${user.firstname} ${user.lastname}` }
                        size={ 45 }
                        round={ true }
                        style={{overflow: 'hidden', verticalAlign: 'middle'}}
                    />
                    <a style={styles.userWrapper.a}>{ user.fullname }</a>
                </TableRowColumn>

                { /** USERNAME */ }
                <TableRowColumn>{ user.userName }</TableRowColumn>

                { /** EMAIL */ }
                <TableRowColumn>{ user.email }</TableRowColumn>

                { /** LAST UPDATE */ }
                <TableRowColumn>{ user.dateUpdated ? moment.utc(user.dateUpdated).fromNow() : '--' }</TableRowColumn>

                { /** ICON INDICATOR */ }
                <TableRowColumn style={styles.indicatorWrapper}>

                    { isClientAdmin(user, selectedFacility) ? 
                        <div title="Account Admin Access">
                            <StarsIcon color={colorPalette.primaryColor}/>
                        </div>
                    : null }

                    { !user.emailConfirmed ? 
                        <div title="Please confirm your email">
                            <EmailIcon 
                                color={colorPalette.secondaryTextColor} 
                                style={styles.indicatorWrapper.icon}
                            /> 
                        </div>
                    : null }
                </TableRowColumn>

                { /** ACTIONS */ }
                <TableRowColumn style={styles.actionWrapper}>

                    { !isCurrentUser(user, currentUser) ? 

                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                        
                        { /** MENU ITEM MANAGE ACCESS */ }
                        { !isClientAdmin(user, selectedFacility) && !isCurrentUser(user, currentUser) ? 
                            <MenuItem 
                                leftIcon={ <LockOpenIcon color={colorPalette.secondaryTextColor}/> } 
                                primaryText="Manage Access" 
                                onTouchTap={onOpenManageAccessDialog.bind(this, user)} 
                            />                          
                        : null }

                        { /** MENU ITEM GRANT ADMIN ACCESS */ }
                        { !isClientAdmin(user, selectedFacility) && !isCurrentUser(user, currentUser) ?
                            <MenuItem 
                                leftIcon={ <StarsIcon color={colorPalette.secondaryTextColor}/> } 
                                primaryText="Grant Admin Access" 
                                onTouchTap={openClientUsersDialogGrantAdminAccess.bind(this, user)} 
                            />
                        : null }

                        { /** MENU ITEM REVOKE ADMIN ACCESS */ }
                        { isClientAdmin(user, selectedFacility) && !isCurrentUser(user, currentUser) ?
                            <MenuItem 
                                leftIcon={ <DoNotDisturbOnIcon color={colorPalette.secondaryTextColor}/> } 
                                primaryText="Revoke Admin Access" 
                                onTouchTap={openClientUsersDialogRevokeAdminAccess.bind(this, user)} 
                            />
                        : null }
                        
                        { !isCurrentUser(user, currentUser) ? <Divider /> : null }
                        
                        {!user.emailConfirmed ?
                          <MenuItem 
                            leftIcon={ <EmailIcon 
                            color={colorPalette.secondaryTextColor} 
                             style={styles.indicatorWrapper.resendIcon}
                        /> } 
                            primaryText="Resend Invitation Email" 
                            onTouchTap={this.resendInvitationEmail.bind(this)} 
                        />
                        : null}

                        { /** MENU ITEM EDIT */ }
                        <MenuItem 
                            leftIcon={ <EditIcon color={colorPalette.secondaryTextColor}/> } 
                            primaryText="Edit" 
                            onTouchTap={this.editUser.bind(this)} 
                        />

                        { /** MENU ITEM DELETE */ }
                        <MenuItem 
                            leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                            primaryText="Remove" 
                            onTouchTap={openClientUsersDialogDelete.bind(this, user)}
                        />
                    
                    </IconMenu>  
                    : null }                  
                </TableRowColumn>
            </TableRow>            
        );
    }
}

// *** props
ClientUsersListItem.propTypes = {
    user : PropTypes.object.isRequired,
    openClientUsersDialogGrantAdminAccess : PropTypes.func.isRequired,
    openClientUsersDialogRevokeAdminAccess : PropTypes.func.isRequired,
    openClientUsersDialogDelete : PropTypes.func.isRequired
};

export default ClientUsersListItem;