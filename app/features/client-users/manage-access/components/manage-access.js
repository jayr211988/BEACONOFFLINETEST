
// react
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import Avatar from 'react-avatar';

// material 
import Checkbox from 'material-ui/Checkbox';

import colorPalette from '../../../../util/styles/color-pallete';
import {hasPHICECLAIMS} from '../../../../util/rules';
import { hasPHICEclaimsAccess } from '../../../../util/roles';

// icon
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
    hasAccessCell: {
        width: '100px',
        
        checkbox: {
            marginLeft: '20px'
        }
    },

    userContainer: {
        display: 'flex',
        padding: '10px 12px',
        backgroundColor: '#fafafa',
        border: 'dashed 1px #979797',
        alignItems: 'center',
        marginBottom: '25px',
        
        userDetail: {
            width: '100%',
            marginLeft: '15px',

            email: {
                fontSize: '12px',
                color: '#4a4a4a'
            },

            nameContainer: {
                display: 'flex',
                justifyContent: 'space-between',

                name: {
                    fontSize: '14px',
                    color: colorPalette.primaryColor
                },

                username: {
                    fontSize: '12px',
                    color: colorPalette.primaryTextColor
                }
            }
        }
    }
};

@Radium
class ClientUsersManageAccess extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { selectedClientUser, selectedFacility } = this.props;

        return (
            <StyleRoot>
                 <section>
                     <div style={styles.userContainer}>
                         <Avatar 
                            color={ colorPalette.secondaryTextColor }
                            name={ selectedClientUser.fullname }
                            size={ 45 }
                            round={ true }
                            style={{overflow: 'hidden', verticalAlign: 'middle'}}
                            />
                         <div style={styles.userContainer.userDetail}>
                             <div style={styles.userContainer.userDetail.nameContainer}>
                                 <label style={styles.userContainer.userDetail.nameContainer.name}>{selectedClientUser.fullname}</label>
                                 <label style={styles.userContainer.userDetail.nameContainer.username}>{selectedClientUser.userName}</label>
                             </div>
                             <label style={styles.userContainer.userDetail.email}>{selectedClientUser.email}</label>
                         </div>
                     </div>
                     
                    <div style={{height: '450px'}}>
                        <Table
                            height={'300px'}
                            selectable={false}
                            multiSelectable={false}>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn style={styles.hasAccessCell} tooltip="HAS ACCESS">HAS ACCESS</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="DESCRIPTION">DESCRIPTION</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={false}
                                showRowHover={true}
                                stripedRows={false}>
                                {  hasPHICECLAIMS(selectedFacility)   ? 
                                        <TableRow>                                                                        
                                            <TableRowColumn style={styles.hasAccessCell}>
                                                <Checkbox
                                                    defaultChecked={hasPHICEclaimsAccess(selectedClientUser, selectedFacility)}
                                                    onCheck={this.handlePHICEclaimsAccess.bind(this)}
                                                    style={styles.hasAccessCell.checkbox} />
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                PhilHealth e-Claims
                                            </TableRowColumn>                                                                                                                                            
                                        </TableRow>
                                    : null 
                                }
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </StyleRoot>
        );
    }

    handlePHICEclaimsAccess(event, isChecked) {
        const { editPHICEclaimsAccess, selectedClientUser, selectedFacility } = this.props;

        editPHICEclaimsAccess(selectedClientUser.id, selectedFacility.id, isChecked);
    }
}

export default ClientUsersManageAccess;
