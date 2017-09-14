import React from 'react';

import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRowColumn, TableRow } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import ActionInfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';
import ContentClearIcon from 'material-ui/svg-icons/content/clear';

const styles = {
    container: {
        width: '100%',
        height: '100%'
    },

    title : {
        fontSize: '20px',
        fontWeight: 400,
        color: colorPalette.primaryColor,
        marginLeft: '10px',
        letterSpacing: '0.4px',
        marginBottom: '20px'
    },
    buttonsExit : {
        position: 'absolute',
        right: '20px',
        top: '21px',
        margin: '0 10px 10px 0'
    },

    warningMessage: {
        padding: '20px 10px',
        marginTop: '10px',
        outline: '1px dashed #e6e6e6',
        backgroundColor: colorPalette.whiteSmoke
    },
    warningTitle: {
        position: 'relative',
        top: '-7px',
        left: '5px',
        color: colorPalette.accentColor,
        fontSize: '14px',
        fontWeight: 'bold'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },      
};


/**
 * Claims Issues Dialog Component
 * 
 * @class PhicClaimsTransferClaimList
 * @extends {React.Component}
 */
@Radium
class PhicClaimsTransferClaimList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTransmittal : null
        };
    }

    /**
     * Display List OF Claims Issues
     * 
     * @returns
     * 
     * @memberOf PhicClaimsTransferClaimList
     */
    onDisplayListItem() {
        const { availableListToTransfer } = this.props;

        return availableListToTransfer.map((t, i) => (

            <TableRow hoverable={true} key={i}>
                <TableRowColumn>{ t.transmittalNumber }</TableRowColumn>
                <TableRowColumn>{ t.phicPackageDescription }</TableRowColumn>
                <TableRowColumn>{ t.totalClaims }</TableRowColumn>
                <TableRowColumn>{ t.remarks }</TableRowColumn>
            </TableRow>               
        ));
    }

    /**
     * Transfer Claim
     * 
     * @param {any} event 
     * 
     * @memberOf PhicClaimsTransferClaimList
     */
    onTransferClaim(event) {
        event.preventDefault();

        const { selectedClaim, transferClaim, closeDialog } = this.props;

        transferClaim(
            selectedClaim.id,
            this.state.selectedTransmittal.id,
            this.state.selectedTransmittal.transmittalNumber,
            closeDialog.bind(this)
        );
    }

    /**
     * On Transmittal Selection
     * 
     * @param {any} index 
     * 
     * @memberOf PhicClaimsTransferClaimList
     */
    onTransmittalSelection(index) {
        const { availableListToTransfer } = this.props;

        this.setState({
            selectedTransmittal : availableListToTransfer[index[0]]
        });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsTransferClaimList
     */
    render() {      
        const { closeDialog, selectedClaim } = this.props;   
        return (
            <StyleRoot style={styles.container}>

                <h1 style={styles.title}>{`Transfer Claims No. ${selectedClaim.id}`}</h1>
                
                <div style={[styles.warningMessage]}>
                    <div>
                        <ActionInfoOutlineIcon style={{color: colorPalette.primaryColor}}/>

                        <span style={[styles.warningTitle, {color: colorPalette.primaryTextColor}]}>
                            Claims can only be transferred to TRANSMITTALS with package of the same type and with DRAFT status
                        </span>
                    </div>
                </div> 
                
                { /** TABLE */ }
                <Table
                    onRowSelection={this.onTransmittalSelection.bind(this)}
                    fixedHeader={true}
                    height="400px">

                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>TRANSMITTAL NO</TableHeaderColumn>
                            <TableHeaderColumn>PACKAGE</TableHeaderColumn>
                            <TableHeaderColumn>TOTAL CLAIMS</TableHeaderColumn>
                            <TableHeaderColumn>REMARKS</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        { this.onDisplayListItem() }
                    </TableBody>
                </Table>
             
                <div style={styles.buttonWrapper}>

                    <RaisedButton 
                        label="CANCEL"                       
                        onTouchTap={closeDialog.bind(this)}
                        style={styles.buttonWrapper.left}
                    />

                    <RaisedButton 
                        label="TRANSFER"                       
                        labelColor={colorPalette.white}
                        secondary={true}
                        style={styles.buttonWrapper.left}
                        onTouchTap={this.onTransferClaim.bind(this)}
                        disabled={!this.state.selectedTransmittal ? true : false}
                    />
                </div>
                { /** CLOSE BUTTON */ }
                <div style={styles.buttonsExit}>
                    <ContentClearIcon style={{color: '#9b9b9b',cursor: 'pointer'}} onTouchTap={closeDialog.bind(this)}/>
                </div>
            </StyleRoot>                            
        );
    }
}

export default PhicClaimsTransferClaimList;