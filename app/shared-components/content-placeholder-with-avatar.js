import React from 'react';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles 
import animation from '../util/styles/animation';

const styles = {
    container : {
        width: '400px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 25px'
    },

    roundWrapper: {
        width: '15%'
    },

    round: {
        height: '50px',
        width: '50px',
        borderRadius: '100%',
        backgroundColor: 'rgb(255, 255, 255)'
    },

    rowWrapper: {
        width: '85%',
        height: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: '12px'
    },

    rows: {
        width: '100%',
        height: '10px',
        backgroundColor: 'rgb(255, 255, 255)'
    }
};


@Radium
class ContentPlaceholderWithAvatar extends React.Component {
    constructor(props) {
        super(props);
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ContentPlaceholderWithAvatar
     */
    render() {
        return (
            <StyleRoot style={styles.container}>
                <div style={styles.roundWrapper}>
                    <div style={[styles.round, animation.pulse]} />
                </div>

                <div style={styles.rowWrapper}>
                    <div style={[styles.rows, animation.pulse]}/>
                    <div style={[styles.rows, animation.pulse]}/>
                </div>
            </StyleRoot>
        );
    }
}
export default ContentPlaceholderWithAvatar;
