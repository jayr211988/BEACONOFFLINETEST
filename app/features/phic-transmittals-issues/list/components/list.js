import React from 'react';

import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import PhicTransmittalsIssuesListItem from './list-item';

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
    }
};


/**
 * Transmittals Issues Dialog Component
 * 
 * @class PhicTransmittalsIssuesList
 * @extends {React.Component}
 */
@Radium
class PhicTransmittalsIssuesList extends React.Component {
 
    /**
     * Display List OF Transmittals Issues
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsIssuesList
     */
    onDisplayListOfTransmittalsIssues() {
        const { transmittalsIssuesList } = this.props;

        return transmittalsIssuesList.map((t, i) => (
            <PhicTransmittalsIssuesListItem  key={i} issue={t} />           
        ));
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsListIssues
     */
    render() {      
        const { closeDialog, selectedTransmittal,transmittalsIssuesList } = this.props;      

        return (
            <StyleRoot style={styles.container}>

                <h1 style={styles.title}>{`${transmittalsIssuesList.length} Issues Found in Transmittal no. ${selectedTransmittal.transmittalNumber}`}</h1>
                
                <div style={[styles.warningMessage]}>
                    <div>
                        <ActionInfoOutlineIcon style={{color: colorPalette.accentColor}}/>
                        <span style={[styles.warningTitle, {color: colorPalette.accentColor}]}>{ 'We found some issues in this transmittal.'}</span>
                    </div>
                    <div>
                        <small style={{paddingLeft: '30px', marginTop: '0' , color: '#4a4a4a'}}>{ 'These issues needs to be fixed to process the transmittal.' }</small>
                    </div>
                </div> 
                
                { /** TABLE */ }
                <Table
                    fixedHeader={true}
                    height="400px">

                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                        >
                        <TableRow >
                            <TableHeaderColumn style={{textAlign: 'center'}}>MESSAGE</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>ENCOUNTERED</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        displayRowCheckbox={false}>

                         { this.onDisplayListOfTransmittalsIssues() }
                    </TableBody>
                </Table>
                
                { /** CLOSE BUTTON */ }
                <div style={styles.buttonsExit}>
                    <ContentClearIcon style={{color: '#9b9b9b',cursor: 'pointer'}} onTouchTap={closeDialog.bind(this)}/>
                </div>
            </StyleRoot>                            
        );
    }
}

export default PhicTransmittalsIssuesList;