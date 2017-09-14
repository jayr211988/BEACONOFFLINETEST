import React, { PropTypes } from 'react';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';

import Radium from 'radium';

/**
 * Phic Claims Issues List Item Component
 * 
 * @class PhicClaimsIssuesListItem
 * @extends {React.Component}
 */
@Radium
class PhicClaimsIssuesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsListItem
     */
    render() {
        const { issue } = this.props;        

        return (
                <TableRow hoverable={true}>

                    { /** CATEGORY */ }
                    <TableRowColumn style={{ width: '26%' }}>
                        { issue.categoryDescription }
                    </TableRowColumn>

                    { /** MESSAGE */ }
                    <TableRowColumn style={{ whiteSpace: 'initial', width: '74%' }}>
                        <span title={issue.message} >
                        { issue.message }
                        </span>
                    </TableRowColumn>

                </TableRow>
        );
    }
}

// *** props
PhicClaimsIssuesListItem.propTypes = {
    issue : PropTypes.object.isRequired
};

export default PhicClaimsIssuesListItem;
