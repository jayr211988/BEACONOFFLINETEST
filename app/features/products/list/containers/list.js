import React from 'react';
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux';

import * as duck from '../duck';

// *** dumb componnet
import ProductList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

import Radium, { StyleRoot } from 'radium';

/**
 * Products List Container
 * 
 * @class ProductListContainer
 * @extends {React.Component}
 */
@connect (
    state => state.productListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ProductListContainer extends React.Component {    

    /**
     * component Will Mount
     * 
     * 
     * @memberOf ProductListContainer
     */
    componentWillMount() {        
        const {params} = this.props;
        const { getSelectedClient, getProductsList, getListOfFacilities} = this.props.actions;
        
        getSelectedClient(params.id);
        getProductsList(params.id);
        getListOfFacilities(params.id);
    }
   
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ProductListContainer
     */
    render() {
        const { 
            selectedClient, 
            productsListRequestPending, 
            productsList, 
            getClientByIdPending, 
            newProductPhicEclaimsFormRequestPending,
            refreshProductsListRequestPending,
            newProductPhicEclaimsApiRequestPending,
            deletePhicEclaimsApiRequestPending,
            listOfHospitalCode,
            hospitalCodeName,
            ProductsBasicDialogPending,
            params,
            qmuForHis,

            actions : {
                // *** Actions
                newProductPhicEclaimsForm,
                refreshProductsList,
                newProductPhicEclaimsApi,                
                deletePhicEclaimsApi,
                deleteQMUtoHISApi,
                deleteQMUtoEHRApi,
                deleteQMUtoEHRPrivateApi,
                editClientSecret,
                checkIfHISisExist,
                deleteProductPhicEclaimsForm,
                getListOfFacilities
            }} = this.props;
        return(
            <StyleRoot>
                { productsListRequestPending ? 
                    <LoadingIndicatorPerContainer />
                : 
                    <ProductList 
                        selectedClient={selectedClient}
                        productsList={productsList}
                        getClientByIdPending={getClientByIdPending}
                        newProductPhicEclaimsForm={newProductPhicEclaimsForm}
                        newProductPhicEclaimsFormRequestPending={newProductPhicEclaimsFormRequestPending}
                        refreshProductsList={refreshProductsList}
                        refreshProductsListRequestPending={refreshProductsListRequestPending}
                        newProductPhicEclaimsApi={newProductPhicEclaimsApi}
                        newProductPhicEclaimsApiRequestPending={newProductPhicEclaimsApiRequestPending}                        
                        listOfHospitalCode={listOfHospitalCode}
                        hospitalCodeName={hospitalCodeName}
                        deletePhicEclaimsApi={deletePhicEclaimsApi}
                        deleteQMUtoHISApi={deleteQMUtoHISApi}
                        deleteQMUtoEHRApi={deleteQMUtoEHRApi}
                        deleteQMUtoEHRPrivateApi={deleteQMUtoEHRPrivateApi}
                        editClientSecret={editClientSecret}
                        checkIfHISisExist={checkIfHISisExist}
                        deleteProductPhicEclaimsForm={deleteProductPhicEclaimsForm}
                        ProductsBasicDialogPending={ProductsBasicDialogPending}
                        clientId={params.id}
                        qmuForHis={qmuForHis}
                        getListOfFacilities={getListOfFacilities}
                        deletePhicEclaimsApiRequestPending={deletePhicEclaimsApiRequestPending}
                    />
                }
            </StyleRoot>
        );
    }
}

export default ProductListContainer;