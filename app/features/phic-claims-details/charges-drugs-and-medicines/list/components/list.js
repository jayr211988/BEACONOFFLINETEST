import React from 'react';
import Radium, {StyleRoot} from 'radium';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';
import ChargesDrugsAndMedicinesListItem from './list-item';
import BasicDialog from '../../../../../shared-components/basic-dialog';
import ChargesDrugsAndMedicinesNewContainer from '../../new/containers/new';
import ChargesDrugsAndMedicinesEditContainer from '../../edit/containers/edit';

const styles = {
    container: {
        marginBottom: '50px'
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

const basicDialogOpts = {
    title : '',
    subtitle : '',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

@Radium
class ChargesDrugsAndMedicinesList extends React.Component {
    
    constructor() {
        super();

        this.state = {
            openNewDrugsAndMedicinesDialog: false,
            basicDialogOpts: basicDialogOpts,
            basicDialogIsPending: false,
            openEditDrugsAndMedicinesDialog: false,
            selectedDrugAndMedicine: null
        };
    }

    onOpenNewDrugsAndMedicinesDialog() {
        this.setState({
            openNewDrugsAndMedicinesDialog: true
        });
    }

    onCloseNewDrugsAndMedicinesDialog() {
        this.setState({
            openNewDrugsAndMedicinesDialog: false
        });
    }

    onOpenEditDrugsAndMedicinesDialog(selectedDrugAndMedicine) {
        this.setState({
            openEditDrugsAndMedicinesDialog: true,
            selectedDrugAndMedicine: selectedDrugAndMedicine
        });
    }

    onCloseEditDrugsAndMedicinesDialog() {
        this.setState({
            openEditDrugsAndMedicinesDialog: false,
            selectedDrugAndMedicine: null
        });
    }

    render() {
        const {selectedClaim, summaryMode} = this.props;

        return (
            <StyleRoot style={[styles.container, animation.fadeIn]}>    

                <div style={styles.titleWrapper}>
                    <label style={styles.titleWrapper.title}>Drugs and Medicines</label>
                {
                    !summaryMode 
                    ? 
                    <FlatButton 
                        label="NEW"
                        icon={ <AddIcon /> }
                        labelPosition="after"
                        style={styles.flatButtonStyles}
                        onTouchTap={this.onOpenNewDrugsAndMedicinesDialog.bind(this)}
                    />
                    : null
 
                }
                    
                </div>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>

                        <TableRow style={styles.tableHeaderStyle}>
                            <TableHeaderColumn>ITEM ID</TableHeaderColumn>
                            <TableHeaderColumn>BRAND NAME</TableHeaderColumn>
                            <TableHeaderColumn>GENERIC NAME</TableHeaderColumn>
                            <TableHeaderColumn>QTY</TableHeaderColumn>
                            <TableHeaderColumn>PREPARATION</TableHeaderColumn>
                             <TableHeaderColumn>PNDF CODE</TableHeaderColumn>
                             <TableHeaderColumn>RENDER DATE</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        style={styles.tableBodyStyle}
                        displayRowCheckbox={false}>

                        { this.onDisplayListOfDrugsAndMedicines() }

                    </TableBody>
                </Table>

                <ChargesDrugsAndMedicinesNewContainer
                    selectedClaim={selectedClaim}
                    open={this.state.openNewDrugsAndMedicinesDialog}
                    closeDialog={this.onCloseNewDrugsAndMedicinesDialog.bind(this)} />

                { !this.state.selectedDrugAndMedicine
                    ? null
                    :
                    <ChargesDrugsAndMedicinesEditContainer
                        open={this.state.openEditDrugsAndMedicinesDialog}
                        closeDialog={this.onCloseEditDrugsAndMedicinesDialog.bind(this)}
                        selectedDrugAndMedicine={this.state.selectedDrugAndMedicine} />
                }

                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogIsPending }
                />
            </StyleRoot>
        );
    }

    openBasicDialogForRemove(selectedDrugAndMedicine) {
        const { deletePHICChargesDrugsAndMedicines, selectedClaim } = this.props;

        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: true,
                title: 'Do you want to remove',
                subtitle: `${selectedDrugAndMedicine.genericName} (${selectedDrugAndMedicine.brandName}) will be permanently removed from this list.`,
                highlightTitle: selectedDrugAndMedicine.itemId,
                closeDialog: this.onCloseBasicDialog.bind(this),
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : deletePHICChargesDrugsAndMedicines.bind(this, selectedDrugAndMedicine.id, selectedClaim.id, this.changePendingRequest.bind(this), this.onCloseBasicDialog.bind(this)),
                        secondary : true
                    }
                ]
            }
        });
    }

    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogIsPending: pendingRequest
        });
    }

    onCloseBasicDialog() {
        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: false
            }
        });
    }

    onDisplayListOfDrugsAndMedicines() {
        const { phicChargesDrugsAndMedicines,summaryMode } = this.props;
        return phicChargesDrugsAndMedicines.map((t, i) => (
            <ChargesDrugsAndMedicinesListItem
                key={i}
                drugAndMedicine={t}
                summaryMode={summaryMode}
                openBasicDialogForRemove={this.openBasicDialogForRemove.bind(this)}
                onOpenEditDrugsAndMedicinesDialog={this.onOpenEditDrugsAndMedicinesDialog.bind(this)}
                />
        ));
    }

}

export default ChargesDrugsAndMedicinesList;