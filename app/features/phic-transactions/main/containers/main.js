import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Radium, { StyleRoot } from 'radium';

import PhicTransactionsMain from '../components/main';

import * as duck from '../duck';
import { getPhicTransactionsEclaims } from '../../eclaims/duck';
import { getPhicTransactionsEclaimsApi } from '../../eclaims-api/duck';

/**
 * PHIC Transactions Component
 * 
 * @class PhicTransactions
 * @extends {React.Component}
 */
@connect(
    (state) => state.phicTransactionsMainReducer,
    (dispatch) => ({ actions: bindActionCreators(
        { ...duck, getPhicTransactionsEclaims, getPhicTransactionsEclaimsApi }, dispatch) })
)
@Radium
class PhicTransactionsMainContainer extends React.Component {
    
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransactionsMainContainer
     */
    render() {
        const { 
            children, 
            selectedFacility, 
            currentUser, 
            totalTransactions, 
            location,            

            actions: { 
                getPhicTransactionsEclaims, 
                getPhicTransactionsEclaimsApi,                                                                                      
                searchItem }} = this.props;

        return ( 
            <StyleRoot>             
                <PhicTransactionsMain 
                    location={location}
                    children={children}
                    currentUser={currentUser}
                    selectedFacility={selectedFacility}
                    totalTransactions={totalTransactions}
                    getPhicTransactionsEclaims={getPhicTransactionsEclaims}
                    getPhicTransactionsEclaimsApi={getPhicTransactionsEclaimsApi}                                    
                    searchItem={searchItem}                  
                />
            </StyleRoot> 
        );
    }
}
export default PhicTransactionsMainContainer;
