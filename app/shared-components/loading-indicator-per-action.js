import React from 'react';
import Radium from 'radium';
import CircularProgress from 'material-ui/CircularProgress';

import colorPalette from '../util/styles/color-pallete';

const styles = {
    wrapper: {
        height: '36px',
        fontSize: '14px',
        display: 'flex',
        padding: '0 40px',
        alignItems: 'center'
    },

    text: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '12px',
        color: colorPalette.primaryColor
    }
};

@Radium
class LoadingIndicatorPerAction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text, style } = this.props;

        return (
            <div style={[styles.wrapper, style]}>
                <CircularProgress size={25} thickness={3} />
                <p style={styles.text}>{text || 'Loading...'}</p>
            </div>
        );
    }
}

export default LoadingIndicatorPerAction;

