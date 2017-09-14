import React from 'react';
import Helmet from 'react-helmet';
import Radium, { StyleRoot } from 'radium';
import Block from 'material-ui/svg-icons/content/block';

import colorPalette from '../../util/styles/color-pallete';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '20vh',
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
        margin: '0 0 12px 0',
    },

    subtitle: {
        margin: '0 30px',
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    }, 

    icon: {
        marginBottom: '20px',
        width: '50px',
        height: '50px',
        color: colorPalette.accentColor,
    }
};

/**
 * Not Found Page
 * 
 * @class NotFound
 * @extends {React.Component}
 */
@Radium()
class UnauthorizedAccess extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <StyleRoot>
            <Helmet title="Unauthorized Access" />
            <div style={[styles.container]}>
                <Block color={colorPalette.accentColor} style={styles.icon}/>

                <h3 style={styles.title}>Sorry, you don't have access to this feature.</h3>

                <small style={styles.subtitle}>Please request an access to this feature to your administrator.</small>
            </div>
        </StyleRoot>
        );
    }
}

export default UnauthorizedAccess;
