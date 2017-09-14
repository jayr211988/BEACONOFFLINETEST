
// react + redux
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// material - ui
import Dialog from 'material-ui/Dialog';
import Radium, {StyleRoot} from 'radium';

import EditPaymentDetails from '../components/edit';
// dumb component

const styles = { 
    dialogBodyStyle : {
        
        padding: '24px'
    },  
};
@connect (
    state => state.phicClaimsDetailsPaymentOfficialReceiptDetailsEditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)

@Radium
class EditPaymentDetailContainers extends React.Component {
    render() {
        const {open, close, selectedDetail, editPHICPaymentDetails, paymentId, actions: {saveEditPHICPaymentOfficialReceiptDetails }} = this.props;
        return (
            <StyleRoot>
                <Dialog                                    
                    modal={false}
                    open={open}
                    onRequestClose={this.handleClose}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={close}
                    >   
                    
                    <EditPaymentDetails  
                        close={close}
                        selectedDetail={selectedDetail}
                        saveEditPHICPaymentOfficialReceiptDetails={saveEditPHICPaymentOfficialReceiptDetails}
                        editPHICPaymentDetails={editPHICPaymentDetails}
                        paymentId={paymentId}
                    />

                </Dialog>
            </StyleRoot>
        );
    }
}

export default EditPaymentDetailContainers;