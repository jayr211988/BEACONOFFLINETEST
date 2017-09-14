import React from 'react';
//TODO: Fix issue with keyboard accessibility of select field
//import SelectField from './custom-selectfield-core';
import SelectField from 'material-ui/SelectField';


const styles = {
    selectFieldStyle: {
        fontSize: '14px'
    }  
};

/**
 * Custom Select Field
 * 
 * @class CustomSelectField
 * @extends {React.Component}
 */
class CustomSelectField extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: props.input.value ? props.input.value : ''
        };
        
    }

  handleChange(event, index, value) {
    this.setState(
      {
        value: value,
      });
    this.props.input.onChange(value);

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.input.value !== nextProps.input.value)
    {
      this.setState({ value: nextProps.input.value });
    }
  }

  /**
   * Render
   * 
   * @returns
   * 
   * @memberOf CustomSelectField
   */
  render() {
    const {hintText, floatingLabelText, disabled, underlineStyle, style, isOnTable } = this.props;
    const {error, touched} = this.props.meta;
    let errorText = null;
    if (touched && error)
      errorText = error;

    return (
      <div >
        <SelectField
          autoFocus 
          name={this.props.input.name}
          ref={this.props.input.name}
          hintText={hintText}
          floatingLabelText={floatingLabelText}
          style={isOnTable ? styles.selectFieldStyle : style} 
          underlineStyle={isOnTable ? {display: 'none'} : underlineStyle}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          errorText={errorText ? errorText : null}
          disabled={disabled}>
          {this.props.children}
        </SelectField>
      </div>

    );
  }
}

export default CustomSelectField;