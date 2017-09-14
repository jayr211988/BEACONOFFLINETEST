import React, { PropTypes } from 'react';
import Radium, { StyleRoot, Style } from 'radium';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import PhicClaimsListItem from './list-item';
import SubHeader from './subheader';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import BasicDialog from '../../../../shared-components/basic-dialog';
import EmptyPlaceholder from '../../../../shared-components/placeholders/empty';
import CustomLegend from '../../../../shared-components/custom-legend';

import PhicClaimsIssues from '../../../phic-claims-issues';
import PhicClaimsTransferClaim from '../../../phic-claims-transfer-claim';
import NewRequiredDocumentsContainer from '../../new-required-documents/containers/new-required-documents';
// import WithChequeWithVoucherVoucheringContainer from '../../with-cheque-with-voucher-vouchering/containers/with-cheque-with-voucher-vouchering';
import WithChequeWithVoucherVoucheringContainer from '../../with-check-with-voucher-vouchering/containers/with-cheque-with-voucher-vouchering';
import DeniedClaimsContainer from '../../denied-claims/denied-claims';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';
import { transmittalStatus } from '../../../../util/data'; 

const styles = {

    container: {
        
    },
    tableHeaderStyle : {
        backgroundColor: colorPalette.headerBgColor
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
    subtitle : 'This Claims will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

/**
 * PHIC Claims List Component
 * 
 * @class PhicClaimsList
 * @extends {React.Component}
 */
@Radium
class PhicClaimsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedClaim : null,
            basicDialogOpts : basicDialogOpts,
            openClaimsIssues: false,
            openNewDocumentDialog: false,
            openWithChequeWithVoucherVoucheringDialog: false,
            onOpenDeniedClaimDialog: false,
            onOpenTransferDialog: false
        };
    }

    /**
     * Delete Phic Claim
     * 
     * @param {any} event
     * 
     * @memberOf PhicClaimsList
     */
    onDeletePhicClaim(event) {
        event.preventDefault();

        const { deletePhicClaim } = this.props;

        deletePhicClaim(
            this.state.selectedClaim.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Open Phic Dialog Delete
     * 
     * @param {any} claim
     * @param {any} event
     * 
     * @memberOf PhicClaimsList
     */
    onOpenPhicDialogDelete(claim, event) {
        event.preventDefault();

        this.setState({
            selectedClaim : claim,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `Claim No. ${claim.id}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeletePhicClaim.bind(this), 
                        secondary : true
                    }
                ]
            }            
        });
    }

    /**
     * Display List Of Claims
     * 
     * @returns
     * 
     * @memberOf ViewClaims
     */
    onDisplayListOfClaims() {
        const { claimsList, params, selectedTransmittal} = this.props;

        let fakeClaimList = [{
            claimIssuesTotal:1,
            claimSeriesLhio:null,
            claimStatus:0,
            claimStatusDescription:"MEMBER NOT VALID",
            createdBy:"gstarr",
            createdById:17,
            dateCreated:"2017-07-12T05:23:05.837",
            dateUpdated:"2017-07-12T05:23:05.837",
            deniedReasons:null,
            id:620,
            isFinal:false,
            phicPackage:3,
            phicPackageDescription:"NEWBORN CARE",
            phiccF1:{
                admissionDate:"2017-07-11T16:00:00",
                createdBy:"gstarr",
                createdById:17,
                dateCreated:"2017-07-12T05:23:05.837",
                dateUpdated:"2017-07-12T05:23:05.837",
                dischargeDate:"2017-07-11T16:00:00",
                eligibilityDocuments:null,
                eligibilityIsNHTS:null,
                eligibilityIsOk:null,
                eligibilityRemainingDays:null,
                eligibilityTrackingNumber:null,
                eligibilityWith3Over6:null,
                eligibilityWith9Over12:null,
                eligibleAsOf:null,
                id:620,
                memberBirthday:"2017-07-05T16:00:00",
                memberEmail:"4",
                memberEmployerName:null,
                memberFirstname:"Wag",
                memberFullname:"Wag N/A Test",
                memberGender:"M",
                memberGenderName:"Male",
                memberLandLineNumber:"4",
                memberLastname:"Test",
                memberMailingAddress:"44",
                memberMiddlename:"N/A",
                memberMobileNumber:"4",
                memberPEN:null,
                memberPin:"",
                memberSuffix:"",
                memberTypeCode:"PS",
                memberTypeValue:"Non Paying Private",
                memberZipCode:"4",
                patientBirthday:"2017-07-05T16:00:00",
                patientFirstname:"Wag",
                patientFullname:"Wag N/A Test",
                patientGender:"M",
                patientGenderName:"Male",
                patientIsCode:"M",
                patientIsValue:"Member",
                patientLastname:"Test",
                patientMiddlename:"N/A",
                patientPin:"",
                patientSuffix:"",
                pbefToken:"0517477c47628970348c39e0476d09e7",
                updatedBy:null,
                updatedById:0,
                validEmployer:null,
                version:0
            },
            phiccF2:null,
            returnDeficiencies:null,
            updatedBy:null,
            updatedById:0,
            version:0,
        }]

        return fakeClaimList.map((t, i) => (
            <PhicClaimsListItem 
                key={i} 
                claim={t} 
                openPhicDialogDelete={this.onOpenPhicDialogDelete.bind(this)}
                openClaimsIssuesDialog={this.onOpenClaimsIssuesDialog.bind(this)}
                params={params}         
                isSubmitting={selectedTransmittal.transmittalStatus == transmittalStatus.transmitted ? true : false}
                selectedTransmittal={selectedTransmittal}
                onOpenNewDocumentDialog={this.onOpenNewDocumentDialog.bind(this)}
                onOpenWithChequeWithVoucherVoucheringDialog={this.onOpenWithChequeWithVoucherVoucheringDialog.bind(this)}
                onOpenDeniedClaimDialog={this.onOpenDeniedClaimDialog.bind(this)}
                onOpenTransferDialog={this.onOpenTransferDialog.bind(this)}
            />
        ));        
    }
    
    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf PhicClaimsList
     */
    onCloseBasicDialog() {

        this.setState({ 
            selectedClaim : null,
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    onOpenClaimsIssuesDialog(claim) {
        this.setState({ openClaimsIssues : true, selectedClaim : claim });
    }
    onCloseClaimsIssuesDialog() {
        this.setState({ openClaimsIssues : false, selectedClaim : null });
    } 

    onOpenNewDocumentDialog(selectedClaim) {
        this.setState({
            openNewDocumentDialog: true,
            selectedClaim: selectedClaim
        });
    }

    onCloseNewDocumentDialog() {
        this.setState({
            openNewDocumentDialog: false,
            selectedClaim: null
        });
    }

    onOpenWithChequeWithVoucherVoucheringDialog(selectedClaim) {
        this.setState({
            openWithChequeWithVoucherVoucheringDialog: true,
            selectedClaim: selectedClaim
        });
    }

    onCloseWithChequeWithVoucherVoucheringDialog() {
        this.setState({
            openWithChequeWithVoucherVoucheringDialog: false,
            selectedClaim: null
        });
    }

    onOpenDeniedClaimDialog(selectedClaim) {
        this.setState({
            onOpenDeniedClaimDialog: true,
            selectedClaim: selectedClaim
        });
    }

    onCloseDeniedClaimDialog() {
        this.setState({
            onOpenDeniedClaimDialog: false,
            selectedClaim: null
        });
    }

    onOpenTransferDialog(selectedClaim) {
        this.setState({
            onOpenTransferDialog: true,
            selectedClaim: selectedClaim
        });
    }

    onCloseTransferDialog() {
        this.setState({
            onOpenTransferDialog: false,
            selectedClaim: null
        });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ViewClaims
     */
    render() {
        const { 
            claimsList, 
            selectedTransmittal,            
            refreshPhicClaimsList,
            selectedFacility,
            sortPhicClaimsList,
            deletePhicClaimRequestPending,
            refreshPhicClaimsListRequestPending,
            resetPatientInfoandMemberPin,
            uploadingFiles,
            addUploadingFiles,
            newPHICTransmittalOfflineMode
    } = this.props;
            
        const legends = [{color: colorPalette.lightGray, label:'MEMBER NOT VALID'},
            {color: colorPalette.lightBlue, label:'MEMBER VALID'},
            {color: colorPalette.yellow, label:'ELIGIBLE'},
            {color: colorPalette.black, label:'NOT ELIGIBLE'},
            {color: colorPalette.violet, label: 'CONDITIONAL'},
            {color: colorPalette.lightGreen, label:'IN PROCESS'},
            {color: colorPalette.pink, label:'RETURN'},
            {color: colorPalette.red, label:'DENIED'},
            {color: colorPalette.lightBrown, label:'WITH CHEQUE'},
            {color: colorPalette.skyBlue, label:'WITH VOUCHER'},
            {color: colorPalette.yellowOrange, label:'VOUCHERING'}];

        return (
            <StyleRoot>
                <Style scopeSelector=".tbl-phic-claims" rules={styles.tableHoverStyle}/>

                { /** SUB HEADER */ }
                <SubHeader 
                    itemCount={claimsList.length} 
                    selectedTransmittal={selectedTransmittal}                    
                    refreshPhicClaimsList={refreshPhicClaimsList}
                    sortPhicClaimsList={sortPhicClaimsList}
                    resetPatientInfoandMemberPin={resetPatientInfoandMemberPin}
                    addUploadingFiles={addUploadingFiles}
                    uploadingFiles={uploadingFiles}
                    newPHICTransmittalOfflineMode={newPHICTransmittalOfflineMode}
                />

                { /** LOADING INDICATOR */ }
                { refreshPhicClaimsListRequestPending ? 
                    <LoadingIndicatorPerContainer />
                :

                // *** EMPTY PLACEHOLDER
                claimsList.length <= 0 ? 
                    <EmptyPlaceholder 
                        title="No Claim record found"
                        subtitle="click the ' + ' button to add."
                    />
                :

                // *** TABLE
                <div style={[styles.container, animation.fadeIn]}>
                    <Table        
                        className="tbl-phic-claims" 
                        fixedHeader={true}
                        height="calc(100vh - 356px)">
                        
                        <TableHeader
                            style={styles.tableHeaderStyle}
                            adjustForCheckbox={false}
                            displaySelectAll={false}>

                            <TableRow style={styles.tableHeaderStyle}>
                                <TableHeaderColumn style={{width: '10%'}}>CLAIM NO.</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '15%', position: 'relative'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        STATUS
                                        <CustomLegend legends={legends}  />
                                    </div>
                                </TableHeaderColumn>
                                <TableHeaderColumn style={{width: '15%'}}>SERIES LHIO</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '20%'}}>MEMBER</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '20%'}}>PATIENT</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '15%'}}>1ST CASE RATE</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '15%'}}>2ND CASE RATE</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '70px'}}>LAST UPDATED</TableHeaderColumn>
                                <TableHeaderColumn style={{width: '10%'}}> </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody
                            showRowHover={true}
                            style={styles.tableBodyStyle}
                            displayRowCheckbox={false}>

                            { this.onDisplayListOfClaims() }
                        </TableBody>
                    </Table>
                </div>
                }

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ deletePhicClaimRequestPending }
                />          

                <PhicClaimsIssues 
                    open={this.state.openClaimsIssues}
                    selectedClaim={this.state.selectedClaim}
                    closeDialog={this.onCloseClaimsIssuesDialog.bind(this)}
                />           
                
                { this.state.selectedClaim
                    ?
                    <NewRequiredDocumentsContainer
                        selectedClaim={this.state.selectedClaim}
                        open={this.state.openNewDocumentDialog}
                        close={this.onCloseNewDocumentDialog.bind(this)}
                        selectedTransmittal={selectedTransmittal} />
                    : null
                }

                { this.state.openWithChequeWithVoucherVoucheringDialog
                    ?
                    <WithChequeWithVoucherVoucheringContainer
                        selectedClaim={this.state.selectedClaim}
                        open={this.state.openWithChequeWithVoucherVoucheringDialog}
                        close={this.onCloseWithChequeWithVoucherVoucheringDialog.bind(this)} />
                    : null
                }

                { this.state.onOpenDeniedClaimDialog
                    ?
                    <DeniedClaimsContainer
                        selectedClaim={this.state.selectedClaim}
                        open={this.state.onOpenDeniedClaimDialog}
                        close={this.onCloseDeniedClaimDialog.bind(this)} />
                    : null
                }


                <PhicClaimsTransferClaim
                    //availableTransmittalsToTransfer={availableTransmittalsToTransfer}
                    selectedFacility={selectedFacility}
                    selectedTransmittal={selectedTransmittal}
                    selectedClaim={this.state.selectedClaim}
                    open={this.state.onOpenTransferDialog}
                    closeDialog={this.onCloseTransferDialog.bind(this)} 
                />
            </StyleRoot>
        );
    }
}

// *** props
PhicClaimsList.propTypes = {
    refreshPhicClaimsList : PropTypes.func.isRequired,
    selectedTransmittal : PropTypes.object.isRequired,
    sortPhicClaimsList : PropTypes.func.isRequired,
    deletePhicClaim : PropTypes.func.isRequired
};

export default PhicClaimsList;
