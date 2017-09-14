import React, { PropTypes } from 'react';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';

import Radium from 'radium';
import moment from 'moment';


const styles={
    tableRowColumn:{
        message : {
            whiteSpace: 'normal',
            width: '80%'
        },
        dateCreated : {
            textAlign: "right",
            width: '20%'
        }
    }
};


/**
 * Phic Transmittals Issues List Item Component
 * 
 * @class PhicTransmittalsIssuesListItem
 * @extends {React.Component}
 */
@Radium
class PhicTransmittalsIssuesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsIssuesListItem
     */
    render() {
        const { issue } = this.props;        

        return (
                <TableRow hoverable={true}>
                    { /** MESSAGE */ }
                    <TableRowColumn style={styles.tableRowColumn.message}>{ issue.message }</TableRowColumn>
                    <TableRowColumn style={styles.tableRowColumn.dateCreated}>{ moment.utc(issue.dateCreated).fromNow() }</TableRowColumn>
                </TableRow>
        );
    }
}

// *** props
PhicTransmittalsIssuesListItem.propTypes = {
    issue : PropTypes.object.isRequired
};

export default PhicTransmittalsIssuesListItem;
