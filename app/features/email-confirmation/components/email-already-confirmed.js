
// react redux
import React from 'react';
import { browserHistory } from 'react-router';

import Radium, {StyleRoot} from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

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
class EmailAlreadyConfirmed extends React.Component {
    
    constructor(props) {
        super(props);
    }

    navigateToLogIn() {
        browserHistory.push('/login');
    }

    render() {                  
        const {userInfo} =  this.props;
        return (
            <StyleRoot style={{width: '100%',height: '100%'}}>
                <div style={{textAlign: 'center', height: 'calc(100% - 60px)', padding: '40px 20px 20px 20px'}}>
                   
                    <h2 style={{fontFamily: 'Roboto', fontSize: '24px', letterSpacing: '2.4px', color: '#fff', lineHeight: 'normal', fontWeight: 'normal' , margin:'0 0 20px 0 '}}>
                        EMAIL ALREADY CONFIRMED
                    </h2>
                    <ActionInfoOutline style={{width: '100%', height:'60px', margin: '20px 0'}} color={'#fff'}   />
                    
                    <h3 style={styles.h3Text}>Your email  </h3>
                    <h3 style={styles.h3Text}>
                        {userInfo.email}
                    </h3>
                    <h3 style={styles.h3Text}>
                        has been confirmed before
                    </h3>

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

export default EmailAlreadyConfirmed;