import React from 'react';
import Radium, {StyleRoot} from 'radium';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import AddIcon from 'material-ui/svg-icons/content/add';

import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';
import DocumentsListItem from './list-item';
import DocumentsNewContainer from '../../new/containers/new';
import BasicDialog from '../../../../../shared-components/basic-dialog';

const styles = {
    container : {
        padding: '50px 24px 60px',
        backgroundColor: colorPalette.white,
        position: 'relative',
        marginTop: '30px',
        minHeight: 'calc(100vh - 357px)'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 600,
        fontSize: '20px',
        letterSpacing: '0.6px'
    },  
    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px'
    }
};

const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : '',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

@Radium
class DocumentsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openNewDocumentDialog: false,
            basicDialogOpts : basicDialogOpts
        };
    }

    onOpenNewDocumentDialog() {
        this.setState({
            openNewDocumentDialog: true
        });
    }

    onCloseNewDocumentDialog() {
        this.setState({
            openNewDocumentDialog: false
        });
    }

    onOpenRemoveDocumentDialog(selectedDocument) {
        const { selectedClaim, deletePHICDocument } = this.props;

        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                title: 'Do you want to remove',
                subtitle: 'This document will be permanently removed.',
                highlightTitle: selectedDocument.name,
                open: true,
                closeDialog : this.onCloseBasicDialog.bind(this),
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : deletePHICDocument.bind(this, selectedClaim.id, selectedDocument.id, this.onCloseBasicDialog.bind(this)), 
                        secondary : true
                    }
                ]
            }
        });
    }

    onCloseBasicDialog() {
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                open: false
            }
        });
    }

    render() {
        const { phicDocuments, selectedClaim, deletePHICDocumentRequestPending,summaryMode, selectedTransmittal  } = this.props;        
        return (
        <StyleRoot style={[styles.container, animation.fadeIn]}>
            <h1 style={styles.title}>Documents</h1>
                {   
                    !summaryMode
                    ? 
                    <div style={{margin: '10px 0'}}>
                        <FlatButton 
                            label="NEW"
                            icon={ <AddIcon /> }
                            labelPosition="after"
                            style={styles.flatButtonStyles}
                            onTouchTap={this.onOpenNewDocumentDialog.bind(this)}
                        />
                    </div>
                    : 
                    null
                }
            <Table>
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}>

                    <TableRow style={styles.tableHeaderStyle}>
                        <TableHeaderColumn>DOCUMENT TYPE</TableHeaderColumn>
                        <TableHeaderColumn>NAME</TableHeaderColumn>
                        <TableHeaderColumn>DATE UPLOAD</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>                    
                        <TableHeaderColumn> </TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody 
                    showRowHover={true}
                    style={styles.tableBodyStyle}
                    displayRowCheckbox={false}>

                    {
                        phicDocuments.map((t, i) => (
                            <DocumentsListItem
                                key={i}
                                document={t}
                                openRemoveDialog={this.onOpenRemoveDocumentDialog.bind(this, t)}
                                summaryMode={summaryMode} />
                        ))
                    }

                </TableBody>
            </Table>

            <DocumentsNewContainer
                selectedClaim={selectedClaim}
                open={this.state.openNewDocumentDialog}
                selectedTransmittal={selectedTransmittal}
                close={this.onCloseNewDocumentDialog.bind(this)} />

            <BasicDialog
                basicDialogOpts={ this.state.basicDialogOpts }
                closeDialog={ this.onCloseBasicDialog.bind(this) }
                isPending={ deletePHICDocumentRequestPending } />
        </StyleRoot>
        );
    }
}

export default DocumentsList;
