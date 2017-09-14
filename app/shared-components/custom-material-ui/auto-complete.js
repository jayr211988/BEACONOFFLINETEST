import React, { Component } from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },

    circularHolder: {
        marginTop: '25px',
        minWidth: '25px',
        paddingLeft: '14px'
    }    
};

/**
 * Custom Auto Complete Component
 * 
 * @class CustomAutoComplete
 * @extends {Component}
 */
class CustomAutoComplete extends Component {
    
    /**
     * On Select Item
     * 
     * @param {any} value 
     * 
     * @memberOf CustomAutoComplete
     */
    onNewRequest(selected) {
        const { onNewRequest } = this.props;

        const refName = this.props.input.name;
        const value = this.refs[refName].state.value;

        this.props.input.onChange(value);

        onNewRequest(selected);
    }

    /**
     * On Change
     * 
     * @param {any} value 
     * 
     * @memberOf CustomAutoComplete
     */
    onUpdateInput(value) {
        const { onUpdateInput } = this.props;

        this.props.input.onChange(value);

        onUpdateInput(value);
    }
    
    render() {
        const {error, touched} = this.props.meta;
        const { 
            dataSource,
            style,
            floatingLabelText,
            hintText,
            dataSourceConfig,
            maxSearchResults,
            isCaseInsensitive,
            searchText,
            isBusy,
            fullWidth,
            disabled
        } = this.props;

        let errorText = null;
        if (touched && error)
            errorText = error;

        return (
            <div style={styles.container}>
                <AutoComplete 
                    disabled={disabled}
                    name={this.props.input.name}
                    ref={this.props.input.name}
                    hintText={hintText}
                    floatingLabelText={floatingLabelText}  
                    fullWidth={fullWidth}     
                    style={style}   
                    dataSource={dataSource}
                    dataSourceConfig={dataSourceConfig} 
                    onUpdateInput={this.onUpdateInput.bind(this)}   
                    maxSearchResults={maxSearchResults}   
                    onNewRequest={this.onNewRequest.bind(this)}
                    filter={isCaseInsensitive ? AutoComplete.caseInsensitiveFilter : undefined}   
                    searchText={searchText}
                    errorText={errorText}
                />   

                { /** LOADING INDICATOR */ }
                <div style={styles.circularHolder}>
                    { isBusy ? 
                        <CircularProgress size={25} thickness={3} />
                    : null }
                </div>                
            </div>
        );
    }
}

export default CustomAutoComplete;