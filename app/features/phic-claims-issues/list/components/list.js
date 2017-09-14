import React from 'react';

import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import PhicClaimsIssuesListItem from './list-item';

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
 * Claims Issues Dialog Component
 * 
 * @class PhicClaimsListIssues
 * @extends {React.Component}
 */
@Radium
class PhicClaimsListIssues extends React.Component {
 
    /**
     * Display List OF Claims Issues
     * 
     * @returns
     * 
     * @memberOf PhicClaimsListIssues
     */
    onDisplayListOfClaimsIssues() {
        const { claimsIssuesList } = this.props;

        return claimsIssuesList.map((t, i) => (
            <PhicClaimsIssuesListItem  key={i} issue={t} />           
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
        const { closeDialog, claimsIssuesList, selectedClaim, headerMessage, errorMessage, errorDescription } = this.props;          
        return (
            <StyleRoot style={styles.container}>

                <h1 style={styles.title}>{claimsIssuesList.length} {headerMessage ? headerMessage : 'Issue(s) Found in Claim no.' }   {selectedClaim.id}</h1>
                
                <div style={[styles.warningMessage]}>
                    <div>
                        <ActionInfoOutlineIcon style={{color: colorPalette.accentColor}}/>
                        <span style={[styles.warningTitle, {color: colorPalette.accentColor}]}>{errorMessage ? errorMessage : 'We found some issues in this claim.' }</span>
                    </div>
                    <div>
                        <small style={{paddingLeft: '30px', marginTop: '0' , color: '#4a4a4a'}}>{errorDescription ? errorDescription : 'These issues need to be fixed before this claim is eligible for processing.'}</small>
                    </div>
                </div> 
                
                { /** TABLE */ }
                <Table
                    fixedHeader={true}
                    height="400px">

                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>

                        <TableRow>
                            <TableHeaderColumn style={{ width: '26%' }}>CATEGORY</TableHeaderColumn>
                            <TableHeaderColumn style={{ width: '74%' }}>MESSAGE</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        displayRowCheckbox={false}>

                        { this.onDisplayListOfClaimsIssues() }
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

export default PhicClaimsListIssues;