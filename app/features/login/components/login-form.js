
// react redux
import React from 'react';
import { browserHistory } from 'react-router';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';
// 3rd party
// import colorPalette from 'app/util/styles/color-pallete';
// import colorPalette from '/util/styles/color-palette';
// import colorPalette from '../../../util/styles/color-palette';

import Radium, {StyleRoot} from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

//const version = __APP_VERSION__;
const styles = {
    fullPanel: {
        display: 'flex',
        flexDirection: 'row',
        height: '450px'    
    },
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
        forgotButton: {
            marginTop: '30px'
        },
        underlineStyle: {
            borderColor: '#fff',
            borderWidth: '2px'
        },
        floatingLabelFocusStyle: {
            color: '#fff'
        },
        floatingLabelStyle: {
            color: '#fff'
        },
        underlineFocusStyle: {
            borderColor: '#fff'
        },
        inputStyle: {
            color: '#fff',                        
            ':hover': {
                fontSize: '17px',
                backgroundColor: 'none !important'
            },
            ':active': {
                fontSize: '17px',
                backgroundColor: 'none !important'
            },
            ':focus': {
                fontSize: '17px',
                backgroundColor: 'none !important'
            }
        }

    },
    panelRight: {
        backgroundColor: '#4990e2',
        padding: '0 10px' ,
        width: '40%',
        height: '100%',

        containerText: {
            marginTop: '50px',
            marginLeft: '20px'       
        },

        textImg: {
            width: '60%'
        },

        textMsg : {
            margin: '0',
            color : '#fff',
            fontSize: '36px'                        
        },

        loading: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',

            text: {
                color: '#4990e2',
                margin: '0 0 0 10px'
            }
        }
    }
};


const required = value => value == null ? '* Required' : undefined;


@reduxForm({
    form : 'loginForm'
})

@Radium
class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
    }

    navigateToForgotPassword(route) {
        browserHistory.push(route);
    }
    

    login(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const {loginUser} = this.props;
        const {username, password} = this.refs;
        
        loginUser ({
            username: username.value,
            password: password.value
        });
    }
    render() {
        
        const {handleSubmit, loginRequestPending} = this.props;   
        
        

        return (
            <StyleRoot>
                <div style={styles.fullPanel}>
                    <div style={styles.panelLeft}>
                        <form style={styles.panelLeft.formAction} onSubmit={handleSubmit(this.login.bind(this))}>
                            {/*<span style={{color: '#ffffff'}}>{version}</span>*/}
                            <p style={styles.panelLeft.title}>LOGIN PAGE</p>

                            <Field name="Username"                                
                                component={TextField}
                                disabled={loginRequestPending}                                
                                floatingLabelText="User name"
                                hintText="Username Here"
                                ref="username" withRef
                                style={styles.panelLeft.textField}                                                                                                                    
                                validate={required}
                                underlineStyle={styles.panelLeft.underlineStyle}
                                floatingLabelFocusStyle={styles.panelLeft.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.panelLeft.floatingLabelStyle}
                                underlineFocusStyle={styles.panelLeft.underlineFocusStyle}
                                inputStyle={styles.panelLeft.inputStyle}
                                hintStyle={{color: '#dbd9d9'}}
                            />

                            <Field name="Password"                                
                                component={TextField}
                                disabled={loginRequestPending}
                                floatingLabelText="Password"                                                                          
                                hintText="Password Here"
                                ref="password" withRef
                                type="password"
                                style={styles.panelLeft.textField}                                    
                                validate={required}
                                underlineStyle={styles.panelLeft.underlineStyle}
                                floatingLabelFocusStyle={styles.panelLeft.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.panelLeft.floatingLabelStyle}
                                underlineFocusStyle={styles.panelLeft.underlineFocusStyle}
                                inputStyle={styles.panelLeft.inputStyle}
                                hintStyle={{color: '#dbd9d9'}}
                            />
                            
                            <RaisedButton 
                                type='submit'                                
                                disabled={loginRequestPending}
                                label="Login"
                                labelColor='#fff'                                
                                style={styles.panelLeft.loginButton}
                                secondary={true}
                            />  
                        
                            {loginRequestPending ? 
                                <div style={styles.panelRight.loading}>
                                    <CircularProgress 
                                        size={35} 
                                        thickness={5} 
                                        color='#4990e2'/>
                                    <p style={styles.panelRight.loading.text}>
                                        Logging you in..
                                    </p>
                                </div>
                                : 
                                <FlatButton
                                    label="I FORGOT MY PASSWORD"
                                    labelStyle={styles.panelLeft.forgot}
                                    style={styles.panelLeft.forgotButton}
                                    onTouchTap={this.navigateToForgotPassword.bind(this, 'forgot-password')}
                                />
                            }
                            
                        </form>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default LoginForm;