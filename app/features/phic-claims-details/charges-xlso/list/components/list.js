import React from 'react';
import Radium, {StyleRoot} from 'radium';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import colorPalette from '../../../../../util/styles/color-pallete';
import animation from '../../../../../util/styles/animation';
import XrayLabSuppliesAndOthersItem from './list-item';
import BasicDialog from '../../../../../shared-components/basic-dialog';
import XrayLabSuppliesAndOthersNewContainer from '../../new/containers/new';
import XrayLabSuppliesAndOthersEditContainer from '../../edit/container/edit'; 

const styles = {
    container: {
        marginTop: '45px'
    },

    titleWrapper: {
        display: 'flex',
        alignItems: 'center',

        title: {
            color: colorPalette.primaryColor,
            fontSize : '14px',
            width: '200px',
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
class XrayLabSuppliesAndOthersList extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedXlso: null,
            openXrayLabSuppliesAndOthersDialog: false,
            basicDialogOpts: basicDialogOpts,
            basicDialogIsPending: false,
            xlso: null,
            openXrayLabSuppliesAndOthersEditDialog: false
        };
    }

    /**
     * 
     * 
     * 
     * @memberOf XrayLabSuppliesAndOthersList
     */
    onOpenXrayLabSuppliesAndOthersDialog() {
        this.setState({
            openXrayLabSuppliesAndOthersDialog: true
        });
    }

    /**
     * 
     * 
     * 
     * @memberOf XrayLabSuppliesAndOthersList
     */
    onCloseXrayLabSuppliesAndOthersDialog() {
        this.setState({
            openXrayLabSuppliesAndOthersDialog: false
        });
    }

    /**
     * 
     * 
     * @param {any} xlso 
     * @param {any} event 
     * 
     * @memberOf XrayLabSuppliesAndOthersList
     */
    onOpenXrayLabSuppliesAndOthersEditDialog(xlso ,event) {
        event.preventDefault();
        this.setState({
            openXrayLabSuppliesAndOthersEditDialog: true,
            selectedXlso: xlso
        });
    }

    onCloseXrayLabSuppliesAndOthersEditDialog(){
        this.setState({ openXrayLabSuppliesAndOthersEditDialog: false });
    }

    openBasicDialogForRemove(xlso) {
        const { deletePHICXlso, selectedClaim } = this.props;

        this.setState({
            basicDialogOpts: {
                ...this.state.basicDialogOpts,
                open: true,
                title: 'Do you want to remove',
                subtitle: `${xlso.type} (${xlso.description}) will be permanently removed from this list.`,
                highlightTitle: xlso.type,
                closeDialog: this.onCloseBasicDialog.bind(this),
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action :  deletePHICXlso.bind(this, xlso.id, selectedClaim.id, this.changePendingRequest.bind(this), this.onCloseBasicDialog.bind(this)),
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

    render(){
        const {selectedClaim, phicChargesXLSOs,summaryMode} = this.props;

        return (
            <StyleRoot style={[styles.container, animation.fadeIn]}>    

                <div style={styles.titleWrapper}>
                    <label style={styles.titleWrapper.title}>Xray, Lab, Supplies and Others</label>
                    {   
                        !summaryMode
                        ? 
                            <FlatButton 
                                label="NEW"
                                icon={ <AddIcon /> }
                                labelPosition="after"
                                style={styles.flatButtonStyles}
                                onTouchTap={this.onOpenXrayLabSuppliesAndOthersDialog.bind(this)}
                            />
                        : 
                            null
                    }
                    
                </div>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>

                        <TableRow style={styles.tableHeaderStyle}>
                            <TableHeaderColumn>TYPE</TableHeaderColumn>
                            <TableHeaderColumn>DESCRIPTION</TableHeaderColumn>
                            <TableHeaderColumn>QTY</TableHeaderColumn>
                            <TableHeaderColumn>RENDER DATE</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody 
                        showRowHover={true}
                        style={styles.tableBodyStyle}
                        displayRowCheckbox={false}>

                        {this.onDisplayListOfXrayLabSuppliesAndOthers()}

                    </TableBody>
                </Table>

                {/*EDIT XLSO DIALOG*/}

                {
                    this.state.selectedXlso != null ? 
                 <XrayLabSuppliesAndOthersEditContainer 
                    open={this.state.openXrayLabSuppliesAndOthersEditDialog}
                    selectedXlso={this.state.selectedXlso}
                    closeDialog={this.onCloseXrayLabSuppliesAndOthersEditDialog.bind(this)}
                /> 
                : null        
                }

                     

                {/*NEW XLSO DIALOG*/}
                <XrayLabSuppliesAndOthersNewContainer
                    selectedClaim={selectedClaim}
                    open={this.state.openXrayLabSuppliesAndOthersDialog}
                    closeDialog={this.onCloseXrayLabSuppliesAndOthersDialog.bind(this)}
                    phicChargesXLSOs={phicChargesXLSOs}/>

                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogIsPending }
                />
            </StyleRoot>
        );
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf XrayLabSuppliesAndOthersList
     */
    onDisplayListOfXrayLabSuppliesAndOthers(){
        const { phicChargesXLSOs, selectedClaim, summaryMode } = this.props;

        return phicChargesXLSOs.map((t, i) => (
            <XrayLabSuppliesAndOthersItem
                key={i}
                xlso={t}
                summaryMode={summaryMode}
                openXrayLabSuppliesAndOthersEditDialog={this.onOpenXrayLabSuppliesAndOthersEditDialog.bind(this)} 
                openBasicDialogForRemove={this.openBasicDialogForRemove.bind(this)} />
        ));
    }
}

export default XrayLabSuppliesAndOthersList;