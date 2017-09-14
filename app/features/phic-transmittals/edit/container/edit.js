import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import PhicTransmittalEdit from '../component/edit';
// LoadingContainer
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

// *** material-ui components
import Dialog from 'material-ui/Dialog';

import Radium, {StyleRoot} from 'radium';

const styles = { 
    dialogBodyStyle : {
        minHeight: '262px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
    },  
};

@connect(
    state => state.phicTransmittalsEditReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicTransmittalEditContainer extends React.Component{

    constructor(props){
        super(props);      
    }

    onSave(value) {
        const {
            selectedTransmittal,
            closeDialog,
            actions: { editPhicTransmittal }
        } = this.props;
        
        value['id'] = selectedTransmittal.id;
        editPhicTransmittal(
            value,
            closeDialog.bind(this)
        );
    }

    onSetDefaultValues() {
        const { selectedTransmittal } = this.props;
        return { 
            initialValues : {
                remarks : selectedTransmittal ? selectedTransmittal.remarks : null,
                packageTypeCode: selectedTransmittal ? selectedTransmittal.phicPackageDescription : null,
                hospitalCode: selectedTransmittal ? selectedTransmittal.hospitalCode : null,
                hcitypeCode: selectedTransmittal ? selectedTransmittal.phichciTypeDescription : null,
                accreditationNumber: selectedTransmittal ? selectedTransmittal.accreditationNumber : null
            }
        };
    }


    render(){
        const { closeDialog, open, phicTransmittal, editPhicTransmittalRequestPending } = this.props;
        return (
              <StyleRoot>      
                    <Dialog
                    open={ open }
                    modal={ false }
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={closeDialog}>
                    
                    { editPhicTransmittalRequestPending ?
                        <LoadingIndicatorPerContainer isDialog={true} />
                        :
                        <PhicTransmittalEdit
                         { ...this.onSetDefaultValues() }
                        onSubmit={this.onSave.bind(this)} 
                        closeDialog={closeDialog}
                        phicTransmittal={phicTransmittal} />
                    }
                        
                       
                    </Dialog>                        
              </ StyleRoot >                 
        );


    }

}
export default PhicTransmittalEditContainer;