import React, { PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form';

// *** material-ui components
import { TextField } from 'redux-form-material-ui';

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
        marginTop: '0',
        marginBottom: '0',
        fontWeight: 'bold'
    },

    marginRight: {
        marginRight: '20px'
    },

    clientUserInfoContainer: {
        marginTop: '10px',
        marginBottom: '10px'
    },

    displayFlex : {
        display: 'flex'
    }    
};

/**
 * Client Users Edit Component
 * 
 * @class EditUser
 * @extends {React.Component}
 */

@reduxForm({
    form : 'clientUserEditForm',
})
@Radium
class ClientUsersEdit extends React.Component {
    constructor(props) {
        super(props);
    }
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf EditUser
     */
    render() {
        const { onCancel, handleSubmit, editClientUserRequestPending } = this.props;

        return (
            <StyleRoot style={animation.fadeIn}>
                <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction title={'Edit User'} onCancel={onCancel.bind(this)} isBusy={editClientUserRequestPending}/>

                    <div style={styles.container}>
                    
                        <div style={styles.clientUserInfoContainer}>
                            <label style={styles.header}>Basic Info</label>
                            <div style={styles.displayFlex}>
                                <Field 
                                    name="firstname" 
                                    component={TextField} 
                                    hintText="First Name" 
                                    type="text" 
                                    floatingLabelText="First Name" 
                                    style={styles.marginRight} 
                                    disabled={editClientUserRequestPending}
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
                                    disabled={editClientUserRequestPending}
                                    normalize={capitalizeFirstLetter}

                                />

                                <Field 
                                    name="lastname" 
                                    component={TextField} 
                                    hintText="Last Name" 
                                    type="text" 
                                    floatingLabelText="Last Name" 
                                    disabled={editClientUserRequestPending}
                                    validate={required}
                                    normalize={capitalizeFirstLetter}
                                    
                                />
                            </div>

                            <div>
                                <Field 
                                    name="email" 
                                    component={TextField} 
                                    hintText="Email" 
                                    type="email" 
                                    floatingLabelText="Email" 
                                    disabled={editClientUserRequestPending}
                                    validate={[required, email]}
                                />
                            </div>
                        </div>

                        <div style={styles.userInfoContainer}>
                            <label style={styles.header}>Account</label>

                            <div>
                                <Field 
                                    name="username" 
                                    component={TextField} 
                                    hintText="User Name" 
                                    type="text" 
                                    floatingLabelText="User Name" 
                                    disabled={editClientUserRequestPending}
                                    validate={required}
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
ClientUsersEdit.propTypes = {
    onCancel : PropTypes.func.isRequired,
    editClientUserRequestPending : PropTypes.bool.isRequired
};

export default ClientUsersEdit;
