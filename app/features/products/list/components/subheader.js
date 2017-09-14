import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import { browserHistory } from 'react-router';

// *** material-ui icons
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import StopIcon from 'material-ui/svg-icons/av/stop';

// *** material-icons
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import AddIcon from 'material-ui/svg-icons/content/add';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Code from 'material-ui/svg-icons/action/code';

import Radium, { StyleRoot } from 'radium';

import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

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

const styles = {
    container: {
        display: 'flex',
        backgroundColor: colorPalette.lightBgColor,
        padding: '20px 33px',
        position: 'relative'
    },  

    containerLoading : {
        display: 'flex',
        backgroundColor: colorPalette.lightBgColor,
        padding: '40px',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },

    leftHolder: {
        width: '30%',

        back: {
            color: colorPalette.primaryColor,
            fontSize: '14px',
            cursor: 'pointer'
        },

        titleWrapper: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '6px',

            title: {
                color: colorPalette.primaryColor,
                fontWeight: 400,
                margin: 0
            },

            total: {
                margin: '0 30px',
                color: colorPalette.secondaryTextColor
            }, 
        }      
    },

    centerHolder: {
        width: '40%',

        userContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
        userWrapper: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            label: {
                color: colorPalette.primaryColor,
                margin: '5px 0 5px',
                letterSpacing: '.5px',
                fontWeight: 'bold'
            },

            small: {
                color: colorPalette.primaryTextColor,
                letterSpacing: '.2px'
            },
            avatar: {
                marginRight: '20px'
            },
            address: {
                display: 'flex',
                flexDirection: 'column'
            }
        }
    },

    rightHolder: {
        width: '30%',
        display: 'flex',  
        justifyContent: 'flex-end',
        paddingTop: '8px',

        flatButtonStyle: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px'
        },

        flatButtonLabelStyle: {
            color: colorPalette.primaryTextColor
        },          
    },

    addActionButtonWrapper: {
        position: 'absolute',
        top: '-30px',
        right: '40px',
    },
    addProduct: {
        height: 'auto',
        marginTop: '-26px',
        marginLeft: '25px'
    }

};

/**
 * Products Subheader Component
 * 
 * @class Subheader
 * @extends {React.Component}
 */
@Radium
class Subheader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorOrigin: {
                horizontal: 'right',
                vertical: 'top',
            },
            targetOrigin: {
                horizontal: 'right',
                vertical: 'top',
            }
        };        
  
    }

    /**
     * Touchtap New Product
     * 
     * @param {any} event
     * 
     * @memberOf Subheader
     */
    onTouchTapNewProduct(event) {
        event.preventDefault();
        
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    /**
     * Request Close New Product
     * 
     * 
     * @memberOf Subheader
     */
    oRequestCloseNewProduct() {
        this.setState({ open: false });
    }

    /**
     * New Product Phic Eclaims Form
     * 
     * @param {any} event
     * 
     * @memberOf Subheader
     */
    onNewProductPhicEclaimsForm(event) {
        event.preventDefault();

        const { newProductPhicEclaimsForm, selectedClient } = this.props;

        this.setState({ open: false });

        newProductPhicEclaimsForm(selectedClient.id);
    }

    onNewProductPhicEclaimsApi(event) {
        event.preventDefault();

        const { newProductPhicEclaimsApi, selectedClient } = this.props;

        this.setState({ open: false });

        newProductPhicEclaimsApi(selectedClient.id);
    }

    /**
     * Refresh List
     * 
     * 
     * @memberOf Subheader
     */
    onRefreshList(event) {
        event.preventDefault();

        const { refreshProductsList, selectedClient, getListOfFacilities, clientId } = this.props;
        refreshProductsList(selectedClient.id);
        getListOfFacilities(clientId);
    }
  

    /**
     * Back
     * 
     * 
     * @memberOf Subheader
     */
    onBack() {
        browserHistory.goBack();
    }

    onClickProductAPI(openProduct, mode) {
        const {productsList, checkIfHISisExist } = this.props;
        this.setState({
            open: false
        });

        let isHISexist = false;
        if (mode === 'HIS') {
            if (productsList) {                
                isHISexist = productsList.some((product) => {                    
                    if (product.productType ==  productType.QMUAPIHIS) {
                        return true;
                    } 
                });
            }

            if (!isHISexist) {
                openProduct();                
            } else {
                checkIfHISisExist();                      
            }
        } else {
            openProduct();                        
        }        
    }
    
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Subheader
     */
    render() {
        const {selectedClient, getClientByIdPending, newProductPhicEclaimsFormRequestPending, productsList, 
               openProductForHIS, openProductForEHR, openProductForPrivateEHR} = this.props;        

        return (
            <StyleRoot>

                {getClientByIdPending ? 
                    <div style={styles.containerLoading}>
                        <LoadingIndicatorPerAction />
                    </div>
                    : 
                    <div style={styles.container}>

                        { /** LEFT HOLDER */ }
                        <div style={styles.leftHolder}>

                            <a style={styles.leftHolder.back} onClick={this.onBack.bind(this)}>Back to client list</a>

                            <div style={styles.leftHolder.titleWrapper}>
                                <h1 style={styles.leftHolder.titleWrapper.title}>Client Products</h1>

                                <span style={styles.leftHolder.titleWrapper.total}> {productsList.length} Totals</span>
                            </div>
                        </div>

                        { /** CENTER HOLDER */ }
                        <div style={styles.centerHolder}>
                            <div style={styles.centerHolder.userContainer}>
                                <div style={styles.centerHolder.userWrapper}>
                                    <div style={styles.centerHolder.userWrapper.avatar}>
                                        <Avatar 
                                            name={selectedClient.name}
                                            round={true}
                                            size={60}
                                            color={colorPalette.secondaryTextColor}
                                            style={{overflow: 'hidden', verticalAlign: 'middle'}}
                                        />
                                    </div>
                                    <div style={styles.centerHolder.userWrapper.address}>
                                        <label style={styles.centerHolder.userWrapper.label}>{selectedClient.name}</label>
                                        <small style={styles.centerHolder.userWrapper.small}>{selectedClient.address}</small>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        { /** RIGHT HOLDER */ }
                        <div style={styles.rightHolder}>

                            { /** REFRESH ACTION */ }
                            <FlatButton 
                                label="REFRESH"
                                style={styles.rightHolder.flatButtonStyle}
                                labelStyle={styles.rightHolder.flatButtonLabelStyle}
                                disabled={newProductPhicEclaimsFormRequestPending}
                                onTouchTap={this.onRefreshList.bind(this)}
                                icon={<RefreshIcon color={colorPalette.secondaryTextColor} />}
                            />                    
                        </div>

                        { /** ADD ACTION */ }
                        <div style={styles.addActionButtonWrapper}>
                            <FloatingActionButton 
                                style={styles.addActionButtonWrapper.floatingActionButtonStyle}
                                backgroundColor={colorPalette.accentColor}
                                onTouchTap={this.onTouchTapNewProduct.bind(this)}
                                disabled={newProductPhicEclaimsFormRequestPending}>                            
                                <AddIcon />                            

                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}                                
                                    targetOrigin={this.state.targetOrigin}
                                    onRequestClose={this.oRequestCloseNewProduct.bind(this)}
                                    style={styles.addProduct}
                                    >
                                    <Menu>
                                        <MenuItem 
                                            primaryText="PHIC eClaims API" 
                                            leftIcon={ <StopIcon color={colorPalette.lightningYellow} viewBox={'0 3 20 20'} /> }
                                            onTouchTap={this.onNewProductPhicEclaimsApi.bind(this)}
                                        />
                                        <MenuItem 
                                            primaryText="PHIC eClaims" 
                                            leftIcon={ <StopIcon color={colorPalette.christi} viewBox={'0 3 20 20'} /> }
                                            onTouchTap={this.onNewProductPhicEclaimsForm.bind(this)}
                                        />
                                        <MenuItem 
                                            primaryText="QMeUp API For HIS"
                                            leftIcon={ <StopIcon color={colorPalette.irisBlue} viewBox={'0 3 20 20'} /> }
                                            onTouchTap={this.onClickProductAPI.bind(this, openProductForHIS, 'HIS')}
                                        />
                                         <MenuItem 
                                            primaryText="QMeUp API For EHR"
                                            leftIcon={ <StopIcon color={colorPalette.cadetBlue} viewBox={'0 3 20 20'} /> }
                                            onTouchTap={this.onClickProductAPI.bind(this, openProductForEHR, 'EHR')}
                                        /> 
                                         <MenuItem 
                                            primaryText="QMeUp API For Private EHR"
                                            leftIcon={ <StopIcon color={colorPalette.hoki} viewBox={'0 3 20 20'} /> }
                                            onTouchTap={this.onClickProductAPI.bind(this, openProductForPrivateEHR, 'EHRP')}
                                        />                                         
                                    </Menu>
                                </Popover>
                            </FloatingActionButton>
                        </div>                                            
                    </div>

                }
            </StyleRoot>
        );
    }
}

// *** props
Subheader.propTypes = {
    newProductPhicEclaimsForm : PropTypes.func.isRequired,
    refreshProductsList : PropTypes.func.isRequired,
};

export default Subheader;