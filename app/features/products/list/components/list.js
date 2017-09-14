import React, { PropTypes } from 'react';
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

import ProductsFacilitesApiContainer from '../../new/containers/new';


// import ProductsDialogAddHospitalCodeContainer from '../../phic-eclaims-form/list/containers/list';
import BasicDialog from '../../../../shared-components/basic-dialog';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty';
import PHICHospitalCodeContainer from '../../../phic-claims-form/containers/list';
import QmuAndHisBranchesContainer from '../../../qmeup-and-his-branches/list/containers/list';

// *** custon css styles
import animation from '../../../../util/styles/animation';

const styles = {
    container: {
        backgroundColor : '#e8e8e8',
        height : 'calc(100vh - 228px)',
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

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This product will be permanently removed.',
    higlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
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

/**
 * Product List Component
 * 
 * @class ProductList
 * @extends {React.Component}
 */
@Radium
class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openHospitalCode : false,
            openPhicEclaimsFormDelete : false,
            selectedProduct : {},
            openDeletePhicEclaimsApiDialog: false,
            selectedProductClientCredential: null,
            openPhicEclaimsApiEditClientSecret: false,
            open: false,
            openProduct: false,
            basicDialogOpts : basicDialogOpts,
            openNewHospitalCode : false,
            isProduct : '',
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
        const {refreshProductsList, selectedClient} = this.props;
        // totalHospitalCodeCount();
        refreshProductsList(selectedClient.id);
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
     *  Delete QMU to HIS Api
     * 
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onDeleteQMUtoHISApi(event) {
        event.preventDefault();
        const { deleteQMUtoHISApi } = this.props;        

        deleteQMUtoHISApi(
            this.state.selectedProductClientCredential.qmuapiFacilityMapping.facilityId,
            this.state.selectedProductClientCredential.qmuapiFacilityMapping.id,
            this.state.selectedProductClientCredential.id,
            this.state.selectedProduct.id,
            this.onCloseBasicDialog.bind(this)
        ); 
    }

    
    /**
     * Delete QMU to EHR Api
     *  
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onDeleteQMUtoEHRApi(event) {
        event.preventDefault();
        const { deleteQMUtoEHRApi } = this.props;        

        deleteQMUtoEHRApi(
            this.state.selectedProductClientCredential.qmuapiFacilityMapping.facilityId,
            this.state.selectedProductClientCredential.qmuapiFacilityMapping.id,
            this.state.selectedProductClientCredential.id,
            this.state.selectedProduct.id,
            this.onCloseBasicDialog.bind(this)
        );        

    }


    onDeleteQMUtoEHRPrivateApi(event) {
        event.preventDefault();
        const {deleteQMUtoEHRPrivateApi} = this.props;
        deleteQMUtoEHRPrivateApi(
            this.state.selectedProductClientCredential.qmuapiFacilityMapping.facilityId,
            this.state.selectedProductClientCredential.qmuapiFacilityMapping.id,
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
        const { deleteProductPhicEclaimsForm } = this.props;
        deleteProductPhicEclaimsForm(
            this.state.selectedProduct.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    
    
    /**
     *  Edit PHIC Eclaims Client Secret
     * 
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onEditPhicEclaimsApiClientSecret(event) {
        event.preventDefault();
        
        const {editClientSecret} = this.props;
        editClientSecret(
            this.state.selectedProductClientCredential.id,
            this.onCloseBasicDialog.bind(this)
        );
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
                title : 'Do you want to change the client access key for',
                higlightTitle : ` PHICAPI-${productClientCredential.id}`,
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

    
    /**
     *  Change QMU to EHR Client Secrete
     * 
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onEditQMUtoEHRApiClientSecret(event) {
        event.preventDefault();
        const {editClientSecret} = this.props;
        editClientSecret(
            this.state.selectedProductClientCredential.id,
            this.onCloseBasicDialog.bind(this)
        );
    }
    
    /**
     *  Open QMU to EHR Change Client Secret
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenQMUtoEHRApiClientSecreteEdit(product, productClientCredential, event) {
        event.preventDefault();

        this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,

            basicDialogOpts: {
                ...basicDialogOpts,
                title : 'Do you want to change the client access key for',
                highlightTitle: `QMUAPIEHR-${productClientCredential.id}`,
                subtitle: 'This action cannot be undone.',
                open: true,
                closeDialog : this.onCloseBasicDialog.bind(this),
                actions : [
                    {
                        label: 'CANCEL',
                        action: this.onCloseBasicDialog.bind(this)
                    }, 
                    {
                        label: 'PROCEED',
                        action: this.onEditQMUtoEHRApiClientSecret.bind(this),
                        secondary: true
                    }
                ]

            }
        });
    }

    
    /**
     *  Change QMU to EHR Private Api Client Secret
     * 
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onEditQMUtoEHRPrivateApiClientSecret(event) {
        event.preventDefault();
        const {editClientSecret} = this.props;                
        editClientSecret(
            this.state.selectedProductClientCredential.id,
            this.onCloseBasicDialog.bind(this)
        );
    }


    
    /**
     *  Open QMU to EHR Private Change Client Secret
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenQMUtoEHRPrivateApiClientSecreteEdit(product, productClientCredential, event) {
        event.preventDefault();    
        
        this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,

            basicDialogOpts : {
                ...basicDialogOpts,
                title : 'Do you want to change the client access for ',
                highlightTitle : `QMUAPIEHRPRIVATE-${productClientCredential.id}`,
                subTitle : 'This action cannot be undone.',
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),
                actions : [
                    {
                        label : 'CANCEL',
                        action: this.onCloseBasicDialog.bind(this)
                    },
                    {
                        label : 'PROCEED',
                        action: this.onEditQMUtoEHRPrivateApiClientSecret.bind(this),
                        secondary: true
                    }
                ]
            }
        });
    }

    /**
     * Open Phic Eclaims Dialog Delete
     * 
     * @param {any} product
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenPhicEclaimsFormDelete(product, event) {
        event.preventDefault();

        this.setState({
            selectedProduct : product,
            basicDialogOpts: {
                ...basicDialogOpts,
                higlightTitle : 'PHIC EClaims',
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
     *  Open Phic Eclaims API Dialog Delete
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ProductList
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
     *  Open QMU to EHR Private Delete Dialog
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenQMUtoEHRPrivateApiDelete(product, productClientCredential, event) {
        event.preventDefault();
        this.setState({
            selectedProduct: product,
            selectedProductClientCredential : productClientCredential,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : 'QMU to EHR Private API',
                open : true,
                closeDialog: this.onCloseBasicDialog.bind(this),
                
                actions : [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this)
                    },
                    {
                        label : 'REMOVE',
                        action: this.onDeleteQMUtoEHRPrivateApi.bind(this),
                        secondary : true
                    }
                ]
            }
        });
    }

   
    /**
     *  Open QMU to HIS Delete Dialog
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenQMUtoHISApiDelete(product, productClientCredential, event) {
        event.preventDefault();
        const { qmuForHis } = this.props;        

        qmuForHis.length <= 1 ?
        this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : 'QMU to HIS API',
                open : true,
                closeDialog: this.onCloseBasicDialog.bind(this),
                
                actions : [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this)
                    },
                    {
                        label : 'REMOVE',
                        action: this.onDeleteQMUtoHISApi.bind(this),
                        secondary : true
                    }
                ]
            }

            
        }) : this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,
            basicDialogOpts: {
                title : 'Product has still',
                subtitle : 'This product cannot be deleted since it has still branches',
                highlightTitle : 'Branches',
                open : true,
                closeDialog: this.onCloseBasicDialog.bind(this),
                actions : [
                    {
                        label : 'Close',
                        action : this.onCloseBasicDialog.bind(this)
                    }
                ]
            }

            
        });
    }

    
    /**
     *  Open QMU to EHR Delete Dialog
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf ProductList
     */
    onOpenQMUtoEHRApiDelete(product, productClientCredential, event) {
        event.preventDefault();
        this.setState({
            selectedProduct : product,
            selectedProductClientCredential : productClientCredential,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : 'QMU to EHR API',
                open : true,
                closeDialog: this.onCloseBasicDialog.bind(this),
                
                actions : [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this)
                    },
                    {
                        label : 'REMOVE',
                        action: this.onDeleteQMUtoEHRApi.bind(this),
                        secondary : true
                    }
                ]
            }
        });
    }
    
    /**
     *  OPEN HOSPITAL CODE DIALOG
     * 
     * @param {any} product
     * 
     * @memberOf ProductList
     */
    onOpenHospitalCode(product) {        
        this.setState({
            openHospitalCode: true,
            selectedProduct: product
        });    

        const {totalHospitalCodeCount} = this.props;
        totalHospitalCodeCount();
    }
    
    /**
     *  CLOSE HOSPITAL CODE DIALOG
     * 
     * 
     * @memberOf ProductList
     */
    onCloseHospitalCode() {
        this.setState({
            openHospitalCode: false            
        });

        const {totalHospitalCodeCount, refreshProductsList, selectedClient} = this.props;
        totalHospitalCodeCount();
        refreshProductsList(selectedClient.id);
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

    /**
     * Display List Of Producst
     * 
     * @returns
     * 
     * @memberOf ProductList
     */
    onDisplayListOfProducts() {
        const { productsList, listOfHospitalCode } = this.props;                                
        return productsList.map(( product, index ) => {

            switch (product.productType) {

            case productType.PHICECLAIMS :                                 
                return ( <ProductsCardPhicEclaimsForm 
                            product={product} 
                            key={index}                            
                            openPhicEclaimsHospitalCode={this.onOpenHospitalCode.bind(this)}
                            openPhicEclaimsDelete={this.onOpenPhicEclaimsFormDelete.bind(this)}
                            listOfHospitalCode={listOfHospitalCode}                            
                            openNewHospitalCode={this.onOpenNewHospitalCode.bind(this)}
                    /> );
             
            case productType.PHICAPI :                                 
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardPhicEclaimsAPI
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
                        product={product}          
                        productClientCredential={t}              
                        openQMUtoHISApiDelete={this.onOpenQMUtoHISApiDelete.bind(this)}                                                                        
                        openBranchesMapping={this.onOpenBranchesMapping.bind(this)}/>    
                                       
                ));          

            case productType.QMUAPIEHR :
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardQmeupEhrAPI 
                        key={i}
                        product={product}          
                        productClientCredential={t}              
                        openQMUtoEHRApiDelete={this.onOpenQMUtoEHRApiDelete.bind(this)}                                                
                        openQMUtoEHRApiClientSecretEdit={this.onOpenQMUtoEHRApiClientSecreteEdit.bind(this)} />                   
                ));   
            case productType.QMUAPIHERPRIVATE :
                return product.productClientCredentials.map((t, i) => (
                    <ProductsCardQmeupEhrPrivateAPI 
                        key={i}
                        product={product}          
                        productClientCredential={t}              
                        openQMUtoEHRPrivateApiDelete={this.onOpenQMUtoEHRPrivateApiDelete.bind(this)}                                                
                        openQMUtoEHRPrivateApiClientSecretEdit={this.onOpenQMUtoEHRPrivateApiClientSecreteEdit.bind(this)} />                   
                ));   
            }
        });
    }


          /**
     * Open New Product For HIS 
     * 
     * 
     * @memberOf ProductList
     */
    onOpenProductForHIS() {
        this.setState({
            openProduct: true,
            isProduct: 'HIS'
        });
    }

    /**
     * Close New Product 
     * 
     * 
     * @memberOf ProductList
     */
    onCloseProduct() {
        this.setState({
            openProduct: false
        });
    }

    /**
     * Open New Product For EHR
     * 
     * 
     * @memberOf ProductList
     */
    onOpenProductForEHR() {
        this.setState({
            openProduct: true,
            isProduct: 'EHR'
        });

    }

    /**
     * 
     * 
     * 
     * @memberOf ProductList
     */
    onOpenProductForPrivateEHR() {
        this.setState({
            openProduct: true,
            isProduct: 'Private EHR'
        });
    }

    onOpenBranchesMapping() {
        this.setState({
            openBranchMapping: true,
        });
    }

    onCloseBranchesMapping() {
        this.setState({
            openBranchMapping: false
        });
    }


    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ProductList
     */
    render () {

        const { 
            selectedClient,
            productsList,
            getClientByIdPending, 
            newProductPhicEclaimsForm, 
            newProductPhicEclaimsFormRequestPending,
            refreshProductsList,
            refreshProductsListRequestPending,
            newProductPhicEclaimsApi,
            newProductPhicEclaimsApiRequestPending,
            ProductsBasicDialogPending, 
            checkIfHISisExist,
            getListOfFacilities,
            clientId } = this.props;
        return (
            <StyleRoot>
                <Helmet title="Client Products" />

                <Subheader
                    selectedClient={selectedClient}  
                    getClientByIdPending={getClientByIdPending}    
                    newProductPhicEclaimsForm={newProductPhicEclaimsForm}   
                    newProductPhicEclaimsFormRequestPending={newProductPhicEclaimsFormRequestPending}   
                    refreshProductsList={refreshProductsList}         
                    newProductPhicEclaimsApi={newProductPhicEclaimsApi}
                    productsList={productsList}
                    openProductForHIS={this.onOpenProductForHIS.bind(this)}
                    closeNewProductQMeUpApi={this.onCloseProduct.bind(this)}
                    openProductForEHR={this.onOpenProductForEHR.bind(this)}
                    openProductForPrivateEHR={this.onOpenProductForPrivateEHR.bind(this)}
                    checkIfHISisExist={checkIfHISisExist}
                    getListOfFacilities={getListOfFacilities}
                    clientId={clientId}
                />   
                
                { /** LOADING INDICATOR */ }
                { newProductPhicEclaimsFormRequestPending || refreshProductsListRequestPending || newProductPhicEclaimsApiRequestPending ? 
                    <LoadingIndicatorPerContainer 
                        text={newProductPhicEclaimsFormRequestPending ? 'Creating product...' : null}
                    />
                :  
                  
                 /** EMPTY LIST PLACEHOLDER */     
                productsList.length <= 0 ?          
                    <EmptyPlaceholder 
                        title="No Product Found"
                        subtitle="This client does not have any product"
                    />                   
                :

                // *** LIST OF PRODUCTS
                    <div  style={[styles.container, animation.fadeIn]}>
                        <div style={styles.semiContainer}>
                            {this.onDisplayListOfProducts() } 
                        </div>
                    </div>                   
                }

                 

            <BasicDialog
                basicDialogOpts={ this.state.basicDialogOpts }
                closeDialog={ this.onCloseBasicDialog.bind(this) }
                isPending={ ProductsBasicDialogPending }
            /> 

            <PHICHospitalCodeContainer 
                open={this.state.openNewHospitalCode}
                close={this.onCloseNewHospitalCode.bind(this)}
                selectedProduct={this.state.selectedProduct}
            />

    
            <ProductsFacilitesApiContainer
                open={this.state.openProduct}
                close={this.onCloseProduct.bind(this)}
                productTitle={this.state.isProduct}
                selectedClient={selectedClient}                
            />

            <QmuAndHisBranchesContainer
                open={this.state.openBranchMapping}
                close={this.onCloseBranchesMapping.bind(this)}
                openBranchesMapping={this.onOpenBranchesMapping.bind(this)}
                closeNewProductQMeUpApi={this.onCloseProduct.bind(this)}
                selectedClient={selectedClient}
                productsList={productsList}
                clientId={clientId}
            />

            </StyleRoot>
        );
    }
}


// *** props
ProductList.propTypes = {
    productsList : PropTypes.array.isRequired,
    newProductPhicEclaimsForm : PropTypes.func.isRequired,
    refreshProductsList : PropTypes.func.isRequired,
};

export default ProductList;

