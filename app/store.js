import { createStore,compose } from 'redux';
import reducers from './reducers';
import middlewares from './middlewares';


//Hook redux dev tools
//https://github.com/zalmoxisus/redux-devtools-extension#usage
const store = createStore(
    reducers,//All Reducers
    compose(middlewares),
    // process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production' ?  
    //             compose(middlewares) : 
    //             compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())    
);

export default store;