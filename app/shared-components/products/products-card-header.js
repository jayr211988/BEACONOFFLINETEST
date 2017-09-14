import React, { PropTypes } from 'react';

// *** material-ui components
import IconButton from 'material-ui/IconButton';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '85px'
    },

    img: {
        width: '150px',
        height: '150px',
        marginTop: '10px'
    },

    month: {
        color: colorPalette.white,
        marginBottom: '12px'
    },

    iconMenuWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        deleteIcon: {
            color: colorPalette.white,
            width: '20px',
            height: '20px'
        }
    },

    apiTextWrapper: {
        textAlign : 'center',
        color: colorPalette.white,
        marginTop: '12px'
    },

    apiText: {
        fontSize: '14px',
        marginTop: '-10px'
    },

    logoText: {
        fontSize: '12px',
        marginTop: '5px',
        letterSpacing: '1.5px'
    }
};


/**
 * Product Card Header
 * 
 * @class ProductsCardHeader
 * @extends {React.Component}
 */
@Radium
class ProductsCardHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    onDisplayDeleteMenu() {
        const { menuItemsOpts } = this.props;

        return menuItemsOpts.map((item, index) => (
            <IconButton key={index} iconStyle={styles.iconMenuWrapper.deleteIcon} onTouchTap={item.action} >
                {item.leftIcon}
            </IconButton>
        ));
        
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ProductsCardHeader
     */
    render() {

        const { imageSrc, color, viewMode,clientView,text,logoWidth,logoHeight } = this.props;

        return (
            <StyleRoot>
                <div style={[styles.container, { backgroundColor: color }]}>
                    { text ? <div style={styles.apiTextWrapper}></div> :  null }
                    <img style={{width: logoWidth, height: logoHeight }} src={imageSrc} />
                    { /** ACTION */}

                    {/*Clients does not have access to change products configurations */}
                    {                        
                        viewMode ? null :  
                            <div style={styles.iconMenuWrapper}>
                              
                                {this.onDisplayDeleteMenu()}
                            </div>
                    }
                    {   
                        clientView ? 
                            <div style={styles.iconMenuWrapper}>
                                {this.onDisplayDeleteMenu()}
                            </div>
                            : null 
                    }
                    {
                      text && text != 'eclaimsApi' ? 
                        <div style={styles.apiTextWrapper}>
                           <div style={styles.apiText}>{'<'} API {'>'}</div> 
                           <div style={styles.logoText}>{ text }</div>
                        </div> 
                        :  null
                    }

                </div>
            </StyleRoot>
        );
    }
}

// *** props
ProductsCardHeader.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default ProductsCardHeader;