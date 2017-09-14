import React from 'react';
import DocumentsList from '../components/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Radium , {StyleRoot} from 'radium';

import * as duck from '../duck';
import LoadingIndicatorPerContainer from '../../../../../shared-components/loading-indicator-per-container';

@connect(
    state => state.phicClaimsDetailsDocumentsListReducer,
    dispatch => ({actions: bindActionCreators(duck, dispatch)})
)
@Radium
class DocumentsListContainer extends React.Component {
    
    componentWillMount() {
        const { actions: { getPHICDocuments }, selectedClaim } = this.props;

        getPHICDocuments(selectedClaim.id);
    }

    render() {
        const { phicDocuments, 
                getPHICDocumentsRequestPending, 
                selectedClaim, 
                deletePHICDocumentRequestPending, 
                summaryMode, 
                selectedTransmittal,
                actions: { deletePHICDocument } } = this.props;
        
        return (
            <StyleRoot>
                { getPHICDocumentsRequestPending
                    ? <LoadingIndicatorPerContainer />
                    : <DocumentsList
                        phicDocuments={phicDocuments}
                        selectedClaim={selectedClaim}
                        deletePHICDocument={deletePHICDocument}
                        deletePHICDocumentRequestPending={deletePHICDocumentRequestPending}
                        summaryMode={summaryMode} 
                        selectedTransmittal={selectedTransmittal}
                        />
                }
            </StyleRoot>
        );
    }
}

export default DocumentsListContainer;
