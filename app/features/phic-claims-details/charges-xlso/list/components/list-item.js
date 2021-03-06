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
 * Drugs and meds Item Component
 * 
 * @class XrayLabSuppliesAndOthersItem
 * @extends {React.Component}
 */
@Radium
class XrayLabSuppliesAndOthersItem extends React.Component{
    constructor(props){
        super(props);
    }


    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf XrayLabSuppliesAndOthersItem
     */

    render(){
        const { xlso, key, openXrayLabSuppliesAndOthersEditDialog, openBasicDialogForRemove,summaryMode } = this.props;

        return(
            <TableRow hoverable={true}>

                <TableRowColumn>{ xlso.type }</TableRowColumn>

                <TableRowColumn>{ xlso.description }</TableRowColumn>

                <TableRowColumn>{ parseInt(xlso.quantity).toFixed(2) }</TableRowColumn>

                <TableRowColumn>{ moment(xlso.renderDate).format('MM/DD/YYYY') }</TableRowColumn>

                <TableRowColumn style={styles.actionWrapper}>
                    {   !summaryMode 
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
                                    onTouchTap={openXrayLabSuppliesAndOthersEditDialog.bind(this, xlso)}

                                />
                                <MenuItem 
                                    leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Remove"
                                    onTouchTap={openBasicDialogForRemove.bind(this, xlso)}
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

// *** props
XrayLabSuppliesAndOthersItem.propTypes = {
    xlso : PropTypes.object.isRequired
};

export default XrayLabSuppliesAndOthersItem;

