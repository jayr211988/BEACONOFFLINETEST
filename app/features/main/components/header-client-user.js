import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

// *** material-ui components
import { Tab, Tabs } from 'material-ui/Tabs';

// *** dumb components
import HeaderDropdownUserAccount from './header-dropdown-user-account';

// *** smart components
import HeaderDropdownSwitchFacilityContainer from '../containers/header-dropdown-switch-facility';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';

import { hasPHICECLAIMS, hasPHICECLAIMSAPI } from '../../../util/rules';
import { hasPHICEclaimsAccess, isClientUser } from '../../../util/roles';



const styles = {
    container: {
        backgroundColor: colorPalette.primaryColor,
        paddingLeft: '40px',
        paddingRight: '35px',
        minHeight: '128px'
    },

    fixedContainer: {
        backgroundColor: colorPalette.primaryColor,
        paddingLeft: '40px',
        paddingRight: '40px',
        minHeight: '128px',
        position: 'fixed',
        width: 'calc(100% - 80px)',
        zIndex: '20'
    },


    firstLayer: {
        display: 'flex',
        minHeight: '45px',

        leftHolder: {
            width: '50%',
            display: 'flex',

            applogoWrapper: {
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '20px',

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
            width: '60%',
            // '@media (max-width : 1440px ) and (min-width : 1440px )' : {
            //     width: '60%'
            // },
            paddingRight: '10px',
            tabsTabItemContainerStyle: {
                backgroundColor: colorPalette.primaryColor
            },
            tabStyle: {
                color: colorPalette.white,
                margin: '0 10px'
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
class HeaderClientUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: props.location.pathname
        };
    }

    /**
     * Selected Tab
     * 
     * @param {any} route
     * 
     * @memberOf HeaderClientUser
     */
    onSelectedTab(route) {
        this.setState({ tabValue: route });
        browserHistory.push(route);
    }


    /**
     * Display Transaction Tab
     * 
     * @returns 
     * 
     * @memberOf HeaderClientUser
     */
    onDisplayTransactionTab() {
        const { selectedFacility, currentUser } = this.props;

        const tab = (value) => {
            return (
                <Tab
                    value={value}
                    label="TRANSACTIONS"
                    style={styles.secondLayer.tabWrapper.tabStyle}
                    onActive={this.onSelectedTab.bind(this, value)}
                />
            );
        };

        if (!hasPHICECLAIMSAPI(selectedFacility) && !hasPHICECLAIMS(selectedFacility)) {
            return null;
        }
        else {
            if (hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility) && hasPHICECLAIMSAPI(selectedFacility)) {
                return tab('/transactions');
            }
            else if (hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility) && !hasPHICECLAIMSAPI(selectedFacility)) {
                return tab('/transactions');
            }
            else if (hasPHICECLAIMS(selectedFacility) && !hasPHICEclaimsAccess(currentUser, selectedFacility) && hasPHICECLAIMSAPI(selectedFacility)) {
                return tab('/transactions/eclaims-api');
            }
            else if (!hasPHICECLAIMS(selectedFacility) && hasPHICECLAIMSAPI(selectedFacility)) {
                return tab('/transactions/eclaims-api');
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.location) {
            this.setState({
                tabValue : nextProps.location.pathname
            });
        }
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Header Clint User
     */
    render() {
        const { currentUser,
            logoutUser,
            location,
            mainCurrentUserLogoutRequest,
            selectedFacility } = this.props;
       


        return (
            <StyleRoot>
                <div style={
                    location.pathname.indexOf('/phic-claims-details/') > -1 ?
                        styles.fixedContainer
                        :
                        styles.container
                }>


                    { /** FIRST LAYER */}
                    <section style={styles.firstLayer}>
                        <div style={styles.firstLayer.leftHolder}>

                            { /** BIZBOX AND BEACON ICON */}
                            <div style={styles.firstLayer.leftHolder.applogoWrapper}>
                                <img style={styles.firstLayer.leftHolder.applogoWrapper.img} src='/public/imgs/bizbox-logo-white.png' />
                                <span style={styles.firstLayer.leftHolder.applogoWrapper.span}>BEACON</span>
                            </div>
                        </div>

                        <div style={styles.firstLayer.rightHolder}>

                            { /** FACILITY */}
                            <HeaderDropdownSwitchFacilityContainer
                            />

                            { /** CURRENT USER */}
                            <HeaderDropdownUserAccount
                                currentUser={currentUser}
                                logoutUser={logoutUser}
                                mainCurrentUserLogoutRequest={mainCurrentUserLogoutRequest}
                            />
                        </div>
                    </section>

                    { /** SECOND LAYER */}
                    <section style={styles.secondLayer}>

                        { /** TABS */}
                        <div style={styles.secondLayer.tabWrapper}>
                            <Tabs value={this.state.tabValue}
                                tabItemContainerStyle={styles.secondLayer.tabWrapper.tabsTabItemContainerStyle}
                                inkBarStyle={styles.secondLayer.tabWrapper.inkBarStyle}>

                                { /** HOME */}
                                <Tab
                                    value='/'
                                    label="HOME"
                                    style={styles.secondLayer.tabWrapper.tabStyle}
                                    onActive={this.onSelectedTab.bind(this, '/')}
                                />

                                { /** PRODUCTS */}
                                {isClientUser(currentUser, selectedFacility)
                                    ? null
                                    :
                                    <Tab
                                        value='/products'
                                        label="PRODUCTS"
                                        style={styles.secondLayer.tabWrapper.tabStyle}
                                        onActive={this.onSelectedTab.bind(this, '/products')}
                                    />
                                }


                                { /** USERS */}
                                {isClientUser(currentUser, selectedFacility)
                                    ? null
                                    :
                                    <Tab
                                        value='/client-users'
                                        label="USERS"
                                        style={styles.secondLayer.tabWrapper.tabStyle}
                                        onActive={this.onSelectedTab.bind(this, '/client-users')}
                                    />
                                }

                                { /** ECLAIMS */}
                                {hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility)
                                    ?
                                    <Tab
                                        value='/phic-transmittals'
                                        label="E-CLAIMS"
                                        style={styles.secondLayer.tabWrapper.tabStyle}
                                        onActive={this.onSelectedTab.bind(this, '/phic-transmittals')}
                                    />
                                    : null
                                }

                                {/* MEMBER INQURY */}
                                {hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility)
                                    ?
                                    <Tab
                                        value='/phic-member-inquiry'
                                        label="MEMBER INQUIRY"
                                        style={styles.secondLayer.tabWrapper.tabStyle}
                                        onActive={this.onSelectedTab.bind(this, '/phic-member-inquiry')}
                                    /> : null
                                }

                                { /** TRANSACTIONS */}
                                {this.onDisplayTransactionTab()}
                            </Tabs>
                        </div>
                    </section>
                </div>
            </StyleRoot>
        );
    }
}

// *** props
HeaderClientUser.propTypes = {

};

export default HeaderClientUser;