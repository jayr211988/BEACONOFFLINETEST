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
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import GoToIcon from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';

import Radium from 'radium';

import { claimStatus } from '../../../../util/data'; 

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    tableRowColumnStyle: {
        paddingTop: '10px',
        paddingBottom: '10px',
        position: 'relative',
    },

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
 * PHIC Transactions Eclaims API Component
 * 
 * @class PhicTransactionsEclaimsApiListItem
 * @extends {React.Component}
 */
@Radium
class PhicTransactionsEclaimsApiListItem extends React.Component{
    constructor(props){
        super(props);
    }

    /**
     * Status Color
     * 
     * @returns 
     * 
     * @memberOf PhicTransactionsEclaimsApiListItem
     */
    onStatusColor() {
        const { transaction } = this.props;
        let color;

        switch (transaction.claimStatus) {

        case claimStatus.memberNotValid : 
            color = colorPalette.lightGray; break;

        case claimStatus.memberValid : 
            color = colorPalette.lightBlue; break;
            
        case claimStatus.eligible : 
            color = colorPalette.yellow; break;

        case claimStatus.notEligible : 
            color = colorPalette.black; break;

        case claimStatus.inProcess : 
            color = colorPalette.lightGreen; break;

        case claimStatus.return : 
            color = colorPalette.pink; break;

        case claimStatus.denied : 
            color = colorPalette.red; break;

        case claimStatus.withCheque : 
            color = colorPalette.lightBrown; break;

        case claimStatus.withVoucher : 
            color = colorPalette.skyBlue; break;

        case claimStatus.vouchering : 
            color = colorPalette.yellowOrange; break;

        case claimStatus.conditional : 
            color = colorPalette.violet; break;

        default: break; }
        return { backgroundColor: color, ...styles.colorStatusIndicator };
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransactionsEclaimsApiListItem
     */
    render(){
        const { transaction } = this.props;       

        return(
            <TableRow hoverable={true}>                
                <TableRowColumn style={styles.tableRowColumnStyle}>
                    <span style={this.onStatusColor()} title={transaction.claimStatusDescription}/>

                    {transaction.hospCode}
                </TableRowColumn>
                <TableRowColumn>{transaction.transmittalNo}</TableRowColumn>
                <TableRowColumn>{transaction.sourceReferenceNo}</TableRowColumn>
                <TableRowColumn>{moment(moment.utc(transaction.submitDate).toDate()).format('MM/DD/YYYY')}</TableRowColumn>
                <TableRowColumn>{transaction.eTicket}</TableRowColumn>
                <TableRowColumn>{transaction.claimsSeriesLhio}</TableRowColumn>
                <TableRowColumn>{transaction.claimTypeDescription}</TableRowColumn>
                <TableRowColumn>{transaction.claimStatusDescription}</TableRowColumn>
                <TableRowColumn><span title={transaction.memberName}>{transaction.memberName}</span></TableRowColumn>
                <TableRowColumn><span title={transaction.patientName}>{transaction.patientName}</span></TableRowColumn>
            </TableRow>
        );
    }
}

export default PhicTransactionsEclaimsApiListItem;