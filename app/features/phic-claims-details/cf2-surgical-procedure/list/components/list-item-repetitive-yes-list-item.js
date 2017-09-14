import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

// *** material-ui components
import { TableRow, TableRowColumn } from 'material-ui/Table';

// *** material-ui components
import CustomSelectField from '../../../../../shared-components/custom-material-ui/selectfield';
import MenuItem from 'material-ui/MenuItem';

// *** dumb components
import CustomDatePicker from '../../../../../shared-components/custom-material-ui/datepicker';

import { initialData } from '../../../../../util/data/index';
import { required } from '../../../../../util/validation';

import Radium from 'radium';

// *** custom css styles
import colorPalette from '../../../../../util/styles/color-pallete';

const styles = {
    dateWrapper: {
        display: 'flex',
        alignItems: 'center',
    },

    iconStyle: {
        paddingLeft: '40px'
    },

    selectFieldStyle: {
        display: 'flex', 
        fontSize: '14px'
    }
};

/**
 * List Item Component
 * 
 * @class Cf2SurgicalProcedureListItemRepetitiveYesListItem
 * @extends {React.Component}
 */
@Radium
class Cf2SurgicalProcedureListItemRepetitiveYesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    sessionLateratlity(value, code) {
        const {editLateralityOfSelectedSessions} = this.props;
        const {session} = this.props;        

        let sessionInfo = {
            id : session.id,
            sessionNumber : session.sessionNumber,
            lateralityCode : code,
            lateralityValue : value
        };              
        editLateralityOfSelectedSessions(sessionInfo);
    }

    /**
     * Display Menu Items
     * 
     * @param {any} arr
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveYesListItem
     */
    onDisplayMenuItems(items) {                    
        return items.map((t, i) => (
            <MenuItem 
                key={i}
                value={t.code} 
                primaryText={t.value} 
                onTouchTap={this.sessionLateratlity.bind(this, t.value, t.code)}
            /> 
        ));
    
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Cf2SurgicalProcedureListItemRepetitiveYesListItem
     */
    render() {
        const { 
            fields, 
            session, 
            summaryMode, firstCaseRate, secondCaseRate, surgicalProcedure } = this.props;

        const isCaseRateExists = (caseRate) => {
            return caseRate && caseRate.sourceId == surgicalProcedure.id && caseRate.sourceType == 1;
        };
        return (
                <TableRow hoverable={true}>

                    { /** SESSION NO# */ }
                    <TableRowColumn>{ session.sessionNumber }</TableRowColumn>

                    { /** DATE */ }
                    <TableRowColumn >
                        <div style={styles.dateWrapper}>
                            <Field
                                withRef={true}
                                ref={`${fields.name}.sessionDate`}
                                name={`${fields.name}.sessionDate`}          
                                hintText="Date"                                                         
                                component={CustomDatePicker}      
                                textFieldStyle={{ width: '228px' }}                            
                                isOnTable={true}
                                validate={required}
                                disabled={summaryMode}
                            />   
                        </div>
                    </TableRowColumn>

                    { /** TYPE */ }
                    <TableRowColumn>
                        { session.typeValue }
                    </TableRowColumn>

                    { /** LATERALITY */ }
                    <TableRowColumn>
                        <Field                                                 
                            name={`${fields.name}.lateralityCode`} 
                            hintText="Select Laterality"                                     
                            isOnTable={true}                                 
                            component={CustomSelectField}  
                            validate={required}
                            disabled={summaryMode || ((isCaseRateExists(firstCaseRate) || isCaseRateExists(secondCaseRate)) 
                            ? isCaseRateExists(firstCaseRate) || isCaseRateExists(secondCaseRate) ? true : false : null)}
                            iconStyle={{fill: colorPalette.secondaryTextColor}}>                                                        
                                {this.onDisplayMenuItems(initialData.laterality) }
                            
                        </Field>  
                    </TableRowColumn>                
                </TableRow>
        );
    }
}

// *** props
Cf2SurgicalProcedureListItemRepetitiveYesListItem.propTypes = {
    session : PropTypes.object.isRequired,
    summaryMode: PropTypes.bool
};

export default Cf2SurgicalProcedureListItemRepetitiveYesListItem;
