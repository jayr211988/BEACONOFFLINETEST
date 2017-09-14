import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Radium, { StyleRoot } from 'radium';

// *** dumb components
import PhicTransmittalsIssuesList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';

// *** custom css styles
const styles = { 
    container : {
        width: '100%',
        height: '100%'
    }
};

/**
 * Claims Issues List Container
 * 
 * @class PhicTransmittalsIssuesListIssuesContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicTransmittalsIssuesListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicTransmittalsIssuesListContainer extends React.Component {
    
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicTransmittalsIssuesListContainer
     */
    componentWillMount() {
        const { 
            selectedTransmittal, 
            actions : { getPhicTransmittalsIssuesList } } = this.props;

        getPhicTransmittalsIssuesList(selectedTransmittal.id);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsIssuesListContainer
     */
    render() {
        const { 
            closeDialog, 
            selectedTransmittal,
            transmittalsIssuesList,
            getPhicTransmittalsIssuesListRequestPending } = this.props;

        return (
            <StyleRoot style={styles.container}>
                { getPhicTransmittalsIssuesListRequestPending ? 
                    <LoadingIndicatorPerContainer isDialog={true} />
                : 
                    <PhicTransmittalsIssuesList 
                        selectedTransmittal={selectedTransmittal}
                        closeDialog={closeDialog} 
                        transmittalsIssuesList={transmittalsIssuesList}
                    />                 
                }          
            </StyleRoot>
        );
    }
}

// *** props
PhicTransmittalsIssuesListContainer.propTypes = {
    closeDialog : PropTypes.func.isRequired,
    selectedTransmittal : PropTypes.object
};

export default PhicTransmittalsIssuesListContainer;
