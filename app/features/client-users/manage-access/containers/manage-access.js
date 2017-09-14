import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import colorPalette from '../../../../util/styles/color-pallete';

// *** dumb components
import ClientUsersManageAccess from '../components/manage-access';

import Radium, { StyleRoot } from 'radium';

const styles = {
    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialogBodyStyle: {
        padding: '24px'
    }
};

/**
 * ClientUsersManageAccess Container
 * 
 * @class ClientUsersManageAccessContainer
 * @extends {React.Component}
 */
@connect(
    state => state.clientUsersManageAccessReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ClientUsersManageAccessContainer extends React.Component {

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const { open, selectedClientUser, selectedFacility, actions: { editPHICEclaimsAccess } } = this.props;

        return (
            <StyleRoot>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={this.close.bind(this)}>

                    <div style={styles.titleContainer}>
                        <div>
                            <h1 style={styles.title}>Manage User Access</h1>
                        </div>      
                        <div>
                            <IconButton iconStyle={{color: colorPalette.secondaryTextColor}} onTouchTap={this.close.bind(this)}>
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                    
                    <ClientUsersManageAccess
                        selectedClientUser={selectedClientUser}
                        editPHICEclaimsAccess={editPHICEclaimsAccess}
                        selectedFacility={selectedFacility} />

                </Dialog>
            </StyleRoot>
        );
    }

    close() {
        const { close } = this.props;

        close();
    }
}

export default ClientUsersManageAccessContainer;
