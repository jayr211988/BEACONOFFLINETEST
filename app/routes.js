
//React
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginContainer from './features/login/containers/login';
import ForgotPasswordContainer from './features/forgot-password/containers/forgot-password';
import MainContainer from './features/main/containers/main';
import HomeContainer from './features/home/containers/home';
import EmailConfirmationContainer from './features/email-confirmation/containers/email-confirmation';

import PageNotFound from './shared-components/page-not-found';

//** PRODUCTS */
import Products from './features/products';
import ProductListContainer from './features/products/list/containers/list';

import ClientProducts from './features/client-products';
import ClientProductsListContainer from './features/client-products/list/containers/list';
import ChangePasswordContainer from './features/change-password/containers/change-password';
import MyProfileContainer from './features/my-profile/containers/my-profile';

//***  USERS
import Users from './features/users';
import UsersListContainer from './features/users/list/containers/list';
import UsersNewContainer from './features/users/new/containers/new';
import UsersEditContainer from './features/users/edit/containers/edit';

import Clients from './features/clients';
import ClientsListContainer from './features/clients/list/containers/list';
import ClientsNewContainer from './features/clients/new/containers/new';
import ClientsEditContainer from './features/clients/edit/containers/edit';

import ClientUsers from './features/client-users';
import ClientUsersListContainer from './features/client-users/list/containers/list';
import ClientUsersNewContainer from './features/client-users/new/containers/new';
import ClientUsersEditContainer from './features/client-users/edit/containers/edit';

import PhicTransmittalsListContainer from './features/phic-transmittals/list/containers/list';
import PhicClaimsListContainer from './features/phic-claims/list/containers/list';
import PhicClaimDetailsMainContainer from './features/phic-claims-details/main/containers/main';
// import PhicClaimsDetails from './features/phic-claims-details';

//*** TRANSACTIONS
import PhicTransactionsMainContainer from './features/phic-transactions/main/containers/main';
import PhicTransactionsEclaimsListContainer from './features/phic-transactions/eclaims/containers/list';
import PhicTransactionsEclaimsApiListContainer from './features/phic-transactions/eclaims-api/containers/list';

import PHICMemberInquiryContainer from './features/phic-member-inquiry/containers/phic-member-inquiry';

import Cf2Container from './features/phic-claims-details/cf2/containers/cf2.js';

import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

export default () => {
    return (
        <Router history={history}>  
             {/*<Route path="/" component={Cf2Container}/>*/}

            <Route path="/" component={MainContainer}> 
                <IndexRoute component={HomeContainer}/>

                <Route path="/phic-transmittals" component={PhicTransmittalsListContainer}/>
                <Route path="/phic-claims/:transmittalId" component={PhicClaimsListContainer}/>
                <Route path="/phic-claims-details/:transmittalId/:cf1mode(/:claimId)" component={PhicClaimDetailsMainContainer}/>

            </Route>    
            <Route path="*" component={PageNotFound} />
            
        </Router>
    );
};