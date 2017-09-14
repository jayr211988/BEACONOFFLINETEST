import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import ChargesWrapper from '../components/wrapper';

import Radium, { StyleRoot } from 'radium';

/**
 * C2f Container
 * 
 * @class ChargesContainer
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsChargesReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ChargesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChargesContainer
     */
    render() {    
        const {selectedClaim,summaryMode} = this.props;

        return (
            <StyleRoot>
                <ChargesWrapper selectedClaim={selectedClaim} summaryMode={summaryMode}/>
            </StyleRoot>
        );
    }
}

export default ChargesContainer;
