import React from 'react';
import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

import ProductsFacilitesApiContainer from '../../../products/new/containers/new';

// loading
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import BasicDialog from '../../../../shared-components/basic-dialog';
// *** material-ui icons
import AddIcon from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import Avatar from 'react-avatar';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import IconButton from 'material-ui/IconButton';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

// *** helpers
import { getPhoto } from '../../../../util/helpers/helper';

const qmuApi = 'http://localhost:3000/';

const styles = {
    container: {
        width: '100%'
    },

    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'
        
    },
    headerCont : {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    mappingWrapper: {
        padding: '25px',
        addButton: {
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center'
        },
        avatar: {
            margin: '5px 6px 5px 0px'
        },
        headingTable: {
            width: '270px',
            paddingLeft: '0px'
        },
        headingTable2: {
            width: '130px'
        },
        headingTable3: {
            width: '245px'
        },
        actionIcon: {
            marginLeft: '15px',
            cursor: 'pointer'
        },
        addressWrapper:{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
        },
        addressContainer:{
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    },
    closeCont : {
        display : 'flex',
        justifyContent: 'space-between',

        icon : {
            cursor: 'pointer',
            color: colorPalette.secondaryTextColor,
            marginTop: '-13px',
            marginRight: '-5px'
        }
    },
    productTotal : {
        marginRight : '45%',
        paddingTop : '4px',
        color: colorPalette.black
    },
    qmuUrl: {
        display: 'flex',
        alignitems: 'center',   
        qme: {
            margin: 0,
            fontSize: '13px',
            color: colorPalette.primaryTextColor
        },
        link: {
            margin: '0 0 0 10px',
            fontSize: '13px',
            color: colorPalette.primaryColor,
            textDecoration: 'none'
        }   

    }
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

@Radium
class QmuAndHisBranchesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openProduct : false,
            isProduct: 'HIS',

            selectedProduct : {},
            selectedProductClientCredential : null,
            basicDialogOpts: basicDialogOpts 
        };
    }  


    componentWillMount() {
        const { clientId, getListOfFacilities } = this.props;
        getListOfFacilities(clientId);
    }
    /**
     * 
     * 
     * 
     * @memberOf QmuAndHisBranchesList
     */
    onDisplayDialog() {
        this.setState({
            openProduct : true
        });
    }

    /**
     * 
     * 
     * 
     * @memberOf QmuAndHisBranchesList
     */
    onCloseProduct() {
        this.setState({
            openProduct : false
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
     *  OPEN DELETE QMU TO HIS API DIALOG
     * 
     * @param {any} product
     * @param {any} productClientCredential
     * @param {any} event
     * 
     * @memberOf QmuAndHisBranchesList
     */
    onOpenQMUtoHISApiDelete(product, productClientCredential, event) {                
        event.preventDefault();
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
        });
    }

    onEditQMUtoEHRApiClientSecret() {
        event.preventDefault();
        const {editClientSecret} = this.props;
        editClientSecret(
            this.state.selectedProductClientCredential.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

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
     * 
     * 
     * 
     * @memberOf QmuAndHisBranchesList
     */
    onDisplayProductHis() {
        const { productHis,viewMode } = this.props;
        
        return productHis.map((x, i) => (         
               <TableRow key={i}>
                <TableRowColumn  style={styles.mappingWrapper.headingTable}>    
                    <div style={styles.mappingWrapper.addressWrapper}>                                             
                        <Avatar  
                            name={x.productClientCredentials[0].qmuapiFacilityMapping.facilityName}                                                            
                            src= {getPhoto(x.productClientCredentials[0].qmuapiFacilityMapping.facilityPhoto)} 
                            size={ 45 }
                            round={ true }
                            style={styles.mappingWrapper.avatar}
                            color={colorPalette.secondaryTextColor}
                        />                         
                        <div style={styles.mappingWrapper.addressContainer}>
                            <span style={{marginLeft: '5px', color: colorPalette.primaryColor}} title={x.productClientCredentials[0].qmuapiFacilityMapping.facilityName}>{x.productClientCredentials[0].qmuapiFacilityMapping.facilityName}</span>
                            <br/> 
                            <span style={{marginLeft: '5px'}} title={x.productClientCredentials[0].qmuapiFacilityMapping.facilityAddress}>{x.productClientCredentials[0].qmuapiFacilityMapping.facilityAddress}</span> 
                        </div>
                    </div>
                </TableRowColumn>

                <TableRowColumn style={styles.mappingWrapper.headingTable2}><span>QMUAPIHIS-{x.productClientCredentials[0].id}</span></TableRowColumn>
                <TableRowColumn style={styles.mappingWrapper.headingTable3}><span title={x.productClientCredentials[0].clientSecret}>{x.productClientCredentials[0].clientSecret}</span></TableRowColumn>
                <TableRowColumn>

                    { 
                        viewMode ? 
                        null 
                        :
                        <div>
                            <span>
                                <IconButton title={'Refresh Access Key'} style={{paddingRight: 0}}
                                    onTouchTap={this.onOpenQMUtoEHRApiClientSecreteEdit.bind(this, x, x.productClientCredentials[0])}>
                                    <RefreshIcon style={styles.mappingWrapper.actionIcon} color={colorPalette.secondaryTextColor}/>
                                </IconButton>                        

                            </span>                       
                            {
                                i == 0 ? null : 
                                 <span>
                                <IconButton title={'Delete'} onTouchTap={this.onOpenQMUtoHISApiDelete.bind(this, x, x.productClientCredentials[0])}>
                                    <DeleteIcon style={styles.mappingWrapper.actionIcon} color={colorPalette.secondaryTextColor}/>
                                </IconButton>                                 
                                </span>
                            }
                           

                        </div>
                    }
                </TableRowColumn>
            </TableRow>
        ));   
    }

    onDeleteProductHis(clientCredentialId, productId) {
        const { deleteQMUtoHISApi } = this.props;        

        deleteQMUtoHISApi(
            clientCredentialId,
            productId
        );
    } 

    render() {
        const { close, selectedClient, productHis,viewMode, ProductsBasicDialogPending } = this.props;
        return(
            <StyleRoot style={styles.container}>
                <div>
                    <div style={styles.headerCont}>
                        <div style={styles.mappingWrapper}>                          
                            <div style={styles.closeCont}>     
                                <h1 style={styles.title}>QMeUp Facility and HIS Branches Mapping</h1> <span style={styles.productTotal}> {!productHis ? null : productHis.length} Total</span>
                                <Close 
                                    onTouchTap={close.bind(this)} 
                                    style={styles.closeCont.icon}
                                />
                             </div>
                             <p style={{fontSize: '14px', marginTop: '5px'}}>List of mapping for systems QMU and HIS.</p>
                             <div style={styles.mappingWrapper.addButton}>
                                { 
                                    viewMode ? 
                                    null 
                                    :      
                                    <div style={{marginRight: '10px'}}>                              
                                        <FlatButton
                                            label="ADD BRANCH"
                                            icon={ <AddIcon /> }
                                            style={styles.flatButtonStyles}         
                                            onTouchTap={this.onDisplayDialog.bind(this)}                       
                                        />                                     
                                    </div>
                                }

                                <div style={styles.qmuUrl}>
                                    <p style={styles.qmuUrl.qme}>QMEUP URL: </p>
                                    <p style={styles.qmuUrl.link}><a style={styles.qmuUrl.link} href={`${qmuApi}${'help'}`} target="_blank">{`${qmuApi}`}</a></p>
                                </div>
                             </div>    
                             <div>
                             {
                                productHis ? 
                                 <Table 
                                    showRowHover={false} 
                                    selectable={false}
                                    height={'354px'}
                                    fixedHeader={true}>
                                        <TableHeader
                                        adjustForCheckbox={false}
                                        displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={styles.mappingWrapper.headingTable}>FACILITY NAME</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.mappingWrapper.headingTable2}>CLIENT ID</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.mappingWrapper.headingTable3}>ACCESS KEY</TableHeaderColumn>
                                                <TableHeaderColumn></TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody             
                                                                       
                                            deselectOnClickaway={false}
                                            showRowHover={false}
                                            stripedRows={false}
                                            displayRowCheckbox={false}>
                                            {this.onDisplayProductHis()}
                                        </TableBody >
                                  </Table> : <LoadingIndicatorPerContainer/>
                               }
                             </div>
                        </div>
                           
                    </div>
                </div>

                <ProductsFacilitesApiContainer
                    open={this.state.openProduct}
                    productTitle={this.state.isProduct}
                    close={this.onCloseProduct.bind(this)}
                    selectedClient={selectedClient}
                />

                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ ProductsBasicDialogPending }
                /> 

            </StyleRoot>

        );
    }

}

export default QmuAndHisBranchesList;
