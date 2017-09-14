import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import MouseTrap from 'mousetrap';

import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import { TextField } from 'redux-form-material-ui';
import CircularProgress from 'material-ui/CircularProgress';

// *** dumb components
import SubHeaderWithAction from '../../../../shared-components/subheader-with-action';

import Radium, { StyleRoot } from 'radium';

import { required, email } from '../../../../util/validation';
import { capitalizeFirstLetter } from '../../../../util/normalize';

// *** custom css styles
import colorPallete from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';

const styles = {
    container: {
        paddingTop: '20px',
        paddingLeft: '40px',
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        color: colorPallete.primaryColor,
        fontWeight: 'bold'
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
    },

    displayFlex : {
        display: 'flex'
    }        
};

/**
 * Client User New Component
 * 
 * @class ClientUsersNew
 * @extends {React.Component}
 */
 
@reduxForm({
    form: 'clientUsersNewForm'
})
@Radium
class ClientUsersNew extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Mousetrap.bind(['c'], this.onCancel.bind(this));
    }
    /**
     * Cancel
     * 
     * 
     * @memberOf ClientUsersNew
     */
    onCancel() {
        browserHistory.goBack();
    }
    


    checkEmailIfExist() {
        const {email} = this.refs;
        const {checkIfEmailExist} = this.props;
        let checkIfEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const callback = (username) => {                 
            if (username) {                
                this.refs.username.getRenderedComponent().props.input.onChange(username);
            }else {                
                this.refs.username.getRenderedComponent().props.input.onChange('');
            }            
        };
        if (email.value) {
            if (checkIfEmail.test(email.value)) {
                checkIfEmailExist(email.value, callback);
            }            
        }
    }
    



    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ClientUsersNew
     */
    render() {
        const { handleSubmit, newClientUsersRequestPending, existingClientUserName, existingClientuserRequestPending } =  this.props;                
        return (
            <StyleRoot style={animation.fadeIn}>          
                <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction title={'New User'} onCancel={this.onCancel} isBusy={newClientUsersRequestPending}/>

                    <div style={styles.container}>
                        <div style={styles.userInfoContainer}>
                            <label style={styles.header}>Basic Info</label>
                            <div style={styles.displayFlex}>
                                <Field 
                                    name="firstname" 
                                    component={TextField} 
                                    hintText="First Name" 
                                    type="text" 
                                    floatingLabelText="First Name" 
                                    style={styles.marginRight} 
                                    disabled={newClientUsersRequestPending}
                                    validate={required}
                                    normalize={capitalizeFirstLetter}

                                />

                                <Field 
                                    name="middlename" 
                                    component={TextField} 
                                    hintText="Middle Name" 
                                    type="text" 
                                    floatingLabelText="Middle Name" 
                                    style={styles.marginRight} 
                                    disabled={newClientUsersRequestPending}
                                    normalize={capitalizeFirstLetter}

                                />

                                <Field 
                                    name="lastname"
                                    component={TextField} 
                                    hintText="Last Name" 
                                    type="text" 
                                    floatingLabelText="Last Name" 
                                    disabled={newClientUsersRequestPending}
                                    validate={required}
                                    normalize={capitalizeFirstLetter}
                                    
                                />
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Field 
                                    name="email" 
                                    component={TextField} 
                                    hintText="Email" 
                                    type="email" 
                                    floatingLabelText="Email" 
                                    disabled={newClientUsersRequestPending}
                                    validate={[required, email]}
                                    ref="email"
                                    onBlur={this.checkEmailIfExist.bind(this)}
                                />
                                
                                {existingClientuserRequestPending ? 
                                    <CircularProgress size={20}/> 
                                    : null
                                }
                            </div>
                        </div>
                        <div style={styles.userInfoContainer}>
                            <label style={styles.header}>Account</label>
                            <div style={styles.accountContainer}>
                            
                                <Field 
                                    name="username" 
                                    component={TextField} 
                                    hintText="User Name" 
                                    type="text" floatingLabelText="User Name" 
                                    disabled={newClientUsersRequestPending || existingClientUserName ? existingClientUserName.length > 0 ? true : false : false}
                                    validate={required}       
                                    ref="username"
                                    withRef                                                                                                                        
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </StyleRoot>
        );
    }
}

// *** props
ClientUsersNew.propTypes = {
    newClientUsersRequestPending : PropTypes.bool.isRequired
};

export default ClientUsersNew;

