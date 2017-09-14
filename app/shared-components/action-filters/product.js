
import React, { } from 'react';

// *** material-ui components
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import Radium, { StyleRoot } from 'radium';

// *** material-ui icons
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import Check from 'material-ui/svg-icons/navigation/check';

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


class ActionFilterProduct extends React.Component {
    constructor(props) {
        super(props);

        const { defaultFilter } = this.props;
        this.state = {
            openPopover: false,
            anchorEl: null,
            selectedStatusLabel: 'FILTER BY PRODUCT TYPE'
        };
    }

    /**
   * Display Menu Items
   * 
   * 
   * @memberOf ActionFilterStatus
   */
    onDisplayMenuItems() {
        const { menuItems, selectedProductType } = this.props;

        if (selectedProductType.length == 0) {

            let selectedProductType1 = [0];
            return menuItems.map((t, i) => (

                <MenuItem
                    checked={t.value == 10}
                    key={i}
                    primaryText={t.primaryText}
                    value={t.value}
                    insetChildren={true}
                />

            ));
        }
        else {
            if (menuItems) {
                return menuItems.map((t, i) => (
                    <MenuItem
                        checked={selectedProductType.some((p) => p == t.value)}
                        key={i}
                        primaryText={t.primaryText}
                        value={t.value}
                        insetChildren={true} />

                ));
            }
        }
        //}
    }



    /**
     * Change Status
     * 
     * @param {any} event
     * @param {any} selected
     * 
     * @memberOf ActionFilterStatus
     */
    onChangeProduct(event, selected) {
        event.preventDefault();

        this.setState({
            openPopover: false,
            selectedStatusLabel: selected.props.primaryText
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

    onChangeProductType(arr, x, index) {
        const { sortBySelectedProductType, menuItems } = this.props;
        sortBySelectedProductType(menuItems[index].value);

    }

    /**
   * Close Popover
   * 
   * 
   * @memberOf ActionFilterStatus
   */
    onRequestClosePopover() {
        this.setState({ openPopover: false });
    }


    render() {

        const { flatButtonStyle } = this.props;


        return (
            <StyleRoot>
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
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.onRequestClosePopover.bind(this)}
                    animation={PopoverAnimationVertical}>

                    <Menu
                        onItemTouchTap={this.onChangeProductType.bind(this)}
                        width={320} >
                        {this.onDisplayMenuItems()}
                    </Menu>
                </Popover>

            </StyleRoot>
        );
    }
}

export default ActionFilterProduct;