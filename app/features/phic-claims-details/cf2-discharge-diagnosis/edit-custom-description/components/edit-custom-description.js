
// react
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

// material 
import RaisedButton from 'material-ui/RaisedButton';

import LoadingIndicatorPerAction from '../../../../../shared-components/loading-indicator-per-action';
import { required, maxLength500 } from '../../../../../util/validation';
import colorPalette from '../../../../../util/styles/color-pallete';


const styles = {
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
                width: '40%'
            },
            check: {
                width: 'initial'
            }
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

    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',
        marginTop: '10px',

        left: {
            marginLeft: '12px'
        }
    },
};


@reduxForm({
    form: 'editCustomDescriptionDischargeDiagnosisForm'
})
@Radium
class Cf2DischargeDiagnosisEditCustomDescription extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            search: '',
            selectedICD10: null
        };
    }

    render() {
        const { handleSubmit, close, editPhicDischargeDiagnosisCustomDescriptionRequestPending } = this.props;
        
        return (
            <StyleRoot>
                 <section>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field
                                component={TextField}
                                name="icD10Code"
                                floatingLabelText="Code"
                                fullWidth={true}
                                disabled={true}
                                inputStyle={{color: colorPalette.primaryTextColor}}
                                type="text" />
                            <Field
                                component={TextField}
                                name="icD10Value"
                                floatingLabelText="Description"
                                fullWidth={true}
                                disabled={true}
                                inputStyle={{color: colorPalette.primaryTextColor}}
                                type="text" />
                            <Field
                                component={TextField}
                                name="icD10CustomDescription"
                                hintText="Custom Description"
                                floatingLabelText="Custom Description"
                                fullWidth={true}
                                validate={[required, maxLength500]}
                                type="text" />
                            
                        </div>
                        <div style={styles.buttonWrapper}>
                            { editPhicDischargeDiagnosisCustomDescriptionRequestPending
                                ?
                                <LoadingIndicatorPerAction text={'Saving...'} style={{padding: '0 10px'}} />
                                :
                                <div>
                                    <RaisedButton
                                        style={ styles.buttonWrapper.left }
                                        label={ 'CANCEL' }
                                        onTouchTap={close}
                                    />
                                    <RaisedButton
                                        style={ styles.buttonWrapper.left }
                                        label={ 'SAVE' }
                                        secondary={true}
                                        type="submit"
                                    />
                                </div>
                            }
                        </div>
                    </form>
                </section>
            </StyleRoot>
        );
    }
}

export default Cf2DischargeDiagnosisEditCustomDescription;