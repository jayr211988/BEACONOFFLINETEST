// react + redux
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, number} from '../../../util/validation';

// material
import {RadioButton, } from 'material-ui/RadioButton';
import { Checkbox, TextField, RadioButtonGroup } from 'redux-form-material-ui';
// others
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import animation from '../../../util/styles/animation';

const styles = {
    container : {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px'
    },
    subtitle: {
        color: colorPalette.primaryColor,
        fontSize : '14px',
        width: '286px',
        fontWeight: 600
    },
    containerTbl: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px',        
        marginRight: '30px', 
        padding:'20px 0'       
    },
    headerCheck : {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0 20px 30px',
        checkbox : {
            width: '300px'
        }
    },
    checkboxCont: {
        display: 'flex',
        paddingLeft: '30px',
        marginTop: '20px'
    },
    checkbox: {
        marginBottom: 16,
        label : {
            paddingLeft: '30px',
            color: colorPalette.primaryColor
        }
    },
    filter : {
        display: 'flex',
        alignItems: 'baseline',
        paddingLeft: '30px',        
        flexDirection: 'column',
        paddingBottom: '20px',
        label : {
            marginRight: '30px',
            color: colorPalette.primaryColor
        }
    },
    required: {
        color: colorPalette.accentColor,
        fontSize: '12px'
    }
};


@Radium
class HivAidsTreatmentPackage extends React.Component {

    constructor(props) {
        super(props);   
    }


    render() {
            
        return (
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px'}]}>HIV/AIDS Treatment Package</label> 
                <section style={styles.containerTbl}>
                    <div style={[styles.filter, animation.fadeIn]} >{/** FOR NEWBORN SCREENING TEST*/}
                        <Field 
                            name="hivLabNumber" 
                            component={TextField} 
                            hintText="Laboratory No."
                            floatingLabelText="Laboratory No."
                            style={{marginTop: '-30px'}}
                            validate={[required, number]}
                        />
                    </div>   
                </section>
            </StyleRoot>
        );
    }
}

export default HivAidsTreatmentPackage;