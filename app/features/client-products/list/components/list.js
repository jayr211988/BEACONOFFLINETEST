import React from 'react';
import Radium, { StyleRoot } from 'radium';
import Helmet from 'react-helmet';

// *** dumb component 
import Subheader from './subheader';
import ProductsCardPhicEclaimsForm from '../../../../shared-components/products/products-card-phic-eclaims-form';
import ProductsCardPhicEclaimsAPI from '../../../../shared-components/products/products-card-phic-eclaims-api';
import ProductsCardQmeupAPI from '../../../../shared-components/products/products-card-qmu-his-api';
import ProductsCardQmeupEhrAPI from '../../../../shared-components/products/products-card-qmu-his-ehr-api';
import ProductsCardQmeupEhrPrivateAPI from '../../../../shared-components/products/products-card-qmu-his-ehr-private-api';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import QmuAndHisBranchesContainer from '../../../qmeup-and-his-branches/list/containers/list';

// import ProductsDialogAddHospitalCodeContainer from '../../phic-eclaims-form/list/containers/list';

import PHICHospitalCodeContainer from '../../../phic-claims-form/containers/list';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty';
import BasicDialog from '../../../../shared-components/basic-dialog';

// *** custom css styles
import animation from '../../../../util/styles/animation';

import { isClientAdmin } from '../../../../util/roles';

const styles = {
    container: {
        backgroundColor : '#e8e8e8',
        height : 'calc(100vh - 202px)',
        overflow: 'hidden'
    },   
    semiContainer:{
        display: 'flex',
        alignItems:'flex-start',
        backgroundColor : '#e8e8e8',
        width:'100%',
        height: 'calc(100vh - 274px)',
        overflow:'auto',
        padding: '30px 18px',
        flexWrap: 'wrap'
    }    
};

// *** product type
const productType = {
    DMS : 0,
    EHR : 1,
    PHICECLAIMS : 2,
    PHICAPI: 3,
    QMUAPIHIS : 4,
    QMUAPIEHR : 5,
    QMUAPIHERPRIVATE: 6
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This product will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

/**
 * Client Product List Component
 * 
 * @class ClientProductsList
 * @extends {React.Component}
 */
@Radium
class ClientProductsList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedProduct : {},
            selectedProductClientCredential: null,

            basicDialogOpts: basicDialogOpts,
            openHospitalCode: false,
            openNewHospitalCode : false,
            openBranchMapping: false
        };        
    }



    onOpenNewHospitalCode(product) {
        this.setState({
            openNewHospitalCode : true,
            selectedProduct : product
        });
    }
    onCloseNewHospitalCode() {
        this.setState({
            openNewHospitalCode : false
        }); 

        const {refreshProductsList, selectedFacility} = this.props;        
        refreshProductsList(selectedFacility.id);
    }


    /**
     * Delete Phic Eclaims Api
     * 
     * @param {any} event
     * 
     * @memberOf ClientProductsList
     */
    onDeletePhicEclaimsApi(event) {
        event.preventDefault();

        const { deletePhicEclaimsApi } = this.props;

        deletePhicEclaimsApi(
            this.state.selectedProductClientCredential.id,
            this.state.selectedProduct.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Delete Phic Eclaimns
     * 
     * @param {any} event
     * 
     * @memberOf ClientProductsList
     */
    onDeletePhicEclaims(event) {
        event.preventDefault();

        const { deletePhicEclaims } = this.props;

        deletePhicEclaims(
            this.state.selectedProduct.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Edit Phic Eclaims Api Client Secret
     * 
     * @param {any} event
     * 
     * @memberOf ClientProductsList
     */
    onEditPhicEclaimsApiClientSecret(event) {
        event.preventDefault();

        const { editPhicEclaimsApiClientSecret } = this.props;

        editPhicEclaimsApiClientSecret(
            this.state.selectedProductClientCredential.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Open Phic Eclaims Delete
     * 
     * @param {any} product
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenPhicEclaimsDelete(product, event) {
        event.preventDefault();        
        this.setState({
            selectedProduct : product,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : 'PHIC EClaims',
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeletePhicEclaims.bind(this), 
                        secondary : true
                    }
                ]
            }
        });
    }

    /**
     * Open Phic Eclaims Api Delete
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ClientProductsList
     */
    onOpenPhicEclaimsApiDelete(product, productClientCredential, event) {
        event.preventDefault();
        
        this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,

            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : 'PHIC EClaims API',
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeletePhicEclaimsApi.bind(this),
                        secondary : true
                    }
                ]
            }
        });
    }

        
    /**
     * Open Phic Eclaims Api Client Credential Edit
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * 
     * @memberOf ClientProductsList
     */
    onOpenPhicEclaimsApiClientSecretEdit(product, productClientCredential, event) {
        event.preventDefault();
        
        this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,

            basicDialogOpts: {
                ...basicDialogOpts,
                title : 'Do you want to change the access key for',
                highlightTitle : ` PHICAPI-${productClientCredential.id}`,
                subtitle: 'This action cannot be undone.',
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'PROCEED',
                        action : this.onEditPhicEclaimsApiClientSecret.bind(this),
                        secondary : true
                    }
                ]
            }
        });
    }

    onOpenBranchesMapping() {
        this.setState({
            openBranchMapping: true,
        });
    }

    onCloseBranchesMapping() {
        this.setState({
            openBranchMapping: false,
        });     
    }    
    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf ClientProductsList
     */
    onCloseBasicDialog() {

        this.setState({ 
            selectedProduct : null,
            selectedProductClientCredential : null,
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    onOpenHospitalCode(product) {        
        this.setState({
            openHospitalCode: true,
            selectedProduct: product
        });    

        const {totalHospitalCodeCount} = this.props;
        totalHospitalCodeCount();
    }

    onCloseHospitalCode() {
        this.setState({
            openHospitalCode: false            
        });

        const {totalHospitalCodeCount, refreshProductsList, selectedFacility} = this.props;
        totalHospitalCodeCount();
        refreshProductsList(selectedFacility.id);
    }    

    /**
     * Display List Of Client Products
     * 
     * @returns
     * 
     * @memberOf ClientProductsList
     */
    onDisplayListOfClientProducts() {
        const { productsList, currentUser, selectedFacility } = this.props;
        return productsList.map(( product, index ) => {
            switch (product.productType) {

            case productType.PHICECLAIMS :                                 
                return ( <ProductsCardPhicEclaimsForm 
                        product={product} 
                        key={index}
                        viewMode={!isClientAdmin(currentUser , selectedFacility)}
                        openPhicEclaimsHospitalCode={this.onOpenHospitalCode.bind(this)}
                        openPhicEclaimsDelete={this.onOpenPhicEclaimsDelete.bind(this)}
                        openNewHospitalCode={this.onOpenNewHospitalCode.bind(this)}

                    /> );
             
            case productType.PHICAPI :                                 
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardPhicEclaimsAPI
                        viewMode={true}
                        product={product}
                        key={i}
                        productClientCredential={t}
                        openPhicEclaimsApiDelete={this.onOpenPhicEclaimsApiDelete.bind(this)}
                        openPhicEclaimsApiClientSecretEdit={this.onOpenPhicEclaimsApiClientSecretEdit.bind(this)} />
                ));
            case productType.QMUAPIHIS: 
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardQmeupAPI 
                        key={i}
                        viewMode={true}
                        product={product}          
                        productClientCredential={t}                                                                                                        
                        openBranchesMapping={this.onOpenBranchesMapping.bind(this)} />                   
                ));          

            case productType.QMUAPIEHR :
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardQmeupEhrAPI 
                        key={i}
                        viewMode={true}
                        product={product}          
                        productClientCredential={t}                                                                                                                                               
                     />                   
                ));   
            case productType.QMUAPIHERPRIVATE :
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardQmeupEhrPrivateAPI 
                        key={i}
                        viewMode={true}
                        product={product}          
                        productClientCredential={t}                                      
                        />                   
                ));   
            }
        });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ClientProductsList
     */
    render () {

        const { 
            selectedFacility, 
            refreshProductsList, 
            refreshProductsListRequestPending, 
            productsList, 
            clientProductsBasicDialogPending,
            currentUser } = this.props;
        return (
            <StyleRoot>
                <Helmet title="Client Products" />

                <Subheader 
                    selectedFacility={selectedFacility}
                    itemCount={productsList.length}
                    refreshProductsList={refreshProductsList}
                />          

                { /** LOADING INDICATOR */ }
                { refreshProductsListRequestPending ? 
                    <LoadingIndicatorPerContainer />
                :  

                /** EMPTY PLACEHOLDER */ 
                productsList.length <= 0 ?
                    <EmptyPlaceholder 
                        title="No Product Found"
                        subtitle="you dont have any product"
                    />  
                :

                // *** LIST OF PRODUCTS
                    <div style={[styles.container, animation.fadeIn]}>
                        <div style={styles.semiContainer}>                    
                            { this.onDisplayListOfClientProducts() }
                        </div>  
                    </div>                
                }

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ clientProductsBasicDialogPending }
                /> 

              

                <PHICHospitalCodeContainer 
                    open={this.state.openNewHospitalCode}
                    close={this.onCloseNewHospitalCode.bind(this)}
                    selectedProduct={this.state.selectedProduct}
                    viewMode={isClientAdmin(currentUser , selectedFacility)}
                />


                <QmuAndHisBranchesContainer
                    open={this.state.openBranchMapping}
                    close={this.onCloseBranchesMapping.bind(this)}
                    openBranchesMapping={this.onOpenBranchesMapping.bind(this)}                    
                    selectedClient={currentUser.id}
                    productsList={productsList}
                    clientId={selectedFacility.id}
                    viewMode={true}
                />

            </StyleRoot>
        );
    }
}

export default ClientProductsList;