import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

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
 * PHIC Claims List Item Component
 * 
 * @class PhicClaimsListItem
 * @extends {React.Component}
 */
@Radium
class Cf2DoctorsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsListItem
     */
    render() {

        const { doctor, openCf2DoctorsDeleteDialog, editPhicClaimDetailCf2RequestPending, summaryMode } = this.props;

        return (
                
                <TableRow hoverable={true}>

                    { /** ACCREDITATION NO. */ }
                    <TableRowColumn>{ doctor.accreditationNumber }</TableRowColumn>

                    { /** NAME */ }
                    <TableRowColumn>{ doctor.fullname }</TableRowColumn>

                    { /** WITH CO PAY */ }
                    <TableRowColumn>{ doctor.withCoPay == 'Y' ? 'YES' : 'NO' }</TableRowColumn>

                    { /** CO PAY AMOUNT */ }
                    <TableRowColumn>{ doctor.coPayAmount }</TableRowColumn>

                    { /** STATUS */ }
                    <TableRowColumn>{ doctor.accredited }</TableRowColumn>

                     { /** DOCTOR SIGN DATE */ }
                    <TableRowColumn>
                        {moment(moment.utc(doctor.doctorSignDate).toDate()).format('MM/DD/YYYY')}  
                    </TableRowColumn>

                    
                    { /** ACTIONS */ }
                    
                    {!summaryMode ? 
                    <TableRowColumn style={styles.actionWrapper}>
                        {editPhicClaimDetailCf2RequestPending ? null :
                            <IconMenu
                                iconButtonElement={
                                    <IconButton>
                                        <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                
                                <MenuItem 
                                    leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Remove"
                                    onTouchTap={openCf2DoctorsDeleteDialog.bind(this, doctor)}
                                />
                            </IconMenu>                                            
                        }
                    </TableRowColumn>
                   : null }


                </TableRow>

        );
    }
}

// *** props
Cf2DoctorsListItem.propTypes = {
    doctor : PropTypes.object.isRequired,
    openCf2DoctorsDeleteDialog : PropTypes.func.isRequired,
    summaryMode : PropTypes.bool
};

export default Cf2DoctorsListItem;
