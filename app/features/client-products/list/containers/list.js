import React from 'react';
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux';

import * as duck from '../duck';

// *** dumb componnet
import ClientProductsList from '../components/list';
import LoadingIndicatorPerContainer from '../../../../shared-components/loading-indicator-per-container';
import UnauthorizedAccess from '../../../../shared-components/placeholders/unauthorized-access';

import {isClientUser} from '../../../../util/roles';

import Radium, { StyleRoot } from 'radium';

/**
 * Client Products Container
 * 
 * @class ClientProductsListContainer
 * @extends {React.Component}
 */
@connect (
    state => state.clientProductsListReducer,
    //dispatch => ({actions: bindActionCreators({ ...clientProductsDuck, ...productsDuck }, dispatch)})
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class ClientProductsListContainer extends React.Component {
    
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf ClientProductsListContainer
     */
    componentWillMount() {
        const { 
            selectedFacility,
            actions : { getClientProductsList }
        } = this.props;

        getClientProductsList(selectedFacility.id);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ClientProductsListContainer
     */
    render() {
        const { 
            clientProductsList, 
            selectedFacility, 
            getClientProductsListRequestPending,
            refreshClientProductsListRequestPending,
            clientProductsBasicDialogPending,
            currentUser,
            
            actions : {
                // *** Actions
                refreshClientProductsList,
                editPhicEclaimsApiClientSecret,
                deletePhicEclaimsApi,
                deletePhicEclaims,
                totalHospitalCodeCount
            }} = this.props;
            
        return (    
            <StyleRoot>           
                { getClientProductsListRequestPending ? 
                    <LoadingIndicatorPerContainer />
                : isClientUser(currentUser, selectedFacility)
                        ? <UnauthorizedAccess />
                        :
                        <ClientProductsList 
                            productsList={clientProductsList}
                            refreshProductsList={refreshClientProductsList}
                            refreshProductsListRequestPending={refreshClientProductsListRequestPending}
                            selectedFacility={selectedFacility}
                            deletePhicEclaimsApi={deletePhicEclaimsApi}
                            editPhicEclaimsApiClientSecret={editPhicEclaimsApiClientSecret}
                            deletePhicEclaims={deletePhicEclaims}
                            clientProductsBasicDialogPending={clientProductsBasicDialogPending}
                            totalHospitalCodeCount={totalHospitalCodeCount}
                            currentUser={currentUser}
                        /> 
                }            
            </StyleRoot>
        );
    }
}

export default ClientProductsListContainer;