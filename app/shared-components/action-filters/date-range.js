import React, { PropTypes } from 'react';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Radium, { StyleRoot } from 'radium';
import DateRange from 'material-ui/svg-icons/action/date-range';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import colorPalette from '../../util/styles/color-pallete';

const styles = {
    flatButtonStyle: {
        backgroundColor: colorPalette.white,
        marginLeft: '10px',
        border: '1px solid #e8e8e8',
        lineHeight: '20px',
        width: '225px'
    },

    flatButtonLabelStyle: {
        color: colorPalette.primaryTextColor
    },

    addActionButtonWrapper: {
        position: 'absolute',
        top: '-30px',
        right: '40px',
    },

    dialogBodyStyle: {
        //minHeight: '440px',
        display: 'flex',
        padding: '24px'
    },

    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '18px',
        margin: 0
    },

    subtitle: {
        color: colorPalette.secondaryTextColor,
        fontSize: '14px'
    },

    container: {
        width: '100%',
        height: '100%'
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '60px',

        left: {
            marginLeft: '12px'
        }
    },

    dialogSectionContainer: {
        width: '100%',

        bodyContainer: {
            display: 'flex',
            justifyContent: 'space-around',

            header: {
                color: colorPalette.primaryColor,
                marginBottom: 0,
                fontWeight: 400
            }
        }
    }
};

@Radium
class ActionFilterDateRange extends React.Component {

    constructor(props) {

        super(props);

        const {defaultFilter} = this.props;

        this.state = {
            openPopover: false,
            anchorEl: null,
            selectedDateRangeLabel : defaultFilter.selectedDateRangeLabel,
            from: null,
            to: null,
            openCustomDateDialog: false
        };


    }









    handleOpenPopover(event) {
        this.setState({
            openPopover: true,
            anchorEl: event.currentTarget
        });
    }

    handleRequestClosePopover() {
        this.setState({
            openPopover: false
        });
    }

    handleChangeDate(label, from, to, event) {
        const { onChange } = this.props;
        const newFrom = moment().add(from).startOf('day').toDate();
        const newTo = moment().add(to).endOf('day').toDate();
        this.setState({
            selectedDateRangeLabel: label,
            from: newFrom,
            to: newTo,
            openPopover: false
        });
        onChange(newFrom, newTo, event);
    }

    handleChangeDateToNull(label, event) {
        const { onChange } = this.props;
        this.setState({
            selectedDateRangeLabel: label,
            from: null,
            to: null,
            openPopover: false
        });
        onChange(null, null, event);
    }

    handleCustomDate() {
        this.setState({
            openCustomDateDialog: true,
            openPopover: false
        });
    }

    handleRequestCloseDialog() {
        this.setState({
            openCustomDateDialog: false
        });
    }

    handleSetCustomDate() {
        const { onChange } = this.props;
        const { from, to } = this.refs;
        const fromStringDate = from.refs.input.props.value;
        const toStringDate = to.refs.input.props.value;

        if (!fromStringDate || !toStringDate) return;

        const newFrom = moment(fromStringDate).startOf('day').toDate();
        const newTo = moment(toStringDate).endOf('day').toDate();

        this.setState({
            from: newFrom,
            to: newTo,
            openCustomDateDialog: false,
            selectedDateRangeLabel: `${moment(newFrom).format('MM/DD/YYYY')} - ${moment(newTo).format('MM/DD/YYYY')}`
        });
        onChange(newFrom, newTo, event);
    }


    render() {
        const { style } = this.props;

        return (
            <StyleRoot style={style}>
                <FlatButton
                    label={this.state.selectedDateRangeLabel}
                    style={styles.flatButtonStyle}
                    labelStyle={styles.flatButtonLabelStyle}
                    icon={<DateRange color={colorPalette.secondaryTextColor} />}
                    onTouchTap={this.handleOpenPopover.bind(this)}
                    title={`Showing data from [${this.state.selectedDateRangeLabel}] up to [TODAY]`}
                />
                <Popover
                    open={this.state.openPopover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClosePopover.bind(this)}
                    animation={PopoverAnimationVertical}
                >
                    <Menu>
                        <MenuItem primaryText="LAST 7 DAYS" onTouchTap={this.handleChangeDate.bind(this, 'LAST 7 DAYS', { days: -7 }, {})} />
                        <MenuItem primaryText="LAST 2 WEEKS" onTouchTap={this.handleChangeDate.bind(this, 'LAST 2 WEEKS', { days: -14 }, {})} />
                        <MenuItem primaryText="LAST MONTH" onTouchTap={this.handleChangeDate.bind(this, 'LAST MONTH', { months: -1 }, {})} />
                        <MenuItem primaryText="3 MONTHS AGO" onTouchTap={this.handleChangeDate.bind(this, '3 MONTHS AGO', { months: -3 }, {})} />
                        <MenuItem primaryText="6 MONTHS AGO" onTouchTap={this.handleChangeDate.bind(this, '6 MONTHS AGO', { months: -6 }, {})} />
                        <MenuItem primaryText="A YEAR AGO" onTouchTap={this.handleChangeDate.bind(this, 'A YEAR AGO', { years: -1 }, {})} />
                        {/*<MenuItem primaryText="BEGINNING OF TIME" onTouchTap={this.handleChangeDateToNull.bind(this, 'BEGINNING OF TIME')} />*/}
                        <MenuItem primaryText="CUSTOM" onTouchTap={this.handleCustomDate.bind(this, 'CUSTOM')} />
                    </Menu>
                </Popover>


                <Dialog
                    open={this.state.openCustomDateDialog}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={this.handleRequestCloseDialog.bind(this)}>

                    <div style={styles.dialogSectionContainer}>
                        <h1 style={styles.title} >Set Custom Date</h1>
                        <p style={styles.subtitle}>Please select date range.</p>
                        <section style={styles.dialogSectionContainer.bodyContainer}>
                            <div>
                                <h4 style={styles.dialogSectionContainer.bodyContainer.header}>From</h4>
                                <DatePicker
                                    container="inline"
                                    mode="landscape"
                                    ref="from"
                                    name="from"
                                    maxDate={new Date()}
                                    autoOk={true} />
                            </div>

                            <div>
                                <h4 style={styles.dialogSectionContainer.bodyContainer.header}>To</h4>
                                <DatePicker
                                    container="inline"
                                    mode="landscape"
                                    ref="to"
                                    name="to"
                                    maxDate={new Date()}
                                    autoOk={true} />
                            </div>
                        </section>
                        <section style={styles.buttonWrapper}>
                            <RaisedButton
                                style={{ marginRight: '20px' }}
                                label="Cancel"
                                style={styles.buttonWrapper.left}
                                onTouchTap={this.handleRequestCloseDialog.bind(this)}
                            />

                            <RaisedButton
                                label="Set"
                                style={styles.buttonWrapper.left}
                                secondary={true}
                                onTouchTap={this.handleSetCustomDate.bind(this)}
                            />
                        </section>
                    </div>
                </Dialog>
            </StyleRoot>
        );

    }
}

ActionFilterDateRange.propTypes = {
    onChange: PropTypes.func,
    style: PropTypes.object,
};

export default ActionFilterDateRange;
