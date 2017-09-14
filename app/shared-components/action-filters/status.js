import React, { PropTypes, Component } from 'react';

// *** material-ui components
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

// *** material-ui icons
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../../util/styles/color-pallete';

const styles = {
    flatButtonStyle: {
        backgroundColor: colorPalette.white,
        marginLeft: '10px',
        border: '1px solid #e8e8e8',
        lineHeight: '20px',
    },

    flatButtonLabelStyle: {
        color: colorPalette.primaryTextColor
    }
};

/**
 * Action Filter Status Component
 * 
 * @class ActionFilterStatus
 * @extends {Component}
 */
@Radium
class ActionFilterStatus extends Component {
    constructor(props) {
        super(props);

        const {defaultFilter} = this.props;

        this.state = {
            openPopover: false,
            anchorEl: null,
            selectedStatusLabel: defaultFilter.selectedStatusLabel
        };        
    }

    /**
     * Display Menu Items
     * 
     * 
     * @memberOf ActionFilterStatus
     */
    onDisplayMenuItems() {
        const { menuItems } = this.props;

        return menuItems.map((t, i) => (
            <MenuItem key={i} primaryText={t.primaryText} value={t.value} />
        ));
    }

    /**
     * Change Status
     * 
     * @param {any} event
     * @param {any} selected
     * 
     * @memberOf ActionFilterStatus
     */
    onChangeStatus(event, selected) {
        event.preventDefault();
        
        this.setState({ 
            openPopover: false,
            selectedStatusLabel : selected.props.primaryText
        });
        
        this.props.onChange(selected.props.value);
    }

    /**
     * Open Popover
     * 
     * @param {any} event
     * 
     * @memberOf ActionFilterStatus
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
     * @memberOf ActionFilterStatus
     */
    onRequestClosePopover () {
        this.setState({ openPopover: false });
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ActionFilterStatus
     */
    render() {
        const { style, flatButtonStyle } = this.props;

        return (
            <StyleRoot style={style}>
                <FlatButton 
                    onTouchTap={this.onRequestOpenPopover.bind(this)}
                    label={this.state.selectedStatusLabel}
                    style={{ ...styles.flatButtonStyle, ...flatButtonStyle }}
                    labelStyle={styles.flatButtonLabelStyle}
                    icon={<FilterListIcon color={colorPalette.secondaryTextColor} />}
                    title={
                        this.state.selectedStatusLabel == 'ALL' ? 'Showing data for [ALL] status' : 
                        `Showing data with status [${this.state.selectedStatusLabel}]`
                    }
                />

                <Popover
                    open={this.state.openPopover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.onRequestClosePopover.bind(this)}
                    animation={PopoverAnimationVertical}>

                    <Menu onItemTouchTap={this.onChangeStatus.bind(this)}>
                        
                        { this.onDisplayMenuItems() }
                    </Menu>
                </Popover>
            </StyleRoot>
        );
    }
}

// *** props
ActionFilterStatus.propTypes = {
    onChange : PropTypes.func.isRequired,
    menuItems : PropTypes.array.isRequired,
    flatButtonStyle : PropTypes.object,
    style : PropTypes.object
};

export default ActionFilterStatus;