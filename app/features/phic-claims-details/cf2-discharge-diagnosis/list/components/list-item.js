import React, { PropTypes } from 'react';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Check from 'material-ui/svg-icons/navigation/check';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Undo from 'material-ui/svg-icons/content/undo';
import Filter1 from 'material-ui/svg-icons/image/filter-1';
import Filter2 from 'material-ui/svg-icons/image/filter-2';

import Radium from 'radium';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';
import Tag from '../../../../../shared-components/tag';

const styles = {
    avatarWrapper: {
        paddingTop : '10px',
        paddingBottom: '10px',

        avatarContainer: {
            display: 'flex',
            padding: '12px 0'
        },

        detail: {
            paddingLeft: '12px',
            color: colorPalette.primaryTextColor,
            margin: '0 0 3px 0',
            fontSize: '14px',
        },

        subDetail: {
            paddingLeft: '12px',
            color: colorPalette.secondaryTextColor,
            margin: 0,
            fontSize: '12px',
            height: '16px'
        }
    },

    primaryRequestPending: {
        color: colorPalette.tertiaryTextColor
    },

    actionWrapper: {
        textAlign: 'right',
        width: '48px'
    }
};

/**
 * PHIC Claims List Item Component
 * 
 * @class PhicClaimsListItem
 * @extends {React.Component}
 */
@Radium
class Cf2DischargeDiagnosisListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    setAsPrimary() {
        const { editPrimaryPHICDischargeDiagnosis, selectedClaim, dischargeDiagnosis } = this.props;

        editPrimaryPHICDischargeDiagnosis(selectedClaim.id, dischargeDiagnosis.id);
    }

    remove() {
        const { openRemoveDialog, dischargeDiagnosis } = this.props;

        openRemoveDialog(dischargeDiagnosis);
    }

    addCustomDescription() {
        const { openAddCustomDescriptionDialog, dischargeDiagnosis } = this.props;

        openAddCustomDescriptionDialog(dischargeDiagnosis);
    }

    deleteCustomDescription() {
        const { openDeleteCustomDescription, dischargeDiagnosis } = this.props;

        openDeleteCustomDescription(dischargeDiagnosis);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf PhicClaimsListItem
     */
    render() {

        const { dischargeDiagnosis, editPhicClaimDetailCf2RequestPending, 
            firstCaseRate, secondCaseRate, onOpenNewCaseRateDialog, 
            deletePHICAllCaseRate, isClaimTypeAllCaseRate, summaryMode, selectedClaim } = this.props;
        

        const isCaseRateExists = (caseRate) => {
            return caseRate && caseRate.sourceId == dischargeDiagnosis.id && caseRate.sourceType == 0;
        };
        
        return (
                <TableRow hoverable={true}>

                    { /** ICD10 CODE */ }
                    <TableRowColumn>
                        <span title={dischargeDiagnosis.icD10Code}>{ dischargeDiagnosis.icD10Code }
                        </span>      
                    </TableRowColumn>

                    { /** DESCRIPTION */ }
                    <TableRowColumn style={{display: 'flex', alignItems: 'center'}}>
                        <span title={ dischargeDiagnosis.icD10CustomDescription
                            ? dischargeDiagnosis.icD10CustomDescription
                            : dischargeDiagnosis.icD10Value}>
                        { dischargeDiagnosis.icD10CustomDescription
                            ? dischargeDiagnosis.icD10CustomDescription
                            : dischargeDiagnosis.icD10Value
                        }
                        </span>
                    </TableRowColumn>

                    { /** PRIMARY */ }
                    <TableRowColumn>
                        <div style={{minWidth: '80px', display: 'inline-flex'}}>
                            { dischargeDiagnosis.primary
                                ? (<span style={dischargeDiagnosis._primaryRequestPending ? styles.primaryRequestPending: null}>YES</span>)
                                : null
                            }
                        </div>
                        { firstCaseRate && isCaseRateExists(firstCaseRate)
                            ? <Tag summaryMode={summaryMode} labelText="1ST CASE RATE" handleDelete={deletePHICAllCaseRate.bind(this, firstCaseRate.id, selectedClaim.id)}/>
                            : null
                        }
                        { secondCaseRate && isCaseRateExists(secondCaseRate)
                            ? <Tag summaryMode={summaryMode} labelText="2ND CASE RATE" handleDelete={deletePHICAllCaseRate.bind(this, secondCaseRate.id, selectedClaim.id)}/>
                            : null
                        }
                    </TableRowColumn>

                    { /** ACTIONS */ }
                    {!summaryMode ?  <TableRowColumn style={styles.actionWrapper}>

                        { editPhicClaimDetailCf2RequestPending ? null : 
                        <div>
                            <IconMenu
                                iconButtonElement={
                                    <IconButton>
                                        <MoreVertIcon color={colorPalette.secondaryTextColor}/>
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                
                                <MenuItem 
                                    leftIcon={ <Check color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Set as Primary"
                                    onTouchTap={this.setAsPrimary.bind(this)}
                                />
                                { isClaimTypeAllCaseRate
                                    ? firstCaseRate || isCaseRateExists(secondCaseRate)
                                        ? secondCaseRate || isCaseRateExists(firstCaseRate)
                                            ? null
                                            : 
                                                <MenuItem 
                                                    leftIcon={ <Filter2 color={colorPalette.secondaryTextColor} /> } 
                                                    primaryText="Tag as 2nd Case Rate"
                                                    onTouchTap={onOpenNewCaseRateDialog.bind(this, dischargeDiagnosis, 1)}
                                                />
                                        : 
                                            <MenuItem 
                                                leftIcon={ <Filter1 color={colorPalette.secondaryTextColor} /> } 
                                                primaryText="Tag as 1st Case Rate"
                                                onTouchTap={onOpenNewCaseRateDialog.bind(this, dischargeDiagnosis, 0)}
                                            />
                                    : null
                                }
                                <MenuItem 
                                    leftIcon={ <ModeEdit color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Customize Description"
                                    onTouchTap={this.addCustomDescription.bind(this)}
                                />
                                { dischargeDiagnosis.icD10CustomDescription
                                    ? 
                                        <MenuItem 
                                            leftIcon={ <Undo color={colorPalette.secondaryTextColor} /> } 
                                            primaryText="Revert Description"
                                            onTouchTap={this.deleteCustomDescription.bind(this)}
                                        />
                                    : null
                                }
                                
                                
                                <MenuItem 
                                    leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> } 
                                    primaryText="Remove"
                                    onTouchTap={this.remove.bind(this)}
                                />                                                                
                            
                            </IconMenu>
                        </div>
                        }
                    </TableRowColumn> 
                    : null}
                   
                </TableRow>
        );
    }
}

// *** props
Cf2DischargeDiagnosisListItem.propTypes = {
    summaryMode: PropTypes.bool
    // claim : PropTypes.object.isRequired,
    // openPhicDialogDelete : PropTypes.func.isRequired
};

export default Cf2DischargeDiagnosisListItem;
