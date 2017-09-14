import React from 'react';
import Radium, { StyleRoot, Style } from 'radium';

// *** material-ui components
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

// *** dumb components
import PhicTransactionsEclaimsApiListItem from './list-item';
import Empty from '../../../../shared-components/placeholders/empty';
import CustomLegend from '../../../../shared-components/custom-legend';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

const styles = {
    container: {
        height: 'calc(100vh - 328px)'
    },

    tableHeaderStyle : {
        backgroundColor: colorPalette.headerBgColor,
    },
    tableBodyStyle:{
        backgroundColor: '#fff'
    },
    tableHoverStyle : {
        'tbody > tr:hover > td > span' : {
            width : '13px !important'
        }
    }    
};

/**
 * Phic Transmittals Component
 * 
 * @class PhicTransmittalsList
 * @extends {React.Component}
 */
@Radium
class PhicTransactionsEclaimsApiList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            search  : ''
        });
    }

    /**
     * Display List Item
     * 
     * 
     * @memberOf PhicTransactionsEclaimsApiList
     */
    onDisplayListItem() {
        const { transactionsEclaimsApiList } = this.props;

        if(this.state.search)
        {
            if (this.state.search.length > 0) {
                return transactionsEclaimsApiList.filter(t => t.transmittalNo && t.transmittalNo.indexOf(this.state.search) > -1 || t.patientName.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                .map((t, i) => (
                        <PhicTransactionsEclaimsApiListItem key={i} transaction={t} /> 
                    ));
            }
        }

        return transactionsEclaimsApiList.map((t, i) => (
            <PhicTransactionsEclaimsApiListItem key={i} transaction={t} /> 
        ));            
    }

    componentWillReceiveProps(nextProps) {        
        this.setState({
            search: nextProps.search
        });        
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicTransmittalsList
     */
    render() {
        const { transactionsEclaimsApiList } = this.props;
        
        const legends = [
            {color: colorPalette.lightGreen, label:'IN PROCESS'},
            {color: colorPalette.pink, label:'RETURN'},
            {color: colorPalette.red, label:'DENIED'},
            {color: colorPalette.lightBrown, label:'WITH CHEQUE'},
            {color: colorPalette.skyBlue, label:'WITH VOUCHER'},
            {color: colorPalette.yellowOrange, label:'VOUCHERING'}
        ];

        return (
            <StyleRoot style={[styles.container, animation.fadeIn]}>
                <Style scopeSelector=".tbl-phic-transactions-eclaimsapi" rules={styles.tableHoverStyle}/>

                { transactionsEclaimsApiList.length == 0 ? 
                    <Empty
                        title="No Transaction Found"
                        subtitle="please try other filter option" />
                    :
                    <Table
                        fixedHeader={true}
                        style={styles.tableHeaderStyle}
                        height="calc(100vh - 378px)"
                        className="tbl-phic-transactions-eclaimsapi">

                        <TableHeader
                            adjustForCheckbox={false}
                            displaySelectAll={false}>

                            <TableRow>
                                <TableHeaderColumn>HOSPITAL CODE</TableHeaderColumn>
                                <TableHeaderColumn>TRANSMITTAL NO.</TableHeaderColumn>
                                <TableHeaderColumn>REFERENCE NO.</TableHeaderColumn>
                                <TableHeaderColumn>SUBMIT DATE</TableHeaderColumn>
                                <TableHeaderColumn>E-TICKET</TableHeaderColumn>
                                <TableHeaderColumn>CLAIM SERIES LHIO</TableHeaderColumn>
                                <TableHeaderColumn>CLAIM TYPE</TableHeaderColumn>
                                <TableHeaderColumn style={{position: 'relative'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                            CLAIM STATUS
                                        <CustomLegend legends={legends}  />
                                    </div>
                                </TableHeaderColumn>

                                <TableHeaderColumn>MEMBER</TableHeaderColumn>
                                <TableHeaderColumn>PATIENT</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody 
                            showRowHover={true}
                            style={styles.tableBodyStyle}
                            displayRowCheckbox={false}>
                
                            { this.onDisplayListItem() }
                        </TableBody>
                    </Table>
                }    
            </StyleRoot>
        );
    }
}
export default PhicTransactionsEclaimsApiList;
