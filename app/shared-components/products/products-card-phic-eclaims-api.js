import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import Paper from 'material-ui/Paper';

// *** dumb components
import ProductsCardHeader from './products-card-header';
import ProductsMoreInfoDialog from './products-more-info-dialog';

// *** icons
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';


const beacon = 'http://localhost:3000/';
const eclaims = 'http://localhost:3000/';

const styles = {
    paperStyle: {
        width: '200px',
        marginRight: '15px',
        marginBottom: '25px',
        position: 'relative',
        
    },

    contentWrapper: {
        padding: '5px 20px 20px',
        minHeight: '80px',
        position: 'relative',
        textAlign: 'center',
        backgroundColor: '#d6901d',
        title: {
            color: colorPalette.primaryTextColor,
            fontSize: '16px',
            fontWeight: 400
        },

        description: {
            marginTop: '0px',
            color: colorPalette.secondaryTextColor,
            lineHeight: '1.4em'
        }
    },

    moreInfo: {
        opacity: '0',
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        transition: 'all 0.3s ease',
        moreInfoButton: {
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        moreInfoIcon: {
            width: '25px',
            height: '28px',
            color: colorPalette.white,
            cursor: 'pointer'
        },
        refreshIcon: {
            width: '28px',
            height: '28px',
            marginLeft: '10px',
            color: colorPalette.white,
            cursor: 'pointer'
        },
        ':hover': {
            opacity: '1'
        }
    },

    fieldsWrapper: {
        padding: '2px 0px',
        textAlign: 'center',

        fields: {
            margin: '8px 0',
            color: colorPalette.white,
            fontSize: '10px'
        },
        code: {
            fontSize: '18px'
        },

        labels: {
            minWidth: '85px'
        },

        url: {
            color: colorPalette.primaryColor
        }
    },

    required: {
        color: colorPalette.accentColor
    }
};


/**
 * Products Card Phic Eclaims Form Component
 * 
 * @class ProductsCardPhicEclaimsAPI
 * @extends {React.Component}
 */
@Radium
class ProductsCardPhicEclaimsAPI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openEditClientSecretDialog: false,
            openDeletePhicEclaimsApiDialog: false,
            openMoreInfoDialog: false
        };
    }

    setOpenEditClientSecretDialog(state) {
        this.setState({
            openEditClientSecretDialog: state
        });
    }

    setOpenDeleteProductClientCredentialDialog(state) {
        this.setState({
            openDeletePhicEclaimsApiDialog: state
        });
    }

    onMenuItemOpts() {
        const { product, productClientCredential, openPhicEclaimsApiClientSecretEdit } = this.props;
        return [
            {
                label: 'Change Client Key',
                action: openPhicEclaimsApiClientSecretEdit.bind(this, product, productClientCredential),
                leftIcon :  <RefreshIcon  color={colorPalette.white}/> 
            }            
        ];
    }


    onMenuDeleteOpts() {

        const { openPhicEclaimsApiDelete, product, productClientCredential } = this.props;
        
        return [
            {
                label: 'Remove App',
                action: openPhicEclaimsApiDelete.bind(this, product, productClientCredential),
                leftIcon :  <DeleteIcon color={colorPalette.white}/> 
            }
        ];
        
    }

    onOpenMoreInfoDialog() {
        this.setState({
            openMoreInfoDialog: true
        });
    }

    onCloseMoreInfoDialog() {
        this.setState({
            openMoreInfoDialog: false
        });
    }

    onDisplayRefreshMenu() {
        return this.onMenuItemOpts().map((item, index) => (
            <RefreshIcon style={styles.moreInfo.refreshIcon} key={index} onTouchTap={item.action} />
        ));
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ProductsCardPhicEclaimsAPI
     */
    render() {

        const { productClientCredential, viewMode } = this.props;

        return (
            <StyleRoot>
                <Paper style={styles.paperStyle} zDepth={2}>
                    { /** HEADEAR */}
                    <ProductsCardHeader 
                        viewMode={viewMode} 
                        imageSrc="/public/imgs/eclaims-api-logo.svg" 
                        color="#f6a623"
                        logoWidth='138px'
                        logoHeight='63px'
                        menuItemsOpts={this.onMenuDeleteOpts()} />

                    { /** CONTENT */}
                    <div style={styles.contentWrapper}>

                        {/*<p style={styles.contentWrapper.description}>A Web API that exposes the PhilHealth ECLAIMS Web Service functionalites.</p>

                        <div style={styles.fieldsWrapper}>
                            <small style={styles.fieldsWrapper.fields}>
                                <span style={styles.fieldsWrapper.labels}>BEACON URL</span>
                                <span style={styles.fieldsWrapper.url}><a href={`${beacon}${'help'}`} target="_blank">{beacon}</a></span>
                            </small>
                            <small style={styles.fieldsWrapper.fields}>
                                <span style={styles.fieldsWrapper.labels}>ECLAIMS URL</span>
                                <span style={styles.fieldsWrapper.url}><a href={`${eclaims}${'help'}`} target="_blank">{eclaims}</a></span>
                            </small>                            
                            <small style={styles.fieldsWrapper.fields}>
                                <span style={styles.fieldsWrapper.labels}>CLIENT ID</span>
                                <span>PHICAPI-{productClientCredential.id}</span>
                            </small>

                            <small style={styles.fieldsWrapper.fields}>
                                <span style={styles.fieldsWrapper.labels}>KEY</span>
                                <span>{productClientCredential.clientSecret}</span>
                            </small>
                        </div>*/}

                        <div style={styles.fieldsWrapper}>
                            <div style={styles.fieldsWrapper.fields}>
                                CLIENT ID
                            </div>   
                            <div style={styles.fieldsWrapper.fields}>
                                <span style={styles.fieldsWrapper.code}>
                                    PHICAPI-{productClientCredential.id}
                                </span>
                            </div>      
                        </div>   
                        <div style={styles.moreInfo} >
                            <div style={styles.moreInfo.moreInfoButtons}>
                                <div style={styles.moreInfo.moreInfoButton}>
                                    <ActionInfoOutline style={styles.moreInfo.moreInfoIcon} onTouchTap={this.onOpenMoreInfoDialog.bind(this)}/>
                                    { viewMode ? null : this.onDisplayRefreshMenu() }
                                </div>
                            </div>
                        </div> 
                    </div>

                    <ProductsMoreInfoDialog
                        open={this.state.openMoreInfoDialog}
                        close={this.onCloseMoreInfoDialog.bind(this)}
                        viewMode={viewMode}
                        productTitle="eclaimsApi"
                        clientId={productClientCredential.id}
                        clientKey={productClientCredential.clientSecret}
                        imageLogoSrc="/public/imgs/eclaims-api-logo.svg" 
                        colorLogo="#f6a623"
                        width="138px"
                        height="63px"
                        menuItemsOpts={this.onMenuDeleteOpts()} />
                
                </Paper>
            </StyleRoot>
        );
    }
}

// *** props
ProductsCardPhicEclaimsAPI.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductsCardPhicEclaimsAPI;