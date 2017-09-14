import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import { browserHistory } from 'react-router';
import moment from 'moment';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Send from 'material-ui/svg-icons/content/send';

import Radium from 'radium';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';


  
const styles = {
    clientWrapper: {
        paddingTop : '10px',
        paddingBottom: '10px',
        width: '30%',

        avatar:{
            overflow: 'hidden',
            verticalAlign: 'middle',
        },

        a: {
            paddingLeft: '12px',
            color: colorPalette.primaryColor,
            cursor: 'pointer'
        }   
    },



    clientName : {
        width : '15%'
    },
    address : {
        width : '30%'
    },


    

    actionWrapper: {
        textAlign: 'right',
        minWidth: '5%'
    }
};


/**
 * Clients Item Component
 * 
 * @class ClientsListItem
 * @extends {React.Component}
 */
@Radium
class ClientsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ClientsListItem
     */
    render() {

        const { client, resendInviteRequestPending } = this.props;

        return (
                <TableRow hoverable={true}>

                    { /** NAME AND AVATAR */ }
                    <TableRowColumn style={styles.clientWrapper}>
                        <Avatar 
                            color={ colorPalette.secondaryTextColor }
                            name={ client.name }
                            style={styles.avatar}
                            size={ 45 }
                            round={ true }
                            style={{overflow: 'hidden', verticalAlign: 'middle'}}
                        />

                        <a style={styles.clientWrapper.a} onClick={this.viewProducts.bind(this)}>{ client.name }</a>
                    </TableRowColumn>

                    { /** ADDRESS */ }
                    <TableRowColumn style={styles.address}>{ client.address }</TableRowColumn>

                    { /** STATUS */ }
                    <TableRowColumn style={{width: '10%'}}>{ client.clientStatusDescription }</TableRowColumn>

                    { /** TOTAL PRODUCTS */ }
                    <TableRowColumn style={{width: '15%'}}>{ `${client.totalProducts} Total Product(s)` }</TableRowColumn>

                    { /** LAST UPDATE */ }
                    <TableRowColumn style={{width: '10%'}}>{ client.dateUpdated ? moment.utc(client.dateUpdated).fromNow() : '--' }</TableRowColumn>

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
                            
                            <MenuItem leftIcon={ <EditIcon color={colorPalette.secondaryTextColor}/> } primaryText="Edit" onTouchTap={this.editClient.bind(this)} />

                            {
                                client.clientStatus === 3 ? 

                                    resendInviteRequestPending ? 
                                        <div style={{marginLeft: '10px'}}>
                                            <CircularProgress size={30} />
                                        </div>
                                        :
                                    
                                        <MenuItem 
                                            
                                            leftIcon={ <Send color={colorPalette.secondaryTextColor} /> } 
                                            primaryText="Resend Invites" 
                                            onTouchTap={this.resendInviteToClient.bind(this, client.id)} />
                                    
                                : null

                            }
                            <MenuItem leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } primaryText="Remove" onTouchTap={this.onOpenClientDialogDelete.bind(this)} />
                        </IconMenu>                    
                    </TableRowColumn>
                </TableRow>
        );
    }

    viewProducts() {
        const { client } = this.props;

        browserHistory.push(`/client-products/${client.id}`);
    }

    editClient() {
        const { client } = this.props;

        browserHistory.push(`/clients/edit/${client.id}`);
    }

    onOpenClientDialogDelete() {
        const { client, onOpenClientDialogDelete } = this.props;

        onOpenClientDialogDelete(client);
    }

    resendInviteToClient(id) {        
        const {resendInviteClient} = this.props;        
        resendInviteClient(id);

    }

}

// *** props
ClientsListItem.propTypes = {
    client : PropTypes.object.isRequired
};

export default ClientsListItem;
