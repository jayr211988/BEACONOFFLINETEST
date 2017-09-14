import React, { PropTypes } from 'react';

import Radium, { StyleRoot } from 'radium';

import Avatar from 'react-avatar';
// icon
import Search from 'material-ui/svg-icons/action/search';

// material 
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

// loading
import LoadingIndicatorPerContainer from '../../shared-components/loading-indicator-per-container';

import EmptyPlaceholder from '../placeholders/empty';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';

import { getPhoto } from '../../util/helpers/helper';

const styles = {
    container: {
        width: '100%',
        height: '100%'
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
    headerCont : {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',

        cancel: {
            color: colorPalette.westar
        },

        left: {
            marginLeft: '12px'
        }
    },
    searchIcon : {
        marginRight: '20px',
        marginLeft: '-20px',
        color: colorPalette.secondaryTextColor
    },
    buttonCont: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px'
    },
    facilityTableLayout: {
        display: 'flex',
        alignItems: 'center'
    },
    pendingContainer : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(255, 255, 255)'
    }
};

@Radium
class ProductsFacilitesApi extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedFacility: null,
            keys : null,
            search : ''          
        };
    }

    componentWillMount() {
        const {  
                productTitle, 
                getListofUnmappedHISFacility, 
                getListofUnmappedEHRFacility, 
                getListofUnmappedEHRPrivateFacility } = this.props;
                
        switch(productTitle) {
        case 'HIS' :
            getListofUnmappedHISFacility();
            break;
        case 'EHR' :
            getListofUnmappedEHRFacility();
            break;
        case 'Private EHR' :
            getListofUnmappedEHRPrivateFacility();
            break;
        }        
    }

    addSelectedFacility() {
        const { close,
                facilities,
                productTitle,
                selectedClient,
                newFacilityForQMUtoHIS, 
                newFacilityForQMUtoEHRPrivate, 
                newFacilityForQMUtoEHR } = this.props;        

        let facility = {};
                
        if (this.state.keys.length > 0) {
            facility = {
                clientId: selectedClient.id,
                facilityId : facilities[this.state.keys].id,
                facilityName : facilities[this.state.keys].name,
                facilityAddress : facilities[this.state.keys].address,
                facilityPhoto : facilities[this.state.keys].photo
            }; 
            
            switch (productTitle) {
            case 'HIS' : 
                newFacilityForQMUtoHIS(facility);
                break;
            case 'EHR' :
                newFacilityForQMUtoEHR(facility);
                break;
            default:
                newFacilityForQMUtoEHRPrivate(facility);            
            }        
            close();
        }        
    }   

    selectedFacility(key) {                                
        this.state.keys = key;            
    }    
 
    onSearch() {     
        const {displaySearchFacility} = this.props;      
        const { value } = this.refs.search.input;
        this.setState({
            search : value
        });         
        displaySearchFacility(value);
    }

    onFacilities() {
        const { facilities } = this.props;        
        if (this.state.search.length > 0) {
            return facilities.filter(t => t.name && t.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                .map((x, i) => (
                    <TableRow key={i}>
                        <TableRowColumn style={styles.facilityTableLayout}>
                            <Avatar
                                name={x.name}
                                src={getPhoto(x.photo)}
                                size={45}
                                round={true}
                                color={colorPalette.secondaryTextColor}
                            /> <span style={{ marginLeft: '5px' }} title={x.name}>{x.name}</span>
                        </TableRowColumn>
                        <TableRowColumn><span title={x.address}>{x.address}</span></TableRowColumn>

                    </TableRow>
                ));
        }


        return facilities.map((x, i) => (
            <TableRow key={i}>
                <TableRowColumn style={styles.facilityTableLayout} >
                    <Avatar
                        name={x.name}
                        src={getPhoto(x.photo)}
                        size={45}
                        round={true}
                        color={colorPalette.secondaryTextColor}
                    /> <span style={{ marginLeft: '5px' }} title={x.name}>{x.name}</span> </TableRowColumn>
                <TableRowColumn><span title={x.address}>{x.address}</span></TableRowColumn>

            </TableRow>
        ));
    }

    onDisplayFacilities() {
        const { facilities } = this.props;
        return facilities ?
            facilities.length <= 0 ?
                <EmptyPlaceholder 
                    title="No Facilities Found"
                    subtitle="There's no facilities found"
                />            
                :
                <Table
                    height={'300px'}
                    selectable={true}
                    multiSelectable={false}
                    onRowSelection={this.selectedFacility.bind(this)}>
                    <TableHeader
                        displaySelectAll={false}
                        enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip="FACILITY NAME">FACILITY NAME</TableHeaderColumn>
                            <TableHeaderColumn tooltip="ADDRESS">ADDRESS</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={false}>
                        {this.onFacilities()}
                    </TableBody>
                
                </Table>                     
        :<LoadingIndicatorPerContainer />;      

    }


    render() {
        const { close, productTitle, newProductQmeUpApiPending } = this.props;         
        return(
            <StyleRoot style={styles.container}>
                <div style={{ margin: '10px' }}>
                    <div style={styles.headerCont}>
                        <div>
                            <h1 style={styles.title}>New QMeUp API For {productTitle}</h1>
                            <p style={{ fontSize: '14px', marginBottom: 0 }}>Product to access the QMEUP API as an {productTitle}</p>
                        </div>
                        <div>
                            <TextField
                                hintText="Search by Facility Name"
                                floatingLabelText="TYPE NAME HERE TO SEARCH.."
                                onChange={this.onSearch.bind(this)}
                                ref={'search'}
                            />
                            <Search
                                style={styles.searchIcon}
                            />
                        </div>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div style={{ minHeight: '400px' }}>
                            {this.onDisplayFacilities()}                              
                        </div>

                        { newProductQmeUpApiPending ?  
                        <div style={styles.pendingContainer}>                            
                            <LoadingIndicatorPerContainer />
                        </div> : null
                        }


                        <div style={styles.buttonCont}>
                            <RaisedButton
                                style={styles.buttonWrapper.cancel}
                                label={'CANCEL'}
                                onTouchTap={close}
                                backgroundColor={colorPalette.westar}
                                labelColor={colorPalette.white}
                            />
                            <RaisedButton
                                style={styles.buttonWrapper.left}
                                label={'MAP QMU FACILITY'}
                                secondary={true}
                                onTouchTap={this.addSelectedFacility.bind(this)}
                            />
                        </div>
                    </div>
                </div>


            </StyleRoot>            

        );




    }

}

export default ProductsFacilitesApi;