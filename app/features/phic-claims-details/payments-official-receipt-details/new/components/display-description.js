
import React from 'react';
import Radium, {StyleRoot} from 'radium';

// material
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    dialogBodyStyle : {        
        padding: '24px'
    },  
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
class DisplayPaymentDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            selectedItemOnList: ''
        };
    } 

    

    listOfItems() {
        const {listOfDrugsAndXlso} = this.props;               
        let listOfItem = [];
        listOfDrugsAndXlso.map((item, index) => {
            listOfItem.push(
                <TableRow key={index}>                                        
                    <TableRowColumn>{item.value}</TableRowColumn>      
                    <TableRowColumn>{item.group}</TableRowColumn>      
                </TableRow>     
            );
        });
        return listOfItem;
    }
  
    onSavaeSelectedItem(e) {    
        const { listOfDrugsAndXlso} = this.props;                
        if (e.length > 0) {
            this.setState({
                selectedItemOnList : listOfDrugsAndXlso[e].value
            });        
        }
    }

    saveSelectedItem() {
        const {checkSelectedDrugsOrXLSO, close} = this.props;
        checkSelectedDrugsOrXLSO(this.state.selectedItemOnList);
        close();
    }   

    render() {
        
        const {open, close} = this.props;
        return (
            
            <StyleRoot>
                <Dialog                                   
                    modal={true}
                    open={open}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={close}>
                    <section style={styles.container}>
                        <div>
                            <h1 style={styles.title} >Select Description</h1>
                            <p style={styles.subtitle}>Select Description from Drugs and Medicine to Xray, Lab, Supplies and Others</p>                            
                            <div>
                                <p>List of Drugs, Medicine, and XLSOs</p>
                                 <Table 
                                    fixedHeader={true} 
                                    height={'300px'}
                                    onRowSelection={this.onSavaeSelectedItem.bind(this)}
                                    >
                                    <TableHeader displaySelectAll={false}>
                                    <TableRow>                                        
                                        <TableHeaderColumn>Description</TableHeaderColumn>                                        
                                        <TableHeaderColumn>Group</TableHeaderColumn>                                        
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        { this.listOfItems()}
                                    </TableBody> 
                                </Table>
                            </div>                                                     
                            <div style={styles.buttonWrapper}>
                                <RaisedButton 
                                    label="Close"
                                    style={ styles.buttonWrapper.left }
                                    onTouchTap={close}
                                />   
                                <RaisedButton 
                                    type="submit"
                                    label="Save"
                                    style={ styles.buttonWrapper.left }
                                    secondary={true }
                                    onTouchTap={this.saveSelectedItem.bind(this)}                                                          
                                />                              
                            </div>  
                        </div>
                    </section>
                </Dialog>
            </StyleRoot>            
        );
    }
}

export default DisplayPaymentDescription;