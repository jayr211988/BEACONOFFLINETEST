import React from 'react';
import Radium, {StyleRoot} from 'radium';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import moment from 'moment';

import colorPalette from '../../../../util/styles/color-pallete';

const styles = {
    labelSectionContainer: {
        display: 'flex',
        alignItems: 'center',

        smallInfoIcon: {
            width: 25,
            height: 25,
            color: colorPalette.primaryColor,
            marginRight: '15px'
        },

        label: {
            color: colorPalette.primaryColor,
            fontSize: '14px',
            fontWeight: 'bold'
        }
    },

    payeeItemSectionContainer: {
        marginTop: '18px',
        padding: '12px 25px',
        backgroundColor: '#FBFBFB',
        border: `dashed 1px ${colorPalette.tertiaryTextColor}`,

        label: {
            fontSize: '12px',
            color: colorPalette.primaryColor,
            display: 'inline-block',
            minWidth: '100px',
            marginBottom: '5px'
        },

        value: {
            fontSize: '13px',
            color: colorPalette.primaryTextColor,
            display: 'inline-block',
            minWidth: '225px'
        }
    }
};

@Radium
class WithChequeWithVoucherVouchering extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {phicClaimPayees} = this.props;
        
        return (
            <StyleRoot>
                <section style={styles.labelSectionContainer}>
                    <ActionInfoOutline style={styles.labelSectionContainer.smallInfoIcon} />
                    <label style={styles.labelSectionContainer.label}>List of Payee</label>
                </section>

                { phicClaimPayees.map((t, i) => (
                    <section style={styles.payeeItemSectionContainer} key={i}>
                        <div>
                            <label style={styles.payeeItemSectionContainer.label}>PAYEE:</label>
                            <label style={styles.payeeItemSectionContainer.value}>{t.claimPayeeName}</label>
                        </div>
                        <div>
                            <label style={styles.payeeItemSectionContainer.label}>VOUCHER NO.</label>
                            <label style={styles.payeeItemSectionContainer.value}>{t.voucherNumber}</label>
                            <label style={styles.payeeItemSectionContainer.label}>CHECK NO.</label>
                            <label style={styles.payeeItemSectionContainer.value}>{t.checkNumber}</label>
                        </div>
                        <div>
                            <label style={styles.payeeItemSectionContainer.label}>VOUCHER DATE</label>
                            <label style={styles.payeeItemSectionContainer.value}>{moment(moment.utc(t.voucherDate).toDate()).format('MM/DD/YYYY')}</label>
                            <label style={styles.payeeItemSectionContainer.label}>CHECK DATE</label>
                            <label style={styles.payeeItemSectionContainer.value}>{t.checkDate ? moment(moment.utc(t.checkDate).toDate()).format('MM/DD/YYYY') : '' }</label>
                        </div>
                        <div>
                            <label style={styles.payeeItemSectionContainer.label}>CLAIM AMOUNT</label>
                            <label style={styles.payeeItemSectionContainer.value}>{t.claimAmount}</label>
                            <label style={styles.payeeItemSectionContainer.label}>CHECK AMOUNT</label>
                            <label style={styles.payeeItemSectionContainer.value}>{t.checkAmount}</label>
                        </div>
                    </section>
                ))
                }

            </StyleRoot>
        );
    }
}

export default WithChequeWithVoucherVouchering;
