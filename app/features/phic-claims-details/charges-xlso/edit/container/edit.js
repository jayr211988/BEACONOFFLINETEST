import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import XrayLabSuppliesAndOthersEdit from '../components/edit';

// *** material-ui components
import Dialog from 'material-ui/Dialog';


import Radium, {StyleRoot} from 'radium';

const styles = { 
    dialogBodyStyle : {
        minHeight: '262px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },  
};
@connect(
    state => state.phicClaimsDetailsXrayLabSuppliesAndOtherEditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class XrayLabSuppliesAndOthersEditContainer extends React.Component{

    constructor(props){
        super(props);
    }

    onSave(value) {
        const {
            selectedXlso,
            closeDialog,
            actions: { editPhicXlso }
        } = this.props;
        
        value['id'] = selectedXlso.id;
        editPhicXlso(
            value,
            closeDialog.bind(this)
        );
    }

    onSetDefaultValues() {
        const { selectedXlso } = this.props;

        return { 
            initialValues : {
                type : selectedXlso.type,
                description: selectedXlso.description,
                quantity: selectedXlso.quantity,
                renderDate: selectedXlso.renderDate && new Date(selectedXlso.renderDate) //Fix invalid date
            }
        };
    }


    render(){
        const { closeDialog, open, selectedXlso } = this.props;

        return(
            <StyleRoot>
                <Dialog
                open={ open }
                modal={ false }
                bodyStyle={styles.dialogBodyStyle}
                onRequestClose={closeDialog}>

                <XrayLabSuppliesAndOthersEdit
                 { ...this.onSetDefaultValues() }
                onSubmit={this.onSave.bind(this)} 
                closeDialog={closeDialog}
                selectedXlso={selectedXlso}/>  

                </Dialog>

            </StyleRoot>



        );

    }
}

export default XrayLabSuppliesAndOthersEditContainer;