import React from 'react';
import Radium, { StyleRoot, Style } from 'radium';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import PhicTransactionsEclaimsListItem from './list-item';
//import Subheader from './subheader';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import Empty from '../../../../shared-components/placeholders/empty';
import CustomLegend from '../../../../shared-components/custom-legend';

import Helmet from 'react-helmet';

// *** smart components
// import PhicTransmittalsNewContainer from '../../new/containers/new';
// import PhicTransmittalEditContainer from '../../edit/container/edit';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

const styles = {
    container: {
        height: 'calc(100vh - 328px)'
    },

    tableHeaderStyle : {
        backgroundColor: colorPalette.headerBgColor,
    },
    tableBodyStyle:{
        backgroundColor: '#fff'
    },
    tableHoverStyle : {
        'tbody > tr:hover > td > span' : {
            width : '13px !important',
        }
    }
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This Transmittal and its Claims will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

// *** legends
const legends = [
    {color: colorPalette.lightGreen, label:'IN PROCESS'},
    {color: colorPalette.pink, label:'RETURN'},
    {color: colorPalette.red, label:'DENIED'},
    {color: colorPalette.lightBrown, label:'WITH CHEQUE'},
    {color: colorPalette.skyBlue, label:'WITH VOUCHER'},
    {color: colorPalette.yellowOrange, label:'VOUCHERING'}
];

/**
 * Phic Transmittals Component
 * 
 * @class PhicTransmittalsList
 * @extends {React.Component}
 */
@Radium
class PhicTransactionsEclaimsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search : ''
        };

    }

    // /**
    //  * Delete Phic Transmittal
    //  * 
    //  * @param {any} transmittalId
    //  * @param {any} event
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onDeletePhicTransmittal(event) {
    //     event.preventDefault();
        
    //     const { deletePhicTransmittal } = this.props;

    //     deletePhicTransmittal(
    //         this.state.selectedTransmittal.id,
    //         this.onCloseBasicDialog.bind(this),
    //     );
    // }

    // /**
    //  * Open Phic Transmittal Dialog Delete
    //  * 
    //  * @param {any} transmittal
    //  * @param {any} event
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onOpenPhicTransmittalDialogDelete(transmittal, event) {
    //     event.preventDefault();        

    //     this.setState({
    //         selectedTransmittal : transmittal,
    //         basicDialogOpts: {
    //             ...basicDialogOpts,
    //             highlightTitle : `Transmittal No. ${transmittal.id}`,
    //             open : true,
    //             closeDialog : this.onCloseBasicDialog.bind(this),

    //             actions: [
    //                 {
    //                     label : 'CANCEL',
    //                     action : this.onCloseBasicDialog.bind(this),
    //                 },
    //                 {
    //                     label : 'REMOVE',
    //                     action : this.onDeletePhicTransmittal.bind(this), 
    //                     secondary : true
    //                 }
    //             ]
    //         }
    //     });
    // }

    // /**
    //  * Open new Phic Transmittal Dialog
    //  * @param {any} event
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onOpenPhicTransmittalDialogNew(event) {
    //     event.preventDefault();

    //     this.setState({ openPhicTransmittalNew : true });
    // }

    // /**
    //  * Close New Phic Transmittal Dialog
    //  * 
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onClosePhicTransmittalDialogNew() {
    //     this.setState({ openPhicTransmittalNew : false });
    // }

    //  /**
    //  * Edit Phic Transmittal
    //  * 
    //  * @param {any} transmittal
    //  * @param {any} event
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onOpenPhicTransmittalEditDialog(transmittal, event){
    //     event.preventDefault();
    //     this.setState({
    //         openPhicTransmittalEdit : true,
    //         selectedTransmittal : transmittal
    //     });

    // }

    // /**
    //  * Close Edit Phic Transmittal Dialog
    //  * 
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onClosePhicTransmittalEditDialog(){
    //     this.setState({ openPhicTransmittalEdit: false });
    // }

    // /**
    //  * Close Basic Dialog
    //  * 
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onCloseBasicDialog() {

    //     this.setState({ 
    //         selectedClientUser : null,
    //         basicDialogOpts: { ...basicDialogOpts, open: false } 
    //     });
    // }

    // /**
    //  * Display List Of Transmittals
    //  * 
    //  * @returns
    //  * 
    //  * @memberOf PhicTransmittalsList
    //  */
    // onDisplayListOfTransmittals() {
    //     const { transmittalsList } = this.props;

    //     return transmittalsList.map((t, i) => (
    //         <PhicTransmittalsListItem 
    //             key={i} 
    //             transmittal={t} 
    //             openPhicTransmittalDialogDelete={this.onOpenPhicTransmittalDialogDelete.bind(this)}
    //             openPhicTransmittalEditDialog={this.onOpenPhicTransmittalEditDialog.bind(this)}
    //         />
    //     ));
    // }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsList
     */
    render() {
        const {selectedFacility, phicTransactionsEclaimsList, getPhicTransactionsEclaims, getPhicTransactionsEclaimsRequestPending} = this.props;

        return (
            <StyleRoot>
                <Style scopeSelector=".tbl-phic-transactions" rules={styles.tableHoverStyle}/>
                <Helmet title="Transactions" />

                { /** SUB HEADER */ }
                { /** TODO: Refactor to cater other transaction type. */ }
                {/*<Subheader 
                    selectedFacility={selectedFacility}
                    phicTransactionsEclaimsList={phicTransactionsEclaimsList}
                    getPhicTransactionsEclaims={getPhicTransactionsEclaims}
                    selectedFacility={selectedFacility}
                />*/}
                            
                { getPhicTransactionsEclaimsRequestPending 
                    ? <LoadingIndicatorPerContainer />
                    :
                    //*** TABLE*/}
                    <div style={[styles.container, animation.fadeIn]}>
                        <div>
                            { phicTransactionsEclaimsList.length == 0
                                ? 
                                <Empty
                                    title="No Transaction Found"
                                    subtitle="please try other filter option" />
                                :
                                <Table
                                    className="tbl-phic-transactions"
                                    fixedHeader={true}
                                    height="calc(100vh - 378px)"
                                    style={styles.tableHeaderStyle}>
                                    <TableHeader
                                        adjustForCheckbox={false}
                                        displaySelectAll={false}>

                                        <TableRow>
                                            <TableHeaderColumn style={{width: '10%'}}>TRANSMITTAL NO.</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '10%'}}>TRANSMITTED ON</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '10%'}}>E-TICKET</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '15%'}}>CLAIM SERIES LHIO</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '15%'}}>CLAIM TYPE</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '15%', position: 'relative'}}>
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                     CLAIM STATUS
                                                    <CustomLegend legends={legends}  />
                                                </div>
                                            </TableHeaderColumn>

                                            <TableHeaderColumn style={{width: '15%'}}>PATIENT</TableHeaderColumn>
                                            <TableHeaderColumn style={{width: '10%'}}></TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody 
                                        showRowHover={true}
                                        style={styles.tableBodyStyle}
                                        displayRowCheckbox={false}>
                                        
                                        { this.onDisplayListItem() }
                                            
                                    </TableBody>
                                    
                                </Table>
                            }
                            
                        </div>
                        
                    </div>
                }
  
            </StyleRoot>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            search : nextProps.search
        });
    }
    onDisplayListItem() {
        const { phicTransactionsEclaimsList } = this.props;        

        if(this.state.search)
        {
            if (this.state.search.length > 0) {
                return phicTransactionsEclaimsList.filter(t => t.transmittalNumber && t.transmittalNumber.indexOf(this.state.search) > -1 || t.patientFullname.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                    .map((t, i) => 
                    (<PhicTransactionsEclaimsListItem key={i} transaction={t}  /> ));                
            }          
        }

        return phicTransactionsEclaimsList.map((t, i) =>
            (<PhicTransactionsEclaimsListItem key={i} transaction={t}  /> )
        );          
    }
}
export default PhicTransactionsEclaimsList;
