import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import Radium, { StyleRoot } from 'radium';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import colorPalette from '../../../../../util/styles/color-pallete';
import DocumentsNew from '../components/new';

const styles = {
    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'
        
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialogBodyStyle: {
        padding: '24px'
    }
};

@connect(
    state => state.phicClaimsDetailsDocumentsNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class DocumentsNewContainer extends React.Component {

    render() {
        const { close, 
                open, 
                uploadingFiles, 
                selectedClaim, 
                uploadDocumentsRequestPending, 
                selectedTransmittal,
                actions: { addUploadingFiles, changeDocumentType, removeUploadingFile, uploadDocuments, clearUploadingFiles } } = this.props;
        return (
            <StyleRoot>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={close}>

                    <div style={styles.titleContainer}>
                        <div>
                            <h1 style={styles.title}>Documents - New</h1>
                            <p style={{fontSize: '14px', marginBottom: 0}}>Upload Documents for this claim.</p>
                        </div>      
                        <div>
                            <IconButton>
                                <Close onTouchTap={close} />
                            </IconButton>
                        </div>
                    </div>
                    
                    <DocumentsNew
                        close={close}
                        selectedClaim={selectedClaim}
                        uploadingFiles={uploadingFiles}
                        changeDocumentType={changeDocumentType}
                        removeUploadingFile={removeUploadingFile}
                        addUploadingFiles={addUploadingFiles}
                        uploadDocuments={uploadDocuments}
                        uploadDocumentsRequestPending={uploadDocumentsRequestPending}
                        selectedTransmittal={selectedTransmittal}
                        clearUploadingFiles={clearUploadingFiles} />
                </Dialog>
            </StyleRoot>
        );
    }

}

export default DocumentsNewContainer;
