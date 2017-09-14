import React from 'react';
import { browserHistory } from 'react-router';
import MouseTrap from 'mousetrap';
import Helmet from 'react-helmet';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

// *** dumb components 
import ClientsListItem from './list-item';
import SubheaderListItem from '../../../../shared-components/subheader-list-item';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import BasicDialog from '../../../../shared-components/basic-dialog';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles 
import animation from '../../../../util/styles/animation';
import colorPalette from '../../../../util/styles/color-pallete';


// *** menu items
const menuItemsOpts = [
    // 'All' value will be changed to prevent discrepancy to backend
    { primaryText: 'ALL', value: 10 },
    { primaryText: 'PHIC ECLAIMS FORM', value: 2 },
    { primaryText: 'PHIC ECLAIMS API', value: 3 },
    { primaryText: 'QMU TO HIS API', value: 4 },
    { primaryText: 'QMU TO EHR', value: 5 },
    { primaryText: 'QMU TO EHR PRIVATE', value: 6 }
];


const styles = {
    container: {

    },
    tableHeaderStyle: {
        backgroundColor: colorPalette.headerBgColor,

        address: {
            width: '30%'
        }
    },
    filtering: {
        cont: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50px'
        },
        text: {
            color: colorPalette.primaryTextColor,
            fontSize: '13px',
            textTransform: 'uppercase'
        }
    }
};

// *** product type
const productType = {
    PHICECLAIMS: 2,
    PHICAPI: 3,
    QMUAPIHIS: 4,
    QMUAPIEHR: 5,
    QMUAPIEHRPRIVATE: 6
};


// *** dialog options
const basicDialogOpts = {
    title: 'Do you want to remove',
    subtitle: 'This client will be permanently removed.',
    highlightTitle: null,
    open: false,
    closeDialog: null,
    actions: []
};

/**
 * ClientsList Component 
 * 
 * @class ClientsList
 * @extends {React.Component}
 */
@Radium
class ClientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClient: null,
            basicDialogOpts: basicDialogOpts,
            selectedProductType: [],
            tempListofClient: [],
            search: ''
        };
    }

    componentDidMount() {
        const { refreshClientsList, sortClients } = this.props;

        Mousetrap.bind(['n'], this.onAdd.bind(this));
        Mousetrap.bind(['r'], () => refreshClientsList());
        Mousetrap.bind(['s'], () => sortClients());

    }

    /**
     * Delete Client
     * 
     * @param {any} event
     * 
     * @memberOf ClientsList
     */
    onDeleteClient(event) {
        event.preventDefault();

        const { deleteClient } = this.props;

        deleteClient(
            this.state.selectedClient.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Open Client Dialog Delete
     * 
     * @param {any} client
     * 
     * @memberOf ClientsList
     */
    onOpenClientDialogDelete(client) {
        event.preventDefault();

        this.setState({
            selectedClient: client,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle: `${client.name}`,
                open: true,
                closeDialog: this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label: 'CANCEL',
                        action: this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label: 'REMOVE',
                        action: this.onDeleteClient.bind(this),
                        secondary: true
                    }
                ]
            }
        });
    }

    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf ClientsList
     */
    onCloseBasicDialog() {
        this.setState({
            selectedClient: null,
            basicDialogOpts: { ...basicDialogOpts, open: false }
        });
    }

    setSearch(search) {
        this.setState({
            search: search
        });
    }



    /**
     * Display List Of ClientsList
     * 
     * @returns
     * 
     * @memberOf ClientsList
     */
    onDisplayListOfClients() {
        const { clientsList, resendInvite, resendInviteRequestPending } = this.props;

        // filter by search
        if (this.state.search.length > 0) {
            return clientsList
                .filter(t => t.name && t.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                .map((client, index) => (
                    <ClientsListItem key={index}
                        client={client}
                        onOpenClientDialogDelete={this.onOpenClientDialogDelete.bind(this)}
                        resendInviteClient={resendInvite}
                        resendInviteRequestPending={resendInviteRequestPending} />
                ));
        }
        // display by default
        return clientsList.map((client, index) => (
            <ClientsListItem key={index}
                client={client}
                onOpenClientDialogDelete={this.onOpenClientDialogDelete.bind(this)}
                resendInviteClient={resendInvite}
                resendInviteRequestPending={resendInviteRequestPending} />)
        );
    }

    // construct an array of selected product ex: [0, 1, 2, 3]
    sortBySelectedProductType(index) {
        const { getClientByProductType } = this.props;

        this.setState({
            selectedProductType: [...this.state.selectedProductType, index]
        });

        let tempArray = this.state.selectedProductType;
        let tempIndex = tempArray.indexOf(index);
        if (index == 10) {
            tempArray = [0];
            this.setState({
                selectedProductType: tempArray
            });
        } else if (tempIndex == -1) {
            tempArray.push(index);
            this.setState({
                selectedProductType: tempArray
            });
        } else {
            tempArray.splice(tempIndex, 1);
            this.setState({
                selectedProductType: tempArray
            });
        }

        getClientByProductType(tempArray);
    }


    refreshClient() {
        const { refreshClientsList } = this.props;
        this.setState({
            selectedProductType: [0]
        });
        refreshClientsList();
    }

    /**
     * Render
     * 
     * @returns
     *  
     * @memberOf ClientsList
     */
    render() {
        const { clientsList, sortClients, refreshClientsListRequestPending, deleteClientsRequestPending, clientsListFilterRequestPending } = this.props;
        return (
            <StyleRoot>
                <Helmet title="Client List" />

                { /** SUB HEADER */}
                <SubheaderListItem
                    title="Clients"
                    itemCount={clientsList.length}
                    onAdd={this.onAdd}
                    onSortByName={sortClients}
                    onRefresh={this.refreshClient.bind(this)}
                    onSearchChange={this.setSearch.bind(this)}
                    menuItemsOpts={menuItemsOpts}
                    sortBySelectedProductType={this.sortBySelectedProductType.bind(this)}
                    selectedProductType={this.state.selectedProductType}
                />

                { /** REFRESH INDICATOR */
                    refreshClientsListRequestPending ?
                        <LoadingIndicatorPerContainer />
                        :
                        /** TABLES */
                        <div style={[styles.container, animation.fadeIn]}>

                            {clientsListFilterRequestPending ?
                                <div style={styles.filtering.cont}>
                                    <CircularProgress size={60} thickness={7} />
                                    <p style={styles.filtering.text}>Filtering by Product Type, Please wait ... </p>
                                </div>
                                :
                                <div style={animation.fadeIn}>
                                    <Table
                                        fixedHeader={true}
                                        height="calc(100vh - 328px)">
                                        <TableHeader
                                            style={styles.tableHeaderStyle}
                                            adjustForCheckbox={false}
                                            displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={{ width: '30%' }}>CLIENT NAME</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.tableHeaderStyle.address}>ADDRESS</TableHeaderColumn>
                                                <TableHeaderColumn style={{ width: '10%' }} >STATUS</TableHeaderColumn>
                                                <TableHeaderColumn style={{ width: '15%' }}>TOTAL PRODUCTS</TableHeaderColumn>
                                                <TableHeaderColumn style={{ width: '10%' }}>LAST UPDATED</TableHeaderColumn>
                                                <TableHeaderColumn style={{ width: '5%' }}> </TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            showRowHover={true}
                                            style={styles.TableBodyStyle}
                                            displayRowCheckbox={false}>
                                            {this.onDisplayListOfClients()}
                                        </TableBody>
                                    </Table>
                                </div>
                            }
                        </div>
                }

                { /** BASIC DIALOG */}
                <BasicDialog
                    basicDialogOpts={this.state.basicDialogOpts}
                    closeDialog={this.onCloseBasicDialog.bind(this)}
                    isPending={deleteClientsRequestPending}
                />

            </StyleRoot>
        );
    }

    onAdd() {
        browserHistory.push('/clients/new');
    }
}

// *** props
ClientsList.propTypes = {

};

export default ClientsList;
