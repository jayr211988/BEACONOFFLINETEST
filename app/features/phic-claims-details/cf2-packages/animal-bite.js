import React from 'react';
import {  Field } from 'redux-form';

// others
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import  CustomDatePicker  from '../../../shared-components/custom-material-ui/datepicker';
import { required, validDate, maxDateShouldBeToday,maxLength50 } from '../../../util/validation';
import { TextField } from 'redux-form-material-ui';

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
        marginTop: '20px',        
        marginRight: '30px'
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
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        borderBottom: '1px dashed rgb(216, 216, 216)'
            
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
                marginLeft: '30px',
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
class AnimalBitePackage extends React.Component{
    render() {
        const { summaryMode } = this.props;
        return(
            <StyleRoot style={styles.container}>
                <label style={[styles.subtitle, { marginBottom: '15px', fontSize: '20px'}]}>Animal Bite Package </label> 
                <section style={styles.containerTbl}>
                    <div style={styles.body}>
                        <div style={{paddingBottom: '20px'}}>  
                            <label style={styles.body.item.label}>VACCINE GIVEN DATES </label>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', paddingLeft: '30px'}}> 

                                    <div style={styles.perDate}>                                                                        
                                        <Field
                                            name="animalBiteDay0ARV"                     
                                            hintText="Day 0 ARV" 
                                            mode="landscape" 
                                            floatingLabelText="Day 0 ARV"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}   
                                            validate={[required,validDate,maxDateShouldBeToday]}
                                            disabled={summaryMode}                                                                       
                                        />                                    
                                    </div>
                                    <div style={styles.perDate}>                                                                         
                                        <Field
                                            name="animalBiteDay7ARV"                     
                                            hintText="Day 7 ARV" 
                                            mode="landscape" 
                                            floatingLabelText="Day 7 ARV"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}  
                                            validate={[required,validDate,maxDateShouldBeToday]}   
                                            disabled={summaryMode}                                                                      
                                        />                                    
                                    </div>
                                    <div style={styles.perDate}>                                                                         
                                        <Field
                                            name="animalBiteOthers"                     
                                            hintText="Others" 
                                            mode="landscape" 
                                            floatingLabelText="Others"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}  
                                            
                                            disabled={summaryMode}                                                                        
                                        />                                    
                                    </div>
                                    
                                </div>

                                <div style={{display: 'flex', paddingLeft: '30px'}}> 
                                    <div style={styles.perDate}>                                                                        
                                        <Field
                                            name="animalBiteDay3ARV"                     
                                            hintText="Day 3 ARV" 
                                            mode="landscape" 
                                            floatingLabelText="Day 3 ARV"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}   
                                            validate={[required,validDate,maxDateShouldBeToday]} 
                                            disabled={summaryMode}                                                                        
                                        />                                    
                                    </div>
                                    <div style={styles.perDate}>                                                                         
                                        <Field
                                            name="animalBiteRIG"                     
                                            hintText="RIG" 
                                            mode="landscape" 
                                            floatingLabelText="RIG"                                    
                                            maxDate={new Date()}      
                                            component={CustomDatePicker}   
                                            style={{marginRight: '20px', width: '300px'}}  
                                            validate={[required,validDate,maxDateShouldBeToday]}  
                                            disabled={summaryMode}                                                                       
                                        />                                    
                                    </div>
                                    <div style={styles.perDate}>                                                                         
                                        <Field
                                            name="animalBiteSpecify"                     
                                            hintText="Specify" 
                                            mode="landscape" 
                                            floatingLabelText="Specify" 
                                            component={TextField}   
                                            style={{marginRight: '20px', width: '300px'}}  
                                            
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

export default AnimalBitePackage;