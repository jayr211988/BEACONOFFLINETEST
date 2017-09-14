// React 
import React from 'react';
import { render } from 'react-dom';

//Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Helmet
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

//App
import store from './store';
import getRoutes from './routes';
import lightBaseTheme from '../app/util/styles/light-base-theme';

import NotificationsContainer from '../app/shared-components/notifications';


//TODO: This is a workaround since the url routing is not working on the backend web.config
if(process.env.NODE_ENV === 'production' && window.location.protocol == 'http:')
{
    console.log('[REDIRECTING TO HTTPS]');
    window.location.href = 'http://localhost:3000/';
};

const appRoot = (rootId) => {
    //Inline manual integration
    const e  = document.createElement('script'); 
    const t = document.getElementsByTagName('script')[0];
    return document.getElementById(rootId);
};

//http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin();

//render on page
render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
                <Helmet titleTemplate="BEACON - %s" />
                {getRoutes()}
                <NotificationsContainer/>
            </div>
        </MuiThemeProvider>        
    </Provider>,
    appRoot('root')
);

// render(
//     <div><h1>test he1 test</h1></div>,
//     appRoot('root')
// );
