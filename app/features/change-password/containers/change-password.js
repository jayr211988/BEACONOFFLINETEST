import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChangePassword from '../components/change-password';
import { changePassword } from '../duck';

/**
 * Change Password Container
 * 
 * @class ChangePasswordContainer
 * @extends {React.Component}
 */
@connect(
    (state) => state.changePasswordReducer,
    (dispatch) => ({ actions: bindActionCreators({changePassword}, dispatch) })
)
class ChangePasswordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors : null
        };
    }

    /**
     * Change Password
     * 
     * @param {any} values
     * @param {any} x
     * @param {any} { reset }
     * 
     * @memberOf ChangePasswordContainer
     */
    onSave(values, x, { reset }) {
        const { actions: { changePassword } } = this.props;

        this.setState({ errors : null });

        if(values.password !== values.confirmPassword) 
            this.setState({ errors : 'password not match' });

        else changePassword(values, reset);
        
    }    
    
    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf ChangePasswordContainer
     */
    render() {
        const { changePasswordPendingRequest } = this.props;

        return (
            <ChangePassword  
                onSubmit={this.onSave.bind(this)} 
                changePasswordPendingRequest={changePasswordPendingRequest} 
                errors={this.state.errors}
            />
        );
    }
}

export default ChangePasswordContainer;
