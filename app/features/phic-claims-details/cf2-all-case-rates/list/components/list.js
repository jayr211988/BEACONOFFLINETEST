import React from 'react';
import Radium, {StyleRoot} from 'radium';
import find from 'lodash/find';

import colorPalette from '../../../../../util/styles/color-pallete';
import SurgicalProcedureCaseRate from './surgical-procedure-case-rate';
import ICD10CaseRate from './icd10-case-rate';
import BasicDialog from '../../../../../shared-components/basic-dialog';

const styles = {
    container : {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,              
        fontSize: '20px'
    }, 
    table :{
        menu: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    subtitle: {
        color: colorPalette.primaryColor,
        fontSize : '14px',
        width: '286px',
        fontWeight: 600
    },
    body: {
        display: 'flex'
    }
};

const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : '',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};

@Radium
class AllCaseRateList extends React.Component {

    constructor() {
        super();

        this.state = {
            basicDialogOpts: basicDialogOpts,
            basicDialogPendingRequest: false
        };
    }

    render() {
        const { phicAllCaseRates, summaryMode, newbornCare, hearingTest, screeningTest, newSelectedCf2 } = this.props;
        const firstCaseRate = find(phicAllCaseRates, t => t.caseRateType == 0);
        const secondCaseRate = find(phicAllCaseRates, t => t.caseRateType == 1);

        return (
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px'}]}>ALL CASE RATES</label>
                <div style={styles.body}>
                    { firstCaseRate
                        ? firstCaseRate.surgicalProcedure
                            ? <SurgicalProcedureCaseRate caseRate={firstCaseRate} deletePHICAllCaseRate={this.onOpenRemoveDialog.bind(this)} summaryMode={summaryMode} 
                            newbornCare={newbornCare} hearingTest={hearingTest} screeningTest={screeningTest} newSelectedCf2={newSelectedCf2}
                            />
                            : <ICD10CaseRate caseRate={firstCaseRate} deletePHICAllCaseRate={this.onOpenRemoveDialog.bind(this)} summaryMode={summaryMode}
                            newbornCare={newbornCare} hearingTest={hearingTest} screeningTest={screeningTest}
                            />
                        : null
                    }

                    { secondCaseRate
                        ? secondCaseRate.surgicalProcedure
                            ? <SurgicalProcedureCaseRate caseRate={secondCaseRate} deletePHICAllCaseRate={this.onOpenRemoveDialog.bind(this)} summaryMode={summaryMode}
                            newbornCare={newbornCare} hearingTest={hearingTest} screeningTest={screeningTest} newSelectedCf2={newSelectedCf2}
                            />
                            : <ICD10CaseRate caseRate={secondCaseRate} deletePHICAllCaseRate={this.onOpenRemoveDialog.bind(this)} summaryMode={summaryMode}/>
                        : null
                    }
                </div>

                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    isPending={ this.state.basicDialogPendingRequest }
                />
            </StyleRoot>
        );
    }

    onOpenRemoveDialog(caseRate) {
        const { deletePHICAllCaseRate, selectedClaim } = this.props;
        const isICD10 = !caseRate.surgicalProcedure;

        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                open: true,
                subtitle: `This will untag ${isICD10 ? caseRate.icD10CustomDescription||caseRate.icD10Value : caseRate.surgicalProcedure } as CASE RATE.`,
                highlightTitle: caseRate.caseRateCode,
                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : deletePHICAllCaseRate.bind(this, caseRate.id, selectedClaim.id, this.onCloseBasicDialog.bind(this), this.changePendingRequest.bind(this)), 
                        secondary : true
                    }
                ]
            }
        });
    }

    changePendingRequest(pendingRequest) {
        this.setState({
            basicDialogPendingRequest: pendingRequest
        });
    }

    onCloseBasicDialog() {
        this.setState({
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }
}

export default AllCaseRateList;