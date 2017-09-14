import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

// *** material-ui icons
import AddIcon from 'material-ui/svg-icons/content/add';

// *** dumb components
import Cf2DoctorsListItem from './list-item';
import BasicDialog from '../../../../../shared-components/basic-dialog';

// *** smart components
import Cf2DoctorsNewContainer from '../../new/containers/new';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    container: {
        padding: '40px 0'
    },

    titleWrapper: {
        display: 'flex',
        alignItems: 'center',

        title: {
            color: colorPalette.primaryColor,
            fontSize : '14px',
            width: '160px',
            fontWeight: 600
        },
    },

    flatButtonStyles: {
        backgroundColor: colorPalette.lightBgColor,
        width: '100px'
    }  
};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This Doctor will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

/**
 * PHIC Claims CF2 Doctors List Component
 * 
 * @class Cf2DoctorsList
 * @extends {React.Component}
 */
@Radium
class Cf2DoctorsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDoctor : null,
            openCf2DoctorsNew : false,
            basicDialogOpts : basicDialogOpts
        };
    }

    /**
     * Delete Phic Claims Details Doctors
     * 
     * @param {any} event
     * 
     * @memberOf Cf2DoctorsList
     */
    onDeletePhicClaimsDetailsCf2Doctor(event) {
        event.preventDefault();

        const { deletePhicClaimsDetailsCf2Doctor, selectedClaim } = this.props;

        deletePhicClaimsDetailsCf2Doctor(
            this.state.selectedDoctor,
            selectedClaim.id,
            this.onCloseBasicDialog.bind(this)
        );
    }

    /**
     * Open CF2 Doctors New Dialog
     * 
     * @param {any} event
     * @param {any} doctor
     * 
     * @memberOf Cf2DoctorsList
     */
    onOpenCf2DoctorsNewDialog(event, doctor) {
        event.preventDefault();

        this.setState({ 
            openCf2DoctorsNew: true,  
            selectedDoctor : doctor
        });
    }

    /**
     * Saving CF2 Doctors New Dialog
     * 
     * 
     * @memberOf Cf2DoctorsList
     */
    onCloseCf2DoctorsNewDialog() {
        this.setState({ 
            openCf2DoctorsNew: true,  
            selectedDoctor : null
        });
    }

    /**
     * 
     * Close CF2 Doctors New Dialog
     * 
     * @memberOf Cf2DoctorsList
     */
    onClosingDoctorsNewDialog() {
        this.setState({
            openCf2DoctorsNew : false,
            selectedDoctor : null
        });
    }

    /**
     * Open Phic Dialog Delete
     * 
     * @param {any} claim
     * @param {any} event
     * 
     * @memberOf PhicClaimsList
     */
    onOpenCf2DoctorsDeleteDialog(doctor, event) {
        event.preventDefault();

        this.setState({
            selectedDoctor : doctor,
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `Doctor ${doctor.fullname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeletePhicClaimsDetailsCf2Doctor.bind(this), 
                        secondary : true
                    }
                ]
            }            
        });
    }

    /**
     * Display List Of Doctors
     * 
     * @returns
     * 
     * @memberOf Cf2DoctorsList
     */
    onDisplayListOfDoctors() {
        const { doctorsList, editPhicClaimDetailCf2RequestPending, summaryMode } = this.props;

        return doctorsList.map((doctor, index) => (
            <Cf2DoctorsListItem 
                key={index} 
                doctor={doctor} 
                openCf2DoctorsDeleteDialog={this.onOpenCf2DoctorsDeleteDialog.bind(this)}
                editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                summaryMode={summaryMode}
            />
        ));        
    }
    
    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf Cf2DoctorsList
     */
    onCloseBasicDialog() {

        this.setState({ 
            basicDialogOpts: { ...basicDialogOpts, open: false, selectedDoctor: null } 
        });
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2DoctorsList
     */
    render() {
        const { selectedClaim, basicDialogRequestPending, summaryMode, editPhicClaimDetailCf2RequestPending,selectedTransmittal } = this.props;

        return (
            <StyleRoot style={styles.container}>

                <div style={styles.titleWrapper}>
                    <label style={styles.titleWrapper.title}>Doctors</label>
                    {!summaryMode ? 
                    <FlatButton 
                        label="NEW"
                        icon={ <AddIcon /> }
                        labelPosition="after"
                        style={styles.flatButtonStyles}
                        onTouchTap={this.onOpenCf2DoctorsNewDialog.bind(this)}
                        disabled={editPhicClaimDetailCf2RequestPending}
                    />
                   :null }
                </div>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>

                        <TableRow style={styles.tableHeaderStyle}>
                            <TableHeaderColumn>ACCREDITATION NO.</TableHeaderColumn>
                            <TableHeaderColumn>NAME</TableHeaderColumn>
                            <TableHeaderColumn>WITH CO PAY</TableHeaderColumn>
                            <TableHeaderColumn>CO PAY AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn>STATUS</TableHeaderColumn>
                             <TableHeaderColumn>DOCTOR SIGN DATE</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        style={styles.tableBodyStyle}
                        displayRowCheckbox={false}>

                        { this.onDisplayListOfDoctors() }

                    </TableBody>
                </Table>
                
                { /** NEW DOCTOR DIALOG */ }
                <Cf2DoctorsNewContainer 
                    open={this.state.openCf2DoctorsNew}
                    closeDialog={this.onCloseCf2DoctorsNewDialog.bind(this)}
                    selectedClaim={selectedClaim}
                    selectedTransmittal={selectedTransmittal}
                    closingDialog={this.onClosingDoctorsNewDialog.bind(this)}
                />

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ basicDialogRequestPending }
                />                  
            </StyleRoot>
        );
    }
}

// *** props
Cf2DoctorsList.propTypes = {
    deletePhicClaimsDetailsCf2Doctor : PropTypes.func.isRequired,
    basicDialogRequestPending : PropTypes.bool.isRequired,
    doctorsList : PropTypes.array.isRequired,
    selectedClaim : PropTypes.object.isRequired,
    summaryMode : PropTypes.bool
};

export default Cf2DoctorsList;
