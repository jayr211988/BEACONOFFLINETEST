import React, { PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import MouseTrap from 'mousetrap';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { browserHistory } from 'react-router';

import colorPallete from '../../../util/styles/color-pallete';
import { required } from '../../../util/validation';
import SubHeaderWithAction from '../../../shared-components/subheader-with-action';

import {  minLength7 } from '../../../util/validation';

const style = {
    container: {
        paddingTop: '20px',
        paddingLeft: '40px',
        display: 'flex',
        flexDirection: 'column'
    },

    title: {
        color: colorPallete.primaryColor,
        marginTop: '5px',
        marginBottom: '5px',        
        fontWeight: 600
    }
};

/**
 * Change Password Component
 * 
 * @class ChangePassword
 * @extends {React.Component}
 */
@reduxForm({
    form: 'changePasswordForm'
})
@Radium
class ChangePassword extends React.Component {

    componentDidMount() {
        Mousetrap.bind(['c'], this.onCancel.bind(this));
    }

    onCancel() {
        browserHistory.goBack();
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChangePassword
     */
    render() {
        const { handleSubmit, changePasswordPendingRequest, errors } = this.props;

        return (
            <StyleRoot>
                <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction 
                        title={'Change Password'} 
                        onCancel={this.onCancel} 
                        isBusy={changePasswordPendingRequest}
                    />

                    <div style={style.container}>
                        <p style={style.title}>Account</p>
                           
                        <Field 
                            name="oldPassword" 
                            component={TextField} 
                            hintText="Old Password" 
                            type="password" 
                            floatingLabelText="Old Password" 
                            validate={required} 
                        />
                        <span title="Password should be more than 6 letters">
                            <Field 
                                name="password" 
                                component={TextField} 
                                hintText="Password" 
                                type="password" 
                                floatingLabelText="Password" 
                                validate={[required, minLength7]} 
                                errorText={errors}
                            />
                        </span>
                        <span title="Password should be more than 6 letters">
                            <Field 
                                name="confirmPassword" 
                                component={TextField} 
                                hintText="Confirm Password" 
                                type="password" 
                                floatingLabelText="Confirm Password" 
                                validate={[required, minLength7]} 
                                errorText={errors}
                            />
                        </span>
                    </div>
                </form>
            </StyleRoot>
        );
    }
}

// *** props
ChangePassword.propTypes = {
    errors : PropTypes.string
};

export default ChangePassword;
