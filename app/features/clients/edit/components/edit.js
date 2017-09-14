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

import { required, email, number, maxLength100, maxLength15, maxLength20 } from '../../../../util/validation';

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

    clientInfoContainer: {
        marginTop: '10px',
        marginBottom: '10px'
    },

    stack: {
        display: 'flex',
        flexDirection: 'column'
    },

    longField: {
        width: '500px'
    },
    displayFlex : {
        display: 'flex'
    }
};

@reduxForm({
    form: 'editClientForm'
})
@Radium
class ClientsEdit extends React.Component {

    componentDidMount() {
         Mousetrap.bind(['c'], this.onCancel.bind(this));
    }

    render() {
        const { editClientsRequestPending, handleSubmit,selectedClient } = this.props;
        
        return (
            <StyleRoot style={animation.fadeIn}>
                <Helmet title = "Clients - Edit Client" />
                <form onSubmit={handleSubmit}>
                    <SubHeaderWithAction title={'Edit Client'} onCancel={this.onCancel} isBusy={editClientsRequestPending} />

                    <div style={style.wrapper}>
                        <div style={style.clientInfoContainer}>
                            <p style={style.header}>Primary Contact</p>
                            <div style={style.displayFlex}>
                                <Field name="contactFirstname"
                                    component={TextField}
                                    hintText="First Name"
                                    type="text"
                                    floatingLabelText="First Name"
                                    style={style.marginRight}
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                                <Field name="contactMiddlename"
                                    component={TextField}
                                    hintText="Middle Name"
                                    type="text"
                                    floatingLabelText="Middle Name"
                                    style={style.marginRight}
                                    disabled={editClientsRequestPending} />
                                <Field name="contactLastname"
                                    component={TextField}
                                    hintText="Last Name"
                                    type="text"
                                    floatingLabelText="Last Name"
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                            </div>
                            <div style={style.displayFlex}>
                                <Field name="contactEmail" 
                                    component={TextField} 
                                    hintText="Contact Email"
                                    type="text"
                                    floatingLabelText="Contact Email"
                                    style={style.marginRight}
                                    validate={[required, email]}
                                    disabled={editClientsRequestPending || selectedClient.clientStatus == 0} />
                                <Field name="contactWorkPhone" 
                                    component={TextField} 
                                    hintText="Contact Work Phone" 
                                    type="text" 
                                    floatingLabelText="Contact Work Phone" 
                                    style={style.marginRight}
                                    disabled={editClientsRequestPending} />
                                <Field name="contactMobilePhone" 
                                    component={TextField} 
                                    hintText="Contact Mobile Phone" 
                                    type="text" 
                                    floatingLabelText="Contact Mobile Phone"
                                    disabled={editClientsRequestPending} />
                            </div>
                        </div>
                        <div style={style.clientInfoContainer}>
                            <p style={style.header}>Company</p>
                            <div>
                                <Field name="name" 
                                    component={TextField} 
                                    hintText="Name" 
                                    type="text" 
                                    floatingLabelText="Name" 
                                    style={style.longField}
                                    validate={[required, maxLength100]}
                                    disabled={editClientsRequestPending} />
                            </div>
                            <div>
                                <Field name="companyEmail" 
                                    component={TextField} 
                                    hintText="Company Email" 
                                    type="text" 
                                    floatingLabelText="Company Email" 
                                    style={style.longField}
                                    validate={[required, email]}
                                    disabled={editClientsRequestPending} />
                            </div>
                                                        <div>
                                <Field name="taxIdentificationNo" 
                                    component={TextField} 
                                    hintText="T.I.N" 
                                    type="text" 
                                    floatingLabelText="T.I.N" 
                                    style={style.longField}
                                    validate={[required, maxLength15]}
                                    disabled={editClientsRequestPending} />
                            </div>
                            <div>
                                <Field name="bureauOfInternalRevenue" 
                                    component={TextField} 
                                    hintText="BIR Permit Number" 
                                    type="text" 
                                    floatingLabelText="BIR Permit Number" 
                                    style={style.longField}
                                    validate={[required, maxLength20]}
                                    disabled={editClientsRequestPending} />
                            </div>
                        </div>
                        <div style={style.clientInfoContainer}>
                            <p style={style.header}>Address</p>
                            <div style={style.stack}>
                                <Field name="street" 
                                    component={TextField} 
                                    hintText="Street" 
                                    type="text" 
                                    floatingLabelText="Street" 
                                    style={style.longField}
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                                <Field name="townCity" 
                                    component={TextField} 
                                    hintText="Town / City" 
                                    type="text" 
                                    floatingLabelText="Town / City" 
                                    style={style.longField}
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                                <Field name="region" 
                                    component={TextField} 
                                    hintText="Region" 
                                    type="text" 
                                    floatingLabelText="Region" 
                                    style={style.longField}
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                                <Field name="stateProvince" 
                                    component={TextField} 
                                    hintText="State / Province" 
                                    type="text" 
                                    floatingLabelText="State / Province" 
                                    style={style.longField}
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                                <Field name="country" 
                                    component={TextField} 
                                    hintText="Country" 
                                    type="text" 
                                    floatingLabelText="Country" 
                                    style={style.longField}
                                    validate={required}
                                    disabled={editClientsRequestPending} />
                                <Field name="zipCode" 
                                    component={TextField} 
                                    hintText="Zip Code" 
                                    type="text" 
                                    floatingLabelText="Zip Code" 
                                    style={style.longField}
                                    disabled={editClientsRequestPending} />
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
}

export default ClientsEdit;
