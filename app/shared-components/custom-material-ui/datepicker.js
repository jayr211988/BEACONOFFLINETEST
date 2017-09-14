import React from 'react';
import moment from 'moment';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import InfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';

import colorPallete from '../../util/styles/color-pallete';

const dateFormat = 'YYYY-MM-DD';

const styles = {
    container : {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginRight: '30px'
    },

    iconWrapper : {
        position: 'absolute',
        padding: 0,
        //width: '35px',
        height: '35px',
        right: '-15px',
        bottom: '14px',

        infoOutline: {
            width: '20px',
            height: '20px',
        }
    }
};


/**
 * Custom Datepicker for BizBox Beacon
 * 
 * @class CustomDatePicker
 * @extends {React.Component}
 */
class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datevalue: moment(props.input.value,dateFormat,true).isValid() ? moment(props.input.value).toDate() : null,
            textvalue: props.input.value ? moment(props.input.value).format(dateFormat) : ''
        };
    }

    /**
     * Component Will Recieve Props
     * 
     * @param {any} nextProps 
     * 
     * @memberOf CustomDatePicker
     */
    componentWillReceiveProps(nextProps) {
        if(this.props.input.value !== nextProps.input.value) {
            this.setState({ 
                datevalue: moment(nextProps.input.value,dateFormat,true).isValid() ? moment(nextProps.input.value).toDate() : null,
                textvalue: nextProps.input.value?  moment(nextProps.input.value).format(dateFormat) : '' 
            });
        }
    }

    /**
     * Text Field Change
     * 
     * @param {any} event
     * 
     * @memberOf CustomDatePicker
     */
    onTextFieldChange(event) {
        const isDateValid = moment(event.target.value, dateFormat, true).isValid();
        
        this.setState({
            textvalue: event.target.value,
            datevalue: isDateValid ? moment(event.target.value).toDate() : null
        });
    }

    /**
     * Text Field Blur
     * 
     * 
     * @memberOf CustomDatePicker
     */
    onTextFieldBlur() {
        this.props.input.onChange(this.state.textvalue);
    }

  /**
   * Open Date Picker
   * 
   * 
   * @memberOf CustomDatePicker
   */
    onOpenDatePicker() {
        this.refs.datepicker.openDialog();
    }


    /**
     * Date Picker Change
     * 
     * @param {any} event
     * @param {any} date
     * 
     * @memberOf CustomDatePicker
     */
    datepickerChange(event, date) {    
        const textValue = moment(date).format(dateFormat);

        this.setState({
            textvalue: textValue,
            datevalue: date
        });

        this.props.input.onChange(textValue);
    }


    /**
     * Render
     * 
     * @returns 
     * 
     * @memberOf CustomDatePicker
     */
    render() {
        const {
          hintText, 
          floatingLabelText, 
          maxDate, 
          disabled, 
          isOnTable, 
          textFieldStyle} = this.props;

        const {error, touched} = this.props.meta;

        let errorText = null;
        if(touched && error) errorText = error;

        return (
          <div style={styles.container}>
              <TextField 
                name={this.props.input.name} 
                hintText={`${hintText} (${dateFormat})`} 
                floatingLabelText={!isOnTable ? `${floatingLabelText} (${dateFormat})` : null}
                value={this.state.textvalue}
                onChange={this.onTextFieldChange.bind(this)}
                onBlur={this.onTextFieldBlur.bind(this)}
                errorText={!isOnTable ? errorText ? errorText : null : null}
                disabled={disabled}
                underlineShow={isOnTable? false : true}
                style={textFieldStyle}
              />        

              <div style={styles.iconWrapper}>

                { isOnTable && errorText ? 
                  <span title={errorText}>
                    <InfoOutlineIcon color={colorPallete.accentColor} style={styles.iconWrapper.infoOutline} />
                  </span>
                : null }

                  <IconButton  onTouchTap={this.onOpenDatePicker.bind(this)} disabled={disabled}>
                      <DateIcon color={colorPallete.secondaryTextColor}/>
                  </IconButton>             
              </div>
      
              <DatePicker ref='datepicker' 
                name={this.props.input.name}
                textFieldStyle={{ display: 'none' }}
                value={this.state.datevalue}
                onChange={this.datepickerChange.bind(this)}
                maxDate={maxDate}
                disabled={disabled}
              />
          </div>
        );
    }
}


export default CustomDatePicker;