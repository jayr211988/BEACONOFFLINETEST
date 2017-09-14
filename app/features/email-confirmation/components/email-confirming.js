
// react redux
import React from 'react';


import Radium, { StyleRoot } from 'radium';

import CircularProgress from 'material-ui/CircularProgress';

@Radium
class EmailConfirming extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {                  

        return (
            <StyleRoot style={{width: '100%',height: '100%'}}>
                <div style={{textAlign: 'center', height: 'calc(100% - 60px)', padding: '40px 20px 20px 20px'}}>
                   
                    <h2 style={{fontFamily: 'Roboto', fontSize: '24px', letterSpacing: '2.4px', color: '#fff', lineHeight: 'normal', fontWeight: 'normal', margin:'0 0 20px 0 '}}>
                        CONFIRMING EMAIL
                    </h2>

                    <CircularProgress size={45} thickness={5} color={'#fff'} style={{margin:'20px 0'}} />
                    
                    <h4 style={{fontFamily:'Roboto',fontSize: '18px', fontWeight: 'normal', letterSpacing: '1.8px', color: '#fff', width: '90%', margin: '10px auto'}}>Please wait while we confirm your email address</h4>
                </div>
            </StyleRoot>
        );
    }
}

export default EmailConfirming;