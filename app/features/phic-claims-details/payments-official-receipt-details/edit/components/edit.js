
import React from 'react';

// material
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

import Radium, {StyleRoot} from 'radium';

const styles = {
    container: {
        width: '100%',
        height: '100%',        
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
        margin: 0
    },    

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },  

    contentWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },

    textFieldWrapper : {
        width: '100%',
        display: 'flex',

        mediumWidth: {
            width: '310px',
            marginRight: '50px'
        }
    },
    resultPayment : {
        display: 'flex',
        item : {
            marginRight: '10px'
        }

    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },   
};


@Radium
class EditPaymentDetails extends React.Component {

    constructor(props) {
        super(props);
        const {selectedDetail} = this.props;
        this.state ={            
            qty: selectedDetail.quantity,
            unitPrice: selectedDetail.unitPrice,
            totalAmount: selectedDetail.amount
        };
    }


    saveEditDAta() {
        const {selectedDetail, saveEditPHICPaymentOfficialReceiptDetails, close, editPHICPaymentDetails, paymentId} = this.props;
        const newObj = {};
        newObj.id = selectedDetail.id;
        newObj.description = selectedDetail.description;
        newObj.quantity = this.state.qty;
        newObj.amount = this.state.totalAmount;
        newObj.unitPrice = this.state.unitPrice;
                
        editPHICPaymentDetails(newObj, paymentId);
        saveEditPHICPaymentOfficialReceiptDetails(newObj, close);
    }

       /**
     *  change the value of QTY
     * 
     * @param {any} e
     * @param {any} value
     * 
     * @memberOf NewPaymentDetails
     */
    changeQty(e, value) {
        let totalPrice = 0;
        totalPrice = value * this.state.unitPrice;
        
        this.setState({
            qty: value,
            totalAmount: totalPrice
        });        
    }  

      /**
     *  change the value of UNITPRICE
     * 
     * @param {any} e
     * @param {any} value
     * 
     * @memberOf NewPaymentDetails
     */
    changeUnitPrice(e, value) {
        let totalPrice = 0;
        totalPrice = value * this.state.qty;

        this.setState({
            unitPrice: value,
            totalAmount: totalPrice
        });
    }

    
    render() {
        const {close, selectedDetail} = this.props;             
        return (
            <StyleRoot style={styles.container}>
                <div>
                    <h1 style={styles.title} >Payment Details - Edit</h1>
                    <p style={styles.subtitle}>Create new record for Payment Details</p>
                                       
                    <div style={styles.resultPayment}>
                        <TextField
                            hintText="Description"
                            floatingLabelText="Description"
                            style={styles.resultPayment.item}
                            value={selectedDetail.description}
                            disabled={true}
                            inputStyle={{color: colorPalette.primaryTextColor}}
                        />
                        <TextField
                            hintText="QTY"
                            floatingLabelText="QTY"
                            style={styles.resultPayment.item}                            
                            defaultValue={this.state.qty}      
                            onChange={this.changeQty.bind(this)}                                          
                        />
                        <TextField
                            hintText="Unit Price"
                            floatingLabelText="Unit Price"
                            style={styles.resultPayment.item}                                
                            defaultValue={this.state.unitPrice}     
                            onChange={this.changeUnitPrice.bind(this)}                       
                            
                        />
                        <TextField
                            hintText="Amount"
                            floatingLabelText="Amount"
                            style={styles.resultPayment.item}
                            disabled={true}                                
                            inputStyle={{color: colorPalette.primaryTextColor}}
                            value={this.state.totalAmount}
                        />
                    </div>
                                                                        
                </div>
                 { /** DIALOG ACTIONS */ }
                                  
                <div style={styles.buttonWrapper}>

                    <RaisedButton 
                        label="Cancel"
                        style={ styles.buttonWrapper.left }        
                        onTouchTap={close}        
                    />   
                    <RaisedButton 
                        type="submit"
                        label="Save"
                        style={ styles.buttonWrapper.left }
                        secondary={true }                
                        onTouchTap={this.saveEditDAta.bind(this)}
                    />                              
                </div>                                           
            </StyleRoot>
        )
    }
}

export default EditPaymentDetails;