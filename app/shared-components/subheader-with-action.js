import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Radium, { StyleRoot } from 'radium';

import colorPalette from '../util/styles/color-pallete';
import LoadingIndicatorPerAction from './loading-indicator-per-action';

const styles = {
    container: {
        backgroundColor: colorPalette.lightBgColor,
        padding: '10px 40px',
        display: 'flex',
        justifyContent: 'space-between'
    },

    subheaderTitle: {
        color: colorPalette.primaryColor,
        fontWeight: 600,
        fontSize: '20px',
        fontStyle: 'normal',
        fontStretch: 'normal',
        letterSpacing: '0.5px'
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        saveButton: {
            marginLeft: '15px',
            minWidth: '100px'
        },

        cancelButton: {
            minWidth: '100px'
        }
    }
};

/**
 * Header User Component
 * 
 * @class SubHeaderWithAction
 * @extends {React.Component}
 */
@Radium
class SubHeaderWithAction extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf SubHeaderWithAction
     */
    render() {
        const { title, onCancel, isBusy } = this.props;

        return (
            <StyleRoot>
                <div style={styles.container}>
                    <h1 style={styles.subheaderTitle}>{ title }</h1>
                    <div style={styles.buttonContainer}>
                        { isBusy
                            ? <LoadingIndicatorPerAction text={'Saving...'} />
                            : 
                            <div>
                                <span title="Shortcut Key: [C]">
                                    <RaisedButton
                                    label="CANCEL"
                                    style={styles.buttonContainer.cancelButton}
                                    onTouchTap={onCancel}
                                    type="button" />
                                </span>                               

                                <RaisedButton
                                    label="SAVE"
                                    secondary={true}
                                    style={styles.buttonContainer.saveButton}
                                    type="submit" />
                            </div>
                        }
                        
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

// *** props
SubHeaderWithAction.propTypes = {
    title : React.PropTypes.string.isRequired,
    onCancel: React.PropTypes.func,
    hideButton: React.PropTypes.bool
};

export default SubHeaderWithAction;