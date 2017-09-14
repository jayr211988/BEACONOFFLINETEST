import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';
import { browserHistory } from 'react-router';
// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Build from 'material-ui/svg-icons/action/build';
import Search from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import MoveToInboxIcon from 'material-ui/svg-icons/content/move-to-inbox';

import Radium from 'radium';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

import { transmittalStatus, claimStatus } from '../../../../util/data'; 

const styles = {
    avatarWrapper: {
        paddingTop : '10px',
        paddingBottom: '10px',
        width: '20%',

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
        name : {
            paddingLeft: '12px',
            color: colorPalette.primaryTextColor,
            margin: '0 0 3px 0',
            fontSize: '14px',
            textOverflow: 'ellipsis',            
            overflow: 'hidden'
        },

        subDetail: {
            paddingLeft: '12px',
            color: colorPalette.secondaryTextColor,
            margin: 0,
            fontSize: '12px',
            height: '16px'
        }
    },

    claimNoRow: {
        width: '10%',
        position: 'relative'
    },

    colorStatusIndicator : {
        width: '9px', 
        height: '100%', 
        position: 'absolute', 
        left: 0, 
        top: 0,  
        transition : 'width 0.3s'
    },

    actionWrapper: {
        textAlign: 'right',
        width: '70px',
        position: 'relative',

        actionWrapperChild:{
            display: 'flex', 
            justifyContent: 'space-betweent', 
            textAlign: 'center', 
            alignItems: 'center'
        }
    },
    smallIcon: {
        width: 31,
        height: 31,
        color: colorPalette.accentColor,
    },
    smallInfoIcon: {
        width: 31,
        height: 31,
        color: colorPalette.primaryColor,
    },
    small: {
        width: 50,
        height: 50,
        padding: 0,
        position: 'absolute'
    },
    IconButtonMoreVertIcon:{
        width: '24px',
        height: '24px', 
        padding: '0'
    },
    padding0:{
        padding: '0'
    },
    marginLeftAuto:{
        marginLeft: 'auto'
    }
};

/**
 * PHIC Claims List Item Component
 * 
 * @class PhicClaimsListItem
 * @extends {React.Component}
 */
@Radium
class PhicClaimsListItem extends React.Component {
    constructor(props) {
        super(props);
    }


    onManageTransmmittal(id) {
        const {params} = this.props;

        browserHistory.push(`/phic-claims-details/${params.transmittalId}/summary/${id}`);
    }

    onStatusColor() {
        const { claim } = this.props;
        const status = claim.claimStatus;
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
        case claimStatus.conditional : color = colorPalette.violet; break;
        default: break; }

        return { backgroundColor: color, ...styles.colorStatusIndicator };
    }

    openInfoDialog() {
        const { claim, onOpenNewDocumentDialog, onOpenWithChequeWithVoucherVoucheringDialog, onOpenDeniedClaimDialog } = this.props;

        switch (claim.claimStatus) {
        
        case claimStatus.return:
            onOpenNewDocumentDialog(claim);
            break;
        
        case claimStatus.denied:
            onOpenDeniedClaimDialog(claim);
            break;
        
        case claimStatus.vouchering:
            // TODO: ADD YOUR OPENING OF DIALOG FUNCTION HERE
            onOpenWithChequeWithVoucherVoucheringDialog(claim);
            break;

        case claimStatus.withCheque:
            onOpenWithChequeWithVoucherVoucheringDialog(claim);
            break;

        case claimStatus.withVoucher:
            // TODO: ADD YOUR OPENING OF DIALOG FUNCTION HERE
            onOpenWithChequeWithVoucherVoucheringDialog(claim);
            break;
        }
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsListItem
     */
    render() {
        const { 
            claim, 
            openPhicDialogDelete, 
            manageTransmittalSummaryRequest, 
            openClaimsIssuesDialog,
            selectedTransmittal,
            onOpenTransferDialog} = this.props;            
        return (
                <TableRow hoverable={true} >

                    { /** CLAIM NO */ }
                    <TableRowColumn  style={styles.claimNoRow}>
                        <span style={this.onStatusColor()} title={claim.claimStatusDescription}/>

                        { claim.id }
                    </TableRowColumn>

                    { /** STATUS */ }
                    <TableRowColumn  style={{width: '15%'}} title={ claim.claimStatusDescription }>{ claim.claimStatusDescription }</TableRowColumn>

                    <TableRowColumn  style={{width: '15%'}}>{ claim.claimSeriesLhio }</TableRowColumn>

                    { /** MEMBER */ }
                    <TableRowColumn style={styles.avatarWrapper}>
                        <div style={styles.avatarWrapper.avatarContainer}>
                            <div>
                                <Avatar 
                                    color={ colorPalette.secondaryTextColor }
                                    name={ `${claim.phiccF1.memberFirstname} ${claim.phiccF1.memberLastname}` }
                                    size={ 45 }
                                    round={ true } 
                                    style={{overflow: 'hidden'}}/>
                            </div>
                            <div>
                                <p style={styles.avatarWrapper.name}>
                                    <span title={claim.phiccF1.memberFullname}>{ claim.phiccF1.memberFullname }</span>
                                </p>
                                <p style={styles.avatarWrapper.subDetail}>{ claim.phiccF1.memberGenderName }</p>
                                <p style={styles.avatarWrapper.subDetail}>{ claim.phiccF1.memberTypeValue }</p>
                            </div>
                        </div>
                    </TableRowColumn>

                    { /** PATIENT */ }
                    <TableRowColumn style={styles.avatarWrapper}>
                        <div style={styles.avatarWrapper.avatarContainer}>
                            <div>
                                <Avatar 
                                    color={ colorPalette.secondaryTextColor }
                                    name={ `${claim.phiccF1.patientFirstname} ${claim.phiccF1.patientLastname}` }
                                    size={ 45 }
                                    round={ true } 
                                    style={{overflow: 'hidden'}}/>
                                    
                            </div>
                            <div>
                                <p style={styles.avatarWrapper.name}>
                                    <span title={claim.phiccF1.patientFullname}>{ claim.phiccF1.patientFullname }</span>
                                </p>
                                <p style={styles.avatarWrapper.subDetail}>{ claim.phiccF1.patientGenderName }</p>
                                <p style={styles.avatarWrapper.subDetail}>{ claim.phiccF1.patientIsValue }</p>
                            </div>
                        </div>
                    </TableRowColumn>

                    { /** 1ST CASE RATE */ }
                    <TableRowColumn style={{width: '15%'}}>
                        <span title={claim.phiccF2 &&   claim.phiccF2.firstCaseRate ? 
                                claim.phiccF2.firstCaseRate.caseRateGroupDescription : '--' }>
                        { claim.phiccF2 &&   claim.phiccF2.firstCaseRate ? 
                                claim.phiccF2.firstCaseRate.caseRateGroupDescription : '--' }

                        </span>                                
                    </TableRowColumn>

                    { /** 2ND CASE RATE */}
                    <TableRowColumn style={{width: '15%'}}>
                        <span title={claim.phiccF2 && claim.phiccF2.secondCaseRate ? 
                        claim.phiccF2.secondCaseRate.caseRateGroupDescription : '--' }>
                            { claim.phiccF2 && claim.phiccF2.secondCaseRate ? 
                            claim.phiccF2.secondCaseRate.caseRateGroupDescription : '--' }
                        </span>
                    </TableRowColumn>

                    { /** LAST UPDATE */ }
                    <TableRowColumn style={{width: '10%'}} title={ claim.dateUpdated ? moment.utc(claim.dateUpdated).fromNow() : '--' }>
                        { claim.dateUpdated ? moment.utc(claim.dateUpdated).fromNow() : '--' }                            
                    </TableRowColumn>

                    { /** ACTIONS */ }
                    <TableRowColumn style={styles.actionWrapper}>
                        <div style={styles.actionWrapper.actionWrapperChild}>
                            {/** CHECK IF MEMBER HAS CLAIM ISSUES*/}
                            { claim.claimIssuesTotal > 0 ?
                                <IconButton iconStyle={styles.smallIcon} style={styles.small} onTouchTap={openClaimsIssuesDialog.bind(this, claim)}>
                                    <ActionInfoOutline />
                                </IconButton>  
                            : null }

                            { /*Claim is RETURN|WITH VOUCHER|WITH CHEQUE|VOUCHERING|DENIED*/ }
                            { claim.claimStatus == claimStatus.return
                                || claim.claimStatus == claimStatus.withVoucher
                                || claim.claimStatus == claimStatus.withCheque
                                || claim.claimStatus == claimStatus.vouchering
                                || claim.claimStatus == claimStatus.denied ?
                                <IconButton iconStyle={styles.smallInfoIcon} style={styles.padding0} onTouchTap={this.openInfoDialog.bind(this)}>
                                    <ActionInfoOutline />
                                </IconButton> 
                            : null }
                            
                            <IconMenu
                                style={styles.marginLeftAuto}
                                iconButtonElement={
                                    <IconButton style={styles.IconButtonMoreVertIcon}>
                                        <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                            
                                { /** MENU ITEM MANAGE */ }
                                {  selectedTransmittal.transmittalStatus == transmittalStatus.draft ?
                                    manageTransmittalSummaryRequest ?
                                        <CircularProgress size={25} thickness={3} />
                                        :
                                        <MenuItem 
                                            leftIcon={ <Build color={colorPalette.secondaryTextColor} /> } 
                                            primaryText="Manage" 
                                            onTouchTap={this.onManageTransmmittal.bind(this, claim.id)}
                                        />    
                                    : null                        
                                }

                                { /** MENU ITEM VIEW */ }
                                {  selectedTransmittal.transmittalStatus != transmittalStatus.draft && selectedTransmittal.transmittalStatus != transmittalStatus.transmitError ?                                
                                    <MenuItem 
                                        leftIcon={ <Search color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="View" 
                                        onTouchTap={this.onManageTransmmittal.bind(this, claim.id)}
                                    />                      
                                    : null      
                                }

                                {/*MENU ITEM MANAGE SEARCH ICON*/}
                                { selectedTransmittal.transmittalStatus == transmittalStatus.transmitError ?                                
                                    <MenuItem 
                                        leftIcon={ <Search color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="Manage" 
                                        onTouchTap={this.onManageTransmmittal.bind(this, claim.id)}
                                    />                      
                                    : null      
                                }

                                { /** MENU ITEM REMOVE */ }
                                { selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError ? 
                                    <MenuItem 
                                        leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="Remove" 
                                        onTouchTap={openPhicDialogDelete.bind(this, claim)}
                                    />                            
                                : null }

                                { /** TRANSFER CLAIM */ }
                                { selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError ? 
                                    <MenuItem 
                                        leftIcon={ <MoveToInboxIcon color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="Transfer" 
                                        onTouchTap={onOpenTransferDialog.bind(this, claim)}
                                    />                            
                                : null }

                            </IconMenu> 
                        </div>                   
                    </TableRowColumn>
                </TableRow>
        );
    }
}

// *** props
PhicClaimsListItem.propTypes = {
    claim : PropTypes.object.isRequired,
    openPhicDialogDelete : PropTypes.func.isRequired,
    isSubmitting : PropTypes.bool.isRequired
};

export default PhicClaimsListItem;

