import React from 'react';
import { Field } from 'redux-form';

// others
import Radium, { StyleRoot } from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import { required, number, maxLength10 } from '../../../util/validation';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { RadioButton } from 'material-ui/RadioButton';

const styles = {
    container: {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px'
    },

    containerTbl: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px',
        marginRight: '30px',
        padding : '0 15px 50px 15px' 
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 400,
        fontSize: '20px'
    },
    table: {
        menu: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        borderBottom: '1px dashed rgb(216, 216, 216)'

    },
    subtitle: {
        color: colorPalette.primaryColor,
        fontSize: '14px',
        width: '286px',
        fontWeight: 600
    },
    body: {
        item: {
            fontSize: '12px',
            color: colorPalette.primaryTextColor,
            display: 'flex',
            marginBottom: '6px',

            label: {
                color: colorPalette.primaryColor,
                minWidth: '120px',
                display: 'inline-block',
                marginRight: '15px',
                marginLeft: '30px',
                marginTop: '15px'
            }
        }
    },
    lmpCont: {
        display: 'flex',
        alignItems: 'center',
    },

    perDots: {
        display: 'flex',
        alignItems: 'center',
    },

    radioButtonWrapper: {
        minHeight: '42px',
        display: 'flex',
        alignItems : 'center',
        paddingTop: '30px',
        
        radioButtonGroupStyle: {
            width: '30%',
            display: 'flex',
        },

        labelStyle: { 
            color : colorPalette.primaryTextColor,
            width: '20%' 
        },

        textFieldStyle : { 
            width: '50%', 
            marginTop: '-30px',
            marginLeft: '30px'
        },

        radioButtonStyle: {
            width: '90px'
        },
        radioButtonStyleMaintenance: {
            width: '90px',
            paddingLeft: '20px'
        }
    }
};

@Radium
class TBDotsPackage extends React.Component {
    render() {
        const { summaryMode } = this.props;
                
        return (
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px' }]}>TB DOTS Package </label>
                  <section style={styles.containerTbl}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', paddingLeft: '30px' }}>
                        <div style={styles.perDots}>   
                            <div style={styles.radioButtonWrapper}>                                
                                <Field                   
                                    onChange={(e, value) => { this.setState({ isRepetitive: value });  }}                             
                                    component={RadioButtonGroup} 
                                    style={styles.radioButtonWrapper.radioButtonGroupStyle} 
                                    name="tbDotsType"                                
                                    validate={required}
                                    >
                                    
                                    <RadioButton value="I" label="Intensive" style={styles.radioButtonWrapper.radioButtonStyle} disabled={summaryMode}/>
                                    <RadioButton value="M" label="Maintenance" style={styles.radioButtonWrapper.radioButtonStyleMaintenance} disabled={summaryMode}/>    
                                </Field>  
                           </div>

                            <div style={styles.perDots}> 
                                  <Field
                                            name="tbDotsNTPCardNumber"                     
                                            hintText="NTP Card No." 
                                            mode="landscape" 
                                            floatingLabelText="NTP Card No." 
                                            component={TextField}   
                                            style={{marginRight: '20px', width: '300px', marginLeft: '20px'}}  
                                            validate={[required, number,maxLength10]} 
                                            disabled={summaryMode}                                                                        
                                        />       
                            </div>
                           
                        </div>
                    </div>
                </div>
                </section>
            </StyleRoot>
        );
    }


}

export default TBDotsPackage;