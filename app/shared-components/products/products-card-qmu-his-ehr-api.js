import React, { PropTypes } from 'react';

// *** material-ui components
import Paper from 'material-ui/Paper';

// *** dumb components
import ProductsCardHeader from './products-card-header';
import ProductsMoreInfoDialog from './products-more-info-dialog';

import Radium, { StyleRoot } from 'radium';

// *** icons
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';


const beacon ='http://localhost:3000/';
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
        //backgroundColor: '#d6901d',
        backgroundColor: '#4a7f86', // for his
        
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
        moreButton: {
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            color: colorPalette.white
        },
        moreInfoButton: {
            position: 'absolute',
            bottom: '1px',
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
            fontSize: '23px'
        },

        codeOverflow: {
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '16px'
        },

        codeOverflowText: {
            fontSize: '12px',
            textTransform: 'uppercase'
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
class ProductsCardQmeupEhrAPI extends React.Component {
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
        const {  product, productClientCredential, openQMUtoEHRApiClientSecretEdit, viewMode} = this.props;                
        return [
            viewMode ?  null :
            {
                label: 'Change Client Key',
                action: openQMUtoEHRApiClientSecretEdit.bind(this, product, productClientCredential),
                leftIcon :  <RefreshIcon  color={colorPalette.secondaryTextColor}/> 
            }           
        ];
    }

    onMenuDeleteOpts() {
        const { openQMUtoEHRApiDelete, product, productClientCredential, viewMode  } = this.props;
        
        return [
            viewMode ? null : 
            {
                label: 'Remove App',
                action: openQMUtoEHRApiDelete.bind(this, product, productClientCredential),
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

        const { productClientCredential, viewMode} = this.props;

        return (
            <StyleRoot>
                <Paper style={styles.paperStyle} zDepth={2}>
                    { /** HEADEAR */}

                    {/* For HIS */}
                    <ProductsCardHeader 
                        viewMode={viewMode}
                        imageSrc="/public/imgs/qmu-logo-white.png" 
                        color="#58969e"
                        menuItemsOpts={this.onMenuDeleteOpts()}
                        logoWidth='103px'
                        logoHeight='32px'
                        text='FOR EHR'
                     />

                    { /** CONTENT */}
                    <div style={styles.contentWrapper}>

                        {/* For HIS */}
                        <div style={styles.fieldsWrapper}>
                            <div style={styles.fieldsWrapper.fields}>
                                CONNECTED TO
                            </div>
                            <div style={styles.fieldsWrapper.fields}>
                                <div style={styles.fieldsWrapper.codeOverflow}>
                                    {
                                        productClientCredential.qmuapiFacilityMapping ? 
                                            <span style={styles.fieldsWrapper.codeOverflowText}>{productClientCredential.qmuapiFacilityMapping.facilityName}</span> 
                                        : <span style={styles.fieldsWrapper.codeOverflowText}>No Facility Name</span>
                                    }
                                </div>
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
                        productTitle='FOR EHR'
                        clientId={productClientCredential.id}
                        clientKey={productClientCredential.clientSecret}
                        imageLogoSrc='/public/imgs/qmu-logo-white.png'
                        colorLogo='#58969e'
                        width='103px'
                        height='32px'
                        menuItemsOpts={this.onMenuDeleteOpts()} />
                </Paper>
            </StyleRoot>
        );
    }
}

// *** props
ProductsCardQmeupEhrAPI.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductsCardQmeupEhrAPI;