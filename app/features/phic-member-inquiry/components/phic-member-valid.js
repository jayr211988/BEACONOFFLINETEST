
// React
import React from 'react';
import Radium, {StyleRoot} from 'radium';

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    container : {
        padding: '24px',
        backgroundColor: colorPalette.white,
        marginBottom: '30px'
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cont: {
            display: 'flex',
            alignItems: 'center'
        },
        icon : {
            color: colorPalette.primaryColor,
            width: '50px',
            height: '50px',
            marginRight: '10px'
        },
        msg : {
            color: colorPalette.primaryColor,
            fontSize: '20px',
            fontWeight: 600
        },

        textInside: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'calc(100% - 42px)',
            height: '50px',
            marginTop: '20px',
            backgroundColor: '#fafafa',
            border: 'dashed 1px #979797',
            padding: '20px',

            result: {
                fontSize: '30px',
                fontWeight: 600,
                color: colorPalette.primaryTextColor
            }
        },
        nameCont : {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            width: '100%'
        },
        labelnquiry : {
            marginLeft : '10px'
        }
    }
};

@Radium
class PHICMemberValid extends React.Component {
    render() {
        const { patientMemberPin, patientInfo } = this.props;
        return (
            <StyleRoot style={styles.container}>                
                <div style={styles.item}>
                    <div style={styles.item.cont}>  
                        <InfoOutline style={styles.item.icon}/>                      
                        <p style={styles.item.msg}>Member Inquiry Result Valid</p>
                    </div>
                    
                    <div> 
                    <div style={styles.item.textInside}>
                        <p style={styles.item.textInside.result}>{patientMemberPin.memberPIN}</p>
                    </div>
                    <div style={styles.item.nameCont}>
                        <div>
                            <p>Member:</p>
                            <p>Birthday:</p>                        
                        </div>
                        <div style={styles.item.labelnquiry}>
                            <p>{patientInfo.memberlastname} , {patientInfo.memberfirstname} {patientInfo.membermiddlename} {patientInfo.membersuffix}</p>
                            <p>{patientInfo.memberbirthday}</p>                        
                        </div>
                    </div>
                    </div>

                </div>
            </StyleRoot>
        );
    }
}

export default PHICMemberValid;