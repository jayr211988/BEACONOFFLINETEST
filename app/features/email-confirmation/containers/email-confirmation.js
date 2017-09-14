
// react redux
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as duck from '../duck';

// material-ui
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

// 3rd party
import Helmet from 'react-helmet';
import Radium from 'radium';

import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';


// dumb component
import EmailAlreadyConfirmed from '../components/email-already-confirmed';
import EmailConfirmationSuccess from '../components/email-confirmation-success';
import EmailConfirmationError from '../components/email-confirmation-error';
import EmailConfirming from '../components/email-confirming';


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
        margin: '0 20px 0 0',
        color : '#fff',
        fontSize: '36px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: '2px'
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
    },

    loadingCenter: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};


@connect (
    (state) => state.emailConfirmationReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch)})            
)

/**
 * 
 * 
 * @class EmailConfirmationContainer
 * @extends {React.Component}
 */
@Radium
class EmailConfirmationContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount() {
        const {params, actions : {validateUserAccess}} = this.props;                
        validateUserAccess(params.id, params.token);        
    }
    

    render(){
        const {validateUserAccessRequestPending, validateUserAlreadyValidated, validateUserForFirstTime, userInfo, showError} = this.props;
        return(
            <div style={styles.parentLogin}>
                <Helmet title = "Login Page" />
                <div style={styles.topContent}>
                    <div style={styles.topLeftContent}>
                        <p style={styles.beaconText}>BEACON</p>
                        <div>
                            <img src="/public/imgs/bizbox-logo-white.png" style={styles.beaconImg}/>
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
                    
                    
                    {     validateUserAccessRequestPending  ?  
                            <EmailConfirming/>                         
                            :
                            showError ? 
                            <EmailConfirmationError /> :
                            
                            validateUserAlreadyValidated ? 
                            <EmailAlreadyConfirmed  userInfo={userInfo}/> 
                            :
                            validateUserForFirstTime ? 
                            <EmailConfirmationSuccess userInfo={userInfo}/>                                                     
                            : 
                            null
                    }
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
        );
    }
}

export default EmailConfirmationContainer;