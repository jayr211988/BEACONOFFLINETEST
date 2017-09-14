import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Dialog from 'material-ui/Dialog';

import ProductsFacilitesApiNew from '../../../../shared-components/products/products-dialog-qmeup-api';

import Radium, { StyleRoot } from 'radium';

@connect(
    state => state.productQmeUpAPIReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) }) 
)

@Radium
class ProductsFacilitesApiContainer extends React.Component {
 



    render() {
        const { open, close, productTitle, qmeupFacilities, selectedClient, newProductQmeUpApiPending,
            actions: {  
                        newFacilityForQMUtoHIS,
                        newFacilityForQMUtoEHRPrivate,
                        newFacilityForQMUtoEHR,
                        getListofUnmappedEHRFacility,
                        getListofUnmappedHISFacility,
                        getListofUnmappedEHRPrivateFacility,
                        displaySearchFacility} 
        } = this.props;
        return(
            <StyleRoot>
                <Dialog
                    open={open}
                    modal={false}
                >                    
                    <ProductsFacilitesApiNew
                        open={open}
                        close={close}
                        productTitle={productTitle}                        
                        facilities={qmeupFacilities}
                        newFacilityForQMUtoHIS={newFacilityForQMUtoHIS}
                        newFacilityForQMUtoEHRPrivate={newFacilityForQMUtoEHRPrivate}
                        newFacilityForQMUtoEHR={newFacilityForQMUtoEHR}
                        selectedClient={selectedClient}
                        getListofUnmappedEHRFacility={getListofUnmappedEHRFacility}
                        getListofUnmappedHISFacility={getListofUnmappedHISFacility}
                        getListofUnmappedEHRPrivateFacility={getListofUnmappedEHRPrivateFacility}
                        newProductQmeUpApiPending={newProductQmeUpApiPending}
                        displaySearchFacility={displaySearchFacility}
                    />


                </Dialog>

            </StyleRoot>


        );
    }
}

export default ProductsFacilitesApiContainer;