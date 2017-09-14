import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { browserHistory } from 'react-router';

import MouseTrap from 'mousetrap';

// *** material-ui components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

// *** material-ui icons
import AddIcon from 'material-ui/svg-icons/content/add';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Search from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';

// *** dumb components
import ActionFilterStatus from '../../../../shared-components/action-filters/status';
import ActionFilterDateRange from '../../../../shared-components/action-filters/date-range';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    container: {
        minHeight : '70px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: colorPalette.lightBgColor,
        padding: '10px 40px',
        position: 'relative'
    },

    leftHolder: {
        display: 'flex',
        alignItems: 'center',

        titleContainer: {
            display: 'inherit',
            alignItems: 'inherit'
        },

        title: {
            color: colorPalette.primaryColor,
            fontWeight: 600,
            fontSize: '20px',
        },

        total: {
            margin: '0 30px',
            color: colorPalette.secondaryTextColor
        }
    },

    rightHolder: {
        display: 'flex',  
        alignItems: 'center',
        justifyContent: 'flex-end',

        flatButtonStyle: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px',
        },

        flatButtonStyleBrowse: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            paddingTop: '7px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px',
        },

        flatButtonLabelStyle: {
            color: colorPalette.primaryTextColor
        },

        searchWrapper: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px'
        }                  
    },

    addActionButtonWrapper: {
        position: 'absolute',
        top: '-30px',
        right: '40px',
    }
};

// *** menu items
const menuItemsOpts = [
    { primaryText: 'All', value: null },
    { primaryText: 'DRAFT', value: 0 },
    { primaryText: 'TRANSMITTED', value: 1 },
    { primaryText: 'TRANSMITTING', value: 2 },
    { primaryText: 'TRANSMIT ERROR', value: 3 },
    { primaryText: 'COMPLETE', value: 4 }
];

/**
 * Subheader Component
 * 
 * @class Subheader
 * @extends {React.Component}
 */
@Radium
class Subheader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filterDateFrom : props.defaultFilter.dateFrom,
            filterDateTo : props.defaultFilter.dateTo,
            filterStatus : null
        };
    }

    componentWillMount() {
        MouseTrap.bind(['r'], this.onRefreshList.bind(this));
    }

    /**
     * Refresh List
     * 
     * @param {any} event
     * 
     * @memberOf Subheader
     */
    onRefreshList(event) {
        event.preventDefault();

        const { refreshPhicTransmittals, selectedFacility } = this.props;

        refreshPhicTransmittals(
            selectedFacility.id,
            this.state.filterStatus,
            this.state.filterDateFrom,
            this.state.filterDateTo
        );
    }

    /**
     * Filter Transmittal List By Date Range
     * 
     * @param {any} dateFrom
     * @param {any} dateTo
     * 
     * @memberOf Subheader
     */
    onFilterTransmittalListDateRange(dateFrom, dateTo) {
        const { refreshPhicTransmittals, selectedFacility } = this.props;

        this.setState({  
            filterDateFrom : dateFrom,
            filterDateTo : dateTo,
        });

        refreshPhicTransmittals(
            selectedFacility.id, 
            this.state.filterStatus,
            dateFrom, 
            dateTo
        );
    }

    /**
     * Filter Transmittal List By Status
     * 
     * @param {any} transmittalStatus
     * 
     * @memberOf Subheader
     */
    onFilterTransmittalListStatus(transmittalStatus) {
        const { refreshPhicTransmittals, selectedFacility } = this.props;

        this.setState({ filterStatus : transmittalStatus });

        refreshPhicTransmittals(
            selectedFacility.id,
            transmittalStatus,
            this.state.filterDateFrom,
            this.state.filterDateTo
        );
    }

    /**
     * On Upload Excel Data
     * 
     * 
     * @memberOf Subheader
     */
    uploadExcelData() {

        const { inputfiles } = this.refs;
        const { addUploadingFiles } = this.props;

        let files = [];
        for (var i = 0; i < inputfiles.files.length; i++) {
            files.push(inputfiles.files[i]);
        }
        addUploadingFiles(files);
    }

    uploadDocuments() {

        const { newPHICTransmittalOfflineMode,uploadingFiles } = this.props;

        const value = {};
        
        value.clientId= 1;
        //value.accreditationNumber = 'H91004604';
        // value.hospitalCode= 262729;
        // value.phichciType= 1;
        // value.phicPackage= 0;

        newPHICTransmittalOfflineMode(value,uploadingFiles);
    }

    /**
     * On Search Change
     * 
     * 
     * @memberOf Subheader
     */
    searchChange() {
        const { search } = this.refs;
        const { searchChange } = this.props;

        searchChange(search.input.value);
    }

    /**
     * Back
     * 
     * 
     * @memberOf Subheader
     */
    onBack() {
        browserHistory.goBack();
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Subheader
     */
    render() {
        const {
            defaultFilter,             
            itemCount, 
            openPhicTransmittalDialogNew, 
            sortTransmittalListNumber } = this.props;

        return (
            <StyleRoot style={styles.container}>

                <div style={styles.leftHolder}>
                    <div style={styles.leftHolder.titleContainer}>
                        <h1 style={styles.leftHolder.title}>PHIC Transmittals</h1>
                        
                        <span style={styles.leftHolder.total}>{ itemCount } Total</span>
                    </div>
                </div>

                <div style={styles.rightHolder}>              

                    { /** Upload Excel ACTION */ }

                    {/*<FlatButton
                        containerElement='label'
                        label="BROWSE"
                        icon={ <Search /> }
                        labelPosition="after"
                        style={styles.rightHolder.flatButtonStyleBrowse}>
                        <input type="file"
                            style={{display: 'none'}}
                            onChange={this.uploadExcelData.bind(this)}
                            //onChange={this.selectDocument.bind(this)}
                            ref="inputfiles"
                            multiple={false}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </FlatButton>*/}

                    {/*<RaisedButton
                                style={ styles.rightHolder.flatButtonStyleBrowse }
                                label={ 'UPLOAD' }
                                secondary={true}
                                onTouchTap={this.uploadDocuments.bind(this)}
                            />*/}

                    { /** REFRESH ACTION */ }
                    <FlatButton 
                        title="REFRESH - Shortcut Key: [R]"
                        label=""
                        style={styles.rightHolder.flatButtonStyle}
                        labelStyle={styles.rightHolder.flatButtonLabelStyle}
                        icon={<RefreshIcon color={colorPalette.secondaryTextColor} />}
                        onTouchTap={this.onRefreshList.bind(this)}
                    />

                    { /** SORT ACTION */ }
                    <FlatButton 
                        title="SORT BY TRANSMITTAL NUMBER - Shortcut Key: [S]"
                        label=""
                        style={styles.rightHolder.flatButtonStyle}
                        labelStyle={styles.rightHolder.flatButtonLabelStyle}
                        icon={<SortIcon color={colorPalette.secondaryTextColor} />}
                        onTouchTap={sortTransmittalListNumber.bind(this)}
                    />                
                    { /** FILTER BY DATE ACTION */ }
                    <ActionFilterDateRange 
                        defaultFilter={defaultFilter}
                        onChange={this.onFilterTransmittalListDateRange.bind(this)}
                    />

                    { /** FILTER ACTION BY STATUS */ }
                    <ActionFilterStatus 
                        defaultFilter={defaultFilter}
                        menuItems={menuItemsOpts} 
                        onChange={this.onFilterTransmittalListStatus.bind(this)}
                        flatButtonStyle={{ width: '180px' }}
                    />  

                    { /** SEARCH ACTION */ }
                    <div style={styles.rightHolder.searchWrapper}>
                        <TextField 
                            hintText="Search by Transmittal No..."
                            underlineFocusStyle={{ borderColor: colorPalette.primaryColor }}
                            onChange={this.searchChange.bind(this)}
                            ref="search"
                        />

                        <SearchIcon color={colorPalette.secondaryTextColor} />
                    </div>                                   
                </div>

                { /** ADD ACTION */ }
                <div style={styles.addActionButtonWrapper}>
                    <FloatingActionButton 
                        title="Shortcut Key: [N]"
                        style={styles.addActionButtonWrapper.floatingActionButtonStyle}
                        backgroundColor={colorPalette.accentColor} 
                        onTouchTap={openPhicTransmittalDialogNew.bind(this)}>
                        
                        <AddIcon />
                    </FloatingActionButton>
                </div>
            </StyleRoot>
        );
    }
}

// *** props
Subheader.propTypes = {
    itemCount : PropTypes.number.isRequired,
    openPhicTransmittalDialogNew : PropTypes.func.isRequired,
    refreshPhicTransmittals : PropTypes.func.isRequired,
    sortTransmittalListNumber : PropTypes.func.isRequired,
    selectedFacility : PropTypes.object.isRequired,
};

export default Subheader;
