import React from 'react';
import moment from 'moment';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import TimeIcon from 'material-ui/svg-icons/device/access-time';

import colorPallete from '../../util/styles/color-pallete';

const timeValidateFormat = 'hh:mm A';
const timeDisplayFormat  = 'hh:mm am/pm';

const styles = {
    container : {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      marginRight: '30px'
    },
    iconStyle : {
      height: '10px',
      width:  '10px',
    },

    iconButtonStyle : {
      position: 'absolute',
      padding: 0,
      width: '35px',
      height: '35px',
      right: '-8px',
      bottom: '7px'
    }    
}

/**
 * Custom Timepicker for BizBox Beacon
 * 
 * @class CustomTimePicker
 * @extends {React.Component}
 */
class CustomTimePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datevalue: moment(props.input.value,timeValidateFormat,true).isValid() ? moment(props.input.value).toDate() : null,
      textvalue: props.input.value ? moment(props.input.value).format(timeValidateFormat) : ''
    }
  }

  /**
   * Text Field Change
   * 
   * @param {any} event
   * 
   * @memberOf CustomTimePicker
   */
  textFieldChange(event) {

    const isTimeValid = moment(event.target.value, timeValidateFormat, true).isValid();   
         
    const validRegex = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(event.target.value);

    this.setState(
      {
        textvalue: event.target.value,
        datevalue: isTimeValid && validRegex? moment(event.target.value,timeValidateFormat).toDate() : null
      });
    
      this.props.input.onChange(event.target.value);
  }

  /**
   * Open Time Picker
   * 
   * 
   * @memberOf CustomDatePicker
   */
  openTimePicker() {
    this.refs.timepicker.openDialog()
  }


  /**
   * Time Picker Change
   * 
   * @param {any} event
   * @param {any} time
   * 
   * @memberOf CustomTimePicker
   */
  timepickerChange(event, time) {    

    const textValue = moment(time).format(timeValidateFormat);

    this.setState(
      {
        textvalue: textValue,
        datevalue: time
      });

    this.props.input.onChange(textValue);
  }


  render() {
    
    const {hintText, floatingLabelText, disabled} = this.props;

    const {error, touched} = this.props.meta;

    let errorText = null;

    if(touched && error)
      errorText = error;

    return (
      <div style={styles.container}>
        <TextField 
          name={this.props.input.name} 
          hintText={`${hintText} (${timeDisplayFormat})`} 
          floatingLabelText={`${floatingLabelText} (${timeDisplayFormat})`}
          value={this.state.textvalue}
          onChange={this.textFieldChange.bind(this)}
          errorText={errorText ? errorText : null}
          disabled={disabled}
        />        
        <IconButton style={styles.iconButtonStyle} onTouchTap={this.openTimePicker.bind(this)} disabled={disabled}>
          <TimeIcon color={colorPallete.secondaryTextColor} style={styles.iconStyle}/>
        </IconButton>    
            
        <TimePicker ref='timepicker' 
          name={this.props.input.name}
          textFieldStyle={{ display: 'none' }}
          value={this.state.datevalue}
          onChange={this.timepickerChange.bind(this)}          
          disabled={disabled}
        />
      </div>
    );
  }
}


export default CustomTimePicker;