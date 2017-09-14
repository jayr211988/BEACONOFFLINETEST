import React from 'react';
import moment from 'moment';


// *** material-ui components
import Avatar from 'react-avatar';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import GoToIcon from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';



import Radium from 'radium';
import { browserHistory } from 'react-router';

import { claimStatus } from '../../../../util/data'; 


const styles = {
    colorStatusIndicator : {
        width: '9px', 
        height: '100%', 
        position: 'absolute', 
        left: 0, 
        top: 0,  
        transition : 'width 0.3s'
    },
};

/**
 * 
 * 
 * @class PhicTransactionsEclaimsListItem
 * @extends {React.Component}
 */
@Radium
class PhicTransactionsEclaimsListItem extends React.Component{
    constructor(props){
        super(props);
    }
    onStatusColor() {
        const { transaction } = this.props;
        const status = transaction.claimStatus;
        let color;
        switch (status) {
        case claimStatus.memberNotValid : color = colorPalette.lightGray; break;
        case claimStatus.memberValid : color = colorPalette.lightBlue; break;
        case claimStatus.eligible : color = colorPalette.yellow; break;
        case claimStatus.notEligible : color = colorPalette.black; break;
        case claimStatus.inProcess : color = colorPalette.lightGreen; break;
        case claimStatus.return : color = colorPalette.pink; break;
        case claimStatus.denied : color = colorPalette.red; break;
        case claimStatus.withCheque : color = colorPalette.lightBrown; break;
        case claimStatus.withVoucher : color = colorPalette.skyBlue; break;
        case claimStatus.vouchering : color = colorPalette.yellowOrange; break;
        default: break; }

        return { backgroundColor: color, ...styles.colorStatusIndicator };
    }

    render(){
        const { transaction } = this.props;        
        return(
            <TableRow hoverable={true} style={{height: '60px'}}>
                <TableRowColumn style={{width: '10.09%', position: 'relative'}}><span style={this.onStatusColor()} title={transaction.claimStatusDescription}/>{transaction.transmittalNumber}</TableRowColumn>
                <TableRowColumn style={{width: '10.09%'}}>{moment(moment.utc(transaction.transmittedDateTime).toDate()).format('MM/DD/YYYY')}</TableRowColumn>
                <TableRowColumn style={{width: '10.09%'}}>{transaction.eTicketNumber}</TableRowColumn>
                <TableRowColumn style={{width: '15.09%'}}>{transaction.claimSeriesLhio}</TableRowColumn>
                <TableRowColumn style={{width: '15.09%'}}>{transaction.claimTypeDescription}</TableRowColumn>
                <TableRowColumn style={{width: '15.09%'}}>{transaction.claimStatusDescription}</TableRowColumn>
                <TableRowColumn style={{width: '15.09%'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar 
                            name={ transaction.patientFullname }
                            round={true}
                            size={45}
                            color={colorPalette.secondaryTextColor}
                            style={{overflow: 'hidden'}}
                        />
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5px', width: '50%'}}>
                            <span title={transaction.patientFullname}><label>{transaction.patientFullname}</label></span>
                            <small>{transaction.patientGenderName}</small>
                            <small>{transaction.patientTypeValue}</small>
                        </div>
                    </div>
                </TableRowColumn>
                <TableRowColumn style={{width: '9.37%'}}>
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                </IconButton>
                            }
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                            
                            <MenuItem 
                                leftIcon={ <GoToIcon color={colorPalette.secondaryTextColor} /> } 
                                primaryText="Go to Claim List"
                                onTouchTap={() => browserHistory.push(`/phic-claims/${transaction.transmittalId}`)}
                                
                            />
                            <MenuItem 
                                leftIcon={ <GoToIcon color={colorPalette.secondaryTextColor} /> } 
                                primaryText="Go to Claim Details"
                                onTouchTap={() => browserHistory.push(`/phic-claims-details/${transaction.transmittalId}/summary/${transaction.claimId}`)}
                            />
                        </IconMenu>  
                </TableRowColumn>

            </TableRow>
        );
    }
}

export default PhicTransactionsEclaimsListItem;