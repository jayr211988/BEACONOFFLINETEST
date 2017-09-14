import React, { PropTypes } from 'react';

import Radium, { StyleRoot } from 'radium';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';

// *** custom css style
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
 * Empty Placeholder Component
 * 
 * @class EmptyPlaceholder
 * @extends {React.Component}
 */
@Radium
class EmptyPlaceholder extends React.Component {
    render() {
        const { iconElement, title, subtitle, style } = this.props;

        return (
            <StyleRoot>
                <div style={[styles.container, style]}>
                    { iconElement ? iconElement : <AssignmentIcon color={colorPalette.accentColor} style={styles.icon}/> }

                    <h3 style={styles.title}>{ title }</h3>

                    <small style={styles.subtitle}>{ subtitle ? subtitle : null}</small>
                </div>
            </StyleRoot>
        );
    }
}

// *** props
EmptyPlaceholder.propTypes = {
    title : PropTypes.string.isRequired,
    subtitle : PropTypes.string,
    style: PropTypes.object
};

export default EmptyPlaceholder;