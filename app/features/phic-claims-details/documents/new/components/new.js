import React from 'react';
import Radium, {StyleRoot} from 'radium';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Search from 'material-ui/svg-icons/action/search';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';

import colorPalette from '../../../../../util/styles/color-pallete';
import { initialData } from '../../../../../util/data/index';
import LoadingIndicatorPerAction from '../../../../../shared-components/loading-indicator-per-action';
import EmptyPlaceholder from '../../../../../shared-components/placeholders/empty';

const styles = {
    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        //width: '100px'
    },
    uploadContainer: {
        marginTop: '10px'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',

        left: {
            marginLeft: '12px'
        }
    }
};

@Radium
class DocumentsNew extends React.Component {

    componentWillMount() {
        const { clearUploadingFiles } = this.props;
        clearUploadingFiles();
    }

    selectDocument(event) {
        event.preventDefault();
        const { inputfiles } = this.refs;
        const { addUploadingFiles } = this.props;

        let files = [];
        for (var i = 0; i < inputfiles.files.length; i++) {
            files.push(inputfiles.files[i]);
        }
        addUploadingFiles(files);
    }

    handleDocumentType(uploadingFileIndex, event, docTypeIndex) {
        const { changeDocumentType } = this.props;

        changeDocumentType(initialData.documentType[docTypeIndex - 1], uploadingFileIndex);
    }

    removeUploadingFile(index) {
        const { removeUploadingFile } = this.props;

        removeUploadingFile(index);
    }

    uploadDocuments(event) {
        event.preventDefault();

        const { uploadDocuments, selectedClaim, uploadingFiles, close, selectedTransmittal } = this.props;
        

        uploadDocuments(selectedClaim.id, uploadingFiles, close, selectedTransmittal.hospitalCode);
    }

    render() {
        const { uploadingFiles, close, uploadDocumentsRequestPending } = this.props;
        
        return (
            <StyleRoot>
                <div style={styles.uploadContainer}>
                    <FlatButton
                        containerElement='label'
                        label="BROWSE"
                        icon={ <Search /> }
                        labelPosition="after"
                        style={styles.flatButtonStyles}>
                        <input type="file"
                            style={{display: 'none'}}
                            onChange={this.selectDocument.bind(this)}
                            ref="inputfiles"
                            multiple={true}
                            accept="application/pdf" />
                    </FlatButton>
                </div>
                <div style={{height: '450px'}}>
                { uploadingFiles.length == 0
                    ? <EmptyPlaceholder
                        style={{paddingTop: '140px'}}
                        subtitle="Please select document(s) to upload"
                        title="Upload PDF/A document(s)" />
                    : <Table
                        selectable={false}
                        height={'300px'}
                        multiSelectable={false}>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip="Document Type" style={{width: '256px'}}>Document Type</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '24px'}}> </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={false}
                            showRowHover={true}
                            stripedRows={false}>
                            {uploadingFiles.map( (t, i) => (
                                <TableRow key={i}>
                                    <TableRowColumn style={{width: '256px'}}>
                                        <DropDownMenu
                                            onChange={this.handleDocumentType.bind(this, i)}
                                            value={t.documentType}
                                            style={{display: 'flex'}}
                                            underlineStyle={{display: 'none'}}
                                            iconStyle={{fill: colorPalette.secondaryTextColor}}
                                            >
                                            <MenuItem disabled={true} style={{color: colorPalette.secondaryTextColor}} value={undefined} primaryText='Select Document Type' />
                                            { initialData.documentType.map((u, i) => (
                                                <MenuItem key={i} value={u.code} primaryText={`${u.code} - ${u.value}`} />
                                            )) }
                                        </DropDownMenu>
                                    </TableRowColumn>
                                    <TableRowColumn>{t.name}</TableRowColumn>
                                    <TableRowColumn style={{width: '24px'}}>
                                        <IconButton>
                                            <Close onTouchTap={this.removeUploadingFile.bind(this, i)} color={colorPalette.secondaryTextColor}/>
                                        </IconButton>
                                        {/*<IconMenu
                                            iconButtonElement={
                                                <IconButton>
                                                    <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                                </IconButton>
                                            }
                                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                            
                                            <MenuItem 
                                                leftIcon={ <Check color={colorPalette.primaryTextColor} /> } 
                                                primaryText="Remove"
                                            />
                                        </IconMenu>*/}
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
                </div>
                <div style={styles.buttonWrapper}>
                    { uploadDocumentsRequestPending
                        ?
                        <LoadingIndicatorPerAction style={{padding: '0 10px'}} text="Uploading..." />
                        :
                        <div>
                            <RaisedButton
                                style={ styles.buttonWrapper.left }
                                label={ 'CANCEL' }
                                onTouchTap={close}
                            />
                            <RaisedButton
                                style={ styles.buttonWrapper.left }
                                label={ 'UPLOAD' }
                                secondary={true}
                                onTouchTap={this.uploadDocuments.bind(this)}
                            />
                        </div>
                    }
                </div>
            </StyleRoot>
        );
    }

}

export default DocumentsNew;
