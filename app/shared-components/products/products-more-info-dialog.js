import React, { PropTypes } from 'react';

import Radium, { StyleRoot } from 'radium';

// icon
import Dialog from 'material-ui/Dialog';
// *** material-ui components
import Paper from 'material-ui/Paper';
import ProductsCardHeader from './products-card-header';

// material 
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';


const beacon = 'http://localhost:3000/';
const qmeup = 'http://localhost:3000/';
const eclaims = 'http://localhost:3000/';

const styles = {
    paperStyle: {
        width: '350px',
        position: 'relative',
        
    },

    contentWrapper: {
        padding: '20px',
        minHeight: '250px',
        position: 'relative',
        textAlign: 'center',
        title: {
            color: colorPalette.primaryTextColor,
            fontSize: '16px',
            fontWeight: 400
        },

        description: {
            marginTop: '0px',
            color: colorPalette.primaryTextColor,
            lineHeight: '1.4em',
            fontSize: '14px',
            textAlign: 'left'
        }
    },

    moreInfo: {
        opacity: '0',
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        transition: 'all 0.5s ease',
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
            marginRight: '10px',
            cursor: 'pointer'
        },
        refreshIcon: {
            width: '28px',
            height: '28px',
            color: colorPalette.white,
            cursor: 'pointer'
        },
        ':hover': {
            opacity: '1'
        }
    },

    fieldsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0px',
        fontSize: '14px',
        textAlign: 'initial',
        fields: {
            margin: '8px 0',
            color: colorPalette.primaryTextColor,
            display: 'flex',
            alignItems: 'center'
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
    },

    container: {
        width: '100%'
    },
    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'
        
    },

    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bodySection: {
        display: 'flex',
        justifyContent: 'center'
    },
    dialogBodyStyle: {
        padding: '0'
    },
    customContentStyle: {
        width: '350px'
    }
};


@Radium
class ProductsMoreInfoDialog extends React.Component {
    
    constructor(props){
        super(props);
    }

    onMenuCloseOpts() {
        return [
            {
                label: 'Close App',
                action: this.close.bind(this),
                leftIcon :  <Close color={colorPalette.white}/> 
            }
        ];
        
    }

    render() {
        const { open, 
                productTitle, 
                clientKey, 
                clientId, 
                viewMode, 
                imageLogoSrc, 
                colorLogo, 
                width, 
                height } = this.props; 


        return(
            <StyleRoot style={styles.container}> 
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    contentStyle={styles.customContentStyle}
                    onRequestClose={this.close.bind(this)}>
                   

                    <div style={styles.bodySection}>
                        <div style={styles.bodySection}>
                            <div style={styles.paperStyle}>
                                
                                { /** HEADER */}
                                <ProductsCardHeader 
                                    viewMode={viewMode} 
                                    imageSrc={imageLogoSrc}
                                    color={colorLogo}
                                    logoWidth={width}
                                    logoHeight={height}
                                    clientView={true}
                                    text={productTitle}
                                    menuItemsOpts={this.onMenuCloseOpts()} />
                                { /** END HEADER */}

                                { /** CONTENT */}
                                {
                                    productTitle == 'eclaimsApi' ? 
                                        <div style={styles.contentWrapper}>

                                            <p style={styles.contentWrapper.description}>A Web API that exposes the PhilHealth ECLAIMS Web Service functionalites.</p>

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
                                                    <span>PHICAPI-
                                                        {clientId}
                                                    </span>
                                                </small>

                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>KEY</span>
                                                    <span>{clientKey}</span>
                                                </small>
                                            </div> 
                                        </div>
                                    : null
                                }

                                {
                                    productTitle == 'FOR EHR' ? 
                                        <div style={styles.contentWrapper}>

                                            <p style={styles.contentWrapper.description}>A Web API that exposes the QMeUp Web Service functionalites.</p>

                                            <div style={styles.fieldsWrapper}>
                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>BEACON URL</span>
                                                    <span style={styles.fieldsWrapper.url}><a href={`${beacon}${'help'}`} target="_blank">{beacon}</a></span>
                                                </small>
                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>QMEUP URL</span>
                                                    <span style={styles.fieldsWrapper.url}><a href={`${qmeup}${'help'}`} target="_blank">{qmeup}</a></span>
                                                </small>                            
                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>CLIENT ID</span>
                                                    <span>QMUAPIEHR-
                                                        {clientId}
                                                    </span>
                                                </small>

                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>KEY</span>
                                                    <span>{clientKey}</span>
                                                </small>
                                            </div> 
                                        </div>

                                        : null
                                }

                                {
                                    productTitle == 'FOR PRIVATE EHR' ? 
                                        <div style={styles.contentWrapper}>

                                            <p style={styles.contentWrapper.description}>A Web API that exposes the QMeUp Web Service functionalites.</p>

                                            <div style={styles.fieldsWrapper}>
                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>BEACON URL</span>
                                                    <span style={styles.fieldsWrapper.url}><a href={`${beacon}${'help'}`} target="_blank">{beacon}</a></span>
                                                </small>
                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>QMEUP URL</span>
                                                    <span style={styles.fieldsWrapper.url}><a href={`${qmeup}${'help'}`} target="_blank">{qmeup}</a></span>
                                                </small>                            
                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>CLIENT ID</span>
                                                    <span>QMUAPIEHRPRIVATE-
                                                        {clientId}
                                                    </span>
                                                </small>

                                                <small style={styles.fieldsWrapper.fields}>
                                                    <span style={styles.fieldsWrapper.labels}>KEY</span>
                                                    <span>{clientKey}</span>
                                                </small>
                                            </div> 
                                        </div>
                                        : null
                                }
                                
                                { /**END CONTENT */}


                            </div>
                        </div>

                    </div>

                </Dialog>
            </StyleRoot>            

        );    
    }

    close() {
        const { close } = this.props;
        close();
    }

}

export default ProductsMoreInfoDialog;