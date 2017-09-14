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
import DoNotDisturbIcon from 'material-ui/svg-icons/notification/do-not-disturb';

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

    actionWrapper: {
        textAlign: 'right'
    }
};

/**
 * Users Item Component
 * 
 * @class UsersItem
 * @extends {React.Component}
 */
@Radium
class UsersListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf UsersItem
     */
    render() {

        const { user, openDeleteDialog } = this.props;        

        return (
            <TableRow hoverable={true}>

                { /** NAME AND AVATAR */ }
                <TableRowColumn style={styles.userWrapper}>
                    <Avatar 
                        color={ colorPalette.secondaryTextColor }
                        name={ user.fullname }
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

                { /** ACTIONS */ }
                <TableRowColumn style={styles.actionWrapper}>
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                        
                        <MenuItem leftIcon={ <EditIcon color={colorPalette.secondaryTextColor}/> } primaryText="Edit" onTouchTap={this.editUser.bind(this)} />
                        <MenuItem leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } primaryText="Remove" onTouchTap={openDeleteDialog.bind(this, user)}/>
                    
                    </IconMenu>                    
                </TableRowColumn>
            </TableRow>            
        );
    }

    editUser(event) {
        event.preventDefault();

        const {user} = this.props;        
        browserHistory.push(`/users/edit/${user.id}`);
    }
}

// *** props
UsersListItem.propTypes = {
    user : PropTypes.object.isRequired
};

export default UsersListItem;