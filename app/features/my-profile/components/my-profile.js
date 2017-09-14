import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import MouseTrap from 'mousetrap';
import { reduxForm, Field } from 'redux-form';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { RadioButton } from 'material-ui/RadioButton';
import PermDeviceInformation from 'material-ui/svg-icons/action/perm-device-information';

import colorPallete from '../../../util/styles/color-pallete';
import SubHeaderWithAction from '../../../shared-components/subheader-with-action';
import {hasPHICEclaimsAccess} from '../../../util/roles';
import {hasPHICECLAIMS} from '../../../util/rules';

import animation from '../../../util/styles/animation';

import { required, email } from '../../../util/validation';

const style = {
    wrapper: {
        paddingTop: '20px',
        paddingLeft: '40px',
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        color: colorPallete.primaryColor,
        marginTop: '0',
        marginBottom: '0',
        fontWeight: '600'
    },

    marginRight: {
        marginRight: '20px'
    },

    userInfoContainer: {
        marginTop: '10px',
        marginBottom: '10px'
    },

    notificationContainer: {
        marginTop: '40px'
    },

    notificationHeader: {
        color: colorPallete.primaryColor,
        marginTop: '0',
        marginBottom: '24px',
        fontWeight: 'bold',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',

        icon: {
            width: '20px',
            height: '20px',
            color: colorPallete.primaryColor,
            marginRight: '6px'
        }
    },

    notificationBody: {
        color: colorPallete.primaryTextColor,

        radioGroup: {
            display: 'flex',
            marginTop: '18px'
        }
    }
};

@reduxForm({
    form : 'editUserForm'
})

@Radium
class EditMyProfile extends React.Component {

    componentDidMount() {
        Mousetrap.bind(['c'], this.onCancel.bind(this));
    }

    onCancel() {
        browserHistory.goBack();
    }
    
    render() {
        const { handleSubmit, saveEditUserPending, selectedFacility, currentUser } = this.props;

        return (
            <StyleRoot style={animation.fadeIn}>
                <Helmet title="Edit Profile" />
                <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction title={'My Profile'} onCancel={this.onCancel} isBusy={saveEditUserPending} />

                    <div style={style.wrapper}>
                        <div style={style.userInfoContainer}>
                            <p style={style.header}>Basic Info</p>
                            <div style={{display: 'flex'}}>
                                <Field 
                                    name="firstname" 
                                    component={TextField} 
                                    hintText="First Name" 
                                    type="text" 
                                    floatingLabelText="First Name" 
                                    style={style.marginRight} 
                                    validate={required}
                                    disabled={saveEditUserPending}                                    
                                />

                                <Field 
                                    name="middlename" 
                                    component={TextField} 
                                    hintText="Middle Name" 
                                    type="text" 
                                    floatingLabelText="Middle Name" 
                                    style={style.marginRight}                                     
                                    disabled={saveEditUserPending}  
                                />
                                
                                <Field 
                                    name="lastname" 
                                    component={TextField} 
                                    hintText="Last Name" 
                                    type="text" 
                                    floatingLabelText="Last Name" 
                                    validate={required}
                                    disabled={saveEditUserPending}
                                    
                                />
                            </div>
                            <div>
                                <Field 
                                    name="email" 
                                    component={TextField} 
                                    hintText="Email" 
                                    type="email" 
                                    floatingLabelText="Email" 
                                    validate={[required, email]}
                                    disabled={saveEditUserPending}
                                />
                            </div>
                        </div>
                        <div style={style.userInfoContainer}>
                            <p style={style.header}>Account</p>
                            <div>
                                <Field 
                                    name="userName" 
                                    component={TextField} 
                                    hintText="User Name" 
                                    type="text" 
                                    floatingLabelText="User Name" 
                                    validate={required}
                                    disabled={saveEditUserPending}
                                />
                            </div>
                        </div>
                        { hasPHICECLAIMS(selectedFacility) && hasPHICEclaimsAccess(currentUser, selectedFacility)
                            ?
                            <div style={style.notificationContainer}>
                                <div style={style.notificationHeader}>
                                    <PermDeviceInformation style={style.notificationHeader.icon} />
                                    Notifications Settings
                                </div>
                                <div style={style.notificationBody}>
                                    PhilHealth e-Claims - Notify me via email when my transmittal is processed.
                                    <Field
                                        name="notifyWhenTransmittalIsProcessed"
                                        component={RadioButtonGroup}
                                        style={style.notificationBody.radioGroup}
                                        format={value => (value ? 'Yes': 'No')}
                                        parse={value => value === 'Yes'}
                                        >
                                        <RadioButton
                                            value="Yes"
                                            label="Yes"
                                            style={{marginRight: '17px', display: 'block', width: 'auto'}}
                                        />
                                        <RadioButton
                                            value="No"
                                            label="No"
                                            style={{display: 'block', width: 'auto'}}
                                        />
                                    </Field>
                                </div>
                            </div>
                            : null
                        }
                        
                    </div>
                </form>
            </StyleRoot>
        );
    }
    
    onCancel() {
        browserHistory.goBack();
    }

    onSave(event) {
        event.preventDefault();

        throw new Error('unimplemented method');
    }
}

// *** props
EditMyProfile.propTypes = {
    errors : PropTypes.string
};

export default EditMyProfile;
