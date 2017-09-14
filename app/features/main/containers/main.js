import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/main';
import checkIfUserHasSession from '../../../util/auth';
import LoadingScreen from '../../../shared-components/loading-screen';
import * as duck from '../duck';
import Radium, { StyleRoot } from 'radium';

@connect(
    (state)    => state.mainPageReducer,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)

@Radium
class MainContainer extends React.Component {

    componentWillMount() {
        const { getCurrentUserInfo, checkIfUserExist } = this.props.actions;  

        checkIfUserHasSession();
        getCurrentUserInfo();        
        
    }

    render() {
        const {logoutUser, clients} = this.props.actions;         
        const { children, 
                currentUser, 
                mainCurrentUserInfoRequest,
                mainCurrentUserLogoutRequest, 
                selectedFacility ,location} = this.props;  
                
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
        }
        
        let fakeDatacurrentUser = {
            active:true,
            createdBy:"Seed",
            createdById:0,
            dateCreated:"2017-06-16T02:28:15.36",
            dateUpdated:"2017-07-21T03:07:41.6222862Z",
            email:"gstarr@mailinator.com",
            emailConfirmToken:"",
            emailConfirmed:true,
            firstname:"Gringo",
            fullname:"Gringo Starr",
            id:17,
            lastname:"Starr",
            middlename:null,
            notifyWhenTransmittalIsProcessed:false,
            roles: [ "1-PHICEclaims","1-ClientUser","51-ClientAdmin","52-ClientAdmin"],
            updatedBy:"BEACON2 AUTH SERVER",
            updatedById:0,
            userName:"gstarr",
        }
        return (
            <StyleRoot>
                { mainCurrentUserInfoRequest && !fakeDataselectedFacility ? 
                    <LoadingScreen /> :
                    <Main   
                        location={location}
                        children={children} 
                        currentUser={fakeDatacurrentUser}
                        logoutUser={logoutUser}
                        selectedFacility={fakeDataselectedFacility}
                        mainCurrentUserLogoutRequest={mainCurrentUserLogoutRequest}
                    />
                }
            </StyleRoot>
        );
    }
}
export default MainContainer;
