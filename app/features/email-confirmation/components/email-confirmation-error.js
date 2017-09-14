
// react redux
import React from 'react';

import Radium, {StyleRoot} from 'radium';

import SmsFailed from 'material-ui/svg-icons/notification/sms-failed';
const styles ={
    errorMsg: {
        fontSize: '14px',
        fontWeight: 'normal',
        letterSpacing: '1.4px',
        color: '#fff',
        margin: '0 auto'
    }   
};

@Radium
class EmailConfirmationError extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {                  

        return (
            <StyleRoot style={{width: '100%',height: '100%'}}>
                <div style={{textAlign: 'center', height: 'calc(100% - 60px)', padding: '40px 20px 20px 20px'}}>
                   
                    <h2 style={{fontFamily: 'Roboto', fontSize: '24px', letterSpacing: '2.4px', color: '#fff', lineHeight: 'normal', fontWeight: 'normal', margin:'0 0 20px 0 '}}>
                        EMAIL CONFIRMATION ERROR
                    </h2>

                    <SmsFailed style={{width: '100%', height:'60px', margin: '20px 0'}} color={'#fff'}   />
                    
                    <h4 style={styles.errorMsg}>Sorry, we are having some trouble confirming your email address. Please try and do the confirmation again later. Or contact us if the problem persists.</h4>
                </div>
            </StyleRoot>
        );
    }
}

export default EmailConfirmationError;