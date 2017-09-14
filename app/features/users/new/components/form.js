import React from 'react';
import Radium, { StyleRoot } from 'radium';

import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import colorPallete from '../../../../util/styles/color-pallete';
import SubHeaderWithAction from '../../../../shared-components/subheader-with-action';

import { required, email } from '../../../../util/validation';

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
        marginBottom: '40px'
    },

    accountContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
};


@Radium
class UsersNewForm extends React.Component {
    render() {

        const {handleSubmit, onCancel, newUserRequestPending} = this.props;
        return (
            <StyleRoot>
                 <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction 
                        title={'Add User'} 
                        onCancel={onCancel}  
                        isBusy={newUserRequestPending}                       
                    />

                    <div style={style.wrapper}>
                        <div style={style.userInfoContainer}>
                            <p style={style.header}>Basic Info</p>
                            <div style={{display: 'flex'}}>
                                
                                <Field  
                                    component={TextField} 
                                    floatingLabelText="First Name" 
                                    hintText="First Name" 
                                    name="Firstname"                                     
                                    style={style.marginRight} 
                                    type="text" 
                                    validate={required}
                                    disabled={newUserRequestPending}
                                />

                                <Field 
                                    component={TextField} 
                                    floatingLabelText="Middle Name" 
                                    hintText="Middle Name" 
                                    name="Middlename"                                     
                                    type="text" 
                                    style={style.marginRight}                                     
                                    disabled={newUserRequestPending}
                                />

                                <Field 
                                    component={TextField} 
                                    floatingLabelText="Last Name" 
                                    hintText="Last Name" 
                                    name="Lastname" 
                                    type="text" 
                                    validate={required}
                                    disabled={newUserRequestPending}
                                />

                            </div>
                            <div>
                                <Field 
                                    component={TextField} 
                                    floatingLabelText="Email" 
                                    hintText="Email" 
                                    name="Email" 
                                    type="email" 
                                    validate={[required, email]}
                                    disabled={newUserRequestPending}
                                />
                            </div>
                        </div>
                        <div style={style.userInfoContainer}>
                            <p style={style.header}>Account</p>
                            <div style={style.accountContainer}>
                                <Field 
                                    component={TextField} 
                                    floatingLabelText="User Name" 
                                    hintText="UserName" 
                                    name="UserName"                                     
                                    type="text" 
                                    validate={required}
                                    disabled={newUserRequestPending}
                                />

                              
                            </div>
                        </div>
                    </div>
                </form>

            </StyleRoot>
        );
    }
}

UsersNewForm = reduxForm({
    form : 'addUser'
})(UsersNewForm);


export default UsersNewForm;