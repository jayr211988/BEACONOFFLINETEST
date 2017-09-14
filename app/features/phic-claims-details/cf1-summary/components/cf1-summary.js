import React from 'react';
import Radium, {StyleRoot} from 'radium';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import colorPalette from '../../../../util/styles/color-pallete';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import EditorAttachFile from 'material-ui/svg-icons/editor/attach-file';
import BasicDialog from '../../../../shared-components/basic-dialog';
import ActionDone from 'material-ui/svg-icons/action/done';

import LoadingIndicatorPerAction from '../../../../shared-components/loading-indicator-per-action';

import animation from '../../../../util/styles/animation';
import { claimStatus, transmittalStatus, memberTypes } from '../../../../util/data';

import moment from 'moment';

const styles = {
    container : {
        padding: '24px 24px 60px',
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        position: 'relative',
        minHeight: 'calc(100vh - 357px)'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 600,
        fontSize: '20px',
        marginLeft: '12px',
        letterSpacing: '0.6px'
    },  
    table : {
        title: {
            color: colorPalette.primaryColor,
            fontSize: '14px',
            textAlign: 'left',
            width: '160px',
            padding: '10px',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
        },
        option: {
            fontSize: '12px',                        
            padding: '5px 10px',
            textAlign: 'left',
            verticalAlign: 'top'
        },
        value: {
            fontSize: '14px',                        
            padding: '5px 20px',
            width: '160px',
        }
    },

    buttonContainer: {
        width: '200px',
        position: 'absolute',
        margin: '30px 40px 40px',
        top: 0,
        right: 0
    },

    buttonUpdate: {
        background: colorPalette.whiteSmoke
    },

    warningMessage: {
        position: 'absolute',
        top: '30px',
        padding: '20px 10px 5px',
        outline: '1px dashed #e6e6e6',
        left: '50%',
        right: '50%',
        WebkitTransform: 'translateX(-50%)',
        transform: 'translateX(-50%)',
        backgroundColor: colorPalette.whiteSmoke
    },
    warningTitle: {
        position: 'relative',
        top: '-7px',
        left: '5px',
        color: colorPalette.accentColor,
        fontSize: '14px',
        fontWeight: 'bold'
    },
    dateNoteligble : {
        position: 'absolute',
        right: '15px',
        top: '15px'
    },
    employerMessage: {
        position:'relative' 
    }
    
};

const basicDialogOpts = {
    title : '',
    subtitle : '',
    open : false,
    closeDialog : null,
    actions: []    
};


@Radium
class Cf1Summary extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            basicDialogOpts: basicDialogOpts,          
        };
    }

  
    /**
     * Update Info
     * 
     * 
     * @memberOf Cf1Summary
     */
    updateInfo() {
        const { params, 
            selectedClaim, 
            editPhicClaimsMembershipStatus } = this.props;   

        if(selectedClaim.claimStatus == claimStatus.eligible) {
            this.setState({
                basicDialogOpts : {
                    ...this.state.basicDialogOpts,
                    open : true,
                    title : 'Update Info',
                    subtitle : 'Updating the info will require you to do the membership validation and eligibility again. Would you like to proceed?',
                    closeDialog : this.onCloseBasicDialog.bind(this),
                    actions : [
                        {
                            label : 'CANCEL',
                            action : this.onCloseBasicDialog.bind(this)
                        },
                        {
                            label : 'PROCEED',
                            action : editPhicClaimsMembershipStatus.bind(this, params),
                            secondary : true
                        }
                    ]
                }
            });
        } 
        else editPhicClaimsMembershipStatus(params);
    }

    /**
     * Close Basic Dialog
     * 
     * 
     * @memberOf Cf1Summary
     */
    onCloseBasicDialog() {
        this.setState({
            basicDialogOpts : {
                ...this.state.basicDialogOpts,
                open : false
            }
        });
    }
    
    /**
     * Valdiate Member Eligibility
     * 
     * 
     * @memberOf Cf1Summary
     */
    onValidateMemberElegibility() {
        const { 
            validateMemberEligibility, 
            patientInfo, 
            params, 
            selectedTransmittal } = this.props;

        patientInfo.memberBirthday  = moment.utc(patientInfo.memberBirthday).toDate();
        patientInfo.patientBirthday = moment.utc(patientInfo.patientBirthday).toDate();
        patientInfo.admissionDate = moment.utc(patientInfo.admissionDate).toDate();
        patientInfo.dischargeDate = moment.utc(patientInfo.dischargeDate).toDate();

        validateMemberEligibility(
            patientInfo, 
            params.claimId, 
            selectedTransmittal.id, 
            selectedTransmittal.hospitalCode);
    }

    /**
     * Finalize Elegibility
     * 
     * 
     * @memberOf Cf1Summary
     */
    onFinalizedElegibility() {
       
        const { 
            finalizedElegibility, 
            patientInfo, 
            params, 
            selectedTransmittal, 
            selectedClaim,
            
            phicClaimsDetailsCf2FormValues : {
                admissionDate,
                dischargeDate,
                hospitalFeesActualCharges,
                hospitalFeesPhilHealthBenefit,
                totalHospitalFees,
                grandTotal
            }} = this.props;

        patientInfo.memberBirthday  = moment.utc(patientInfo.memberBirthday).toDate();
        patientInfo.patientBirthday = moment.utc(patientInfo.patientBirthday).toDate();
        patientInfo.admissionTime = moment.utc(admissionDate).toDate();
        patientInfo.dischargeDate = moment.utc(dischargeDate).toDate();

        if(hospitalFeesActualCharges > 0) {
            // 'if patient has [No] enough benefit get actual chargers and PhilHealth benefit'

            patientInfo.totalAmountActual = hospitalFeesActualCharges;
            patientInfo.totalAmountClaimed = hospitalFeesPhilHealthBenefit;
        } else {
            // 'if patient has [Yes] enough benefit get actual Total Hospital Fees and Grand Total'

            patientInfo.totalAmountActual = totalHospitalFees;
            patientInfo.totalAmountClaimed = grandTotal;
        }
        
        finalizedElegibility(
            patientInfo, 
            params.claimId, 
            selectedTransmittal.id, 
            selectedTransmittal.hospitalCode, 
            selectedClaim.claimStatus
         );
    }


    printPBEF() {
        
        const {patientInfo, printPBEF} = this.props;
        printPBEF(patientInfo.id);
    }   

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf1Summary
     */
    render() {      
        const {
            patientInfo, 
            validateMemberEligibilityRequestPending, 
            getPBEFDocumentRequestPending,
            //isMemberElegible, 
            //memberClaimStatus, 
            //isFinalReady, 
            selectedTransmittal,
            selectedClaim,
            claimsIssuesTotal,
        } = this.props;
        
        return (
            <StyleRoot style={[styles.container, animation.fadeIn]}>    

                <h1 style={styles.title}>CF1 - Eligibility Information</h1>
                {/**  */ }
                { /**selectedTransmittal.transmittalStatus == 0 ? */ }
                {/** selectedClaim.claimStatus !== 4 ?*/}

                     

                <div style={styles.buttonContainer}>
                        {/** always display Download PBEF */}
                        { selectedClaim.claimStatus != claimStatus.memberNotValid && selectedClaim.claimStatus != claimStatus.memberValid ?  
                        <RaisedButton 
                            label="DOWNLOAD PBEF" 
                            href={`'http://localhost:3000/'/api/PHICCF1/GetPHICCF1PBEF?id=${patientInfo.id}&pbeftoken=${patientInfo.pbefToken}`}
                            target="_blank"
                            labelColor={colorPalette.primaryColor}
                            buttonStyle={{background: colorPalette.whiteSmoke}}
                            style={{marginBottom: '15px'}} 
                            fullWidth={true}                                         
                            disabled={getPBEFDocumentRequestPending}                              
                        />  : null
                        }

                        {  validateMemberEligibilityRequestPending ? 
                            <LoadingIndicatorPerAction text="Validating..."/>
                            :
                            <section>

                                <div>
                                    {/** display update info if transmittal status is draft or transmittal status is transmitError  */}
                                    { selectedTransmittal.transmittalStatus == transmittalStatus.draft || selectedTransmittal.transmittalStatus == transmittalStatus.transmitError ? 

                                        <RaisedButton 
                                            label="Update Info" 
                                            labelColor={colorPalette.primaryColor} 
                                            buttonStyle={styles.buttonUpdate} 
                                            style={{marginBottom: '15px'}} 
                                            onTouchTap={this.updateInfo.bind(this)} fullWidth={true}
                                        /> 
                                        : 
                                        null
                                    }
                                </div>


                                <div>
                                    {/** display finalize if transmittal is draft and isFinalReady is TRUE  */}
                                    {   selectedClaim.isFinal === true || 
                                        (selectedClaim.claimStatus == claimStatus.eligible || selectedClaim.claimStatus == claimStatus.conditional)
                                        &&  claimsIssuesTotal <= 0 ?                         
                                        <RaisedButton 
                                            label="FINALIZE" 
                                            secondary={true}
                                            fullWidth={true} 
                                            onTouchTap={this.onFinalizedElegibility.bind(this)}
                                        />                          
                                        : 
                                        null
                                    }
                                </div>
                               
                                <div style={{marginTop: '10px'}}>
                                    {/** display validate eligibility if claim status is member valid not eligible */}
                                    { selectedClaim.claimStatus == claimStatus.memberValid ?  
                                        <RaisedButton 
                                            label="Validate Eligibility" 
                                            fullWidth={true}
                                            secondary={true} 
                                            onTouchTap={this.onValidateMemberElegibility.bind(this)}
                                        />   : null
                                    }
                                </div>
                            </section>                            
                        }
                </div>

                <div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={styles.table.title}> Tracking Number </td>
                                    <td style={styles.table.value}> { patientInfo.eligibilityTrackingNumber ? patientInfo.eligibilityTrackingNumber : <span>--</span> } </td>
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>Patient PIN</td>
                                    <td style={styles.table.value}>{patientInfo.patientPin}</td>
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>Patient Name</td>
                                    <td style={styles.table.value}>{patientInfo.patientFullname}</td>
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>Patient Gender</td>
                                    <td style={styles.table.value}>{patientInfo.patientGenderName}</td>
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>Patient is</td>
                                    <td style={styles.table.value}>{`${patientInfo.patientIsCode} - ${patientInfo.patientIsValue}`}</td>
                                </tr>                            
                                <tr>
                                    <td style={styles.table.option}>Patient Birthday</td>
                                    <td style={styles.table.value}>{moment(moment.utc(patientInfo.patientBirthday).toDate()).format('MMMM DD, YYYY')}</td>
                                </tr>                            
                            </tbody>                            
                        </table>                    
                    </div>
                    <div >
                        <table>
                            <tbody>
                                <tr>
                                    <td style={styles.table.title}>Member Info</td>                                
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>PhilHealth Number (PIN)</td>
                                    <td style={styles.table.value}>{patientInfo.memberPin != '' ? patientInfo.memberPin : '--' }</td>
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>Member Name</td>
                                    <td style={styles.table.value}>{patientInfo.memberFullname}</td>
                                </tr>
                                <tr>
                                    <td style={styles.table.option}>Member Gender</td>
                                    <td style={styles.table.value}>{patientInfo.memberGenderName}</td>
                                </tr>                                
                                <tr>
                                    <td style={styles.table.option}>Member Type</td>
                                    <td style={styles.table.value}>{patientInfo.memberTypeCode} - {patientInfo.memberTypeValue} </td>
                                </tr>                            
                                <tr>
                                    <td style={styles.table.option}>Mailing Address</td>
                                    <td style={styles.table.value}>{patientInfo.memberMailingAddress}</td>
                                </tr>                            
                                <tr>
                                    <td style={styles.table.option}>Member Birthday</td>
                                    <td style={styles.table.value}>{moment(moment.utc(patientInfo.memberBirthday).toDate()).format('MMMM DD, YYYY')}</td>
                                </tr>                            
                                
                                <tr>
                                    <td style={styles.table.option}>Landline</td>
                                    <td style={styles.table.value}>{patientInfo.memberLandLineNumber}</td>
                                </tr>                            
                                <tr>
                                    <td style={styles.table.option}>Mobile</td>
                                    <td style={styles.table.value}>{patientInfo.memberMobileNumber}</td>
                                </tr>                            
                                <tr>
                                    <td style={styles.table.option}>Email</td>
                                    <td style={styles.table.value}>{patientInfo.memberEmail}</td>
                                </tr>         

                                { /**[S] Employed Private, [G] Employer goverment */ }
                                { patientInfo.memberTypeCode == memberTypes.employedPrivate 
                                || patientInfo.memberTypeCode == memberTypes.employerGovernment ? 
                                    <tr>
                                        <td style={styles.table.option}>PhilHealth Employer Number</td>
                                        <td style={styles.table.value}>{patientInfo.memberPEN}</td>
                                    </tr>  
                                : null }     

                                { patientInfo.memberTypeCode == memberTypes.employedPrivate 
                                || patientInfo.memberTypeCode == memberTypes.employerGovernment ?                      
                                    <tr>
                                        <td style={styles.table.option}>Employer Name</td>
                                        <td style={styles.table.value}>{patientInfo.memberEmployerName}</td>
                                        {
                                            patientInfo.validEmployer
                                            ?
                                            <td style={styles.table.value}>
                                                <div style={[styles.employerMessage,{color: colorPalette.primaryColor}]}>
                                                    <ActionDone style={{color: colorPalette.primaryColor,position: 'absolute',left: '-32px',top:'-3px'}}/> 
                                                    Valid Employer
                                                </div>
                                             </td>
                                            :
                                            <td style={styles.table.value}>
                                                <div style={[styles.employerMessage, {color: colorPalette.accentColor ,width: '355px'}]}>
                                                    <AlertErrorOutline style={{color: colorPalette.accentColor,position: 'absolute',left: '-32px',top:'-3px'}}/>
                                                    We could not found the employer in PhilHealth database
                                                </div>
                                            </td>
                                        }
                                    </tr>                             
                                : null }    

                            </tbody>                            
                        </table>   
                    </div>

                    {/*membership valid/ not*/}
                    { selectedClaim.claimStatus == claimStatus.memberNotValid || selectedClaim.claimStatus == claimStatus.memberValid ?
                        
                        selectedClaim.claimStatus == claimStatus.memberValid ? 
                            <div style={[styles.warningMessage,{width: '338px'}]}>
                                <div>
                                    <AlertErrorOutline style={{color: colorPalette.primaryColor}}/>
                                    <span style={[styles.warningTitle, {color: colorPalette.primaryColor}]}>Membership Valid</span>
                                </div>
                                <div>
                                    <p style={{paddingLeft: '30px', marginTop: '0'}}>Membership validity has been confirmed by PhilHealth</p>
                                </div>
                            </div> 
                        : 
                        
                            <div style={[styles.warningMessage,{width: '338px'}]}>
                                <div>
                                    <AlertErrorOutline style={{color: colorPalette.accentColor}}/>
                                    <span style={styles.warningTitle}>Membership Invalid</span>
                                </div>
                                <div>
                                    <p style={{paddingLeft: '30px', marginTop: '0'}}>
                                        NO RECORD FOUND. PLEASE PROCEED TO ANY PHILHEALTH OFFICE FOR PIN REGISTRATION.
                                    </p>
                                </div>
                            </div>                            
                    : null }   

                    {/*eligible / not eligible*/}        
                    { patientInfo.eligibilityIsOk == 'YES' || patientInfo.eligibilityIsOk == 'NO' ? 
                    
                        patientInfo.eligibilityIsOk == 'YES' ? 
                            <div style={[styles.warningMessage,{width: '338px'}]}>
                                <div>
                                    <AlertErrorOutline style={{color: colorPalette.primaryColor}}/>
                                    <span style={[styles.warningTitle, {color: colorPalette.primaryColor}]}>Member is eligible</span>
                                </div>
                                <div>
                                    <p style={{paddingLeft: '30px',marginTop: '0'}}>{patientInfo.eligibilityRemainingDays} Remaining Days 
                                    <br/>As of {patientInfo.eligibleAsOf}</p>
                                </div>
                            </div>                        
                        :

                        <div style={[styles.warningMessage,{width: '500px',top: '29px',left: '54%'}]}>
                            <div>
                                <AlertErrorOutline style={{color: colorPalette.accentColor}}/>
                                <span style={[styles.warningTitle,{color: colorPalette.accentColor}]}>Member not eligible</span>
                                <div style={styles.dateNoteligble}>
                                    <div>As of {patientInfo.eligibleAsOf}</div>
                                    <div>{patientInfo.eligibilityRemainingDays} Remaining Days</div>
                                </div>
                            </div>

                            <div style={{marginTop: '25px'}}>
                                <EditorAttachFile style={{color: colorPalette.accentColor,height:'20px'}}/>
                                <span style={[styles.warningTitle,{color: colorPalette.accentColor,top: '-5px'}]}>Document(s) required</span>
                            </div>
                        
                            <div>                              
                                { patientInfo.eligibilityDocuments.map( (x, index) => ( 

                                    <ul key={index} style={{paddingLeft: '45px',marginTop: '5px'}}>                                    
                                        <li style={{listStyle: 'none'}}><span style={{position: 'absolute', marginLeft: '-16px'}}>*</span>{x.code}- {x.name}</li>
                                        <li style={{listStyle: 'none'}}>{x.text}</li>
                                    </ul>
                                ))
                                }
                            </div>
                        </div>  
                    : null }          
    
                </div>
                 <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogIsPending }
                />              
                                                                            
            </StyleRoot>
        );
    }
}

export default Cf1Summary;