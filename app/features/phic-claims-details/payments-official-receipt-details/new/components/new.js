

// React + Redux
import React from 'react';
import { reduxForm, Field } from 'redux-form';


// material
import { TextField } from 'redux-form-material-ui';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import AddIcon from 'material-ui/svg-icons/content/add';

import DisplayPaymentDescription from './display-description';
// *** custom css styles
import { required, number, maxLength20, maxLength10  , validDate} from '../../../../../util/validation';
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
    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px'
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
    requiredText: {
        fontSize: '12px',
        color: 'red',
        marginTop: 0
    },
    qtyChecking: {
        fontSize: '12px',
        color: 'red',
        marginTop: '0'
    }
};
@reduxForm({
    form: 'OfficialReceiptNewPaymentItem'
})
@Radium
class NewPaymentDetails extends React.Component {
    
    constructor(props) {
        super(props);

        this.state ={
            qty: 0,
            unitPrice: 0,
            totalAmount: 0,
            description: '',
            displayDescription: false
        };
    }

    componentWillMount() {
        const {getDrugsAndXLODetails, selectedClaim, resetSelectedItem} = this.props;
        getDrugsAndXLODetails(selectedClaim.id);
        resetSelectedItem();
    }


    checkTotalAmount() {
        let totalAmount = '';
        totalAmount = this.state.qty * this.state.unitPrice;
        this.setState({
            totalAmount : totalAmount
        });
    }

    
    /**
     *  change the value of QTY
     * 
     * @param {any} e
     * @param {any} value
     * 
     * @memberOf NewPaymentDetails
     */
    changeQtyDialog(e, value) {
        const {changeQty} = this.props;        
        changeQty(value);

    }    

    
    /*
     *  change the value of UNITPRICE
     * 
     * @param {any} e
     * @param {any} value
     * 
     * @memberOf NewPaymentDetails
     */
    changeUnitPriceDialog(e, value) {
        const {changeUnitPrice } = this.props;                        
        changeUnitPrice(value);                   
    }
    
    
    componentDidUpdate() {
        const { totalAmount, selectedItem } = this.props;
        
        this.refs.amount.getRenderedComponent().props.input.onChange(totalAmount);   
        this.refs.description.getRenderedComponent().props.input.onChange(selectedItem);  
    }
    
    /**
     *  OPEN DISPLAY DESCRIPTION
     * 
     * 
     * @memberOf NewPaymentDetails
     */
    onOpenDisplayDescription() {
        this.setState({
            displayDescription : true
        });
    }

    
    /**
     *  CLOSE DISPLAY DESCRIPTION
     * 
     * 
     * @memberOf NewPaymentDetails
     */
    onCloseDisplayDescription() {
        this.setState({
            displayDescription : false
        });
    }

    
    totalAmount() {
        let total ='';
        total = this.state.qty * this.state.value;
        this.setState({
            totalAmount : total
        });
    }

    savePaymentDetails() {        
        const { 
            saveToListOfPaymentDetails,  selectedItem,  officialReceipt, 
            close,    officialReceiptItems, selectedTransmittal, selectedClaim,
            paymentId, phicPaymentOfficialReceipt, qty, unitPrice, totalAmount } = this.props;
        
        let newObj = {};
        newObj.id = officialReceipt.id;
        newObj.description = selectedItem;
        newObj.quantity = qty;
        newObj.unitPrice = unitPrice;
        newObj.amount = totalAmount;    
        newObj.ClaimId = selectedClaim.id;

        if (selectedItem.length > 0 ) {            
            saveToListOfPaymentDetails(newObj, paymentId, officialReceiptItems, selectedTransmittal, selectedClaim, phicPaymentOfficialReceipt, close);
        }

        this.refs.description.getRenderedComponent().props.input.onChange(''); 
        this.refs.qty.getRenderedComponent().props.input.onChange('0');    
        this.refs.unitprice.getRenderedComponent().props.input.onChange('0'); 
    }      

    closeNewPaymentDetails() {
        const { close } = this.props;

        this.refs.qty.getRenderedComponent().props.input.onChange('0');    
        this.refs.unitprice.getRenderedComponent().props.input.onChange('0'); 
        close();

    }

    onClickQty() {
        const { qty } = this.refs;
        if (qty.value == 0) {
            this.refs.qty.getRenderedComponent().props.input.onChange('');
        }
    }

    onClickUnitPrice() {
        const { unitprice } = this.refs;
        if (unitprice.value == 0) {
            this.refs.unitprice.getRenderedComponent().props.input.onChange('');
        }
    }

    render() {        
        
        const {selectedItem, addPaymentItemRequest, listOfDrugsAndXlso, checkSelectedDrugsOrXLSO} = this.props;                           
        return (
            <StyleRoot style={styles.container}>
                <div>
                    <h1 style={styles.title} >Payment Details - New</h1>
                    <p style={styles.subtitle}>Create new record for Payment Details</p>

                     <FlatButton 
                        label="NEW"
                        icon={ <AddIcon /> }
                        labelPosition="after"
                        style={styles.flatButtonStyles}
                        onTouchTap={this.onOpenDisplayDescription.bind(this)}
                    />                 
                    
                        <div style={styles.resultPayment}>
                            <Field
                                name="description"
                                hintText="Description"
                                floatingLabelText="Description"
                                style={styles.resultPayment.item}
                                value={selectedItem}             
                                ref="description" withRef                    
                                inputStyle={{color: colorPalette.primaryTextColor}}
                                disabled={true}    
                                component={TextField}                                                          
                            />                            
                            <Field
                                name="qty"
                                hintText="QTY"
                                floatingLabelText="QTY"
                                ref="qty" withRef
                                style={styles.resultPayment.item}                            
                                onChange={this.changeQtyDialog.bind(this)}                                   
                                component={TextField}  
                                validate={[required, maxLength10]}
                                onClick = {this.onClickQty.bind(this)}                                                                                                                   
                            />
                           
                            <Field
                                name="unitprice"
                                hintText="Unit Price"
                                ref="unitprice" withRef
                                floatingLabelText="Unit Price"
                                style={styles.resultPayment.item}
                                onChange={this.changeUnitPriceDialog.bind(this)}                                
                                component={TextField}  
                                validate={[required, maxLength10]}                             
                                onClick = {this.onClickUnitPrice.bind(this)} 
                            />                            
                            <Field
                                name="amount"
                                hintText="Amount"
                                floatingLabelText="Amount"
                                style={styles.resultPayment.item}                                
                                ref="amount" withRef
                                inputStyle={{color: colorPalette.primaryTextColor}}
                                component={TextField}  
                                disabled={true}
                                validate={[required, maxLength20]}                             
                            />
                        </div>                                                                                                   
                </div>                
                <div>             
                    { selectedItem === null ? 
                        <p style={styles.requiredText}>* Required</p>                     
                        : null                                        
                    }       
                </div>
            
                { /** DIALOG ACTIONS */ }

                { addPaymentItemRequest ? 
                    <CircularProgress />
                    : 
                    <div style={styles.buttonWrapper}>

                        <RaisedButton 
                            label="CLOSE"
                            style={ styles.buttonWrapper.left }
                            onTouchTap={this.closeNewPaymentDetails.bind(this)}
                        />   

                        <RaisedButton 
                            type="submit"
                            label="SAVE AND CREATE NEW"
                            style={ styles.buttonWrapper.left }
                            secondary={true }
                            onTouchTap={this.savePaymentDetails.bind(this)}
                        />                              
                    </div>  
                }

                <DisplayPaymentDescription 
                    open={this.state.displayDescription}
                    close={this.onCloseDisplayDescription.bind(this)}
                    listOfDrugsAndXlso={listOfDrugsAndXlso}
                    checkSelectedDrugsOrXLSO={checkSelectedDrugsOrXLSO}
                />

            </StyleRoot>
        );
    }
}
export default NewPaymentDetails;