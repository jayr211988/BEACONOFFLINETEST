import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import moment from 'moment';

import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    actionWrapper: {
        textAlign: 'right'
    },
    returnStyle : {
        display: 'inline-block',
        backgroundColor: 'rgba(73, 144, 226, 0.25)',
        padding: '5px 15px',
        border: '1px dashed black'
    }
};
class DocumentsListItem extends React.Component {
    
    render() {
        const { document, openRemoveDialog,summaryMode } = this.props;

        return (
            <TableRow hoverable={true && !summaryMode}>

                { /** DOCUMENT TYPE */ }
                <TableRowColumn>{ document.documentType }</TableRowColumn>

                { /** NAME */ }
                <TableRowColumn>{ document.name }</TableRowColumn>

                { /** PRIMARY */ }
                <TableRowColumn>{ moment.utc(document.dateCreated).format('MM/DD/YYYY') }</TableRowColumn>

                { /** RETURN DOCUMENT */ }
                <TableRowColumn>{ document.returnDocument === true ? 
                    <div>
                        <p style={styles.returnStyle}>RETURN</p>
                    </div> : 
                    null
                     }</TableRowColumn>

                

                { /** ACTIONS */ }
                <TableRowColumn style={styles.actionWrapper}>
                    {   
                        !summaryMode 
                            ?
                             <div>
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton>
                                            <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                        </IconButton>
                                    }
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                    
                                    <MenuItem 
                                        leftIcon={ <Delete color={colorPalette.primaryTextColor} /> } 
                                        primaryText="Remove"
                                        onTouchTap={openRemoveDialog}
                                    />
                                </IconMenu>
                            </div> 
                            : 
                            null
                    }
                </TableRowColumn>
            </TableRow>
        );
    }

}

export default DocumentsListItem;
