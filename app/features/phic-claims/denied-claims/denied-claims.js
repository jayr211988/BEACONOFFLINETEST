import React from 'react';

import Radium, { StyleRoot } from 'radium';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import moment from 'moment';

import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';

import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    StyleRoot:{
        width: '768px',
        height: '450px',
    },
    
    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'  
    },

    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    dialogBodyStyle: {
        padding: '24px'
    },

    labelSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: colorPalette.lightBgColor,
        border: `1px dashed ${colorPalette.tertiaryTextColor}`,
        marginBottom: '5px',

        warning:{
            display: 'flex',
            alignItems: 'center'
        },

        smallInfoIcon: {
            color: colorPalette.accentColor,
            marginRight: '15px'
        },

        label: {
            color: colorPalette.accentColor,
            fontSize: '14px',
            fontWeight: 'bold',
        },
        reason:{
            margin: '5px 0 0 40px ',
            fontSize: '12px',
            letterSpacing: 'normal',
            color: colorPalette.primaryTextColor,
            textTransform: 'uppercase'
        }
    },
    deniedDetails:{
        marginLeft: '40px',
        padding: '20px',

        content:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            label:{
                fontSize: '14px',
                color: '#4a4a4a',
                width: '35%'
            },
            p:{
                fontSize: '14px',
                color: '#4a4a4a',
                textAlign: 'left',
                width: '65%',
                margin: '2.5px 0'
            }
        }
    }
};

@Radium
class DeniedClaimsContainer extends React.Component {

    /**
     * Creates an instance of DeniedClaimsContainer.
     * 
     * @param {any} props
     * 
     * @memberOf DeniedClaimsContainer
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render Denied Claims
     * 
     * @returns
     * 
     * @memberOf DeniedClaimsContainer
     */
    render() {
        const { close, open, selectedClaim } = this.props;

        return (
            <StyleRoot style={styles.StyleRoot}>
                <Dialog
                    open={open}
                    modal={false}
                    bodyStyle={styles.dialogBodyStyle}
                    onRequestClose={close}>

                    <div style={styles.titleContainer}>
                        <div>
                            <h1 style={styles.title}>Claim Status: {selectedClaim.claimStatusDescription}</h1>
                        </div>      
                        <div>
                            <IconButton>
                                <Close onTouchTap={close} />
                            </IconButton>
                        </div>
                    </div>
                    <div>
                        <div style={styles.labelSectionContainer}>
                            <div style={styles.labelSectionContainer.warning}>
                                <ActionInfoOutline style={styles.labelSectionContainer.smallInfoIcon} />
                            <label style={styles.labelSectionContainer.label}>Denied Date</label>
                            </div>
                            {
                                <p style={styles.labelSectionContainer.reason}>Date Updated - {moment(selectedClaim.dateUpdated).format('MM/DD/YYYY')}</p> 
                            }
                        </div>

                        <div style={styles.labelSectionContainer}>
                            <div style={styles.labelSectionContainer.warning}>
                                <ActionInfoOutline style={styles.labelSectionContainer.smallInfoIcon} />
                            <label style={styles.labelSectionContainer.label}>Denied Reason</label>
                            </div>
                            {
                                selectedClaim.deniedReasons.map((deniedReason,index)=>{
                                    return <p key={index} style={styles.labelSectionContainer.reason}>{deniedReason.reason}</p>
                                })
                            }
                        </div>
                        <div style={styles.deniedDetails}>
                            <div style={styles.deniedDetails.content}>
                                <label style={styles.deniedDetails.content.label}>SERIES LHIO NO.</label>
                                <p style={styles.deniedDetails.content.p}>{selectedClaim.claimSeriesLhio}</p>
                            </div>
                            <div style={styles.deniedDetails.content}>
                                <label style={styles.deniedDetails.content.label}>CLAIM NO.</label>
                                <p style={styles.deniedDetails.content.p}>{selectedClaim.id}</p>
                            </div>
                            <div style={styles.deniedDetails.content}>
                                <label style={styles.deniedDetails.content.label}>PATIENT</label>
                                <p style={styles.deniedDetails.content.p}>{selectedClaim.phiccF1.memberFullname}</p>
                            </div>
                            <div style={styles.deniedDetails.content}>
                                <label style={styles.deniedDetails.content.label}>ADMISSION DATE</label>
                                <p style={styles.deniedDetails.content.p}>{moment(selectedClaim.phiccF2.admissionDateTime).format('MM/DD/YYYY')}</p>
                                
                            </div>
                            <div style={styles.deniedDetails.content}>
                                <label style={styles.deniedDetails.content.label}>DISCHARGED DATE</label>
                                <p style={styles.deniedDetails.content.p}>{moment(selectedClaim.phiccF2.dischargeDateTime).format('MM/DD/YYYY')}</p>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </StyleRoot>
        );
    }
}

export default DeniedClaimsContainer;
