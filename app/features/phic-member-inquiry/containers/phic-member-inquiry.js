
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';
import Helmet from 'react-helmet';

import {hasPHICECLAIMS} from '../../../util/rules';
import { hasPHICEclaimsAccess } from '../../../util/roles';
import UnauthorizedAccess from '../../../shared-components/placeholders/unauthorized-access';





import { productType } from '../../../util/rules';

//dumb component
import PHICMemberInquiry from '../components/phic-member-inquiry';

const styles = {
    container : {
        backgroundColor : '#efefef',
        display: 'flex',
        alignItems: 'flexStart',
        justifyContent: 'center'
    }
};

@connect (
    state => state.phicMemberInquiryReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)

@Radium
class PHICMemberInquiryContainer extends React.Component {
   
    onGetMemberPin(value) {
        if (value) {           
            !value.membermiddlename ? value.membermiddlename = 'N/A' : value.membermiddlename;
        }
        const {  actions: { getMemberPin}, primaryHospitalCode} = this.props;
        value['phicIdentity']  = { hospitalCode :  primaryHospitalCode };       

        getMemberPin(value);
    }  

    componentWillMount() {

        const {
            selectedFacility,
            actions: {
                // *** Actions            
                getHospitalCode,
            }} = this.props;

        const productECLAIMS = selectedFacility.products.filter(x => x.productType == productType.PHICECLAIMS)[0];
        getHospitalCode(productECLAIMS.id);  

    }
    render() {
        const { currentUser, selectedFacility, patientMemberPinRequest, patientMemberPin, patientInfo, actions: {onBack}, memberInquiry } = this.props;
        return  hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility)
                ?  (
                    <StyleRoot style={styles.container}>

                        <Helmet title="PHIC Member Inquiry" />
                        
                            <PHICMemberInquiry
                            memberInquiry={memberInquiry}
                            patientInfo={patientInfo} 
                            onSubmit={this.onGetMemberPin.bind(this)}
                            onBack={onBack}
                            patientMemberPin={patientMemberPin}
                            patientMemberPinRequest={patientMemberPinRequest} />         
                  

                    </StyleRoot>
                ) : <UnauthorizedAccess />;

    }

}

export default PHICMemberInquiryContainer;