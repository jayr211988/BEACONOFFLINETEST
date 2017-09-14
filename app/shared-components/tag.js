import React from 'react';
import Radium, {StyleRoot} from 'radium';
import Close from 'material-ui/svg-icons/navigation/close';

import colorPalette from '../util/styles/color-pallete';

const styles = {
    tag: {
        display: 'flex',
        padding: '5px 5px 5px 12px',
        alignItems: 'center',

        label: {
            fontWeight: 'bold',
            fontSize: '12px',
            color: colorPalette.primaryColor,
            marginRight: '20px'
        },
        close: {
            height: '18px',
            width: '18px',
            color: colorPalette.primaryColor,
            cursor: 'pointer'
        }
    },
    tagContainer: {
        display: 'inline-block',
        border: `dashed 0.5px ${colorPalette.primaryColor}`,
        backgroundColor: colorPalette.whiteSmoke,
        marginRight: '5px'
    }
};

@Radium
class Tag extends React.Component {

    render() {
        const {labelText, handleDelete, style, summaryMode} = this.props;
        return (
            <StyleRoot style={[styles.tagContainer, style]}>
                <div style={styles.tag}>
                    <label style={styles.tag.label}>{labelText}</label>
                    { !summaryMode ? <Close onTouchTap={handleDelete} style={styles.tag.close} /> : null }
                </div>
            </StyleRoot>
        );
    }

}

export default Tag;
