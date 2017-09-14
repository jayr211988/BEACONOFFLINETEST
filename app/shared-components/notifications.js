import React, { PropTypes } from 'react';
import {connect}  from 'react-redux';
import Notifications from 'react-notification-system-redux';

// *** custom css styles
import colorPalette from '../util/styles/color-pallete';

const styles = {
    NotificationItem: {
        DefaultStyle: {
            color: colorPalette.secondaryTextColor,
            background: '#fff',
            padding: '18px 30px 18px 30px',
            borderRadius: '3px',
            boxShadow: 'rgba(0, 0, 0, 0.227451) 0px 3px 10px', 
            borderTop: 0,
        },

        success: {            
            borderBottom: '3px solid #5cb85c',
        },
        error: {
            borderBottom: `3px solid ${colorPalette.accentColor}`,          
        },
        info: {
            borderBottom: `3px solid ${colorPalette.primaryColor}`,
        }
    },
    Dismiss: {
        DefaultStyle: {
            background: 'rgba(0, 0, 0, 0.0)',
            color: colorPalette.secondaryTextColor,
            top: '5px'
        }
    },
    Title: {
        success: {
            lineHeight: '1.4em',
            color: '#5cb85c'
        },
        error: {
            lineHeight: '1.4em',            
            color: colorPalette.accentColor
        },
        info: {
            lineHeight: '1.4em',
            color: colorPalette.primaryColor
        }
    }
};

/**
 * Notification Component
 * 
 * @class NotificationsContainer
 * @extends {React.Component}
 */
class NotificationsContainer extends React.Component {

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf NotificationsContainer
     */
    render() {
        const { notifications } = this.props;

        return (
            <Notifications
                notifications={notifications}                
                style={styles}
            />
        );
    }
}

NotificationsContainer.contextTypes = {
    store : PropTypes.object
};

NotificationsContainer.propTypes = {
    notifications : PropTypes.array
};

export default connect(
    state => ({ notifications : state.notifications})
)(NotificationsContainer);