import React from 'react';
import Radium, { StyleRoot } from 'radium';
import CircularProgress from 'material-ui/CircularProgress';

import animations from '../util/styles/animation';
import colorPalette from '../util/styles/color-pallete';

const styles = {
    small: {
        color: colorPalette.primaryColor, 
        letterSpacing: '6px',
        margin: '25px 0'
    },

    containerStyle: {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',      
    },       
};

@Radium
class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyleRoot>
                <div style={[styles.containerStyle, animations.fadeIn]}>
                    <CircularProgress size={60} thickness={4} />
                    <small style={styles.small}>LOADING</small>
                </div>
            </StyleRoot>
        );
    }
}

export default LoadingScreen;

