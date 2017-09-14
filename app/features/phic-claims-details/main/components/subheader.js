import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

// *** material-ui components
import { Tab, Tabs } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';

import Radium, { StyleRoot } from 'radium';
import ActionInfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';
import ActionInfoCheckCircleIcon from 'material-ui/svg-icons/action/check-circle';

// *** dumb components
import PhicClaimsIssuesList from '../../../phic-claims-issues';
import CustomLegend from '../../../../shared-components/custom-legend';

import { claimStatus, transmittalStatus } from '../../../../util/data';
import { isPlural } from '../../../../util/rules';

import MouseTrap from 'mousetrap';

// *** custom css styles
import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    container: {
        minHeight : '55px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorPalette.lightBgColor,
        position: 'fixed',
        width: '100%',
        marginTop: '128px',
        zIndex: '10'
    },

    firstLayer: {
        minHeight : '55px',
        display: 'flex',
        padding: '12px 40px',
        borderBottom: `1px solid ${colorPalette.mainBgColor}`
    },

    secondLayer: {
        display: 'flex',
        padding: '0 35px',

        tabWrapper: {
            //width: '50%',

            tabsTabItemContainerStyle: {
                backgroundColor: colorPalette.lightBgColor
            },

            tabStyle: {
                color: colorPalette.primaryColor,
            },

            inkBarStyle: {
                backgroundColor: colorPalette.accentColor,
            }
        }
    },

    leftHolder: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        back: {
            color: colorPalette.primaryColor,
            fontSize: '12px',
            cursor: 'pointer',
        },

        title: {
            color: colorPalette.primaryColor,
            fontWeight: 600,
            fontSize: '20px',
            margin: '6px 0',
            letterSpacing: '0.5px'
        }  
    },

    centerHolder: {
        width: '40%',

        userWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            transmittal: {
                color: colorPalette.primaryColor,
                letterSpacing: '.5px',
                fontWeight: 600
            },

            package: {
                color : colorPalette.primaryTextColor,
                lineHeight: '2em',
                letterSpacing: '.2px'
            },  

            status: {
                color: colorPalette.primaryTextColor,
                letterSpacing: '.2px',
            }
        }
    },

    rightHolder: {
        width: '30%',
        display: 'flex',  
        alignItems: 'flex-end',
        flexDirection: 'column',
    
        label: {
            color: colorPalette.primaryColor,
            letterSpacing: '.5px',
            fontWeight: 600
        },   

        h2:{
            color: colorPalette.primaryTextColor,
            fontWeight: 400,
            margin: '3px 0 0',
            fontSize: '14px',
        }
    },
    claimStatusDropdownWarpper: {
        position: 'absolute',
        marginLeft: '-49px',
        marginTop: '-6px',
        background: 'transparent'
    }
};

@Radium
class SubHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subHeaderActive: '0%',
            openClaimsIssues : false     
        };
    }



    componentDidMount() {
        //Clear Key bindings from Claims List
        Mousetrap.bind(['m'], ()=>{});
        Mousetrap.bind(['d'], ()=>{});
        Mousetrap.bind(['b'], this.onBack.bind(this));
    }


    /**
     * Open Claims Issue Dialog
     * 
     * 
     * @memberOf SubHeader
     */
    onOpenClaimsIssuesDialog() {
        this.setState({ openClaimsIssues : true });
    }

    /**
     * Close Claims Issue Dialog
     * 
     * 
     * @memberOf SubHeader
     */
    onCloseClaimsIssuesDialog() {
        this.setState({ openClaimsIssues : false });
    }


    componentWillReceiveProps (){
        this.getSelectedSubHeaderActive();
    }

    getSelectedSubHeaderActive(){
        if(location.hash == '#cf1Navigation'){
            this.setState({subHeaderActive: '0%'});
        }else if(location.hash == '#cf2Navigation'){
            this.setState({subHeaderActive: '20%'});
        }else if(location.hash == '#charges'){
            this.setState({subHeaderActive:  '40%'});
        }else if(location.hash == '#payments'){
            this.setState({subHeaderActive:  '60%'});
        }
        else if(location.hash == '#documentsNavigation'){
            this.setState({subHeaderActive:  '80%'});
        }
    }

    /**
     * Back
     * 
     * 
     * @memberOf Subheader
     */
    onBack() {
        const {selectedTransmittal} = this.props;
        browserHistory.push(`/phic-claims/${selectedTransmittal.id}`);
    }

    onNewClaims() {
        const { claimsId } = this.props;
        browserHistory.push(`/phic-claims-details/${claimsId}`);
    }

    selectedTransmittalColorCode() {
        const { selectedTransmittal } = this.props;
        var color = null;        

        switch (selectedTransmittal.transmittalStatus) {
        case transmittalStatus.draft:
            color = colorPalette.gray;       
            break;

        case transmittalStatus.transmitting:
            color = colorPalette.greenYellow;       
            break;

        case transmittalStatus.transmitted:
            color = colorPalette.orange;       
            break;

        case transmittalStatus.transmitError:
            color = colorPalette.darkRed;       
            break;  
        case transmittalStatus.complete:
            color = colorPalette.green;       
            break;                
        default:
            break;
        }

        return color;
         
    }
    selectedElligleColorCode() {
        
        const { selectedClaim } = this.props;

        var colorElligible;

        if(selectedClaim.claimStatus !== null) {
            

            switch (selectedClaim.claimStatus) {
            case claimStatus.memberNotValid:
                colorElligible = colorPalette.lightGray;       
                break;
            case claimStatus.memberValid:
                colorElligible = colorPalette.lightBlue;       
                break;
            case claimStatus.eligible:
                colorElligible = colorPalette.yellow;       
                break;
            case claimStatus.notEligible:
                colorElligible = colorPalette.black;       
                break;  
            case claimStatus.inProcess:
                colorElligible = colorPalette.lightGreen;       
                break;  
            case claimStatus.return:
                colorElligible = colorPalette.pink;       
                break;
            case claimStatus.denied:
                colorElligible = colorPalette.red;       
                break;
            case claimStatus.withCheque:
                colorElligible = colorPalette.lightBrown;       
                break;  
            case claimStatus.withVoucher:
                colorElligible = colorPalette.skyBlue;       
                break;
            case claimStatus.vouchering:
                colorElligible = colorPalette.yellowOrange;       
                break;
            case claimStatus.conditional:
                colorElligible = colorPalette.violet;
                break;               
            default:
                break;
            }
   
            return colorElligible;
        }
    }

    render() {
        const {selectedTransmittal, selectedClaim, params, claimsIssuesTotal} = this.props;
        let status = this.selectedTransmittalColorCode();
        let statusIsEligible;        
        let selectedClaimStatus;

        if(selectedClaim) {
            statusIsEligible = this.selectedElligleColorCode();
            selectedClaimStatus = selectedClaim.claimStatus;
        }
        
        const legendsEligible = [{color: colorPalette.lightGray, label:'MEMBER NOT VALID'},
            {color: colorPalette.lightBlue, label:'MEMBER VALID'},
            {color: colorPalette.yellow, label:'ELIGIBLE'},
            {color: colorPalette.black, label:'NOT ELIGIBLE'},
            {color: colorPalette.violet, label: 'CONDITIONAL'},
            {color: colorPalette.lightGreen, label:'IN PROCESS'},
            {color: colorPalette.pink, label:'RETURN'},
            {color: colorPalette.red, label:'DENIED'},
            {color: colorPalette.lightBrown, label:'WITH CHEQUE'},
            {color: colorPalette.skyBlue, label:'WITH VOUCHER'},
            {color: colorPalette.yellowOrange, label:'VOUCHERING'}];

        const legends = [{color: colorPalette.gray,label: 'DRAFT'},
            {color: colorPalette.greenYellow,label: 'TRANSMITTING'},
            {color: colorPalette.orange,label: 'TRANSMITTED'},
            {color: colorPalette.darkRed,label: 'TRANSMIT ERROR'},
            {color: colorPalette.green,label: 'COMPLETE'}
        ];

        const { subHeaderActive } = this.state;

        return(
              <StyleRoot style={styles.container}>
                <section style={styles.firstLayer}>
                    { /** LEFT HOLDER */ }
                    <div style={styles.leftHolder}>
                        <a style={styles.leftHolder.back} onClick={this.onBack.bind(this)} title="Shortcut Key: [B]">Back to Claim list</a>
                        <h1 style={styles.leftHolder.title}>PHIC Claims</h1>
                    </div>

                    { /** CENTER HOLDER */ }
                    <div style={styles.centerHolder}>
                        <div style={styles.centerHolder.userWrapper}>
                            <label style={styles.centerHolder.userWrapper.transmittal}>{`TR NO. ${selectedTransmittal.transmittalNumber}`}</label>
                            <small style={styles.centerHolder.userWrapper.package}>{ `${selectedTransmittal.phicPackageDescription} PACKAGE` }</small>
                            <small style={styles.centerHolder.userWrapper.status}>
                                <div style={styles.claimStatusDropdownWarpper}>
                                    <CustomLegend legends={legends} iconChange={true} statusColor={status}/>
                                </div>
                                {selectedTransmittal.transmittalStatusDescription}
                            </small>
                        </div>
                    </div>

                    { /** RIGHT HOLDER */ }
                    <div style={styles.rightHolder}>
                        <label style={styles.rightHolder.label}>{'CLAIM NO.'}{params.claimId}</label>
                        <h2 style={styles.rightHolder.h2}>
                            <div style={[styles.claimStatusDropdownWarpper,{marginTop: '-5px'}]}>
                                <CustomLegend legends={legendsEligible} iconChange={true} statusColor={statusIsEligible} leftPosition={'-160px'}/>
                            </div>

                            { selectedClaim ? selectedClaim.claimStatusDescription : 'NEW'}
                         </h2>

                        { claimsIssuesTotal > 0 ?
                            <FlatButton 
                                secondary={true}
                                icon={<ActionInfoOutlineIcon color={colorPalette.accentColor} />}
                                label={ `${claimsIssuesTotal} ${isPlural('ISSUE', claimsIssuesTotal)} FOUND` }
                                style={{ marginRight: '-16px' }}
                                onTouchTap={this.onOpenClaimsIssuesDialog.bind(this)}
                            />
                            :
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ActionInfoCheckCircleIcon color={colorPalette.primaryColor}/>
                                <label style={{color: colorPalette.primaryColor, marginLeft:'5px'}} >NO ISSUE FOUND</label>
                            </div>
                        }      
                    </div>                       
                </section>

                <section style={styles.secondLayer}>
                    { /** TABS */ }
                        {
                            ( params.cf1mode === 'new-claim-member' || params.cf1mode === 'new-claim-dependent' ) ||
                            ( selectedClaimStatus !== claimStatus.eligible && selectedClaimStatus !== claimStatus.conditional ) &&
                             selectedTransmittal.transmittalStatus !== transmittalStatus.transmitted ?

                                
                                <div style={{width: '10%'}}>
                                    <Tabs value={this.state.tabValue}
                                        tabItemContainerStyle={styles.secondLayer.tabWrapper.tabsTabItemContainerStyle}
                                        inkBarStyle={styles.secondLayer.tabWrapper.inkBarStyle}>                            
                                        { /** CF1 */ }
                                        <Tab 
                                            label="CF1" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}   
                                            href="#cf1Navigation"                      
                                        />
                                    </Tabs>
                                </div>
                            :
                                <div style={{width: '40%', maxWidth: '700px'}}>
                                    <Tabs value={this.state.tabValue}                                            
                                        tabItemContainerStyle={styles.secondLayer.tabWrapper.tabsTabItemContainerStyle}
                                        inkBarStyle={{color: colorPalette.accentColor, left: subHeaderActive}}
                                        initialSelectedIndex={0}>                            
                                        { /** CF1 */ }
                                        <Tab 
                                            label="CF1" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}   
                                            href="#cf1Navigation"                     
                                        />
                                        { /** CF2 */ }
                                        <Tab 
                                            label="CF2" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}                                                                  
                                                href="#cf2Navigation"
                                            />  
                                        { /** CHARGES */ }
                                        <Tab 
                                            label="CHARGES" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}                                                                  
                                            href="#charges"
                                            />
                                        { /** DOCUMENTS */ }
                                        <Tab 
                                            label="PAYMENTS" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}                                                                  
                                            href="#payments"
                                            />
                                        { /** DOCUMENTS */ }
                                        <Tab 
                                            label="DOCUMENTS" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}                                                                  
                                            href="#documentsNavigation"
                                            />

                                            { /**
                                            <Tab 
                                                label="ALL CASE RATE" 
                                                style={styles.secondLayer.tabWrapper.tabStyle}                                                                  
                                                href="#allCaseRate"
                                            />

                                            <Tab 
                                            label="PARTICULARS" 
                                            style={styles.secondLayer.tabWrapper.tabStyle}                                                                  
                                            href="#cf2Navigation"
                                            />*/ }
                                </Tabs>
                            </div> 
                        }              
                </section> 

                { /** CLAIMS ISSUES DIALOG */ }
                <PhicClaimsIssuesList 
                    open={this.state.openClaimsIssues}
                    selectedClaim={selectedClaim}
                    closeDialog={this.onCloseClaimsIssuesDialog.bind(this)}
                />

            </StyleRoot>
        );
    }
}

export default SubHeader;