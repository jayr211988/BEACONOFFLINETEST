import React, { PropTypes } from 'react';

// *** material-ui components
import Paper from 'material-ui/Paper';

// *** dumb components
import ProductsCardHeader from './products-card-header';

import Radium, { StyleRoot } from 'radium';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

// *** icons
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz.js';
import ActionBuild from 'material-ui/svg-icons/action/build';

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
        //backgroundColor: '#d6901d',
        backgroundColor: '#1d9bad', // for his
        
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
            marginRight: '10px'
        },
        refreshIcon: {
            width: '28px',
            height: '28px',
            color: colorPalette.white
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
class ProductsCardQmeupAPI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openEditClientSecretDialog: false,
            openDeletePhicEclaimsApiDialog: false
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


    onMenuDeleteOpts() {
        const { openQMUtoHISApiDelete, product, productClientCredential, viewMode } = this.props;
        return [
            viewMode ? null : 
            {
                label: 'Remove App',
                action: openQMUtoHISApiDelete.bind(this, product, productClientCredential),
                leftIcon :  <DeleteIcon color={colorPalette.white}/> 
            }
        ];
    }

    onMenuItemOpts() {
        const { openBranchesMapping,viewMode } = this.props;
        let menus = [];
        if(viewMode){
            menus = [ {             
                label : 'View',
                action: openBranchesMapping.bind(this),
                leftIcon :  <ActionBuild  color={colorPalette.secondaryTextColor}/>  
            }]; 
        }
        else {
            menus = [{             
                label : 'Manage List Of Branches',
                action: openBranchesMapping.bind(this),
                leftIcon :  <ActionBuild  color={colorPalette.secondaryTextColor}/>  
            }];
        }

        return menus;
    }

    onDisplayMenuItem() {
        return this.onMenuItemOpts().map((item, index) => (
            <MenuItem primaryText={item.label} key={index} onTouchTap={item.action} leftIcon={item.leftIcon}/>
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
        
        const { viewMode,productClientCredential } = this.props;
        
        return (
            <StyleRoot>
                <Paper style={styles.paperStyle} zDepth={2}>
                    { /** HEADEAR */}

                    {/* For HIS */}
                    <ProductsCardHeader 
                        viewMode={viewMode}
                        imageSrc="/public/imgs/qmu-logo-white.png" 
                        color="#1fbcd2"
                        menuItemsOpts={this.onMenuDeleteOpts()}
                        logoWidth='103px'
                        logoHeight='32px'
                        text='FOR HIS'
                     />

                    { /** CONTENT */}
                    <div style={styles.contentWrapper}>

                        {/* For HIS */}
                        <div style={styles.fieldsWrapper}>
                            <div style={styles.fieldsWrapper.fields}>
                                MAIN BRANCH
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
                                    <IconMenu
                                        iconButtonElement={<IconButton> <NavigationMoreHoriz 
                                                            style={styles.moreInfo.moreButton}
                                                            color={colorPalette.white}
                                                            /></IconButton>}
                                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}>
                                        { this.onDisplayMenuItem() }
                                    </IconMenu>
                                   
                                </div>
                            </div>
                        </div> 
                    </div>
                </Paper>
            </StyleRoot>
        );
    }
}

// *** props
ProductsCardQmeupAPI.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductsCardQmeupAPI;