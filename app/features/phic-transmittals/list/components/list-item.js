import React, { PropTypes } from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SendIcon from 'material-ui/svg-icons/content/send';
import VerifiedUserIcon from 'material-ui/svg-icons/action/verified-user';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import FileDownload from 'material-ui/svg-icons/file/file-download';

import Radium from 'radium';
import { isPlural } from '../../../../util/rules';
import { transmittalStatus } from '../../../../util/data/index';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

const styles = {
    tableRowColumnStyle: {
        paddingTop: '10px',
        paddingBottom: '10px',
        position: 'relative',

        a: {
            paddingLeft: '12px',
            color: colorPalette.primaryColor,
            cursor: 'pointer',
            textAlign: 'center'
        }
    },

    actionWrapper: {
        textAlign: 'right'
    },
    smallIcon: {
        width: 31,
        height: 31,
        color: colorPalette.accentColor,
    },
    small: {
        width: 50,
        height: 50,
        padding: 0,
        marginLeft: -57,
        marginTop: -1,
        position: 'absolute'
    },
    sideColor: {
        position: 'absolute',
        width: '9px',
        height: '100%',
        top: '0',
        left: '0',
        display: 'block',
        transition: 'width 0.3s'
    },
    'tableRowHover:hover > span': {
        width: '20px'
    }
};

/**
 * Clients Item Component
 * 
 * @class PhicTransmittalsListItem
 * @extends {React.Component}
 */
@Radium
class PhicTransmittalsListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            setIntervalId: null
        };
    }

    componentDidMount() {
        const { transmittal } = this.props;

        if (transmittal.transmittalStatus == 2)
            this.getPHICTransmittal();
    }

    componentWillUnmount() {
        clearInterval(this.state.setIntervalId);
    }

    componentDidUpdate(nextProps) {
        if (nextProps.transmittal.transmittalStatus != 2)
            clearInterval(this.state.setIntervalId);
    }

    /**
     * Manage Claims
     * 
     * 
     * @memberOf PhicTransmittalsListItem
     */
    onViewClaims() {
        const { transmittal } = this.props;

        browserHistory.push(`/phic-claims/${transmittal.id}`);
    }

    /**
     * Submit Transmittal
     * 
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsListItem
     */
    onSubmit(event) {
        event.preventDefault();

        const { transmittal, submitPhicTransmittal } = this.props;

        submitPhicTransmittal(transmittal.id, this.getPHICTransmittal.bind(this));
    }

    getPHICTransmittal() {
        const { getPHICTransmittalStatusById, transmittal } = this.props;

        const id = setInterval(() => {
            getPHICTransmittalStatusById(transmittal.id);
        }, 5000);

        this.setState({
            setIntervalId: id
        });
    }

    getColor() {
        const { transmittal } = this.props;
        const status = transmittal.transmittalStatus;
        let color;
        switch (status) {
        case transmittalStatus.draft:
            color = colorPalette.gray;
            break;
        case transmittalStatus.transmitted:
            color = colorPalette.orange;
            break;
        case transmittalStatus.transmitting:
            color = colorPalette.greenYellow;
            break;
        case transmittalStatus.transmitError:
            color = colorPalette.darkRed;
            break;
        case transmittalStatus.complete:
            color = colorPalette.green;
            break;
        default:
            break;
        }
        return {
            ...styles.sideColor,
            backgroundColor: color
        };
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsListItem
     */
    render() {
        const {
            transmittal,
            openPhicTransmittalDialogDelete,
            openPhicTransmittalEditDialog,
            openTransmittalsIssuesDialog,
            openDialogSetToComplete,
            openDialogVerifyClaimStatus } = this.props;            

        return (
            <TableRow hoverable={true} title={transmittal.remarks ? `REMARKS : ${transmittal.remarks}` : null} style={styles.tableRowHover} >

                { /** TRANSMITAL NO */}
                <TableRowColumn style={styles.tableRowColumnStyle}>
                    <span style={this.getColor()} title={`${transmittal.transmittalStatusDescription} : ${transmittal.transmittalNumber}`}></span>
                    <a onClick={this.onViewClaims.bind(this)} style={styles.tableRowColumnStyle.a}>{transmittal.transmittalNumber}</a>
                </TableRowColumn>

                { /** ETICKET NUMBER */}
                <TableRowColumn style={styles.tableRowColumnStyle}>{transmittal.eTicketNumber}</TableRowColumn>

                { /** PACKAGE */}
                <TableRowColumn>{transmittal.phicPackageDescription}</TableRowColumn>

                { /** STATUS */}
                <TableRowColumn>{transmittal.transmittalStatusDescription}</TableRowColumn>

                { /** TRANSMITTED DATE */}
                <TableRowColumn >
                    {
                        transmittal.transmittalStatus == transmittalStatus.transmitted || transmittal.transmittalStatus == transmittalStatus.complete ?
                            <div>
                                <span style={{ display: 'block' }}>{moment.utc(transmittal.transmittedDateTime).format('MM/DD/YYYY')}</span>
                                <small style={{ color: colorPalette.primaryColor }}>{transmittal.transmittedBy}</small>
                            </div>
                            :
                            null
                    }
                </TableRowColumn>

                { /** TOTAL CLAIMS */}
                <TableRowColumn style={styles.tableRowColumnStyle.a}>
                    <a onClick={this.onViewClaims.bind(this)}>{`${transmittal.totalClaims}`}</a>
                </TableRowColumn>

                { /** DESCRIPTION */}
                {/*<TableRowColumn>{ transmittal.remarks }</TableRowColumn>*/}

                { /** CREATED UPDATE */}
                <TableRowColumn>{transmittal.dateCreated ? moment.utc(transmittal.dateCreated).format('MM/DD/YYYY') : '--'}</TableRowColumn>


                { /** LAST UPDATE */}
                <TableRowColumn>{transmittal.dateUpdated ? moment.utc(transmittal.dateUpdated).fromNow() : '--'}</TableRowColumn>

                { /** ACTIONS */}
                <TableRowColumn style={styles.actionWrapper}>

                    {transmittal.transmittalStatus == transmittalStatus.transmitting ?
                        // *** Loading indicator
                        <CircularProgress size={25} thickness={3} style={{ marginRight: '12px' }} />
                        :
                        <div>
                            {transmittal.transmittalStatus == transmittalStatus.transmitError ?
                                <IconButton
                                    iconStyle={styles.smallIcon}
                                    onTouchTap={openTransmittalsIssuesDialog.bind(this, transmittal)}>

                                    <ActionInfoOutline />
                                </IconButton>
                                : null}

                            <IconMenu
                                iconButtonElement={
                                    <IconButton>
                                        <MoreVertIcon color={colorPalette.secondaryTextColor} />
                                    </IconButton>
                                }
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}>

                                { /** MENUITEM MANAGE CLAIMS */}
                                <MenuItem
                                    leftIcon={<SearchIcon color={colorPalette.secondaryTextColor} />}
                                    primaryText="Manage Claims"
                                    onTouchTap={this.onViewClaims.bind(this)}
                                />

                                { /** MENU ITEM SUBMIT */}
                                {transmittal.transmittalStatus != transmittalStatus.transmitted
                                && transmittal.transmittalStatus != transmittalStatus.transmitting 
                                && transmittal.transmittalStatus != transmittalStatus.complete ?

                                transmittal.totalClaims >= 1 ?
                                    transmittal.transmittalStatus == transmittalStatus.draft ?
                                        <MenuItem
                                            leftIcon={<SendIcon color={colorPalette.secondaryTextColor} />}
                                            primaryText="Submit"
                                            onTouchTap={this.onSubmit.bind(this)}
                                        />
                                        :
                                        <MenuItem
                                            leftIcon={<SendIcon color={colorPalette.secondaryTextColor} />}
                                            primaryText="Re-Submit"
                                            onTouchTap={this.onSubmit.bind(this)}
                                        />
                                    : null
                                : null
                                }

                                { /** MENU ITEM VERIFY CLAIM STATUS */}
                                { transmittal.transmittalStatus == transmittalStatus.transmitted ?
                                    <MenuItem
                                        leftIcon={<VerifiedUserIcon color={colorPalette.secondaryTextColor} />}
                                        primaryText="Verify Claim Status"
                                        onTouchTap={openDialogVerifyClaimStatus.bind(this, transmittal)}
                                    />
                                : null}

                                { /** MENU ITEM SET TO COMPLETE */ }
                                { transmittal.transmittalStatus == transmittalStatus.transmitted ? 
                                    <MenuItem
                                        leftIcon={<CheckIcon color={colorPalette.secondaryTextColor} />}
                                        primaryText="Set To Complete"
                                        onTouchTap={openDialogSetToComplete.bind(this, transmittal)}
                                    />
                                : null }
                                
                                {/** MENU ITEM VIEW XML DATA */}                                 
                                {  transmittal.transmittalStatus != transmittalStatus.draft && transmittal.transmittalStatus != transmittalStatus.transmitting ?
                                <MenuItem
                                    leftIcon={<FileDownload color={colorPalette.secondaryTextColor} />}
                                    primaryText="View XML Data"
                                    href={`http://localhost:3000/api/PHICClaim/GetClaimXML?transmittalId=${transmittal.transmittalNumber}`}
                                />
                                : null }                                

                                <Divider />

                                { /** MENUITEM EDIT */}
                                <MenuItem
                                    leftIcon={<EditorModeEdit color={colorPalette.secondaryTextColor} />}
                                    primaryText="Edit"
                                    onTouchTap={openPhicTransmittalEditDialog.bind(this, transmittal)}
                                />

                                { /** MENUITEM REMOVE */}
                                {transmittal.transmittalStatus == transmittalStatus.draft ?
                                    <MenuItem
                                        leftIcon={<DeleteIcon color={colorPalette.secondaryTextColor} />}
                                        primaryText="Remove"
                                        onTouchTap={openPhicTransmittalDialogDelete.bind(this, transmittal)}
                                    />
                                : null}

                            </IconMenu>
                        </div>
                    }
                </TableRowColumn>
            </TableRow>
        );
    }
}

// *** props
PhicTransmittalsListItem.propTypes = {
    transmittal: PropTypes.object.isRequired,
    openPhicTransmittalDialogDelete: PropTypes.func.isRequired,
    submitPhicTransmittal: PropTypes.func.isRequired,
    openDialogSetToComplete : PropTypes.func.isRequired,
    openDialogVerifyClaimStatus : PropTypes.func.isRequired
    //isSubmitting : PropTypes.bool.isRequired
};

export default PhicTransmittalsListItem;
