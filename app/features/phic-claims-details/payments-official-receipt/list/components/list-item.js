
// react
import React, { PropTypes } from 'react';

// material ui
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// others

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import moment from 'moment';
import Radium from 'radium';
import colorPalette from '../../../../../util/styles/color-pallete';
import OfficialReceiptDetailsContainer from '../../../payments-official-receipt-details/list/containers/list';


const styles = {
    wrapper:{
        padding: '20px',        
        margin: '20px auto',
        backgroundColor: colorPalette.lightBgColor,
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderColor: '#d8d8d8',

        parentContainer:{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',

            child:{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginBottom: '20px',

                childContent: {
                    display: 'flex',
                    alignItems: 'center',

                    label: {
                        color: colorPalette.primaryColor,
                        minWidth: '150px',
                        display: 'inline-block',
                        margin: '5px 0'
                    }
                }        
            }
        }
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
    w30:{
        width: '30%'
    },
    w35:{
        width: '35%'
    },
    textRight: {
        textAlign: 'right'
    }
};

@Radium
class PaymentsListItems extends React.Component{
     

    render(){
        const { 
            officialReceipt, 
            onOpenEditPaymentOfficialReceiptDialog, 
            openBasicDialogForRemove, 
            selectedClaim,
            editPHICPaymentDetails,
            deletePHICPaymentDetails,
            newPHICPaymentDetails,
            selectedTransmittal,
            phicPaymentOfficialReceipt,            
            summaryMode 
        } = this.props;        
        
        return(
            <div style={styles.wrapper}>
                <div style={styles.wrapper.parentContainer}>
                    <div style={[styles.wrapper.parentContainer.child, styles.w35]}>
                        <div style={styles.wrapper.parentContainer.child.childContent}>
                            <label style={styles.wrapper.parentContainer.child.childContent.label}>OR NUMBER</label>
                            {officialReceipt.orNumber}
                        </div>
                        <div style={styles.wrapper.parentContainer.child.childContent}>
                            <label style={styles.wrapper.parentContainer.child.childContent.label}>OR DATE</label>
                            {moment(officialReceipt.orDate).format('MM/DD/YYYY')}
                        </div>
                    </div>

                    <div style={[styles.wrapper.parentContainer.child, styles.w35]}>
                        <div style={styles.wrapper.parentContainer.child.childContent}>
                            <label style={styles.wrapper.parentContainer.child.childContent.label}>AMOUNT</label>
                            {officialReceipt.amount}
                        </div>
                        <div style={styles.wrapper.parentContainer.child.childContent}>
                            <label style={styles.wrapper.parentContainer.child.childContent.label}>VAT EXEMPT SALE</label>
                            {officialReceipt.vatExemptSale}
                        </div> 
                        <div style={styles.wrapper.parentContainer.child.childContent}>
                            <label style={styles.wrapper.parentContainer.child.childContent.label}>VAT</label>
                            {officialReceipt.vat}
                        </div>                   
                    </div>

                    <div style={[styles.wrapper.parentContainer.child, styles.w30, styles.textRight]}>
                             {  !summaryMode 
                                ?
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton>
                                            <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                        </IconButton>
                                    }
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                    <MenuItem 
                                        leftIcon={ <ModeEdit color={colorPalette.secondaryTextColor} /> } 
                                        primaryText="Edit"
                                        onTouchTap={onOpenEditPaymentOfficialReceiptDialog.bind(this, officialReceipt)}
                                        />
                                    <MenuItem 
                                    leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Remove"
                                    onTouchTap={openBasicDialogForRemove.bind(this, officialReceipt)}
                                />
                                </IconMenu>
                                : 
                                null
                            }
                    </div>
                </div>               
                <div>                       
                    <OfficialReceiptDetailsContainer 
                        selectedClaim={selectedClaim}
                        officialReceipt={officialReceipt} 
                        officialReceiptItems={officialReceipt.items}
                        editPHICPaymentDetails={editPHICPaymentDetails}
                        deletePHICPaymentDetails={deletePHICPaymentDetails}
                        newPHICPaymentDetails={newPHICPaymentDetails}            
                        selectedTransmittal={selectedTransmittal}            
                        phicPaymentOfficialReceipt={phicPaymentOfficialReceipt}
                        summaryMode={summaryMode}
                        />
                </div>           
            </div>
        );
    }
}

export default PaymentsListItems;

// *** props
PaymentsListItems.propTypes = {
    officialReceipt : PropTypes.object.isRequired
};