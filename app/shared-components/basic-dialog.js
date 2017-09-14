import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

// *** dumb components
import LoadingIndicatorPerContainer from './loading-indicator-per-container';

// *** custom css styles
import colorPalette from '../util/styles/color-pallete';

const styles = {
    container : {
        height: '100%',
        width: '100%',        
    },

    title: {
        color: colorPalette.primaryTextColor,
        fontWeight: 400,
        fontSize: '18px',
    },

    bold: {
        color: colorPalette.accentColor
    },

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },

    dialogBodyStyle : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
    },    
};


/**
 * Basic Dialog Edit
 * 
 * @class BasicDialogDelete
 * @extends {React.Component}
 */
@Radium
class BasicDialogDelete extends React.Component {
    constructor(props){
        super(props);
    }

    /**
     * Display Actions
     * 
     * @returns
     * 
     * @memberOf BasicDialogDelete
     */
    onDisplayActions() {
        const { actions } = this.props.basicDialogOpts;

        return actions.map(( action, index ) => (
            <RaisedButton 
                key={index}
                label={ action.label }
                style={ styles.buttonWrapper.left }
                onTouchTap={ action.action.bind(this) }
                secondary={ action.secondary }
                primary={ action.primary }
            />            
        ));
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf BasicDialogDelete
     */
    render() {
        const { 
            closeDialog, 
            isPending,
            basicDialogOpts : { open, title, highlightTitle, subtitle, }} = this.props;
            
        return (
            <StyleRoot>
                <Dialog
                    open={ open }
                    modal={ false }
                    onRequestClose={ closeDialog }
                    bodyStyle={subtitle ? { minHeight : '210px', ...styles.dialogBodyStyle } : { minHeight : '180px', ...styles.dialogBodyStyle}}>            

                    { isPending ? 
                        /** LOADING INDICATOR */
                        <LoadingIndicatorPerContainer isDialog={true} />
                    : 
                        <div style={styles.container}>
                            <h1 style={styles.title} >
                                { title } 

                                { highlightTitle ? <b style={styles.bold}>{ ` ${highlightTitle} ` }</b> : null } {title !== 'Product has still' ? '?' : null} 
                            </h1>
                            <p style={styles.subtitle}>{ subtitle }</p>

                            <div style={styles.buttonWrapper}>

                                { /** DIALOG ACTIONS */ }
                                { this.onDisplayActions() }
                            </div>
                        </div>
                    }
                </Dialog>
            </StyleRoot>
        );
    }
}

// *** props
BasicDialogDelete.propTypes = {

};

export default BasicDialogDelete;