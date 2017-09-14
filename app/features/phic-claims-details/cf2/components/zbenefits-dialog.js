

// react
import React from 'react';


import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';

import { reduxForm, Field } from 'redux-form';

import { TextField } from 'redux-form-material-ui';


const styles = {
    title : {
        fontSize: '18px',
        fontWeight: 400,
        color: colorPalette.primaryColor,
        marginLeft: '10px'
    },
    buttonsCont : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0 10px 10px 0',
    },
    zBenefitCont: {
        height: '500px',
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: '20px',
        value: {
            margin: '15px 0 25px 0',
            color: colorPalette.primaryTextColor
        },
        items: {
            margin: '5px 10px'
        }
    }
};


@Radium
class zBenefitsDialog extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedCode : null,
            selectedValue : null,
            selectedCheck : false,
            selectedDescription: ''
        };
    }

    
    /**
     *  Pass the selected ZBenefits to Duck
     * 
     * 
     * @memberOf zBenefitsDialog
     */
    saveSelectedzBenefit() {
        const {  updateSelectedZBenefit, close} = this.props;                      
        updateSelectedZBenefit(this.state.selectedCode, this.state.selectedValue, this.state.selectedDescription);
        close();
    }

    
    /**
     *  Check for the value of the selected ZBenefit
     * 
     * @param {any} code
     * @param {any} value
     *  
     * @memberOf zBenefitsDialog
     */
    checkForValue(code, value, description) {       
        const { checkSelectedCheckboxOnZBenefit }  = this.props;
        this.setState ({
            selectedCode : code,
            selectedValue : value,
            selectedCheck : true,
            selectedDescription : description

            
        });

        checkSelectedCheckboxOnZBenefit(code);
    }

    


    /**
     *  Displaying the list of  ZBENEFITS with their Items
     * 
     * @returns
     * 
     * @memberOf zBenefitsDialog
     */
    onDisplayListOfZBenefits() {
        const {listOfZBenefits} = this.props;      

        let listOfBenefit = []; 
        
        listOfZBenefits.map((item, index) => {            
            listOfBenefit.push(
                <div key={index} style={styles.zBenefitCont.value}>
                    {item.value}
                    {item.items.map((perItem, index1) => (    
                        <div key={index1} style={styles.zBenefitCont.items}>                    
                            <Checkbox
                                label={`${perItem.code} - ${perItem.value}`} 
                                style={styles.checkbox}     
                                onCheck={this.checkForValue.bind(this, perItem.code, perItem.value, item.value)}                                                                                    
                                checked={perItem.checked}
                            />                            
                        </div>
                    ))}
                </div>
            );
        });
        return listOfBenefit;
    }

    render() {      

        const {open, close} = this.props;  
        return (
            <StyleRoot>
                <Dialog                 
                    modal={true}
                    open={open}
                    bodyStyle={{padding: '24px'}}
                    onRequestClose={close}
                    >
                    <h1 style={styles.title}>Add Z Benefits </h1>
                    <div>
                        
                    </div>
                    <div style={styles.zBenefitCont}>
                        
                        {this.onDisplayListOfZBenefits()}
                        
                    </div>
                    
                    <div style={styles.buttonsCont}>
                        <RaisedButton label="Close" onTouchTap={close} style={{marginRight: '20px'}}/>   
                        <RaisedButton label="Select" onTouchTap={close} secondary={true} onTouchTap={this.saveSelectedzBenefit.bind(this)}/>                           
                    </div>
                </Dialog>
            </StyleRoot>                            
        );
    }
}

export default zBenefitsDialog;