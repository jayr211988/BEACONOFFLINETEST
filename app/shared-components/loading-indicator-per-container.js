import React, { PropTypes } from 'react';

// *** material-ui components
import CircularProgress from 'material-ui/CircularProgress';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import animations from '../util/styles/animation';
import colorPalette from '../util/styles/color-pallete';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',    
        alignItems: 'center',
        flexDirection : 'column'   
    },

    label: {
        color : colorPalette.primaryColor,
        marginTop: '20px',
        fontSize: '14px'
    }
};

/**
 * Loading Screen Per Container
 * 
 * @class LoadingIndicatorPerComponent
 * @extends {React.Component}
 */
@Radium
class LoadingIndicatorPerContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Padding Top Options
     * 
     * @returns
     * 
     * @memberOf LoadingIndicatorPerContainer
     */
    onIndicatorOpts() {
        const { isDialog, fixedHeader } = this.props;   

        if(isDialog) {
            return { paddingTop: '0' };

        } 
        else if(fixedHeader) {
            return { paddingTop: 'calc(10vh + 128px)' };
        }

        else return { paddingTop: '10vh' };
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf LoadingIndicatorPerContainer
     */
    render() {
        const { color, text } = this.props;

        return (
            <StyleRoot style={[
                styles.container, 
                animations.fadeIn, 
                this.onIndicatorOpts() ]}>

                <CircularProgress 
                    style={styles.circularProgressStyle} 
                    size={60} 
                    innerStyle={styles.circularProgressInnerStyle} 
                    thickness={5} 
                    color={color ? color : null}
                />

                { text ? <label style={styles.label}>{ text }</label> : null }
            </StyleRoot>
        );
    }
}

// *** props;
LoadingIndicatorPerContainer.propTypes = {
    isDialog : PropTypes.bool,
    color : PropTypes.string,
    text : PropTypes.string
};

export default LoadingIndicatorPerContainer;