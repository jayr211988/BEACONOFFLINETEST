import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import MouseTrap from 'mousetrap';

// *** material-ui icons
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Search from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';

// *** material-icons
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon from 'material-ui/svg-icons/content/sort';
import AddIcon from 'material-ui/svg-icons/content/add';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import GroupAdd from 'material-ui/svg-icons/social/group-add';

import moment from 'moment';

// dumb component
import CustomLegend from '../../../../shared-components/custom-legend';

import Radium, { StyleRoot } from 'radium';
// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

import { transmittalStatus } from '../../../../util/data/index';


const styles = {
    container: {
        minHeight : '70px',
        display: 'flex',
        backgroundColor: colorPalette.lightBgColor,
        padding: '25px 35px 0px 35px',
        position: 'relative'
    },  

    containerLoading : {
        display: 'flex',
        backgroundColor: colorPalette.lightBgColor,
        padding: '40px',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },

    leftHolder: {
        width: '30%',

        back: {
            color: colorPalette.primaryColor,
            fontSize: '14px',
            cursor: 'pointer'
        },

        titleWrapper: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '6px',

            title: {
                color: colorPalette.primaryColor,
                fontWeight: 600,
                fontSize: '20px',
                margin: 0
            },

            total: {
                margin: '0 30px',
                color: colorPalette.secondaryTextColor
            }, 
        }      
    },

    centerHolder: {
        width: '40%',

        transmittalWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            transmittal: {
                color: colorPalette.primaryColor,
                fontWeight: 600
            },

            package: {
                color: colorPalette.primaryTextColor,
                letterSpacing: '.2px',
                lineHeight: '2em'
            },

            status: {
                color: colorPalette.primaryTextColor,
                letterSpacing: '.2px',
            }
        }
    },

    rightHolder: {
        width: '30%',
        display: 'flex',  
        justifyContent: 'flex-end',
        paddingTop: '8px',

        flatButtonStyle: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px'
        },

        flatButtonStyleBrowse: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            paddingTop: '7px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px',
        },

        flatButtonStyleBrowseSaveBtn: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px'
        },

        flatButtonLabelStyle: {
            color: colorPalette.primaryTextColor
        },          
    },

    addActionButtonWrapper: {
        position: 'absolute',
        top: '-30px',
        right: '40px',
    },
    addClaims: {
        height: 'auto',
        marginTop: '30px',
        marginLeft: '-30px'
    },
    claimStatusBoxContainer:  {
        width: '17px',
        height: '17px',
        display: 'block',
        marginLeft: '-25px',
        marginTop: '-2px',
        position: 'absolute'
    },
    claimStatusDropdownWarpper: {
        position: 'absolute',
        marginLeft: '-49px',
        marginTop: '-6px',
        background: 'transparent'
    }

};

/**
 * Products Subheader Component
 * 
 * @class Subheader
 * @extends {React.Component}
 */
@Radium
class Subheader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'top',
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top',
            },        
        };
    }

    componentDidMount() {
        Mousetrap.bind(['r'], this.onRefreshList.bind(this));
        Mousetrap.bind(['s'], this.onSortList.bind(this));
        Mousetrap.bind(['b'], this.onBack.bind(this));
    }

    /**
     * Back
     * 
     * 
     * @memberOf Subheader
     */
    onBack() {
        browserHistory.push('/phic-transmittals');
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
        const { refreshPhicClaimsList, selectedTransmittal } = this.props;
        refreshPhicClaimsList(selectedTransmittal.id);
    }

    /**
     * Sort List
     * 
     * @param {any} event
     * 
     * @memberOf Subheader
     */
    onSortList(event) {
        event.preventDefault();
        const { sortPhicClaimsList } = this.props;
        sortPhicClaimsList();
    }

    onNewClaims(claimsIs) {
        const { selectedTransmittal } = this.props;
        browserHistory.push(`/phic-claims-details/${selectedTransmittal.id}/new-claim-${claimsIs}`);
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,    
        });
    };

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
        
        value.transmittalId= 64;

        newPHICTransmittalOfflineMode(value,uploadingFiles);
    }


    selectedTransmittalColorCode() {
        const { selectedTransmittal } = this.props;
        var color = null;
        
        switch (selectedTransmittal.transmittalStatus) {
        case transmittalStatus.draft:
            color = colorPalette.gray;       
            break;

        case transmittalStatus.transmitting:
            color = colorPalette.greenYellow;       
            break;

        case transmittalStatus.transmitted:
            color = colorPalette.orange;       
            break;

        case transmittalStatus.transmitError:
            color = colorPalette.darkRed;       
            break;  

        case transmittalStatus.complete:
            color = colorPalette.green;       
            break;                
        default:
            break;
        }

        return color;
         
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Subheader
     */
    render() {   
        const { itemCount, selectedTransmittal } = this.props;
        var status = this.selectedTransmittalColorCode();
        const legends = [
            {color: colorPalette.gray,label: 'DRAFT'},
            {color: colorPalette.greenYellow,label: 'TRANSMITTING'},
            {color: colorPalette.orange,label: 'TRANSMITTED'},
            {color: colorPalette.darkRed,label: 'TRANSMIT ERROR'},
            {color: colorPalette.green,label: 'COMPLETE'}
        ];


        //Render key bindings
        if(selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError )
        {
            Mousetrap.bind(['m'], this.onNewClaims.bind(this, 'member'));
            Mousetrap.bind(['d'], this.onNewClaims.bind(this, 'dependent'));
        }
        else
        {
            Mousetrap.bind(['m'], ()=>{});
            Mousetrap.bind(['d'], ()=>{});
        }

        return (
            <StyleRoot style={styles.container}>
                { /** LEFT HOLDER */ }
                <div style={styles.leftHolder}>

                    <a style={styles.leftHolder.back} onClick={this.onBack.bind(this)} title="Shortcut Key: [B]">Back to Transmittal list</a>

                    <div style={styles.leftHolder.titleWrapper}>
                        <h1 style={styles.leftHolder.titleWrapper.title}>PHIC Claims</h1>

                        <span style={styles.leftHolder.titleWrapper.total}>{ itemCount } Total</span>
                    </div>
                </div>

                { /** CENTER HOLDER */ }
                <div style={styles.centerHolder}>

                    <div style={styles.centerHolder.transmittalWrapper}>
                        <label style={styles.centerHolder.transmittalWrapper.transmittal}>
                            { `TR NO. ${selectedTransmittal.transmittalNumber}` }
                        </label>
                        <small style={styles.centerHolder.transmittalWrapper.package}>
                            { `${selectedTransmittal.phicPackageDescription} PACKAGE` }
                        </small>
                        <small style={styles.centerHolder.transmittalWrapper.status}>
                            <div style={styles.claimStatusDropdownWarpper}>
                                <CustomLegend legends={legends} iconChange={true} statusColor={status}/>
                            </div>
                            { selectedTransmittal.transmittalStatusDescription }
                        </small>
                    </div>
                
                </div>

                { /** RIGHT HOLDER */ }
                <div style={styles.rightHolder}>

                    { /** Upload Excel ACTION */ }

                    {/*<FlatButton
                        containerElement='label'
                        label="Upload Excel"
                        icon={ <Search /> }
                        labelPosition="after"
                        style={styles.rightHolder.flatButtonStyleBrowse}>
                        <input type="file"
                            style={{display: 'none'}}
                            onChange={this.uploadExcelData.bind(this)}
                            ref="inputfiles"
                            multiple={false}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </FlatButton>

                    <RaisedButton
                        style={ styles.rightHolder.flatButtonStyleBrowseSaveBtn }
                        label={ 'SAVE EXCEL' }
                        secondary={true}
                        onTouchTap={this.uploadDocuments.bind(this)}
                    />*/}
                    
                    { /** REFRESH ACTION */ }
                    <FlatButton 
                        title="Shortcut Key: [R]"
                        style={styles.rightHolder.flatButtonStyle}
                        icon={<RefreshIcon color={colorPalette.secondaryTextColor} />}
                        onTouchTap={this.onRefreshList.bind(this)}
                        title="Refresh - Shortcut Key: [R]"
                    />

                    { /** FILTER ACTION */ }
                    { /** <FlatButton 
                        label="FILTER"
                        style={styles.rightHolder.flatButtonStyle}
                        labelStyle={styles.rightHolder.flatButtonLabelStyle}
                        icon={<FilterListIcon color={colorPalette.secondaryTextColor} />}
                    /> */ }
                    
                    { /** SORT ACTION */ }
                    <FlatButton 
                        title="Shortcut Key: [S]"
                        style={styles.rightHolder.flatButtonStyle}
                        icon={<SortIcon color={colorPalette.secondaryTextColor} />}
                        onTouchTap={this.onSortList.bind(this)}
                        title="Sort by claim no. - Shortcut Key: [S]"
                    />                        
                </div>

            { /** ADD ACTION */ }

                { selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError ? 

                    
                    <div style={styles.addActionButtonWrapper}>
                        <FloatingActionButton 
                            style={styles.addActionButtonWrapper.floatingActionButtonStyle}
                            backgroundColor={colorPalette.accentColor}
                            onTouchTap={this.handleTouchTap}>   
                            <AddIcon />    
                            <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={this.state.anchorOrigin}
                                targetOrigin={this.state.targetOrigin}
                                onRequestClose={this.handleRequestClose}
                                style={styles.addClaims}
                                >
                                <Menu>
                                    <MenuItem 
                                        title="Shortcut Key: [M]"
                                        leftIcon = { <PersonAdd/>}
                                        primaryText="Add Claims for Member" 
                                        onTouchTap={this.onNewClaims.bind(this, 'member')}/>

                                    <MenuItem 
                                        title="Shortcut Key: [D]"
                                        leftIcon = {<GroupAdd />}
                                        primaryText="Add Claims for Dependent" 
                                        onTouchTap={this.onNewClaims.bind(this, 'dependent')}/>                                                                
                                </Menu>
                            </Popover>
                        </FloatingActionButton>
                    </div> 
                : null }
                
            </StyleRoot>
        );
    }
}

// *** props
Subheader.propTypes = {
    refreshPhicClaimsList : PropTypes.func.isRequired,
    selectedTransmittal : PropTypes.object.isRequired,
    sortPhicClaimsList : PropTypes.func.isRequired
};

export default Subheader;