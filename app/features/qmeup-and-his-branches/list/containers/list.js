import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import QmuAndHisBranchesList from '../components/list';

import Dialog from 'material-ui/Dialog';

const styles = {
    container: {
        width: '100%'
    },
    headerCont : {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    customContentStyle: {
        width: '1000px',
        maxWidth: 'none' 
    }
};


@connect(
    state => state.qmuAndHisBranchesListReducer,
    dispatch => ({ actions: bindActionCreators(duck, dispatch) }) 
)

@Radium
class QmuAndHisBranchesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { open, close, openBranchesMapping, qmuForHis, ProductsBasicDialogPending,
                selectedClient , productsList, clientId, viewMode, 
                actions: { getListOfFacilities, deleteQMUtoHISApi, editClientSecret } } = this.props;
        return(
            <StyleRoot style={styles.container}>
                <Dialog
                    open={open}
                    modal={false}
                    contentStyle={styles.customContentStyle}
                >
                    <QmuAndHisBranchesList 
                        open={open}
                        close={close}
                        openBranchesMapping={openBranchesMapping}
                        getListOfFacilities={getListOfFacilities}
                        productHis={qmuForHis}                        
                        selectedClient={selectedClient}
                        productsList={productsList}
                        clientId={clientId}
                        deleteQMUtoHISApi={deleteQMUtoHISApi}
                        editClientSecret={editClientSecret}
                        viewMode={viewMode}
                        ProductsBasicDialogPending={ProductsBasicDialogPending}
                    />

                </Dialog>              
            </StyleRoot>

        );
    }

}

export default QmuAndHisBranchesContainer;
