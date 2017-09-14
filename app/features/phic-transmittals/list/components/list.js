import React, { PropTypes } from 'react';
import Radium, { StyleRoot, Style } from 'radium';
import MouseTrap from 'mousetrap';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import PhicTransmittalsListItem from './list-item';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import Subheader from './subheader';
import BasicDialog from '../../../../shared-components/basic-dialog';
import CustomLegend from '../../../../shared-components/custom-legend';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty';
import PhicTransmittalIssues from '../../../phic-transmittals-issues';

// *** smart components
import PhicTransmittalsNewContainer from '../../new/containers/new';
import PhicTransmittalEditContainer from '../../edit/container/edit';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

const styles = {
    container: {

    },

    tableHeaderStyle: {
        backgroundColor: colorPalette.headerBgColor
    },
    tableHoverStyle : {
        'tbody > tr:hover > td > span' : {
            width : '13px !important'
        }
    }
};

// *** dialog options
const basicDialogOpts = {
    title: 'Do you want to remove',
    subtitle: 'This Transmittal and its Claims will be permanently removed.',
    highlightTitle: null,
    open: false,
    closeDialog: null,
    actions: []
};

/**
 * Phic Transmittals Component
 * 
 * @class PhicTransmittalsList
 * @extends {React.Component}
 */
@Radium
class PhicTransmittalsList extends React.Component {

    

    constructor(props) {
        super(props);

        let fakeDatatransmittalsList = [{
            accreditationNumber:"H91004604",
            createdBy:"gstarr",
            createdById:17,
            dateCreated:"2017-07-20T23:58:02.43",
            dateUpdated:"2017-07-20T23:58:04.05",
            eTicketNumber:null,
            hospitalCode:"262729",
            id:625,
            phicPackage:0,
            phicPackageDescription:"REGULAR",
            phichciType:1,
            phichciTypeDescription:"LEVEL 1",
            remarks:null,
            totalClaims:0,
            transmissionControlNumber:null,
            transmittalClaims:[],
            transmittalIssueTotal:0,
            transmittalNumber:"170721000625",
            transmittalStatus:0,
            transmittalStatusDescription:"DRAFT",
            transmittedBy:null,
            transmittedById:0,
            transmittedDateTime:null,
            updatedBy:"gstarr",
            updatedById:17,
            version:1
        }]

        this.state = {
            selectedTransmittal: null,
            basicDialogOpts: basicDialogOpts,
            openPhicTransmittalEdit: false,
            openPhicTransmittalNew: false,
            openTransmittalsIssues: false,
//fakeDataTama   transmittalsList: props.transmittalsList,
            transmittalsList:fakeDatatransmittalsList,
            sorted: true,
            search : '',
        };
    }
    

    /**
     * Component Did Mount
     * 
     * 
     * @memberOf PhicTransmittalsList
     */
    componentDidMount() {
        MouseTrap.bind(['n'], this.onOpenPhicTransmittalDialogNew.bind(this));
        MouseTrap.bind(['s'], () => this.onSortTransmittalListNumber());
    }


    /**
     * Delete Phic Transmittal
     * 
     * @param {any} transmittalId
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsList
     */
    onDeletePhicTransmittal(event) {
        event.preventDefault();

        const { deletePhicTransmittal } = this.props;

        deletePhicTransmittal(
            this.state.selectedTransmittal.id,
            this.onCloseBasicDialog.bind(this),
        );
    }

    /**
     * Verify Claim Status
     * 
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsList
     */
    onVerifyClaimStatus(event) {
        event.preventDefault();

        const { verifyClaimStatus } = this.props;

        verifyClaimStatus(
            this.state.selectedTransmittal,
            this.onCloseBasicDialog.bind(this),
        );
    }

    /**
     * Set To Complete
     * 
     * @param {any} event 
     * 
     * @memberOf PhicTransmittalsList
     */
    onSetToComplete(event) {
        event.preventDefault();

        const { setToComplete } = this.props;

        setToComplete(
            this.state.selectedTransmittal.id,
            this.state.selectedTransmittal.transmittalNumber,
            this.onCloseBasicDialog.bind(this),
        );
    }

    /**
     * Open Phic Transmittal Dialog Delete
     * 
     * @param {any} transmittal
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsList
     */
    onOpenPhicTransmittalDialogDelete(transmittal, event) {
        event.preventDefault();

        this.setState({
            selectedTransmittal: transmittal,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle: `Transmittal No. ${transmittal.transmittalNumber}`,
                open: true,
                closeDialog: this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label: 'CANCEL',
                        action: this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label: 'REMOVE',
                        action: this.onDeletePhicTransmittal.bind(this),
                        secondary: true
                    }
                ]
            }
        });
    }

    /**
     * Open Verify Claim Status
     * 
     * @param {any} transmittal
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsList
     */
    onOpenDialogVerifyClaimStatus(transmittal, event) {
        event.preventDefault();

        this.setState({
            selectedTransmittal: transmittal,
            basicDialogOpts: {
                ...basicDialogOpts,
                title: 'Verify all claim status for',
                highlightTitle: `Transmittal No. ${transmittal.transmittalNumber}`,
                subtitle: null,
                open: true,
                closeDialog: this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label: 'CANCEL',
                        action: this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label: 'PROCEED',
                        action: this.onVerifyClaimStatus.bind(this),
                        secondary: true
                    }
                ]
            }
        });
    }

    /**
     * Set To Complete
     * 
     * @param {any} event
     * @param {any} transmittal
     * 
     * @memberOf PhicTransmittalsList
     */
    onOpenDialogSetToComplete(transmittal, event) {
        event.preventDefault();

        this.setState({
            selectedTransmittal: transmittal,
            basicDialogOpts: {
                ...basicDialogOpts,
                title: 'Set to complete',
                highlightTitle: `Transmittal No. ${transmittal.transmittalNumber}`,
                subtitle: null,
                open: true,
                closeDialog: this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label: 'CANCEL',
                        action: this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label: 'PROCEED',
                        action: this.onSetToComplete.bind(this),
                        secondary: true
                    }
                ]
            }
        });
    }

    /**
     * Open new Phic Transmittal Dialog
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsList
     */
    onOpenPhicTransmittalDialogNew(event) {
        event.preventDefault();

        this.setState({ openPhicTransmittalNew: true });
    }

    /**
     * Close New Phic Transmittal Dialog
     * 
     * 
     * @memberOf PhicTransmittalsList
     */
    onClosePhicTransmittalDialogNew() {
        this.setState({ openPhicTransmittalNew: false });
    }

    /**
    * Edit Phic Transmittal
    * 
    * @param {any} transmittal
    * @param {any} event
    * 
    * @memberOf PhicTransmittalsList
    */
    onOpenPhicTransmittalEditDialog(transmittal, event) {
        event.preventDefault();
        this.setState({
            openPhicTransmittalEdit: true,
            selectedTransmittal: transmittal
        });

    }

    /**
     * Close Edit Phic Transmittal Dialog
     * 
     * 
     * @memberOf PhicTransmittalsList
     */
    onClosePhicTransmittalEditDialog() {
        this.setState({ openPhicTransmittalEdit: false });
    }

    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf PhicTransmittalsList
     */
    onCloseBasicDialog() {

        this.setState({
            selectedClientUser: null,
            basicDialogOpts: { ...basicDialogOpts, open: false }
        });
    }

    /**
     * Open Transmittal Issue Dialog
     * 
     * @param {any} transmittal
     * @param {any} event
     * 
     * @memberOf PhicTransmittalsList
     */
    onOpenTransmittalsIssuesDialog(transmittal, event) {
        event.preventDefault();

        this.setState({ 
            openTransmittalsIssues : true, 
            selectedTransmittal : transmittal 
        });
    }
    
    /**
     * Close Transmittal Issue Dialog
     * 
     * 
     * @memberOf PhicTransmittalsList
     */
    onCloseTransmittalsIssuesDialog() {
        this.setState({ 
            openTransmittalsIssues : false, 
            selectedTransmittal : null 
        });
    }

    /**
     * Sort Transmittal List By Number
     * 
     * 
     * @memberOf PhicTransmittalsList
     */
    onSortTransmittalListNumber() {
        if(this.state.sorted) 
        {
            const sortedList = this.state.transmittalsList
                .sort((a, b) =>  a.transmittalNumber - b.transmittalNumber);   

            this.setState({ transmittalsList : sortedList, sorted: false });
        }
        else 
        {
            const sortedList = this.state.transmittalsList
                .sort((a, b) =>  b.transmittalNumber - a.transmittalNumber);  

            this.setState({ transmittalsList : sortedList, sorted: true });            
        }
    }

    /**
     * Display List Of Transmittals
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsList
     */
    onDisplayListOfTransmittals() {
        const { submitPhicTransmittal, currentUser, getPHICTransmittalStatusById } = this.props;      

        const listItems = (t, i) => (
            <PhicTransmittalsListItem
                key={i}
                transmittal={t}
                submitPhicTransmittal={submitPhicTransmittal}
                openPhicTransmittalDialogDelete={this.onOpenPhicTransmittalDialogDelete.bind(this)}
                openPhicTransmittalEditDialog={this.onOpenPhicTransmittalEditDialog.bind(this)}
                openTransmittalsIssuesDialog={this.onOpenTransmittalsIssuesDialog.bind(this)}
                openDialogVerifyClaimStatus={this.onOpenDialogVerifyClaimStatus.bind(this)}
                openDialogSetToComplete={this.onOpenDialogSetToComplete.bind(this)}
                currentUser={currentUser}
                getPHICTransmittalStatusById={getPHICTransmittalStatusById}
            />
        );

        if(this.state.search.length > 0) {
            return this.state.transmittalsList
                .filter(t => t.transmittalNumber && t.transmittalNumber.indexOf(this.state.search) > -1)
                .map(listItems);
        }

        return this.state.transmittalsList.map(listItems);
    }

    /**
     * Search
     * 
     * @param {any} value 
     * 
     * @memberOf PhicTransmittalsList
     */
    onSearch(value) {
        this.setState({ search: value });
    }

    /**
     * Component Will Receive Props
     * 
     * @param {any} nextProps
     * 
     * @memberOf PhicTransmittalsList
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ transmittalsList : nextProps.transmittalsList });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsList
     */
    render() {
        const {
            defaultFilter,
            transmittalsList,
            selectedFacility,
            newPhicTransmittal,
            newPHICTransmittalOfflineMode,
            addUploadingFiles,
            uploadingFiles,
            refreshPhicTransmittals,
            basicDialogRequestPending,
            refreshPhicTransmittalsRequestPending } = this.props;

        const legends = [
            {color: colorPalette.gray,label: 'DRAFT'},
            {color: colorPalette.greenYellow,label: 'TRANSMITTING'},
            {color: colorPalette.orange,label: 'TRANSMITTED'},
            {color: colorPalette.darkRed,label: 'TRANSMIT ERROR'},
            {color: colorPalette.green,label: 'COMPLETE'}
        ];

        return (
            <StyleRoot>
                <Style scopeSelector=".tbl-phic-transmittals" rules={styles.tableHoverStyle}/>
                { /** SUB HEADER */}
                <Subheader
                    defaultFilter={defaultFilter}
                    itemCount={transmittalsList.length}
                    selectedFacility={selectedFacility}
                    newPhicTransmittal={newPhicTransmittal}
                    newPHICTransmittalOfflineMode={newPHICTransmittalOfflineMode}
                    addUploadingFiles={addUploadingFiles}
                    uploadingFiles={uploadingFiles}
                    refreshPhicTransmittals={refreshPhicTransmittals}
                    sortTransmittalListNumber={this.onSortTransmittalListNumber.bind(this)}
                    openPhicTransmittalDialogNew={this.onOpenPhicTransmittalDialogNew.bind(this)}
                    searchChange={this.onSearch.bind(this)}
                />

                { /** LOADING INDICATOR */}
                {refreshPhicTransmittalsRequestPending ?
                    <LoadingIndicatorPerContainer />
                    :

                    // *** EMPTY LIST PLACEHOLDER
                    this.state.transmittalsList.length <= 0 ?
                        <EmptyPlaceholder
                            title="No Transmittal record found"
                            subtitle="click the ' + ' button to add."
                        />
                        :

                        // *** TABLE
                        <div style={[styles.container, animation.fadeIn]}>
                            <Table
                                fixedHeader={true}
                                height="calc(100vh - 328px)"
                                className="tbl-phic-transmittals">

                                <TableHeader
                                    style={styles.tableHeaderStyle}
                                    adjustForCheckbox={false}
                                    displaySelectAll={false}>

                                    <TableRow>
                                        <TableHeaderColumn>TRANSMITTAL NO.</TableHeaderColumn>
                                        <TableHeaderColumn>ETICKET NO.</TableHeaderColumn>
                                        <TableHeaderColumn>PACKAGE</TableHeaderColumn>
                                        <TableHeaderColumn style={{position: 'relative', display: 'flex', alignItems:'center'}}>
                                            STATUS 
                                            <CustomLegend legends={legends}/>
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>TRANSMITTED ON</TableHeaderColumn>
                                        <TableHeaderColumn>TOTAL CLAIMS</TableHeaderColumn>
                                        {/*<TableHeaderColumn>REMARKS</TableHeaderColumn>*/}
                                        <TableHeaderColumn>CREATED ON</TableHeaderColumn>
                                        <TableHeaderColumn>LAST UPDATED</TableHeaderColumn>
                                        <TableHeaderColumn> </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>

                                <TableBody
                                    showRowHover={true}
                                    style={styles.tableBodyStyle}
                                    displayRowCheckbox={false}>

                                    {this.onDisplayListOfTransmittals()}
                                </TableBody>

                            </Table>
                        </div>
                }

                { /** BASIC DIALOG */}
                <BasicDialog
                    basicDialogOpts={this.state.basicDialogOpts}
                    closeDialog={this.onCloseBasicDialog.bind(this)}
                    isPending={basicDialogRequestPending}
                />

                { /** NEW TRANSMITTAL DIALOG */}
                <PhicTransmittalsNewContainer
                    open={this.state.openPhicTransmittalNew}
                    selectedFacility={selectedFacility}
                    closeDialog={this.onClosePhicTransmittalDialogNew.bind(this)}
                />

                { /** EDIT TRANSMITTAL DIALOG */}
                <PhicTransmittalEditContainer
                    open={this.state.openPhicTransmittalEdit}
                    selectedTransmittal={this.state.selectedTransmittal}
                    closeDialog={this.onClosePhicTransmittalEditDialog.bind(this)}
                />

                 {/***PHIC TRANSMITTAL ISSUE DIALOG */}
                <PhicTransmittalIssues 
                    open={this.state.openTransmittalsIssues}
                    selectedTransmittal={this.state.selectedTransmittal}
                    closeDialog={this.onCloseTransmittalsIssuesDialog.bind(this)}
                /> 
            </StyleRoot>
        );
    }
}

// *** props
PhicTransmittalsList.propTypes = {
    deletePhicTransmittal: PropTypes.func.isRequired,
    refreshPhicTransmittals: PropTypes.func.isRequired,
    selectedFacility: PropTypes.object.isRequired,
    submitPhicTransmittal: PropTypes.func.isRequired,
    verifyClaimStatus:  PropTypes.func.isRequired,
};

export default PhicTransmittalsList;
