import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

// *** material-ui components
import { Tab, Tabs } from 'material-ui/Tabs';

// *** dumb components
import HeaderDropdownUserAccount from './header-dropdown-user-account';


import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    container: {
        backgroundColor: colorPalette.primaryColor,
        paddingLeft: '40px',
        paddingRight: '40px',
        minHeight: '128px',
    },

    firstLayer: {
        display: 'flex',
        minHeight: '45px',

        leftHolder: {
            width: '50%',
            display: 'flex',
            paddingTop: '20px',

            applogoWrapper: {
                display: 'flex',
                flexDirection: 'column',
                
                span: {
                    color: colorPalette.white,
                    fontWeight: 400,
                    fontSize: '30px',
                    letterSpacing: '2px'
                },

                img: {
                    width: '70px',
                    paddingLeft: '3px'
                }
            }
        },

        rightHolder: {
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-end',
        }
    },

    secondLayer: {
        paddingTop: '5px',

        tabWrapper: {
            width: '30%',
            paddingRight: '10px',

            tabsTabItemContainerStyle: {
                backgroundColor: colorPalette.primaryColor
            },

            tabStyle: {
                color: colorPalette.white,
            },

            inkBarStyle: {
                backgroundColor: colorPalette.accentColor,
            }
        }
    }
};

/**
 * Header User Component
 * 
 * @class HeaderUser
 * @extends {React.Component}
 */
@Radium
class HeaderUser extends React.Component {

    constructor(props) {  
        super(props);
        this.state = {
            tabValue : props.location.pathname
        };
    }


    /**
     * Selected Tab
     * 
     * @param {any} route
     * 
     * @memberOf HeaderUser
     */
    onSelectedTab(route) {
        this.setState({tabValue: route});
        browserHistory.push(route);
    } 
    
 

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf HeaderUser
     */
    render() {
        const { currentUser,
                logoutUser,                 
                mainCurrentUserLogoutRequest} = this.props;
        
        
        return (
            <StyleRoot>
                <div style={styles.container}> 
                    
                    { /** FIRST LAYER */ }
                    <section style={styles.firstLayer}>
                        <div style={styles.firstLayer.leftHolder}>
                        
                            { /** BIZBOX AND BEACON ICON */ }
                            <div style={styles.firstLayer.leftHolder.applogoWrapper}>
                                <img style={styles.firstLayer.leftHolder.applogoWrapper.img} src='/public/imgs/bizbox-logo-white.png' />
                                <span style={styles.firstLayer.leftHolder.applogoWrapper.span}>BEACON</span>
                            </div>                            
                        </div>    

                        <div style={styles.firstLayer.rightHolder}>
                            {/**<HeaderDropdownSwitchFacility />*/}
                            
                            <HeaderDropdownUserAccount 
                                currentUser={currentUser}
                                logoutUser={logoutUser}
                                mainCurrentUserLogoutRequest={mainCurrentUserLogoutRequest}
                            />
                        </div>                                     
                    </section>

                    { /** SECOND LAYER */ }
                    <section style={styles.secondLayer}>
                        
                        { /** TABS */ }
                        <div style={styles.secondLayer.tabWrapper}>
                            <Tabs 
                                value={this.state.tabValue}
                                tabItemContainerStyle={styles.secondLayer.tabWrapper.tabsTabItemContainerStyle}
                                inkBarStyle={styles.secondLayer.tabWrapper.inkBarStyle}
                                initialSelectedIndex={0}>
                                
                                { /** HOME */ }
                                <Tab 
                                    value='/'
                                    label="HOME" 
                                    style={styles.secondLayer.tabWrapper.tabStyle}  
                                    onActive={this.onSelectedTab.bind(this, '/')}                          
                                />
``
                                { /** CLIENTS */ }
                                <Tab 
                                    value='/clients'
                                    label="CLIENTS" 
                                    style={styles.secondLayer.tabWrapper.tabStyle}      
                                    onActive={this.onSelectedTab.bind(this, '/clients')}                                                                    
                                />

                                { /** USERS */ }
                                <Tab 
                                    value='/users'
                                    label="USERS" 
                                    style={styles.secondLayer.tabWrapper.tabStyle}                                
                                    onActive={this.onSelectedTab.bind(this, '/users')}  
                                />
                                { /** TRANSACTIONS */ }
                                {/*<Tab 
                                    value='/transactions'
                                    label="TRANSACTIONS" 
                                    style={styles.secondLayer.tabWrapper.tabStyle}    
                                    onActive={this.onSelectedTab.bind(this, '/transactions')}                            
                                />*/}
                                
                            </Tabs>                            
                        </div>
                    </section>
                </div>
            </StyleRoot>
        );
    }
}

// *** props
HeaderUser.propTypes = {

};

export default HeaderUser;