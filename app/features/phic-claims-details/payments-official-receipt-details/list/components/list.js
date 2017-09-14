
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';
import OfficialReceiptDetailsListItem from './list-item';
import BasicDialog from '../../../../../shared-components/basic-dialog';
import NewPaymentDetailContainers from '../../new/containers/new';
import EditPaymentDetailContainers from '../../edit/containers/edit';

const styles = {
    container: {

    },

    titleWrapper: {
        display: 'flex',
        alignItems: 'center',

        title: {
            color: colorPalette.primaryColor,
            fontSize : '14px',
            width: '160px',
            fontWeight: 600
        },
    },

    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px'
    },
    itemCont: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
        label : {
            color: colorPalette.primaryColor
        }
    },
};

const basicDialogOpts = {
    title : '',
    subtitle : '',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

@Radium

class OfficialReceiptDetailsList extends React.Component{
    constructor() {
        super();

        this.state = {
            openNewDrugsAndMedicinesDialog: false,
            basicDialogOpts: basicDialogOpts,
            basicDialogIsPending: false,
            openEditDrugsAndMedicinesDialog: false,
            selectedDrugAndMedicine: null,

            openNewPaymentDetails: false,
            openEditPaymentDetails: false
        };
    }
    
    // componentWillMount() {
    //     const {officialReceipt, getListOfPaymentDetails} = this.props;           
    //     getListOfPaymentDetails(officialReceipt.id);
    // }

    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogIsPending: pendingRequest
        });
    }

    onCloseBasicDialog() {
        const {officialReceipt, getListOfPaymentDetails} = this.props;  
        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: false
            }
        });

        getListOfPaymentDetails(officialReceipt.id);
    }

    deleteSelectedDetails(id) {        
        const {  deletePHICPaymentDetails, officialReceipt } = this.props;        
        deletePHICPaymentDetails(id, officialReceipt.id);             
    }

        

    openBasicDialogForRemove(officialReceipt) {                
        const { deleletePHICPaymentsOfficialReceiptDetails, officialReceiptItems, selectedTransmittal, selectedClaim } = this.props;
        
        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: true,
                title: 'Do you want to remove',
                subtitle: `${officialReceipt.description} will be permanently removed from this list.`,
                highlightTitle: officialReceipt.description,
                closeDialog: this.onCloseBasicDialog.bind(this),
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : deleletePHICPaymentsOfficialReceiptDetails.bind(this, 
                            officialReceipt.id, 
                            this.changePendingRequest.bind(this), 
                            this.onCloseBasicDialog.bind(this), 
                            this.deleteSelectedDetails.bind(this),   
                            officialReceiptItems,      
                            selectedClaim, 
                            selectedTransmittal,
                                                                                            
                            ),
                    
                        secondary : true
                    }
                ]
            }
        });        
    }

    /**
     *  OPEN ADD PAYMENT DETAILS DIALOG
     * 
     * 
     * @memberOf OfficialReceiptDetailsList
     */
    onOpenNewPaymentDetail() {
        this.setState({
            openNewPaymentDetails : true
        });
    }

    
    /**
     *  CLOSE ADD PAYMENT DETAILS DIALOG
     * 
     * 
     * @memberOf OfficialReceiptDetailsList
     */
    onCloseNewPaymentDetail() {
        const {officialReceipt, getListOfPaymentDetails} = this.props;                
        
        this.setState({
            openNewPaymentDetails: false
        });
        getListOfPaymentDetails(officialReceipt.id);
    }

    
    /**
     *  OPEN EDIT PAYMENT DETAILS DIALOG
     * 
     * 
     * @memberOf OfficialReceiptDetailsList
     */
    onOpenEditPaymentDetail(item) {      
        const {saveSelectedDetailToEdit} = this.props;  
        this.setState({
            openEditPaymentDetails : true
        });
        saveSelectedDetailToEdit(item);
    }
    
    /**
     *  CLOSE EDIT PAYMENT DETAILS DIALOG
     * 
     * 
     * @memberOf OfficialReceiptDetailsList
     */
    onCloseEditPaymentDetail() {
        const {officialReceipt, getListOfPaymentDetails} = this.props;       
        this.setState({
            openEditPaymentDetails : false
        });
        getListOfPaymentDetails(officialReceipt.id);
    }

    onOpenNewDrugsAndMedicinesDialog() {
        this.setState({
            openNewDrugsAndMedicinesDialog: true
        });
    }

    onCloseNewDrugsAndMedicinesDialog() {
        this.setState({
            openNewDrugsAndMedicinesDialog: false
        });
    }

    onOpenEditDrugsAndMedicinesDialog(selectedDrugAndMedicine) {
        this.setState({
            openEditDrugsAndMedicinesDialog: true,
            selectedDrugAndMedicine: selectedDrugAndMedicine
        });
    }

    onCloseEditDrugsAndMedicinesDialog() {
        this.setState({
            openEditDrugsAndMedicinesDialog: false,
            selectedDrugAndMedicine: null
        });
    }

    displayListOfPaymentDetails() {
        const {officialReceiptItems,summaryMode} = this.props;   
        if (officialReceiptItems)                {
            return officialReceiptItems.map((item, index) => (                                 
                <OfficialReceiptDetailsListItem
                    item={item} 
                    key={index}
                    summaryMode={summaryMode}
                    openBasicDialogForRemove={this.openBasicDialogForRemove.bind(this)}
                    openEditPaymentDetails={this.onOpenEditPaymentDetail.bind(this)}                    
                />            
            ));       
        }
    }


    render(){
        const { 
            selectedClaim, 
            saveToListOfPayment, 
            officialReceipt, 
            selectedDetail,
            editPHICPaymentDetails,
            officialReceiptItems,            
            newPHICPaymentDetails,
            selectedTransmittal,
            phicPaymentOfficialReceipt,
            summaryMode    
        } = this.props;        
        
        return( 
            <StyleRoot style={[styles.container, animation.fadeIn]}>   
                <div style={styles.itemCont}>
                    <p style={styles.itemCont.label}>ITEM : </p>
                        {  !summaryMode 
                            ?
                            <div style={{margin: '10px 0'}}>
                                <FlatButton 
                                    label="NEW"
                                    icon={ <AddIcon /> }
                                    labelPosition="after"
                                    style={styles.flatButtonStyles}   
                                    onTouchTap={this.onOpenNewPaymentDetail.bind(this)}                     
                                />
                            </div>
                            : 
                            null
                        }
                </div>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>

                        <TableRow style={styles.tableHeaderStyle}>
                            <TableHeaderColumn>DESCRIPTION</TableHeaderColumn>
                            <TableHeaderColumn>QTY</TableHeaderColumn>
                            <TableHeaderColumn>UNIT PRICE</TableHeaderColumn>
                            <TableHeaderColumn>AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        style={styles.tableBodyStyle}
                        displayRowCheckbox={false}>
                        
                        {this.displayListOfPaymentDetails()}
                                                
                    </TableBody>
                </Table> 

                <NewPaymentDetailContainers 
                    open={this.state.openNewPaymentDetails}
                    close={this.onCloseNewPaymentDetail.bind(this)}
                    selectedClaim={selectedClaim}
                    saveToListOfPayment={saveToListOfPayment}
                    officialReceipt={officialReceipt}         
                    newPHICPaymentDetails={newPHICPaymentDetails}     
                    officialReceiptItems={officialReceiptItems}      
                    paymentId={officialReceipt.id}
                    selectedTransmittal={selectedTransmittal}
                    phicPaymentOfficialReceipt={phicPaymentOfficialReceipt}
                />

                <EditPaymentDetailContainers 
                    open={this.state.openEditPaymentDetails}
                    close={this.onCloseEditPaymentDetail.bind(this)}      
                    selectedDetail={selectedDetail}     
                    editPHICPaymentDetails={editPHICPaymentDetails}         
                    paymentId={officialReceipt.id}
                />

                 <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogIsPending }
                />
            </StyleRoot>
        );
    }
}
export default OfficialReceiptDetailsList;