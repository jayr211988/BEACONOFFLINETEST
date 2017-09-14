import React from 'react';
import Radium, {StyleRoot} from 'radium';
import {formatNumber} from 'humanize-plus';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    container: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px',
        width: '550px',
        marginRight: '30px'
    },
    header: {
        padding: '13px 17px',
        borderBottom: '1px dashed rgb(216, 216, 216)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        title: {
            color: colorPalette.primaryColor,
            fontSize : '14px',
            width: '160px',
            fontWeight: 600
        },

        iconMenuStyle: {
            height: '20px',
            width: '20px',
            padding: 0,
            fill: colorPalette.primaryTextColor
        }
    },
    body: {
        padding: '15px',

        item: {
            fontSize: '12px',
            color: colorPalette.primaryTextColor,
            display: 'flex',
            marginBottom: '6px',

            label: {
                color: colorPalette.primaryColor,
                minWidth: '170px',
                display: 'inline-block'
            },
        }
    }
};

@Radium
class ICD10CaseRate extends React.Component {

    render() {
        const { caseRate, deletePHICAllCaseRate, summaryMode } = this.props;
        const ordinalCaseRate = caseRate.caseRateType == 0 ? '1ST' : '2ND';

        return (
            <StyleRoot style={styles.container}>
                <div style={styles.header}>
                    <label style={styles.header.title}>{ordinalCaseRate} CASE RATE</label>

                    { !summaryMode ? 
                        <IconMenu
                            iconButtonElement={
                                <IconButton style={styles.header.iconMenuStyle} iconStyle={styles.header.iconMenuStyle}>
                                    <MoreHorizIcon color={colorPalette.secondaryTextColor}/>
                                </IconButton>
                            }
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                            
                            <MenuItem 
                                leftIcon={ <DeleteIcon color={colorPalette.secondaryTextColor} /> }
                                primaryText="Remove"
                                onTouchTap={deletePHICAllCaseRate.bind(this, caseRate)}
                            />
                        </IconMenu>
                    : null }
                </div>
                <div style={styles.body}>
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>CASE RATE CODE</label>
                        {caseRate.caseRateCode}
                    </div>
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>CASE RATE Group Description</label>
                        {caseRate.caseRateGroupDescription}
                    </div>
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>ICD10</label>
                        {caseRate.icD10Value}
                    </div>
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>ICD10 CODE</label>
                        {caseRate.icD10Code}
                    </div>                    
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>HOSPITAL FEE</label>
                        {formatNumber(caseRate.hospitalFee, 2)}
                    </div>
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>PROFESSIONAL FEE</label>
                        {formatNumber(caseRate.profFee, 2)}
                    </div>
                    <div style={styles.body.item}>
                        <label style={styles.body.item.label}>CASE RATE AMOUNT</label>
                        {formatNumber(caseRate.caseRateAmount, 2)}
                    </div>
                </div>
            </StyleRoot>
        );
    }

}

export default ICD10CaseRate;
