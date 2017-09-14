import React, { Component } from 'react';

import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import FlatButton from 'material-ui/FlatButton';

//*** material-ui icons
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import TextField from 'material-ui/TextField';
import FileDownload from 'material-ui/svg-icons/file/file-download';

// *** dumb components
import ActionFilterStatus from '../../../../shared-components/action-filters/status';
import ActionFilterDateRange from '../../../../shared-components/action-filters/date-range';

import moment from 'moment';
import MouseTrap from 'mousetrap';

// *** custom css styles
import SearchIcon from 'material-ui/svg-icons/action/search';
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    container: {
        display: 'flex',
    },

    flatButtonStyle: {
        backgroundColor: colorPalette.white,
        marginLeft: '10px',
        border: '1px solid #e8e8e8',
        lineHeight: '20px',
    },

    flatButtonLabelStyle: {
        color: colorPalette.primaryTextColor
    },
    rightHolder: {     
        searchWrapper: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px'
        }  
    }     
};

// *** menu items
const menuItemsOpts = [
    { primaryText: 'All', value: null },
    { primaryText: 'RETURN', value: 5 },
    { primaryText: 'DENIED', value: 6 },
    { primaryText : 'IN PROCESS', value : 4},
    { primaryText: 'WITH CHEQUE', value: 7 },
    { primaryText: 'WITH VOUCHER', value: 8 },
    { primaryText: 'VOUCHERING', value: 9 }
];

// *** default filter
const defaultFilter = {
    dateFrom: moment().add({months: -3}).startOf('day').toDate(),
    dateTo : moment().endOf('day').toDate(),
    selectedDateRangeLabel : '3 MONTHS AGO',
    selectedStatusLabel : 'ALL'
};

/**
 * Subheader Action Wrapper Eclaims Component
 * 
 * @class ActionWrapperEclaimsApi
 * @extends {Component}
 */
@Radium
class ActionWrapperEclaims extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterFrom: defaultFilter.dateFrom,
            filterTo: defaultFilter.dateTo,
            filterClaimStatus: null,

            endPoint : null
        };
    }  

    /**
     * Component Did Mount
     * 
     * 
     * @memberOf ActionWrapperEclaims
     */
    componentDidMount() {
        MouseTrap.bind(['r'], this.onRefresh.bind(this));
    }
    
     /**
     * Refresh List
     * 
     * 
     * @memberOf ActionWrapperEclaims
     */
    onRefresh() {
        const { getPhicTransactionsEclaims, selectedFacility } = this.props;

        getPhicTransactionsEclaims(
            selectedFacility.id, 
            this.state.filterClaimStatus, 
            this.state.filterFrom, 
            this.state.filterTo
        );            
    }

    /**
     * Filter By Status
     * 
     * @param {any} claimStatus
     * 
     * @memberOf ActionWrapperEclaims
     */
    onChangeClaimStatus(claimStatus) {
        const { getPhicTransactionsEclaims, selectedFacility } = this.props;

        this.setState({
            filterClaimStatus: claimStatus
        });

        getPhicTransactionsEclaims(
            selectedFacility.id, 
            claimStatus, 
            this.state.filterFrom, 
            this.state.filterTo
        ); 
    }

    /**
     * Filter By Date
     * 
     * @param {any} from
     * @param {any} to
     * 
     * @memberOf ActionWrapperEclaims
     */
    onChangeDateFilter(from, to) {
        const { getPhicTransactionsEclaims, selectedFacility } = this.props;

        this.setState({
            filterFrom: from,
            filterTo: to
        });

        getPhicTransactionsEclaims(
            selectedFacility.id, 
            this.state.filterClaimStatus, 
            from, 
            to
        );
    }   

    searchChange() {
        const { search } = this.refs;
        const { searchChange } = this.props;

        searchChange(search.input.value);
    }  

    printExportToExcel() {
        const { selectedFacility } = this.props;
        let endpoint = '';        
        
        endpoint = `api/PHICTransaction/GetPHICTransactionsandExport?clientId=${selectedFacility.id}`;
        endpoint = this.state.filterClaimStatus ? `${endpoint}&claimStatus=${this.state.filterClaimStatus}` : endpoint;
        endpoint = this.state.filterFrom ? `${endpoint}&from=${this.state.filterFrom.toISOString()}` : `${endpoint}&from=${defaultFilter.dateFrom.toISOString()}`;
        endpoint = this.state.filterTo ? `${endpoint}&to=${this.state.filterTo.toISOString()}` : `${endpoint}&to=${defaultFilter.dateTo.toISOString()}`;
        
        

        this.setState({
            endPoint: endpoint
        });
    }


    
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ActionWrapperEclaims
     */
    render() {
        const { totalTransactions } = this.props;
        return (
            <StyleRoot style={styles.container}>
                 <div>
                 {
                     totalTransactions ? 
                      <FlatButton 
                        title='Export to Excel'
                        label=''
                        icon={<FileDownload color={colorPalette.secondaryTextColor} style={{marginTop: '5px'}}/>}
                        style={styles.flatButtonStyle}                             
                        href={`http://localhost:3000/${this.state.endPoint}`}                        
                        onTouchTap={this.printExportToExcel.bind(this)}                        
                    /> : null
                 }                   

                </div>
                { /** REFRESH ACTION */}
                <FlatButton
                    title="REFRESH - Shortcut Key: [R]"
                    label=""
                    style={styles.flatButtonStyle}
                    labelStyle={styles.flatButtonLabelStyle}
                    icon={<RefreshIcon color={colorPalette.secondaryTextColor} />}
                    onTouchTap={this.onRefresh.bind(this)}
                />

                { /** 1 MONTH AGO ACTION */}
                <ActionFilterDateRange
                    defaultFilter={defaultFilter}
                    onChange={this.onChangeDateFilter.bind(this)} />

                { /** WITH CHECK ACTION */}
                <ActionFilterStatus
                    defaultFilter={defaultFilter}
                    onChange={this.onChangeClaimStatus.bind(this)}
                    menuItems={menuItemsOpts}
                    flatButtonStyle={{ width: '180px' }}
                />    

                { /** SEARCH ACTION */ }
                <div style={styles.rightHolder.searchWrapper}>
                    <span title='Search by Patient Name or Transmittal Number'>
                        <TextField 
                            hintText="Type to Search"
                            underlineFocusStyle={{ borderColor: colorPalette.primaryColor }}
                            onChange={this.searchChange.bind(this)}                            
                            ref="search"
                        />
                    </span>
                    <SearchIcon color={colorPalette.secondaryTextColor} />
                </div>                
            </StyleRoot>
        );
    }
}

export default ActionWrapperEclaims;