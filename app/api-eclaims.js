import axios from 'axios';
import { logoutUserSession, refreshUserSession, unauthorizedResourceAccessedByUser} from './util/auth';

const api = axios.create ({
    baseURL: 'http://localhost:3000/'
});

// with interceptors
api.interceptors.response.use(undefined, function(error) {
    
    if(process.env.NODE_ENV !== 'production')
    {
        console.log(`[INTERCEPTED ERROR]`);
        console.log(error);
        console.log(error.response);
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retryRequest) {

        if(process.env.NODE_ENV !== 'production') console.log('[REFRESHING TOKEN]');

        originalRequest._retryRequest = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const currentUserId = localStorage.getItem('currentUserId');

        var params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', `USER-${currentUserId}`);

        return api.post('http://localhost:3000/' + '/token', params) 
            .then(function(response) {

                if(process.env.NODE_ENV !== 'production') 
                {
                    console.log('[REFRESHING TOKEN SUCCESSFUL]');
                }
                refreshUserSession(response.data.access_token, response.data.refresh_token);

                if(process.env.NODE_ENV !== 'production') 
                {
                    console.log('[REPLAYING ORIGINAL REQUEST]');
                }
                originalRequest.headers[`Authorization`] = 'Bearer ' + response.data.access_token;
                return api(originalRequest);
            })
            
            .catch(function(error) {
                if(error.config.url.indexOf('/token') > 0 ) {
                    if(process.env.NODE_ENV !== 'production') 
                    {
                        console.log('REFRESHING TOKEN FAIL - LOGGING OUT USER');
                    }
                    logoutUserSession();
                } else {
                    if(process.env.NODE_ENV !== 'production') 
                    {
                        console.log('USER HAS A VALID SESSION - BUT IS ACCESSING AN UNAUTHORIZED RESOURCES');
                    }
                    unauthorizedResourceAccessedByUser();
                }
            });
    } 

    return Promise.reject(error.response);
});
export default api;