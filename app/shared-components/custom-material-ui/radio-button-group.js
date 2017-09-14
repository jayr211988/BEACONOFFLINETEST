import React from 'react';

import {RadioButtonGroup} from 'material-ui/RadioButton'; 


const styles = {
    radioButtonGroupStyle : {
        color: '#f44336'
    }
};

/**
 * 
 *
 * @class CustomRadioButton
 * @extends {React.Component}
 */
class CustomRadioButtonGroup extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value : props.input.value ? props.input.value : ''
        };
    }

    /**
     * 
     * 
     * @param {any} event 
     * @param {any} index 
     * @param {any} value 
     * 
     * @memberOf CustomRadioButton
     */
    handleChange(event, value) {
        this.setState(
            {
                value: value,
            });
        this.props.input.onChange(value);

    }

    render() {
        const { labelPosition, style } = this.props;
        const {error, touched} = this.props.meta;
        let errorText = null;
        if (touched && error)
            errorText = error;

        return(
            <div>
                <RadioButtonGroup
                style={style}
                name={this.props.input.name}
                ref={this.props.input.name}
                onChange={this.handleChange.bind(this)}
                labelPosition={labelPosition}
                valueSelected={this.state.value}>
                
                    {this.props.children}

                </RadioButtonGroup>

                { errorText ? <small style={ styles.radioButtonGroupStyle }> {errorText} </small> : null  }
            </div>


        );
    }
}

export default CustomRadioButtonGroup;