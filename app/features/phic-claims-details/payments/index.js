

import React from 'react';

import PaymentsListContainer from '../payments-official-receipt/list/containers/list';

class Payments extends React.Component {
    render() {
        const {selectedClaim, selectedTransmittal,summaryMode} = this.props;
        
        return (
            <PaymentsListContainer 
                selectedClaim={selectedClaim}
                selectedTransmittal={selectedTransmittal}
                summaryMode={summaryMode}
            />
        );
    }
}

export default Payments;