import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import {browserHistory} from 'react-router';

// *** material-ui components
import IconButton from 'material-ui/IconButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// *** material-ui icons
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    container: {
        height: '75px',
        width: '350px',
        paddingLeft: '25px',
        paddingRight: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(225,225,225,0.1)'
    },

    wrapper: {
        display: 'flex',
        alignItems: 'center',
    },

    textHolder: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 12px'
    },

    label: {
        color: colorPalette.white,
        fontSize: '14px',
        lineHeight: '1.6em'
    },

    small: {
        color: colorPalette.whiteTransparent,
        lineHeight: '1.6em',
        letterSpacing: '.2px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
    },

    menuItemStyle: {
        minWidth: '306px',

        label: {
            color: colorPalette.primaryTextColor,
            fontSize: '14px',
            lineHeight: '1.8em'
        },

        small: {
            color: colorPalette.secondaryTextColor,
            lineHeight: '1.6em',
            whiteSpace: 'normal'
        }
    },

    menuItemInnerDivStyle: {
        height: '60px',
        display: 'flex',
        alignItems: 'center',
    }
};

/**
 * Header Part Dropdown Switch Facility Component
 * 
 * @class HeaderDropdownSwitchFacility
 * @extends {React.Component}
 */
@Radium
class HeaderDropdownSwitchFacility extends React.Component {
    constructor(props) {
        super(props);

        const { selectedFacility } = this.props;

        this.state = {
            open: false,
            selectedFacility: selectedFacility
        };
    }

    /**
     * Switch Facility
     * 
     * @param {any} selectedFacility
     * @param {any} event
     * 
     * @memberOf HeaderDropdownSwitchFacility
     */
    onSwitchFacility(selectedFacility, event) {
        event.preventDefault();

        const { getSelectedFacility } = this.props;

        this.setState({
            selectedFacility: selectedFacility,
            open: false
        });
        browserHistory.push('/');

        getSelectedFacility(selectedFacility);
    }

    /**
     * Display List of Facilities
     * 
     * @returns
     * 
     * @memberOf HeaderDropdownSwitchFacility
     */
    onDisplayListOfFacilities() {
        const { facilities } = this.props;

        return facilities.map((facility, index) => (
            <MenuItem
                key={index}
                style={styles.menuItemStyle}
                innerDivStyle={styles.menuItemInnerDivStyle}
                onTouchTap={this.onSwitchFacility.bind(this, facility)}>

                <Avatar
                    name={facility.name} round={true}
                    size={52}
                    color={colorPalette.secondaryTextColor}
                    style={{overflow: 'hidden'}}
                />

                <div style={styles.textHolder}>
                    <label style={styles.menuItemStyle.label}>{facility.name}</label>
                    <small style={styles.menuItemStyle.small}>{facility.address}</small>
                </div>
            </MenuItem>
        ));
    }

    /**
     * Open Facility Dropdown 
     * 
     * @param {any} event
     * 
     * @memberOf HeaderDropdownSwitchFacility
     */
    onOpenDropdownMenu(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    /**
     * Close Facility Dropdown
     * 
     * 
     * @memberOf HeaderDropdownSwitchFacility
     */
    onCloseDropdownMenu() {
        this.setState({ open: false });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf HeaderDropdownSwitchFacility
     */
    render() {
        const { facilities } = this.props;

        return (
            <StyleRoot style={styles.container}>

                <div style={styles.wrapper}>
                    <Avatar
                        name={this.state.selectedFacility.name} round={true}
                        size={50}
                        color={colorPalette.secondaryTextColor}
                    />

                    <div style={styles.textHolder}>
                        <label style={styles.label}>{this.state.selectedFacility.name}</label>
                        <small style={styles.small} title={this.state.selectedFacility.address}>{this.state.selectedFacility.address}</small>
                    </div>
                </div>

                {
                    facilities.length > 1 ?
                        <IconButton onTouchTap={this.onOpenDropdownMenu.bind(this)}>
                            <ArrowDropDownIcon color={colorPalette.white} />
                        </IconButton>
                        : null
                }


                {
                    facilities.length > 1 ?
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            animation={PopoverAnimationVertical}
                            onRequestClose={this.onCloseDropdownMenu.bind(this)}
                            style={{ width: '388px', overflow: 'hidden' }}>

                            <Menu>
                                {this.onDisplayListOfFacilities()}
                            </Menu>
                        </Popover>
                        : null
                }

            </StyleRoot>
        );
    }
}

// *** props
HeaderDropdownSwitchFacility.propTypes = {
    facilities: PropTypes.array.isRequired,
    selectedFacility: PropTypes.object.isRequired,
    getSelectedFacility: PropTypes.func.isRequired
};

export default HeaderDropdownSwitchFacility;