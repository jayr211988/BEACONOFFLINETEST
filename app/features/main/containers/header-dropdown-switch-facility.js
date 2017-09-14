import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from '../duck';

import HeaderDropdownSwitchFacility from '../components/header-dropdown-switch-facility';
import ContentPlaceholderWithAvatar from '../../../shared-components/content-placeholder-with-avatar';

import Radium, { StyleRoot } from 'radium';

// *** custom css styles 
const styles = {
    container : {
        display: 'flex'
    }
};

/**
 * Header Dropdown Switch Facilitity Container
 * 
 * @class HeaderDropdownSwitchFacilityContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.headerDropdownSwitchFacilityReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class HeaderDropdownSwitchFacilityContainer extends React.Component {
    
    /**
     * Component WIll Mount
     * 
     * 
     * @memberOf HeaderDropdownSwitchFacilityContainer
     */
    componentWillMount() {
        const { actions : { getFacilities }, currentUser } = this.props;

        getFacilities(currentUser.id);
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf HeaderDropdownSwitchFacilityContainer
     */
    render() {
        const { mainUserFaciliesRequest, facilities, selectedFacility, actions: { getSelectedFacility } } = this.props;

        let fakeDataselectedFacility = {
            
                address:"88 Karuhatan St. Mc Arthur Hi-Way, Valenzuela City, Metro Manila, 1441 NCR, Philippines",
                bureauOfInternalRevenue:"1234-Demo",
                clientStatus:0,
                clientStatusDescription:"Active",
                companyEmail:"fmc@mailinator.com",
                contactEmail:"rgatchalian@mailinator.com",
                contactFirstname:"Rex",
                contactLastname:"Gatchalian",
                contactMiddlename:null,
                contactMobilePhone:"+639165780058",
                contactWorkPhone:"024448746",
                country:"Philippines",
                createdBy:"Seed",
                createdById:0,
                dateCreated:"2017-06-16T02:28:15.383",
                dateUpdated:"2017-06-16T02:28:15.383",
                emailConfirmToken:null,
                id:1,
                name:"BizBox Medical Center",
                products: [],
                region:"NCR",
                stateProvince:"Metro Manila",
                street:"88 Karuhatan St. Mc Arthur Hi-Way",
                taxIdentificationNo:"123456-3234",
                totalProducts:0,
                townCity:"Valenzuela City",
                updatedBy:null,
                updatedById:0,
                userId:0,
                version:0,
                zipCode:"1441"
            
        }

        let fakeDatafacilities = [{
            address:"88 Karuhatan St. Mc Arthur Hi-Way, Valenzuela City, Metro Manila, 1441 NCR, Philippines",
            bureauOfInternalRevenue:"1234-Demo",
            clientStatus:0,
            clientStatusDescription:"Active",
            companyEmail:"fmc@mailinator.com",
            contactEmail:"rgatchalian@mailinator.com",
            contactFirstname:"Rex",
            contactLastname:"Gatchalian",
            contactMiddlename:null,
            contactMobilePhone:"+639165780058",
            contactWorkPhone:"024448746",
            country:"Philippines",
            createdBy:"Seed",
            createdById:0,
            dateCreated:"2017-06-16T02:28:15.383",
            dateUpdated:"2017-06-16T02:28:15.383",
            emailConfirmToken:null,
            id:1,
            name:"BizBox Offline Transaction",
            products:[
                {
                    createdBy:"Seed",
                    createdById:0,
                    dateCreated:"2017-06-16T02:28:15.393",
                    dateUpdated:"2017-06-16T02:28:15.393",
                    id:1,
                    productType:2,
                    updatedBy:null,
                    updatedById:0,
                    version:0
                }
            ],
            region:"NCR",
            stateProvince:"Metro Manila",
            street:"88 Karuhatan St. Mc Arthur Hi-Way",
            taxIdentificationNo:"123456-3234",
            totalProducts:0,
            townCity:"Valenzuela City",
            updatedBy:null,
            updatedById:0,
            userId:0,
            version:0,
            zipCode:"1441"
        }]
        console.log(window.location.host);
    console.log(window.location);
        return (
            <StyleRoot style={styles.container}>
            
                { mainUserFaciliesRequest ? 
                    <ContentPlaceholderWithAvatar />
                : 
                    <HeaderDropdownSwitchFacility 
                        facilities={fakeDatafacilities} 
                        getSelectedFacility={getSelectedFacility}
                        selectedFacility={fakeDataselectedFacility}
                    />
                }
            </StyleRoot>
        );
    }
}
export default HeaderDropdownSwitchFacilityContainer;
