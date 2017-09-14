
// react + redux
import React from 'react';
import { Field } from 'redux-form';

// others
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import CustomDatePicker from '../../../shared-components/custom-material-ui/datepicker';
import { required, validDate, maxDateShouldBeToday} from '../../../util/validation';

const styles = {
    container : {
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        marginTop: '30px'
    },

    containerTbl: {
        backgroundColor: '#fafafa',
        borderRadius: '2px',
        border: '1px dashed rgb(216, 216, 216)',
        marginTop: '20px'
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
                marginLeft: '20px',
                marginTop: '15px'
            }
        }
    },
    lmpCont: {
        display: 'flex',
        alignItems: 'center',        
    },
    perDate : {
        display: 'flex',
        alignItems: 'baseline'
    }
};


@Radium
class MaternityPackage extends React.Component {
    
    render() {
        const { summaryMode } =this.props;
        return (
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px'}]}>MATERNITY PACKAGE</label> 
                <section style={styles.containerTbl}>
                    <div style={styles.body}>                        
                        <div style={{paddingBottom: '20px'}}>                            
                            <label style={styles.body.item.label}>PRE-NATAL CHECK-UP DATES </label>
                            <div style={{display: 'flex', justiftContent: 'flex-start'}}>
                                <div style={{display: 'flex', paddingLeft: '20px'}}>
                                    <div style={styles.perDate}>                                                                        
                                        <Field
                                            name="mcP1stCheckupDate"                     
                                            hintText="1st Checkup" 
                                            mode="landscape" 
                                            floatingLabelText="1st Checkup"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '15px', width: '300px'}}   
                                            validate={[required,validDate,maxDateShouldBeToday]} 
                                            disabled={summaryMode}                                                                        
                                        />                                    
                                    </div>
                                    <div style={styles.perDate}>      
                                        <Field
                                            name="mcP2ndCheckupDate"                     
                                            hintText="2nd Checkup" 
                                            mode="landscape" 
                                            floatingLabelText="2nd Checkup"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}  
                                            validate={[required,validDate,maxDateShouldBeToday]}
                                            disabled={summaryMode}                                             
                                        />                                   
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div style={styles.perDate}>                                                                        
                                          <Field
                                            name="mcP3rdCheckupDate"                     
                                            hintText="3rd Checkup" 
                                            mode="landscape" 
                                            floatingLabelText="3rd Checkup"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}  
                                            validate={[required,validDate,maxDateShouldBeToday]}
                                            disabled={summaryMode}                                                                        
                                        />                                   
                                    </div>
                                    <div style={styles.perDate}>                                    
                                    
                                        <Field
                                            name="mcP4thCheckupDate"                     
                                            hintText="4th Checkup" 
                                            mode="landscape" 
                                            floatingLabelText="4th Checkup"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}
                                            validate={[required,validDate,maxDateShouldBeToday]}    
                                            disabled={summaryMode}                                                                       
                                        />
                                    
                                    </div>
                                </div>                                                                                                                     
                           </div>  
                        </div>                                      
                    </div>
                </section>
            </StyleRoot>
        );
    }
}


export default MaternityPackage;