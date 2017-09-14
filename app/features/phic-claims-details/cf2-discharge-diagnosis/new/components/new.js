
// react
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import debounce from 'lodash/debounce';

// material 
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';
import EmptyPlaceholder from '../../../../../shared-components/placeholders/empty';
import LoadingIndicatorPerAction from '../../../../../shared-components/loading-indicator-per-action';

import colorPalette from '../../../../../util/styles/color-pallete';

// icon
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
    container : {
        width: '100%',
    },
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

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',

        left: {
            marginLeft: '12px'
        }
    },
};



@Radium
class Cf2DischargeDiagnosisNew extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            search: '',
            selectedICD10: null
        };

        this.searchICD10 = debounce(this.searchICD10, 500);
    }

    searchICD10(event) {
        event.persist();
        const { searchICD10 } = this.props;
        const { search } = this.refs;


        if (search.input.value.length < 3) {
            this.clearPHICICD10s(event);
            return;
        }
        
        this.setState({
            search: search.input.value
        });
        searchICD10(search.input.value);
    }

    selectICD10(keys) {
        const { phicICD10s } = this.props;

        const matched = keys.some(t => {
            return phicICD10s.some((u, i) => {
                if (i != t) return false;
                
                this.setState({
                    selectedICD10: u
                });
                return true;
            });
        });

        if (!matched) {
            this.setState({
                selectedICD10: null
            });
        }
    }

    clearPHICICD10s(event) {
        event.persist();
        const { clearPHICICD10s } = this.props;
        const { search } = this.refs;

        if (search.input.value.length > 0)
            return;

        this.setState({
            search: search.input.value
        });
        clearPHICICD10s();
    }

    onSubmitForm(event) {
        event.preventDefault();
    }

    addDischargeDiagnosis(event) {
        event.preventDefault();
        const { newPHICDischargeDiagnosis, selectedClaim, close } = this.props;

        newPHICDischargeDiagnosis(selectedClaim.id, this.state.selectedICD10, close);
    }

    render() {
        const { phicICD10s, searchICD10RequestPending, close, newPHICDischargeDiagnosisRequestPending } = this.props;
        
        return (
            <StyleRoot style={styles.container}>
                <div style={styles.titleContainer}>
                    <div>
                        <h1 style={styles.title}>Discharge Diagnosis - New</h1>
                        <p style={{fontSize: '14px', marginBottom: 0}}>Please select a diagnosis.</p>
                    </div>      
                    <div>
                        <IconButton onTouchTap={close.bind(this)}>
                            <Close />
                        </IconButton>
                    </div>
                </div>

                <div style={{height: '450px'}}>
                    <form onSubmit={this.onSubmitForm.bind(this)}>
                        <TextField
                            hintText="Search ICD10 Code / Description"
                            floatingLabelText="Search ICD10 Code / Description"
                            fullWidth={true}
                            onChange={this.searchICD10.bind(this)}
                            disabled={newPHICDischargeDiagnosisRequestPending}
                            ref="search" />
                    </form>
                    { phicICD10s.length == 0 && !searchICD10RequestPending
                        ? this.state.search.length < 2
                            ? (<EmptyPlaceholder
                                    style={{paddingTop: '100px'}}
                                    title="Please Search for ICD10"
                                    subtitle="you may search for code or description"
                                />)
                            : (<EmptyPlaceholder
                                    style={{paddingTop: '15vh'}}
                                    title="No ICD10 Found"
                                    subtitle="no results found for this ICD10 code or description"
                                />)
                        : searchICD10RequestPending
                            ? <LoadingIndicatorPerContainer isDialog={false} />
                            : (
                            <Table
                                onRowSelection={this.selectICD10.bind(this)}
                                height={'300px'}
                                selectable={true}
                                multiSelectable={false}>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={newPHICDischargeDiagnosisRequestPending ? false : true}
                                    enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn tooltip="ICD10 Code">ICD10 Code</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="Description">Description</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={newPHICDischargeDiagnosisRequestPending ? false : true}
                                    deselectOnClickaway={false}
                                    showRowHover={true}
                                    stripedRows={false}>
                                    {phicICD10s.map( (t, i) => (
                                    <TableRow key={i} selected={t.selected}>
                                        <TableRowColumn style={{width: '100px'}}>{t.icD10Code}</TableRowColumn>
                                        <TableRowColumn><span title={t.icD10Value}>{t.icD10Value}</span></TableRowColumn>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )
                            
                    }
                </div>
                <div style={styles.buttonWrapper}>
                    { newPHICDischargeDiagnosisRequestPending ? 

                        // *** LOADING INDICATOR
                        <LoadingIndicatorPerAction text="Saving..."/>
                    : 

                    // *** ACTION BUTTON
                    <div>
                        <RaisedButton
                            style={ styles.buttonWrapper.left }
                            label={ 'CANCEL' }
                            onTouchTap={close}
                        />
                        <RaisedButton
                            style={ styles.buttonWrapper.left }
                            label={ 'SAVE' }
                            secondary={true}
                            onTouchTap={this.addDischargeDiagnosis.bind(this)}
                        />                     
                    </div>                    
                    }
                </div>
            </StyleRoot>
        );
    }
}

export default Cf2DischargeDiagnosisNew;