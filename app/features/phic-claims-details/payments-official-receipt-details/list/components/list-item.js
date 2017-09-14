
import React, { PropTypes } from 'react';
import moment from 'moment';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import Radium from 'radium';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    avatarWrapper: {
        paddingTop : '10px',
        paddingBottom: '10px',

        avatarContainer: {
            display: 'flex',
            padding: '12px 0'
        },

        detail: {
            paddingLeft: '12px',
            color: colorPalette.primaryTextColor,
            margin: '0 0 3px 0',
            fontSize: '14px',
        },

        subDetail: {
            paddingLeft: '12px',
            color: colorPalette.secondaryTextColor,
            margin: 0,
            fontSize: '12px',
            height: '16px'
        }
    },

    actionWrapper: {
        textAlign: 'right'
    }
};

/**
 * OR details component
 * 
 * @class OfficialReceiptDetailsListItem
 * @extends {React.Component}
 */

@Radium
class OfficialReceiptDetailsListItem extends React.Component{
    constructor(props) {
        super(props);
    }



        /**
     * Render
     * 
     * @returns
     * 
     * @memberOf OfficialReceiptDetailsListItem
     */

    render(){
        const {item, openBasicDialogForRemove, openEditPaymentDetails,summaryMode} = this.props;       
        return(            
            <TableRow hoverable={true && !summaryMode}>
                <TableRowColumn>{item.description}</TableRowColumn>
                <TableRowColumn>{item.quantity}</TableRowColumn>
                <TableRowColumn>{item.unitPrice}</TableRowColumn>

                <TableRowColumn>{item.amount}</TableRowColumn>

                <TableRowColumn style={styles.actionWrapper}>
                    {  
                        !summaryMode 
                        ?
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                </IconButton>
                            }
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                            
                            <MenuItem 
                                leftIcon={ <ModeEdit color={colorPalette.secondaryTextColor} /> } 
                                primaryText="Edit"
                                onTouchTap={openEditPaymentDetails.bind(this, item)}
                            />
                            <MenuItem 
                                leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                                primaryText="Remove"
                                onTouchTap={openBasicDialogForRemove.bind(this, item)}
                            />
                        </IconMenu>
                        : 
                        null
                    }
                </TableRowColumn>
            </TableRow>
        );
    }
}


export default OfficialReceiptDetailsListItem;