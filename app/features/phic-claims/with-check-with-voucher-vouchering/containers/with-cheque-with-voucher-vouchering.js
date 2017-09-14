import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as duck from '../duck';
import Radium, { StyleRoot } from 'radium';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import WithChequeWithVoucherVouchering from '../components/with-cheque-with-voucher-vouchering.js';

import colorPalette from '../../../../util/styles/color-pallete';

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
        padding: '24px',
        minHeight: '440px'
    }
};

@connect(
    state => state.phicClaimsWithChequeWithVoucherVoucheringReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class WithChequeWithVoucherVoucheringContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions: { getPhicClaimPayee }, selectedClaim } = this.props;

        getPhicClaimPayee(selectedClaim.id);
    }

    render() {
        const { close, open, selectedClaim, getPhicClaimsPayeeRequestPending, phicClaimPayees } = this.props;
        
        return (
            <StyleRoot>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={close}>

                    <div style={styles.titleContainer}>
                        <div>
                            <h1 style={styles.title}>Claim Status: {selectedClaim.claimStatusDescription}</h1>
                        </div>      
                        <div>
                            <IconButton>
                                <Close onTouchTap={close} />
                            </IconButton>
                        </div>
                    </div>
                    
                    { getPhicClaimsPayeeRequestPending
                        ? <LoadingIndicatorPerContainer />
                        : <WithChequeWithVoucherVouchering
                            phicClaimPayees={phicClaimPayees} />
                    }
                </Dialog>
            </StyleRoot>
        );
    }
}

export default WithChequeWithVoucherVoucheringContainer;
