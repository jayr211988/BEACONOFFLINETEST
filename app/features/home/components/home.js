import React from 'react';
import Radium, { StyleRoot } from 'radium';
import Helmet from 'react-helmet';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';
import animation from '../../../util/styles/animation';
import FlatButton from 'material-ui/FlatButton';

import { browserHistory } from 'react-router';
//onst version = __APP_VERSION__;
const styles = {
    panelLeft: {
        padding: '50px 25px',
        width: '80%',
        margin: '0 auto',

        title: {
            color: '#ffffff',
            fontSize: '24px',
            margin: 0,
            fontFamily: 'Roboto',
            letterSpacing: '2.4px',
            height: '32px'
        },
        textField : {
            width: '100%',
            margin: '0 0 0 0',
            

        },

        formAction: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        loginButton: {
            color: '#fff',            
            margin: '30px 10px 0px 10px',
            width: '90%'
        },
        forgot: {
            color : '#fff',
            fontSize: '14px',
            fontFamily: 'Roboto'
            
        },
    },
    wrapper:{
        height: 'calc(94vh - 90px)',
        overflow: 'auto'

    },
    wrapperDiv:{
        
    },
    container: {
        textAlign: 'left',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '80%',
        height: 'calc(100vh - 250px)',
        minHeight: '475px',
        margin:'0 auto'
    },

    h1: {
        color: colorPalette.primaryColor,
        fontSize: '60px'
    },
    h2:{
        fontFamily:'roboto',
        fontSize: '20px',
        fontWight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHight: 'normal',
        letterSpacing: '1.1px',
        color: '#4a90e2',
        margin: '5px 0'
    },
    welcomeToBecomParag:{
        fontFamily:'roboto',
        fontSize: '15px',
        fontWeight: '300',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1px',
        color: '#4a4a4a',
        margin: '5px 0'
    },
    phiEclaimsParag:{
        fontFamily:'roboto',
        fontSize: '14px',
        fontWeight: '300',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.8px',
        color: '#4a4a4a',
        width: '85%',
        margin:'5px 0'
    },
    p: {
        fontFamily:'roboto',
        color: colorPalette.primaryTextColor,
        fontSize: '22px',
        lineHeight: '1.6em'
    },
    hisCon:{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '20px',
        minHeight: '110px',
        backgroundColor: '#f5f5f5',
        width: '100%',
        
        hisImgCon:{
            width: '225px',
            height: '110px',
            backgroundColor: '#6c8db3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',

            img:{
                width: '75%',
                height: '80%'
            },
            p: {
                fontFamily:'roboto',
                fontSize: '14px',
                fontWeight: '300',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 'normal',
                letterSpacing: '0.8px',
                color: '#4a4a4a',
                width: '70%',
                paddingTop: '20px'
            }

        }
    },
    eClaimsCon:{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '20px',
        minHeight: '110px',
        backgroundColor: '#f5f5f5',
        width: '100%',
        
        eClaimsImgCon:{
            width: '225px',
            height: '110px',
            backgroundColor: '#6fab2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',

            img:{
                width: '58%',
                height: '80%'
            },
            p: {
                fontFamily:'roboto',
                fontSize: '14px',
                fontWeight: '300',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 'normal',
                letterSpacing: '0.8px',
                color: '#4a4a4a',
                width: '70%',
                paddingTop: '20px'
            }

        }
    },
    eClaimsApiCon:{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '20px',
        minHeight: '110px',
        backgroundColor: '#f5f5f5',
        width: '100%',
        
        eClaimsImgCon:{
            width: '225px',
            height: '110px',
            backgroundColor: '#f6a623',
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
            justifyContent: 'center',

            img:{
                width: '58%',
                height: '80%'
            },
            p:{
                fontFamily:'roboto',
                fontSize: '14px',
                fontWeight: '300',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 'normal',
                letterSpacing: '0.8px',
                color: '#4a4a4a',
                width: '70%',
                paddingTop: '20px'
            }

        }
    },
    footer:{
        textAlign: 'right',
        width: '90%',
        margin: '45px -2px auto',

        p:{
            fontFamily:'roboto',
            fontSize: '14px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '0.8px',
            color: '#4a90e2',
            margin: '0'
        }
    }
};

/**
 * Home Component
 * 
 * @class Home
 * @extends {React.Component}
 */
@Radium
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    navigateToForgotPassword(route) {
        browserHistory.push(route);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Home
     */
    render() {
        return (
            <StyleRoot style={animation.fadeIn}>
                <Helmet title="Home" />
                <div style={styles.wrapper}>
                    <div style={styles.wrapperDiv}>
                        <div style={styles.container}>
                            <div style={{paddingTop:'20px'}}>
                                <h2 style={styles.h2}>WELCOME TO BEACON!</h2>

                                <div onClick={this.navigateToForgotPassword.bind(this, '/phic-claims-details/624/summary/627')}>Im A Button</div>

                                <p style={styles.welcomeToBecomParag}>Your Bizbox products. All in one space.</p>
                                <p style={styles.welcomeToBecomParag}>Beacon is a portal for Bizbox Clients to manage their licenses, transactions, and applications.</p>
                            </div>
                            <div style={{margin: '18px 0', width: '100%'}}>
                                <h2 style={styles.h2}>BIZBOX PhilHealth e-Claims</h2>
                                <p style={styles.phiEclaimsParag} >Process claims efficiently with Bizbox.</p>
                            </div>

                            <div style={styles.hisCon}>
                                <div style={styles.hisCon.hisImgCon}>
                                    <img style={styles.hisCon.hisImgCon.img} src="/public/imgs/his8-logo-welcome.svg" alt="Hospital Information System"/>
                                </div>
                                <p style={styles.hisCon.hisImgCon.p}>The BIZBOX Hospital Information System Version 8 is the leading enterprise solution for Hospitals in the Philippines.
                                    <br/> It is integrated out-of-the-box with PhilHealth e-Claims.
                                </p>
                            </div>

                            <div style={styles.eClaimsCon}>
                                <div style={styles.eClaimsCon.eClaimsImgCon}>
                                    <img style={styles.eClaimsCon.eClaimsImgCon.img} src="/public/imgs/eclaims-logo.svg" alt="e-Claims"/>
                                </div>
                                <p style={styles.eClaimsApiCon.eClaimsImgCon.p}>The BIZBOX e-Claims Portal is an application that checks member’s eligibility, submits e-Claims requirements, and verify claims status from the facility to PhilHealth. It has a user-friendly interface that makes it easier for the users to navigate through the application.
                                </p>
                            </div>

                            <div style={styles.eClaimsApiCon}>
                                <div style={styles.eClaimsApiCon.eClaimsImgCon}>
                                    <img style={styles.eClaimsApiCon.eClaimsImgCon.img} src="/public/imgs/eclaims-api-logo.svg" alt="e-Claims"/>
                                </div>
                                <p style={styles.eClaimsApiCon.eClaimsImgCon.p}>The BIZBOX e-Claims functionalities are also available for any third party application that can integrate and consume the service as a developer-friendly Web API.</p>
                            </div>
                        </div>
                        <div style={styles.footer}>
                            <p style={styles.footer.p}>BIZBOX IS ACCREDITED BY PHILHEALTH</p>
                            {/*<p style={styles.footer.p}>BEACON v {version}</p>*/}
                        </div>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default Home;