
// react redux
import React from 'react';
import { browserHistory } from 'react-router';

import Radium, {StyleRoot} from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import ActionInfoCheckCircleIcon from 'material-ui/svg-icons/action/check-circle';

const styles = {
    loginButton: {
        color: '#fff',            
        margin: '30px auto 10px auto',
        width: '200px'
    },
    h3Text : {
        fontSize: '18px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.8px',
        color: '#fff'
    }
};


@Radium
class EmailConfirmationSuccess extends React.Component {
    
    constructor(props) {
        super(props);
    }

    navigateToLogIn() {
        browserHistory.push('/login');
    }

    render() {                  
        const {userInfo} = this.props;
        return (
            <StyleRoot style={{width: '100%',height: '100%'}}>
                <div style={{textAlign: 'center', height: 'calc(100% - 60px)', padding: '40px 20px 20px 20px'}}>
                    <h2 style={{fontFamily: 'Roboto', fontSize: '24px', letterSpacing: '2.4px', color: '#fff', lineHeight: 'normal', fontWeight: 'normal', margin:'0 0 20px 0 '}}>
                        EMAIL CONFIRMATION SUCCESS
                    </h2>
                    
                    <ActionInfoCheckCircleIcon style={{width: '100%', height:'60px', margin: '20px 0'}} color={'#fff'} />

                    <h3 style={styles.h3Text}>Your email </h3>
                    <h3 style={styles.h3Text}>{userInfo.email} </h3>
                    <h3 style={styles.h3Text}>has been confirmed</h3>
                    <RaisedButton            
                        label="LOGIN NOW"
                        labelColor='#fff'
                        style={styles.loginButton}
                        secondary={true}
                        onTouchTap={this.navigateToLogIn.bind(this)}
                    />  
                </div>
            </StyleRoot>
        );
    }
}

export default EmailConfirmationSuccess;