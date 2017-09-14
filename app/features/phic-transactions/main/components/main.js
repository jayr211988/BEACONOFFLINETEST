import React from 'react';

import Radium, { StyleRoot } from 'radium';

import Subheader from './subheader';



/**
 * 
 * 
 * @class PhicTransactions
 * @extends {React.Component}
 */
@Radium
class PhicTransactionsMain extends React.Component {
    constructor(props) {
        super(props);
    }

    onSearch(value) {   
        const {searchItem} = this.props;
        searchItem(value);        
    }


    render() {
        const { 
            location,
            children, 
            selectedFacility, 
            currentUser, 
            totalTransactions, 
            getPhicTransactionsEclaims,
            getPhicTransactionsEclaimsApi } = this.props;

        return ( 
            <StyleRoot> 
                <Subheader 
                    location={location}
                    selectedFacility={selectedFacility}
                    totalTransactions={totalTransactions}
                    getPhicTransactionsEclaims={getPhicTransactionsEclaims}
                    getPhicTransactionsEclaimsApi={getPhicTransactionsEclaimsApi}                                                   
                    selectedFacility={selectedFacility}
                    currentUser={currentUser}
                    searchChange={this.onSearch.bind(this)}
                />
            
                { children && React.cloneElement(children, { selectedFacility, currentUser }) } 
            </StyleRoot> 
        );
    }
}
export default PhicTransactionsMain;
