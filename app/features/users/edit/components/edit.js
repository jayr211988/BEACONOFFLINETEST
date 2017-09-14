import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import MouseTrap from 'mousetrap';

import colorPallete from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

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
        marginBottom: '10px'
    }
};


@reduxForm({
    form : 'editUserForm'
})

@Radium
class UsersEdit extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        Mousetrap.bind(['c'], this.onCancel.bind(this));
    }
    render() {
        const {handleSubmit, saveEditUserPending} = this.props;
        return (
            <StyleRoot style={animation.fadeIn}>
                <Helmet title="Edit User" />
                <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction title={'Edit User'} onCancel={this.onCancel} isBusy={saveEditUserPending} />

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



export default UsersEdit;
