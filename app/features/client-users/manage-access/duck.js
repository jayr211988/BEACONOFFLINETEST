import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 5
};

const CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_REQUEST = 'CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_REQUEST';
const CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS = 'CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS';
const CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_ERROR = 'CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_ERROR';

export default (state = {}, action) => {
    switch(action.type) {

    case CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_REQUEST:
        return {
            ...state,
            editPHICEclaimsAccessRequest: true
        };

    case CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS:
        return {
            ...state,
            editPHICEclaimsAccessRequest: false
        };

    case CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_ERROR:
        return {
            ...state,
            editPHICEclaimsAccessRequest: false
        };

    default: return state;
    }
};

export const editPHICEclaimsAccess = (userId, clientId, isAddToRole) => (dispatch, getState, {clientBeacon}) => {
    dispatch(editPHICEclaimsAccessRequest());

    clientBeacon
        .put(`api/Account/EditPHICEclaimsAccess?userId=${userId}&clientId=${clientId}&isAddToRole=${isAddToRole}`)
        .then(response => {
            dispatch(editPHICEclaimsAccessSuccess(response.data));
            dispatch(Notifications.success({
                ...notificationOpts,
                message: isAddToRole ? 'PHIC eClaims access successfully added.' : 'PHIC eClaims access successfully removed.',
                title: 'Success'
            }));
        })
        .catch(error => {
            dispatch(editPHICEclaimsAccessError());
            dispatch(Notifications.error({
                ...notificationOpts,
                message: error.data.exceptionMessage,
                title: 'Error'
            }));
        });
};

const editPHICEclaimsAccessRequest = () => ({
    type: CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_REQUEST
});

const editPHICEclaimsAccessSuccess = (user) => ({
    type: CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_SUCCESS,
    payload: user
});

const editPHICEclaimsAccessError = () => ({
    type: CLIENT_USERS_MANAGE_ACCESS_EDIT_PHIC_ECLAIMS_ACCESS_ERROR
});
