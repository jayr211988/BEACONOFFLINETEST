import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

import Radium, { StyleRoot } from 'radium';

// *** dumb components
import PhicClaimIssuesList from '../components/list';
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
 * @class PhicClaimsIssuesContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsIssuesListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class PhicClaimsIssuesListContainer extends React.Component {
    
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf PhicClaimsIssuesListContainer
     */
    componentWillMount() {
        const { 
            selectedClaim, 
            actions : { getPhicClaimsIssuesList } } = this.props;

        getPhicClaimsIssuesList(selectedClaim.id);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsIssuesListContainer
     */
    render() {
        const { 
            claimsIssuesList,
            closeDialog, 
            selectedClaim,
            getPhicClaimsIssuesListPending,
            headerMessage,
            errorMessage,
            errorDescription} = this.props;

        return (
            <StyleRoot style={styles.container}>

                { /** LOADING INDICATOR */ }
                { getPhicClaimsIssuesListPending ? 
                     <LoadingIndicatorPerContainer isDialog={true} />
                : 
                    <PhicClaimIssuesList 
                        selectedClaim={selectedClaim}
                        headerMessage={headerMessage}
                        errorMessage={errorMessage}
                        errorDescription={errorDescription}
                        closeDialog={closeDialog} 
                        claimsIssuesList={claimsIssuesList}
                    /> 
                }
            </StyleRoot>
        );
    }
}

// *** props
PhicClaimsIssuesListContainer.propTypes = {
    closeDialog : PropTypes.func.isRequired,
    selectedClaim : PropTypes.object
};

export default PhicClaimsIssuesListContainer;
