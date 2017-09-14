import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as duck from '../duck';

// *** dumb components
import Cf2DoctorsList from '../components/list';

import Radium, { StyleRoot } from 'radium';

/**
 * C2f Container
 * 
 * @class Cf2Container
 * @extends {React.Component}
 */
@connect(
    state => state.phicClaimsDetailsCf2DoctorsListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class Cf2DoctorsListContainer extends React.Component {
    
    /**
     * Component Will Mount
     * 
     * 
     * @memberOf Cf2DoctorsListContainer
     */
    // componentWillMount() {
    //     const { 
    //         selectedClaim, actions: { getPhicClaimsDetailsCf2DoctorsList }} = this.props;

    //     getPhicClaimsDetailsCf2DoctorsList(selectedClaim.id);
    // }


    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2Container
     */
    render() {
        const { 
            doctorsList, 
            selectedClaim, 
            basicDialogRequestPending,
            editPhicClaimDetailCf2RequestPending,
            selectedTransmittal,
            summaryMode,
            actions : {
                // *** Actions
                deletePhicClaimsDetailsCf2Doctor
            }} = this.props;

        return (
            <StyleRoot>
                <Cf2DoctorsList 
                    selectedTransmittal={selectedTransmittal}
                    doctorsList={doctorsList} 
                    deletePhicClaimsDetailsCf2Doctor={deletePhicClaimsDetailsCf2Doctor}
                    basicDialogRequestPending={basicDialogRequestPending}
                    selectedClaim={selectedClaim}
                    editPhicClaimDetailCf2RequestPending={editPhicClaimDetailCf2RequestPending}
                    summaryMode={summaryMode}
                    />
            </StyleRoot>
        );
    }w
}

export default Cf2DoctorsListContainer;
