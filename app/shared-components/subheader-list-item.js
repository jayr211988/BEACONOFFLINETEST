import React, { PropTypes } from 'react';

// *** material-ui components
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// *** material-ui icons
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SearchIcon from 'material-ui/svg-icons/action/search';
import AddIcon from 'material-ui/svg-icons/content/add';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles
import colorPalette from '../util/styles/color-pallete';

// *** shared components
import ActionFilterProduct from '../shared-components/action-filters/product';

const styles = {
    container: {
        display: 'flex',
        backgroundColor: colorPalette.lightBgColor,
        padding: '10px 40px',
        position: 'relative'
    },

    leftHolder: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',

        title: {
            color: colorPalette.primaryColor,
            fontWeight: 600,
            fontSize: '20px',
        },

        total: {
            margin: '0 30px',
            color: colorPalette.secondaryTextColor
        },

        flatButtonStyle: {
            backgroundColor: colorPalette.white,
            marginLeft: '10px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px'
        },

        flatButtonLabelStyle: {
            color: colorPalette.primaryTextColor
        },
    },

    rightHolder: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',

        searchWrapper: {
            display: 'flex',
            alignItems: 'center'
        }
    },

    addActionButtonWrapper: {
        position: 'absolute',
        top: '-30px',
        right: '40px',
    }
};

/**
 * Subheader For List Items Component
 * 
 * @class SubheaderListItem
 * @extends {React.Component}
 */
@Radium
class SubheaderListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns 
     * 
     * @memberOf SubheaderListItem
     */
    render() {

        const { title,
            itemCount,
            onAdd,
            onRefresh,
            onFilter,
            onSortByName,
            onSearchChange,
            menuItemsOpts,
            sortBySelectedProductType,
            selectedProductType } = this.props;

        return (
            <StyleRoot>
                <div style={styles.container}>
                    <div style={styles.leftHolder}>
                        <h1 style={styles.leftHolder.title}>{title}</h1>

                        <span style={styles.leftHolder.total}>{itemCount} Total</span>

                        { /** REFRESH ACTION */}
                        <span title="REFRESH - Shortcut Key: [R]">
                            <FlatButton
                                label=""
                                style={styles.leftHolder.flatButtonStyle}
                                labelStyle={styles.leftHolder.flatButtonLabelStyle}
                                icon={<RefreshIcon color={colorPalette.secondaryTextColor} />}
                                onTouchTap={onRefresh ? onRefresh.bind(this) : null}
                            />
                        </span>



                        { /** FILTER ACTION */}
                        {/*<FlatButton 
                            label="FILTER"
                            style={styles.leftHolder.flatButtonStyle}
                            labelStyle={styles.leftHolder.flatButtonLabelStyle}
                            icon={<FilterListIcon color={colorPalette.secondaryTextColor} />}
                            onTouchTap={onFilter ? onFilter.bind(this) : null}
                        />*/}

                        { /** SORT ACTION */}
                        <span title="SORT BY NAME - Shortcut Key: [S]">
                            <FlatButton
                                label=""
                                style={styles.leftHolder.flatButtonStyle}
                                labelStyle={styles.leftHolder.flatButtonLabelStyle}
                                icon={<SortIcon color={colorPalette.secondaryTextColor} />}
                                onTouchTap={onSortByName ? onSortByName.bind(this) : null}
                            />
                        </span>
                        {
                            title === 'Clients' ?

                                < ActionFilterProduct
                                    menuItems={menuItemsOpts}
                                    sortBySelectedProductType={sortBySelectedProductType}
                                    selectedProductType={selectedProductType}
                                /> : null
                        }

                    </div>

                    <div style={styles.rightHolder}>
                        { /** SEARCH ACTION */}
                        <div style={styles.rightHolder.searchWrapper}>
                            <TextField
                                hintText="Type name here to search..."
                                underlineFocusStyle={{ borderColor: colorPalette.primaryColor }}
                                onChange={onSearchChange ? this.onSearchChange.bind(this) : null}
                                ref="search"
                            />

                            <SearchIcon color={colorPalette.secondaryTextColor} />
                        </div>
                    </div>

                    { /** ADD ACTION */}
                    <div style={styles.addActionButtonWrapper}>
                        <span title="Shortcut Key: [N]">
                            <FloatingActionButton
                                style={styles.addActionButtonWrapper.floatingActionButtonStyle}
                                backgroundColor={colorPalette.accentColor}
                                onTouchTap={onAdd}>

                                <AddIcon />
                            </FloatingActionButton>
                        </span>

                    </div>
                </div>
            </StyleRoot>
        );
    }

    onSearchChange(event) {
        event.preventDefault();
        const { onSearchChange } = this.props;
        const { search } = this.refs;

        onSearchChange(search.input.value);
    }
}

// *** props
SubheaderListItem.propTypes = {
    title: PropTypes.string.isRequired,
    itemCount: PropTypes.number.isRequired,
    onAdd: PropTypes.func,
    onRefresh: PropTypes.func,
    onFilter: PropTypes.func,
    onSortByName: PropTypes.func,
    onSearchChange: PropTypes.func
};

export default SubheaderListItem;