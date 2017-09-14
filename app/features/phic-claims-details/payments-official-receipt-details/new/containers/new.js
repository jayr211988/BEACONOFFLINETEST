// react + redux
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
// material - ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Radium, {StyleRoot} from 'radium';
// dumb comp 
import NewPaymentDetails from '../components/new';



const styles = { 
    dialogBodyStyle : {
        
        padding: '24px'
    },  
};


@connect(
    state => state.phicClaimsDetailsPaymentOfficialReceiptDetailsNewReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class NewPaymentDetailContainers extends React.Component {

    constructor(props) {
        super(props);
      
    }
     
    onSetDefaultValues() {
        const {unitPrice, qty} = this.props;
        return {
            initialValues: {
                unitprice : unitPrice,
                qty: qty,  
                amount: 0          
            }
        };        
    }

    render() {
            

        const { open, 
                close, 
                selectedClaim, 
                listOfDrugsAndXlso,
                selectedItem,                 
                officialReceipt,
                addPaymentItemRequest,
                officialReceiptItems,
                newPHICPaymentDetails,
                newPaymentDetails,
                paymentId,
                selectedTransmittal,
                phicPaymentOfficialReceipt,
                totalAmount,
                unitPrice,
                qty,
            actions :  {
                getDrugsAndXLODetails,
                checkSelectedDrugsOrXLSO,
                saveToListOfPaymentDetails,
                changeQty,
                changeUnitPrice,
                resetSelectedItem
            }
        } = this.props;                
        
        return (
            <StyleRoot>
                <Dialog                                    
                    modal={false}
                    open={open}
                    onRequestClose={close}
                    bodyStyle={styles.dialogBodyStyle}>   
                    
                    <NewPaymentDetails  
                        {...this.onSetDefaultValues()}
                        close={close}
                        selectedClaim={selectedClaim}
                        getDrugsAndXLODetails={getDrugsAndXLODetails}                    
                        listOfDrugsAndXlso={listOfDrugsAndXlso}
                        selectedItem={selectedItem}
                        checkSelectedDrugsOrXLSO={checkSelectedDrugsOrXLSO}
                        saveToListOfPaymentDetails={saveToListOfPaymentDetails}
                        officialReceipt={officialReceipt}
                        addPaymentItemRequest={addPaymentItemRequest}
                        officialReceiptItems={officialReceiptItems}
                        newPHICPaymentDetails={newPHICPaymentDetails}
                        newPaymentDetails={newPaymentDetails}
                        paymentId={paymentId}
                        selectedTransmittal={selectedTransmittal}
                        phicPaymentOfficialReceipt={phicPaymentOfficialReceipt}
                        changeQty={changeQty}
                        changeUnitPrice={changeUnitPrice}
                        totalAmount={totalAmount}
                        unitPrice={unitPrice}
                        qty={qty}
                        resetSelectedItem={resetSelectedItem}
                    />

                </Dialog>
            </StyleRoot>
        );
    }
}
export default NewPaymentDetailContainers;