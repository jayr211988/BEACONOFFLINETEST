import React from 'react';
import { browserHistory } from 'react-router';

import Radium, { StyleRoot } from 'radium';

// *** material-ui components
import FlatButton from 'material-ui/FlatButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

// *** dumb components
import ActionWrapperEclaims from './action-wrapper-eclaims';
import ActionWrapperEclaimsApi from './action-wrapper-eclaims-api';
import { hasPHICECLAIMS, hasPHICECLAIMSAPI } from '../../../../util/rules';
import { hasPHICEclaimsAccess } from '../../../../util/roles';
import { isClientAdmin } from '../../../../util/roles';
// *** material-ui icons
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SearchIcon from 'material-ui/svg-icons/action/search';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    container: {
        minHeight: '70px',
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
            alignItems: 'flex-end',

            flatButtonStyle: {
                backgroundColor: colorPalette.white,
                border: '1px solid #e8e8e8',
                lineHeight: '20px',
                minWidth: '300px',
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative'
            },

            flatButtonLabelStyle: {
                color: colorPalette.primaryTextColor,
                textAlign: 'left'
            },

            iconStyle: {
                position: 'absolute',
                right: '1px',
                top: '5px'
            }            
        },
        small: {
            color: colorPalette.primaryColor,
            fontWeight: 500,
            height: '18px'
        },
        title: {
            color: colorPalette.primaryColor,
            fontWeight: 600,
            fontSize: '20px',
            margin: '0'
        },

        total: {
            margin: '10px 30px',
            color: colorPalette.secondaryTextColor
        }
    },

    rightHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        searchWrapper: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px'
        }  
    }
};

// *** Transaction Type
const transactionType = {
    eclaims : '/transactions',
    eclaimsApi : '/transactions/eclaims-api'
};

/**
 * 
 * 
 * @class Subheader
 * @extends {React.Component}
 */
@Radium
class Subheader extends React.Component {
    constructor(props) {
        super(props);      


    }

    /**
     * Component Will Mount
     * 
     * 
     * @memberOf Subheader
     */
    componentWillMount() {
        const { location } = this.props;
        
        this.state = {
            openPopover: false,
            anchorEl: null,
            selectedTransaction: location.pathname == transactionType.eclaims ? 'PHIC ECLAIMS' : 'PHIC ECLAIMS API / HIS',
            selectedTransactionValue : location.pathname
        };   
    }

    /**
     * Component Will Recieve Props
     * 
     * @param {any} nextProps 
     * 
     * @memberOf Subheader
     */
    componentWillReceiveProps(nextProps){
        this.setState({ 
            selectedTransaction: nextProps.location.pathname == transactionType.eclaims ? 'PHIC ECLAIMS' : 'PHIC ECLAIMS API / HIS' 
        });
    }

    /**
     * Change Transaction
     * 
     * @param {any} event
     * @param {any} selected
     * 
     * @memberOf Subheader
     */
    onChangeTransactions(event, selected) {
        event.preventDefault();

        this.setState({
            openPopover: false,
            selectedTransaction: selected.props.primaryText,
            selectedTransactionValue : selected.props.value
        });

        browserHistory.push(selected.props.value);
    }

    /**
     * Open Popover
     * 
     * @param {any} event
     * 
     * @memberOf Subheader
     */
    onRequestOpenPopover(event) {
        event.preventDefault();

        this.setState({
            openPopover: true,
            anchorEl: event.currentTarget,
        });
    }

    /**
     * Close Popover
     * 
     * 
     * @memberOf Subheader
     */
    onRequestClosePopover() {
        this.setState({ openPopover: false });
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

    render() {
        const {
            totalTransactions, 
            getPhicTransactionsEclaims, 
            getPhicTransactionsEclaimsApi,              
            selectedFacility,            
            searchChange,
            currentUser } = this.props;        
        return (
            <StyleRoot style={styles.container}>

                { /** LEFT HOLDER */ }
                <div style={styles.leftHolder}>
                    <div style={styles.leftHolder.titleContainer}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <small style={styles.leftHolder.small}>Transaction View</small>

                            <FlatButton
                                onTouchTap={this.onRequestOpenPopover.bind(this)}
                                label={this.state.selectedTransaction}
                                style={styles.leftHolder.titleContainer.flatButtonStyle}
                                labelStyle={styles.leftHolder.titleContainer.flatButtonLabelStyle}
                                icon={<ArrowDropDownIcon style={styles.leftHolder.titleContainer.iconStyle} color={colorPalette.secondaryTextColor} />}
                                labelPosition="before"
                            />

                            <Popover
                                open={this.state.openPopover}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                onRequestClose={this.onRequestClosePopover.bind(this)}
                                animation={PopoverAnimationVertical}>

                                <Menu onItemTouchTap={this.onChangeTransactions.bind(this)}>
                                    {hasPHICEclaimsAccess (currentUser, selectedFacility) ? 
                                            hasPHICECLAIMS(selectedFacility) ?  
                                                <MenuItem primaryText="PHIC ECLAIMS" value="/transactions" />
                                            : null 
                                        : null
                                    }
                                    
                                    { hasPHICECLAIMSAPI(selectedFacility) ? 
                                        <MenuItem primaryText="PHIC ECLAIMS API / HIS" value="/transactions/eclaims-api" />
                                    : null }
                                </Menu>
                            </Popover>
                        </div>
                        <span style={styles.leftHolder.total}>{totalTransactions} Total</span>
                    </div>
                </div>

                 { /** RIGHT HOLDER */ }
                <div style={styles.rightHolder}>                    

                    { this.state.selectedTransactionValue == transactionType.eclaims ? 
                    
                    // *** ECLAIMS FILTERS
                    <ActionWrapperEclaims 
                        getPhicTransactionsEclaims={getPhicTransactionsEclaims} 
                        selectedFacility={selectedFacility}
                        searchChange={searchChange}
                        totalTransactions={totalTransactions}
                    />
                    : 

                    // *** ECLAIMS API FILTERS
                    <ActionWrapperEclaimsApi 
                        getPhicTransactionsEclaimsApi={getPhicTransactionsEclaimsApi}                                      
                        selectedFacility={selectedFacility}
                        searchChange={searchChange}     
                        totalTransactions={totalTransactions}

                    />
                    }   

                               
                </div>
            </StyleRoot>
        );
    }
}

export default Subheader;