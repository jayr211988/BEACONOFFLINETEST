import React from 'react';
import Radium, { StyleRoot } from 'radium';
import LoadingIndicatorPerAction from '../../../shared-components/loading-indicator-per-action';

// *** material-ui components
import RaisedButton from 'material-ui/RaisedButton';

// *** custom css styles
import colorPalette from '../../../util/styles/color-pallete';

const styles = {
    container: {
        minHeight : '70px',
        display: 'flex',
        backgroundColor: colorPalette.headerBgColor,
        padding: '10px 40px',
        position: 'relative',
        justifyContent: 'center'
    },
    loading: {
        display: 'flex',
        width: '50%',
        justifyContent: 'flex-end'
    },
    leftHolder: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',

        titleContainer: {
            display: 'inherit',
            alignItems: 'flex-end'
        },
        label:{
            color: colorPalette.primaryColor,
            fontWeight: 500,
        },
        title: {
            color: colorPalette.primaryColor,
            fontWeight: 600,
            fontSize: '20px',
            margin: '0'
        },
    },

    rightHolder: {
        width: '50%',
        display: 'flex',  
        alignItems: 'center',
        justifyContent: 'flex-end',

        raisedButtonStyle: {
            backgroundColor: 'red',
            marginLeft: '10px',
            border: '1px solid #e8e8e8',
            lineHeight: '20px',
            color : 'red'
        }        
    },

    backBtnStyle : {
        borderRadius: '2px',
        boxShadow: '0 2px 2px 0',
        width: '171.4px'
    },

    getBtnStyle : {
        borderRadius: '2px',
        width: '226px'
    },

    addActionButtonWrapper: {
        position: 'absolute',
        top: '-30px',
        right: '40px',
    }
};


@Radium
class Subheader extends React.Component{
    constructor(props){
        super(props);
    }


    render(){

        const { patientInfo, onBack, patientMemberPinRequest} = this.props;

        

        return(
            <StyleRoot style={styles.container}>
                <div style={{display: 'flex', alignItems: 'center', width: '96%'}} >

              
                <div style={styles.leftHolder}>
                    <div style={styles.leftHolder.titleContainer}>
                        <div>                            
                            <h1 style={styles.leftHolder.title}>PHILHEALTH ECLAIMS</h1>
                        </div>
                    </div>
                </div>
                 { patientMemberPinRequest ?
                    <div style={styles.loading}>
                        <LoadingIndicatorPerAction />
                    </div>
                    :
                <div style={styles.rightHolder}>
                   
                    <RaisedButton 
                        label="GET MEMBER PIN"
                        type="submit"                        
                        labelColor={colorPalette.white}
                        backgroundColor={colorPalette.accentColor}
                        style={!patientInfo ? styles.getBtnStyle : { display: 'none' }}
                         />
                       <RaisedButton 
                        label="BACK"                       
                        labelColor={colorPalette.white}
                        backgroundColor={colorPalette.mediumGray}
                        onTouchTap={onBack}
                        style={patientInfo ? styles.getBtnStyle : { display: 'none' }}
                         />   
                        
                </div>
                }  
               </div>
            </StyleRoot>
        );
    }
}

export default Subheader;