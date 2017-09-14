
// react redux
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// 3rd party
import * as duck from '../duck';
import Radium, {StyleRoot} from 'radium';
import Paper from 'material-ui/Paper';
// import checkIfUserHasSession from '../../../util/auth';

// dumb component
import ForgotPasswordForm from '../components/forgot-password-form';

import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';

const styles = {
    parentLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100vh',      
        backgroundImage: 'linear-gradient(to right bottom, rgb(91, 160, 232) 50%, rgb(91, 160, 232) 0%, rgb(15, 110, 222) 100%)',
        overflow: 'hidden',
        flexDirection: 'column',
        minWidth: '1280px',
        overflowX: 'auto'
    },
    paperContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.21)',
        width: '350px',
        height: '450px',
        borderRadius: '25px',
        boxShadow: 'none'        
    },
    beaconImg:{
        width: '102px',
        height: '17px'
    },
    topContent:{
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    topLeftContent:{
        width: '340px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    bottomContent:{
        width: '870px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        eClaimsText:{
            width: '300px',
            fontSize: '18px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1.4px',
            color: '#fff',

            bold:{
                fontWeight: 'bold'
            }
        },
        eClaimsImg:{
            width: '115px'
        },
        hisImg:{
            width: '175px'
        },
        learnMore:{
            fontSize: '14px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1.2px',
            color: '#fff'
        }
    },
    beaconText:{
        margin: '0 20px 0 0 ',
        color : '#fff',
        fontSize: '36px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '2px',
    },
    clientPortalText:{
        margin: '0',
        fontSize: '18px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.1px',
        color: '#fff'
    }
};

@connect(
    (state) => state.forgotPasswordReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class ForgotPasswordContainer extends React.Component {
    
    
    render() {
        const { forgotPassword } = this.props.actions;      
        const {forgotPasswordPending} = this.props;
        
        return (
            <StyleRoot>

                <div style={styles.parentLogin}>
                    <Helmet title = "Login Page" />
                    <div style={styles.topContent}>
                        <div style={styles.topLeftContent}>
                            <p style={styles.beaconText}>BEACON</p>
                            <div>
                                <img src="public/imgs/bizbox-logo-white.png" style={styles.beaconImg}/>
                                <p style={styles.clientPortalText}>CLIENT PORTAL</p>
                            </div>
                        </div>
                        <div>
                            <IconButton>
                                <ActionHome color="white"/>
                            </IconButton>
                        </div>
                    </div>
                    <Paper style={styles.paperContainer}>
                        <ForgotPasswordForm 
                            forgotPassword={forgotPassword}
                            forgotPasswordPending={forgotPasswordPending}
                        />
                    </Paper>
                    <div style={styles.bottomContent}>
                        <p style={styles.bottomContent.eClaimsText}>Process claims efficiently with Bizbox.</p>
                        <div>
                            <img src="/public/imgs/his8-logo-login.svg" style={styles.bottomContent.hisImg}/>
                        </div>
                        <div>
                            <img src="/public/imgs/eclaims-logo.svg" style={styles.bottomContent.eClaimsImg}/>
                        </div>
                        <div>
                            <img src="/public/imgs/eclaims-api-logo.svg" style={styles.bottomContent.eClaimsImg}/>
                        </div>
                    </div>
                </div>            
            </StyleRoot>
        );
    }
}
export default ForgotPasswordContainer;
