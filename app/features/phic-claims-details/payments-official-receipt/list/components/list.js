
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';
import PaymentsListItem from './list-item';
import OfficialReceiptNewContainer from '../../new/containers/new';
import OfficialReceiptEditContainer from '../../edit/containers/edit';

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
        letterSpacing: '0.6px',
        width: '120px'
    },  
    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px'
    },
    topContent:{
        display: 'flex',
        alignItems: 'center'
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
class PaymentsList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            openNewPaymentsDialog: false,
            basicDialogOpts : basicDialogOpts,
            basicDialogIsPending : false,
            openEditPaymentOfficialReceiptDialog: false,
            selectedOfficialReceipt: null
        };
    }
    onOpenNewPaymentsDialog() {
        this.setState({
            openNewPaymentsDialog: true
        });
    }

    onCloseNewPaymentsDialog() {
        this.setState({
            openNewPaymentsDialog: false
        });
    }

    onOpenEditPaymentOfficialReceiptDialog(selectedOfficialReceipt) {
        this.setState({
            openEditPaymentOfficialReceiptDialog: true,
            selectedOfficialReceipt: selectedOfficialReceipt
        });
    }

    onCloseEditPaymentOfficialReceiptDialog() {
        this.setState({
            openEditPaymentOfficialReceiptDialog: false,
            selectedOfficialReceipt: null
        });
    }

    render(){
        const {selectedClaim, selectedTransmittal,summaryMode} = this.props;
        return(
            <StyleRoot style={[styles.container, animation.fadeIn]}>
                <div style={styles.topContent}>
                    <h1 style={styles.title}>Payments</h1>
                    {   
                        !summaryMode
                        ? 
                        <div style={{margin: '10px 0'}}>
                            <FlatButton 
                                label="NEW"
                                icon={ <AddIcon /> }
                                labelPosition="after"
                                style={styles.flatButtonStyles}
                                onTouchTap={this.onOpenNewPaymentsDialog.bind(this)}
                            />
                        </div>   
                        :
                        null 
                    }
                    
                </div>

                <div>
                    {this.onDisplayListOfOfficialReceipt()}
                </div>

                { /** DIALOG */ }
                <OfficialReceiptNewContainer
                        open={this.state.openNewPaymentsDialog}
                        closeDialog={this.onCloseNewPaymentsDialog.bind(this)}
                        selectedClaim={selectedClaim} 
                        selectedTransmittal={selectedTransmittal} />
                
                { !this.state.selectedOfficialReceipt
                    ? null
                    :
                    <OfficialReceiptEditContainer
                        selectedClaim={selectedClaim}
                        open={this.state.openEditPaymentOfficialReceiptDialog}
                        selectedOfficialReceipt={this.state.selectedOfficialReceipt}
                        closeDialog={this.onCloseEditPaymentOfficialReceiptDialog.bind(this)} />
                }

                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogIsPending }
                />
            </StyleRoot>            
        );
    } 

    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogIsPending: pendingRequest
        });
    }

    onCloseBasicDialog() {
        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: false
            }
        });
    }
    openBasicDialogForRemove(selectedOfficialReceipt) {
        const { deleletePHICPaymentsOfficialReceipt } = this.props;
        
        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: true,
                title: 'Do you want to remove',
                subtitle: `${selectedOfficialReceipt.orNumber} will be permanently removed from this list.`,
                highlightTitle: selectedOfficialReceipt.orNumber,
                closeDialog: this.onCloseBasicDialog.bind(this),
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : deleletePHICPaymentsOfficialReceipt.bind(this, selectedOfficialReceipt.id, this.changePendingRequest.bind(this), this.onCloseBasicDialog.bind(this)),
                        secondary : true
                    }
                ]
            }
        });
    }    

    onDisplayListOfOfficialReceipt() {
        
        const { 
            phicPaymentOfficialReceipt, 
            selectedClaim,
            selectedTransmittal,
            newPHICPaymentDetails,
            editPHICPaymentDetails,
            deletePHICPaymentDetails,
            summaryMode } = this.props;
        

        return phicPaymentOfficialReceipt.map((t, i) => (
            <PaymentsListItem
                selectedTransmittal={selectedTransmittal}
                selectedClaim={selectedClaim}
                key={i}
                officialReceipt={t}
                onOpenEditPaymentOfficialReceiptDialog={this.onOpenEditPaymentOfficialReceiptDialog.bind(this)}
                openBasicDialogForRemove={this.openBasicDialogForRemove.bind(this)}
                editPHICPaymentDetails={editPHICPaymentDetails}
                deletePHICPaymentDetails={deletePHICPaymentDetails}
                newPHICPaymentDetails={newPHICPaymentDetails}  
                phicPaymentOfficialReceipt={phicPaymentOfficialReceipt}  
                summaryMode={summaryMode}            
                />
        ));
    }
 
}

export default PaymentsList;