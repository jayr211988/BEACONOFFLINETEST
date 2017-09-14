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

import colorPalette from '../../../../util/styles/color-pallete';
import { initialData } from '../../../../util/data/index';
import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty';

import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

import moment from 'moment';

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
    },
    labelSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: colorPalette.lightBgColor,
        border: `1px dashed ${colorPalette.tertiaryTextColor}`,
        marginBottom: '5px',

        warning:{
            display: 'flex',
            alignItems: 'center'
        },

        smallInfoIcon: {
            color: colorPalette.accentColor,
            marginRight: '15px'
        },

        label: {
            color: colorPalette.accentColor,
            fontSize: '14px',
            fontWeight: 'bold',
        },
        reason:{
            margin: '5px 0 0 40px ',
            fontSize: '12px',
            letterSpacing: 'normal',
            color: colorPalette.primaryTextColor,
            textTransform: 'uppercase'
        }
    },
    uploadDocumentContainer:{
        height: '362px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

@Radium
class NewRequiredDocuments extends React.Component {

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

        uploadDocuments(selectedClaim, uploadingFiles, close, selectedTransmittal);
    }

    render() {
        const { uploadingFiles, close, uploadDocumentsRequestPending, selectedClaim } = this.props;
        
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
                <div style={styles.labelSectionContainer}>
                    <div style={styles.labelSectionContainer.warning}>
                                <ActionInfoOutline style={styles.labelSectionContainer.smallInfoIcon} />
                            <label style={styles.labelSectionContainer.label}>RETURN DATE</label>
                    </div>
                    {
                        <p style={styles.labelSectionContainer.reason}>Date Updated - {moment(selectedClaim.dateUpdated).format('MM/DD/YYYY')}</p> 
                    }
                </div>
                
                <div style={styles.labelSectionContainer}>
                    <div style={styles.labelSectionContainer.warning}>
                                <ActionInfoOutline style={styles.labelSectionContainer.smallInfoIcon} />
                            <label style={styles.labelSectionContainer.label}>RETURN DEFICIENCY</label>
                    </div>
                    {
                        selectedClaim.returnDeficiencies.map((deficiency, index)=>{
                            return <p key={index} style={styles.labelSectionContainer.reason}>{deficiency.deficiency}</p>
                        })
                    }
                </div>
                <div style={styles.uploadContainer}>
                { uploadingFiles.length == 0
                    ? <EmptyPlaceholder
                        style={{padding: '70px 0'}}
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

export default NewRequiredDocuments;
