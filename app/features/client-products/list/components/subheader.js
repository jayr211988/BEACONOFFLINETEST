import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import { browserHistory } from 'react-router';

// *** material-ui icons
import FlatButton from 'material-ui/FlatButton';

// *** material-icons
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    container: {
        display: 'flex',
        alignContent : 'space-between',
        alignItems : "center",
        backgroundColor: colorPalette.lightBgColor,
        padding: '15px 35px 15px 35px',
        position: 'relative'
    },    

    leftHolder: {
        width: '30%',
        titleWrapper: {
            display: 'flex',
            alignItems: 'center',

            title: {
                color: colorPalette.primaryColor,
                fontWeight: 600,
                fontSize: '20px',
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

        userWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            label: {
                color: colorPalette.primaryColor,
                margin: '12px',
                letterSpacing: '.5px'
            },

            small: {
                color: colorPalette.primaryTextColor,
                letterSpacing: '.2px'
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
    }

    /**
     * Refresh List
     * 
     * @param {any} event
     * 
     * @memberOf Subheader
     */
    onRefreshList(event) {
        event.preventDefault();

        const { refreshProductsList, selectedFacility } = this.props;

        refreshProductsList(selectedFacility.id);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Subheader
     */
    render() {
        const { selectedFacility, itemCount } = this.props;

        return (
            <StyleRoot style={styles.container}>
                { /** LEFT HOLDER */ }
                <div style={styles.leftHolder}>

                    <div style={styles.leftHolder.titleWrapper}>
                        <h1 style={styles.leftHolder.titleWrapper.title}>Your Products</h1>

                        <span style={styles.leftHolder.titleWrapper.total}>{ `${itemCount} Total` }</span>
                    </div>
                </div>

                { /** CENTER HOLDER */ }
                                
                   <div style={styles.centerHolder}>
                     {/**
                     <div style={styles.centerHolder.userWrapper}>
                        <Avatar 
                            name={ selectedFacility.name }
                            round={true}
                            size={60}
                            color={colorPalette.secondaryTextColor}
                        />
                    
                        <label style={styles.centerHolder.userWrapper.label}>{ selectedFacility.name }</label>
                        <small style={styles.centerHolder.userWrapper.small}>{ selectedFacility.address }</small>
                    </div>
                     */}
                </div>


                { /** RIGHT HOLDER */ }
                <div style={styles.rightHolder}>

                    { /** REFRESH ACTION */ }
                    <span title="REFRESH">
                        <FlatButton 

                            label=""
                            style={styles.rightHolder.flatButtonStyle}
                            labelStyle={styles.rightHolder.flatButtonLabelStyle}
                            onTouchTap={this.onRefreshList.bind(this)}
                            icon={<RefreshIcon color={colorPalette.secondaryTextColor} />}
                        />   
                    </span>                 
                </div>                  
            </StyleRoot>
        );

        
    }
    onAdd() {        
        browserHistory.push('products/new');
    }

    
}

// *** props
Subheader.propTypes = {
 
};

export default Subheader;