
// react, redux + 3rd part
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../util/styles/color-pallete';
import animation from '../../../util/styles/animation';
 // icon
import Add from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';

 //material
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Delete from 'material-ui/svg-icons/action/delete';

import LoadingIndicatorPerContainer from '../../../shared-components/loading-indicator-per-container';

import { initialData } from '../../../util/data';

const styles = {
    title : {
        margin: 0,
        color: colorPalette.primaryColor,
        fontSize: '20px',
        fontWeight: 'normal'
        
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tableLike: {
        header: {
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            fontSize: '14px',
            hospital: {
                width: '60%'
                
            },
            primary: {

            }
        },
        body: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            text: {
                width: '200px',
                marginRight: '10px'
            },
            radio: {
                width: 'initial'
            },
            check: {
                width: 'initial'
            }
        },

        buttonContainer: {
            display: 'flex',            
            justifyContent: 'space-between',
            alignItems: 'center'

        },
        loadingContainer : {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        hospitalCode: {
            maxHeight: '300px',
            overflowY: 'auto'
        },
        emptyHospital : {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '300px',
            fontSize: '14px'
        }
    },
    errorMsg: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right'
    },
    duplicationCont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',        
        text: {
            color: colorPalette.accentColor,
            fontSize: '14px',
            margin :'0'

        }
    }   
};

@Radium
class PHICHospitalCode extends React.Component {    
    constructor(props) {
        super(props);   
        this.state = {
            checkIfDuplicate: false,
            checkHospitalCode : false,
            checkAccreditation : false
        };

    }

    // get list of hospital code when component will mount
    componentWillMount() {
        const {selectedProduct, GetHospitalCode} = this.props;  
        GetHospitalCode(selectedProduct.id);
    }  

    // list of phic package
    listOfPHICPackage() {        
        let phicPackageList = [];
        initialData.phicPackage.map((val, index)=> {
            phicPackageList.push(
                <MenuItem value={index} primaryText={val.value} key={index}/>
            );
        });                    
        return phicPackageList;
    }

    // list of phic types
    listOFHCIType() {
        let hciTypeList = [];
        initialData.hcitype.map((val, index)=> {
            hciTypeList.push(
                <MenuItem value={index} primaryText={val.value} key={index}/>
            );
        });                    
        return hciTypeList;
    }



    
    /**
     * 
     * 
     * @param {any} id 
     * @param {any} val 
     * @param {any} index 
     * 
     * @memberof PHICHospitalCode
     */
    onSaveHospitalCode(id, val, index) {    
                
        const {EditHospitalCode} = this.props;                        
        const x = this.refs[`hotelcode${index}`];
        const y = this.refs[`accnumber${index}`];                         
        
        EditHospitalCode(
            id,
            x.input.value,           
            val,
            y.input.value            
        );

        
    } 

    // change selected hospital phic package
    changeSelectedPHICPackage(id, hospitalCode, selectFieldName , event, selectedId ) {            
        const {listOfHospitalCode, saveTolistOfHospitalCode} = this.props;        
        let newData = {};                        
        listOfHospitalCode.map((i) => { 
            if (i.id  === id ) {
                newData = i;
                if (selectFieldName === 'phicPackage') {
                    newData.phicPackage = selectedId;                    
                } else {
                    newData.phichciType = selectedId;
                }
            }
        });


        switch(selectedId) {
        case 0 : 
            newData.phicPackageDescription = 'REGULAR';
            break;  
        case 1 : 
            newData.phicPackageDescription = 'MATERNITY';
            break;
        case 2 :
            newData.phicPackageDescription = 'ANIMAL BITE';
            break;
        case 3 :
            newData.phicPackageDescription = 'NEWBORN CARE';
            break;
        case 4 : 
            newData.phicPackageDescription = 'TB DOTS';
            break;
        case 5 : 
            newData.phicPackageDescription = 'CATARACT';
            break;
        default : 
            newData.phicPackageDescription = 'HIV/AIDS TREATMENT';
        }

        let newObj = {};
        if (selectFieldName === 'phicPackage')  {
            newObj.id = id;
            newObj.hospitalCode = hospitalCode;
            newObj.pHICPackage = selectedId;
            newObj.editType = selectFieldName;     
            
        } else {
            newObj.id = id;
            newObj.hospitalCode = hospitalCode;
            newObj.pHICHCIType = selectedId;
            newObj.editType = selectFieldName;                     
        }                
        saveTolistOfHospitalCode(id, newData, newObj);        
    }

    componentWillReceiveProps(nextProps) {                           
        let updatedList = nextProps.listOfHospitalCode;
        if (updatedList) {
            // REFACTOR : CHRIS change to MAP instead of for loop
         
            for (let i = 0; i < updatedList.length; i++) {                            
                for (let q = 0; q < updatedList.length; q++ ) {
                
                    if (updatedList[i].id === updatedList[q].id ) { 
                                          
                        continue;
                    } 
                    else {            
                        if (updatedList[i].phicPackage === updatedList[q].phicPackage)    {                                                        
                            this.setState ({
                                checkIfDuplicate : true
                            });                        
                            return 0;
                        } else {
                            this.setState({
                                checkIfDuplicate : false
                            });                                  
                        }
                    }
                }
            }    


            // updatedList.some((t) => {
            //     if (t.accreditationNumber.lengt > 12) {
            //         return this.setState({
            //             checkAccreditation : true
            //         });
            //     } else {
            //         this.setState({
            //             checkAccreditation : false
            //         });
            //     }
            // });

            // updatedList.some((t) => {
            //     if (t.hospitalCode.lengt > 12) {
            //         return this.setState({
            //             checkHospitalCode : true
            //         });
            //     } else {
            //         this.setState({
            //             checkAccreditation : false
            //         });
            //     }
            // });         
        } 
    }

  

    componentDidUpdate() {
        const {isSamePackage} = this.props;    
        if (this.state.checkIfDuplicate) {
            isSamePackage(true);               
        } 
    }
    


    render() {
        const { close, 
                AddHospitalCode, 
                selectedProduct, 
                listOfHospitalCode,
                EditHospitalPrimaryCodeSelected,
                DeleteHospitalCode,
                addHospitalCodeRequest,
                deleteHospitalCodePendingRequest,
                viewMode } = this.props;                 

        let listOfCode = [];
        listOfHospitalCode.map((val, index) => {        
            listOfCode.push(                                            
                <div style={styles.tableLike.body} key={index}>      
                    {/** HOSPITAL CODE */}                                   
                    <TextField                         
                        fullWidth={true}
                        style={styles.tableLike.body.text}
                        key={`hospitalCode-${val.hospitalCode}`}                                       
                        hintText="Hospital Code" 
                        defaultValue={val.hospitalCode}
                        ref={`hotelcode${index}`}                          
                        onBlur={this.onSaveHospitalCode.bind(this, val.id, val, index)}
                        disabled={viewMode}                         
                    />
                    {/** ACCREDITATION NUMBER */}                                   
                    <TextField                         
                        fullWidth={true}
                        style={styles.tableLike.body.text}
                        key={`accreditationNumber-${val.accreditationNumber}`}                                       
                        hintText="Accreditation No." 
                        defaultValue={val.accreditationNumber}
                        ref={`accnumber${index}`}                          
                        onBlur={this.onSaveHospitalCode.bind(this, val.id, val, index)}
                        disabled={viewMode}                        
                    />                    
                    {/** PHIC PACKAGE */}                                   
                    <div style={{ height: '48px', marginRight: '10px' }}>
                        <SelectField 
                            value={val.phicPackage}                                                         
                            onChange={this.changeSelectedPHICPackage.bind(this, val.id, val.hospitalCode, 'phicPackage')}
                            disabled={viewMode}
                            >
                            {this.listOfPHICPackage()}
                        </SelectField>                        
                    </div>                    
                    {/** HCI TYPE */}                                   
                    <div style={{ height: '48px' }}>
                        <SelectField 
                            value={val.phichciType}                               
                            onChange={this.changeSelectedPHICPackage.bind(this,val.id, val.hospitalCode, 'hciType')}
                            disabled={viewMode}
                            >
                            {this.listOFHCIType()}
                        </SelectField>
                    </div>
                    {/** PRIMARY */}                                   
                    <Checkbox
                        defaultChecked={val.primaryCode}
                        style={styles.tableLike.body.check}
                        disabled={val.primaryCode}
                        onCheck={EditHospitalPrimaryCodeSelected.bind(this, val.id, selectedProduct )}
                        disabled={viewMode}
                    />
                    
                    {/** REMOVE */}                                   
                    <IconButton onTouchTap={DeleteHospitalCode.bind(this, val)} disabled={viewMode}>
                        <Delete />                                                
                    </IconButton>                                        
                
                </div>
            );                      
        });
        
        return (
            <StyleRoot style={{padding: '25px'}}>
                 <div style={styles.titleContainer}>
                    <div>
                        <h1 style={styles.title}>PHIC eClaims Form Hospital Codes</h1>
                        <p style={{fontSize: '14px'}}>List of hospital codes for PHIC eClaims Form</p>
                    </div>      
                    <div>
                        <IconButton 
                            onTouchTap={close} 
                            disabled={this.state.checkIfDuplicate  === true && listOfHospitalCode.length > 1}
                            >
                            <Close />
                        </IconButton>                        
                    </div>
                </div>
                <div style={styles.duplicationCont}>
                    <div style={styles.tableLike.buttonContainer}>
                        <FlatButton 
                            label="Add"
                            labelPosition="after" 
                            icon={<Add />}   
                            onTouchTap={AddHospitalCode.bind(this, selectedProduct, listOfCode)}
                            disabled={viewMode}                       

                        />                                                
                    </div>    
                    
                        <div style={[styles.errorMsg, animation.fadeIn]}>
                            { this.state.checkHospitalCode ? 
                                <p style={styles.duplicationCont.text}>Hospital Code must be 12 character(s) or less</p> : null
                            }
                            { this.state.checkAccreditation ? 
                                <p style={styles.duplicationCont.text}>Accreditation No. must be 12 character(s) or less</p> : null
                            }                            
                            { this.state.checkIfDuplicate && listOfHospitalCode.length > 1?                                                                                            
                                <p style={styles.duplicationCont.text}>Duplication of  PHIC Package Exist</p>                                
                                : null 
                            }
                        </div>                                                 
                </div>
                <div style={styles.tableLike.header}>
                    <p style={[styles.tableLike.header.hospital,{width: '153px'}]}>Hospital Code</p>
                    <p style={[styles.tableLike.header.hospital,{width: '155px'}]}>Accreditation Number</p>
                    <p style={[styles.tableLike.header.hospital,{width: '261px'}]}>PHIC Package</p>
                    <p style={[styles.tableLike.header.hospital,{width: '264px'}]}>HCI Type</p>
                    <p>Primary</p>
                </div>       
                <div style={{height: '300px', marginTop: '10px'}}>

                    {addHospitalCodeRequest || deleteHospitalCodePendingRequest ? 
                        <LoadingIndicatorPerContainer />
                            :
                        <div style={{maxHeight: '300px', minHeight: '250px', overflowY : 'auto'}}>   

                            {  
                                listOfCode.length < 1 ?
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px'}}>
                                    <Info style={{height: '50px', width: '50px', marginRight: '10px' }}/>
                                    You dont have any Hospital Code
                                </div>
                                :
                                listOfCode
                            }                                                                                     
                        </div>                        
                    }
                </div>      
            </StyleRoot>
        );
    }

}

export default PHICHospitalCode;