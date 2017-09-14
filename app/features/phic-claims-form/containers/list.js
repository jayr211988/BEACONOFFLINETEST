

import React from 'react';
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Radium, {StyleRoot} from 'radium';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';



import PHICHospitalCode from '../components/list';



@connect (
    state => state.phicHospitalCodeReducer, 
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PHICHospitalCodeContainer extends React.Component {   
    
    constructor (props) {
        super (props);    
    }

      
    
    render() {
        const { open, 
                close, 
                selectedProduct, 
                addHospitalCodeRequest, 
                listOfHospitalCode,
                deleteHospitalCodePendingRequest,  
                isSamePHICPackage,
                viewMode,              
                actions: {
                        AddHospitalCode,
                        saveTolistOfHospitalCode,
                        EditHospitalCode, 
                        DeleteHospitalCode,
                        EditHospitalPrimaryCodeSelected,
                        GetHospitalCode,
                        checkSamePackage,
                        isSamePackage}} = this.props;      
        return (
            <StyleRoot>
                 <Dialog                                        
                    modal={false}
                    open={open}
                    onRequestClose={isSamePHICPackage && listOfHospitalCode.length > 1? null : close}
                    contentStyle={{width: '1000px', maxWidth: 'none'}}            
                                  
                    >                
                
                    <PHICHospitalCode 
                        close ={close}
                        AddHospitalCode={AddHospitalCode}
                        selectedProduct={selectedProduct}
                        listOfHospitalCode={listOfHospitalCode}
                        saveTolistOfHospitalCode={saveTolistOfHospitalCode}
                        EditHospitalCode={EditHospitalCode}
                        DeleteHospitalCode={DeleteHospitalCode}
                        EditHospitalPrimaryCodeSelected={EditHospitalPrimaryCodeSelected}
                        GetHospitalCode={GetHospitalCode}
                        addHospitalCodeRequest={addHospitalCodeRequest}
                        deleteHospitalCodePendingRequest={deleteHospitalCodePendingRequest}
                        checkSamePackage={checkSamePackage} 
                        isSamePackage={isSamePackage}
                        viewMode={viewMode}                                           
                    />                    

                </Dialog>

                
            </StyleRoot>
        );
    }
}

export default PHICHospitalCodeContainer;