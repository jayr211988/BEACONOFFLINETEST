import React, { PropTypes } from 'react';

// *** material-ui components
import Paper from 'material-ui/Paper';

// *** dumb components
import ProductsCardHeader from './products-card-header';

import Radium, { StyleRoot } from 'radium';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';

// *** icons
import HospitalIcon from 'material-ui/svg-icons/maps/local-hospital';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz.js';

const styles = {
    paperStyle: {
        width: '200px',
        marginRight: '15px',
        marginBottom: '25px',
    },
    
    contentWrapper: {
        padding: '5px 20px 20px',
        minHeight: '80px',
        position: 'relative',
        backgroundColor: '#51920a',
        textAlign: 'center',
        title: {
            color: colorPalette.primaryTextColor,
            fontSize: '16px',
            fontWeight: 400
        },

        description: {
            marginTop :'0px',
            color: colorPalette.white,
            lineHeight: '1.4em'
        },
        
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
        moreButton: {
            width: '30px',
            height: '30px',
            cursor: 'pointer',
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
            fontSize: '18px'
        }          
    },

    required: {
        color: colorPalette.white
    },
    warningMessageWrapper: {
        position: 'absolute',
        top: '5px',
        left: '0',
        width: '100%',
        background: '#85a760',
        padding: '10px 0'
    },
    warningMessageIcon: {
        position: 'relative',
        top: '3px',
        left: '-5px'

    },
    warningIcon: {
        color: colorPalette.white,
        height:'20px',
        width:'20px'
    },
    warningMessageTop: {
        position: 'relative',
        top: '-6px',
        fontSize: '10.5px'
    },
    warningMessageCodeText: {
        display: 'block',
        textAlign: 'left',
        marginTop: '-4px',
        marginLeft: '43px',
        fontSize: '10.5px'
    }
};


/**
 * Products Card Phic Eclaims Form Component
 * 
 * @class ProductsCardPhicEclaimsForm
 * @extends {React.Component}
 */
@Radium
class ProductsCardPhicEclaimsForm extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Menu Item Options
     * 
     * @returns
     * 
     * @memberOf ProductsCardPhicEclaimsForm
     */
    onMenuItemOpts() {
        const { openNewHospitalCode, product, viewMode } = this.props;
        
        let menuss = [];

        if(viewMode !== false){
            menuss = [ {             
                label : 'Manage Hospital Codes',
                action : openNewHospitalCode.bind(this, product),
                leftIcon :  <HospitalIcon  color={colorPalette.secondaryTextColor}/> 
            }]; 
        }     

        else {
            menuss = [ {             
                label : 'View',
                action : openNewHospitalCode.bind(this, product),
                leftIcon :  <HospitalIcon  color={colorPalette.secondaryTextColor}/> 
            }]; 
        }
        return menuss;
       
    }

    onMenuDeleteOpts() {

        const { openPhicEclaimsDelete, product, viewMode } = this.props;
        
        let menuss = [];

        if (viewMode !== false) menuss.push(
            { 
                label : 'Remove App',
                action : openPhicEclaimsDelete.bind(this, product),
                leftIcon :  <DeleteIcon  color={colorPalette.white}/> 
            } 

        );

        return menuss;
        
    }

    checkForPrimaryCode() {
        const  { product } = this.props;
        let isEmpty = 0;
        if (product.phiceclaimsHospitalCodes) {
            product.phiceclaimsHospitalCodes.map((val) => {            
                if (val.primaryCode === false) {
                    isEmpty = isEmpty + 1;                
                } 
            });
            
            if (isEmpty === product.phiceclaimsHospitalCodes.length) {
                return (<div style={styles.warningMessageWrapper}> 
                         <span style={styles.warningMessageIcon}><ActionInfoOutline style={styles.warningIcon}/> </span>
                         <span style={styles.warningMessageTop}> Please add a primary hospital </span>
                         <span style={styles.warningMessageCodeText}> code</span>
                       </div>);
            }
        }
    }

    onDisplayMenuItem() {
        return this.onMenuItemOpts().map((item, index) => (
            <MenuItem primaryText={item.label} key={index} onTouchTap={item.action} leftIcon={item.leftIcon} />
        ));
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ProductsCardPhicEclaimsForm
     */
    render() {

        const { product, viewMode } = this.props;   

        const primaryCodeValue = () => {       
            if (product.phiceclaimsHospitalCodes)                    {
                return product.phiceclaimsHospitalCodes.map((val)  => (
                    val.primaryCode === true ? val.hospitalCode.trim() : ''
                ));
            }
        };     

        // const primaryCodeValue = () => {                   
        //     return product.phiceclaimsHospitalCodes.map((val)  => (
        //         val.primaryCode === true ? val.hospitalCode.trim() : ''
        //     ));        
        // };  
        

        return (
            <StyleRoot>
                <Paper style={styles.paperStyle} zDepth={2}>

                    { /** HEADEAR */ }
                    <ProductsCardHeader 
                        viewMode={viewMode}
                        imageSrc="/public/imgs/eclaims-logo.svg" 
                        color="#6fab2e"
                        menuItemsOpts={this.onMenuDeleteOpts()}
                        logoWidth='138px'
                        logoHeight='63px'
                        text={false}
                     />

                    { /** CONTENT */ }
                    <div style={styles.contentWrapper}>
                        {/*<p style={styles.contentWrapper.description}>Online form for encoding and transmittals of PhilHealth Claims (PHIC EClaims)</p>       */}

                        {/*<div style={styles.fieldsWrapper}>
                            <small style={styles.fieldsWrapper.fields}>
                                HOSPITAL CODES COUNT 
                                <span>{product.phiceclaimsHospitalCodes ? product.phiceclaimsHospitalCodes.length : 0}</span>
                            </small>

                            <small style={styles.fieldsWrapper.fields}>
                                PRIMARY HOSPITAL CODE
                                <span>
                                    {primaryCodeValue()}
                                </span>
                            </small>      
                        </div>       */}

                        <div style={styles.fieldsWrapper}>
                            <div style={styles.fieldsWrapper.fields}>
                                PRIMARY HOSPITAL CODE
                            </div>   
                            <div style={styles.fieldsWrapper.fields}>
                                <span style={styles.fieldsWrapper.code}>
                                    {primaryCodeValue()}
                                </span>
                            </div>      
                        </div>   
                        <div style={styles.moreInfo} >
                            <div style={styles.moreInfo.moreInfoButtons}>
                                <div style={styles.moreInfo.moreInfoButton}>
                                    <IconMenu
                                        iconButtonElement={<IconButton><NavigationMoreHoriz color={colorPalette.white} /></IconButton>}
                                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}>

                                        {this.onDisplayMenuItem()}
                                    </IconMenu>
                                </div>
                            </div>
                        </div>
                        <small style={styles.required}> {this.checkForPrimaryCode() }</small>
                    </div>
                </Paper>
            </StyleRoot>
        );
    }
}

// *** props
ProductsCardPhicEclaimsForm.propTypes = {
    product : PropTypes.object.isRequired, 
    openPhicEclaimsDelete : PropTypes.func.isRequired
};

export default ProductsCardPhicEclaimsForm;