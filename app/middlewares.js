import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import clientBeacon from './api-beacon';
import clientEclaims from './api-eclaims';
import clientQmeUp from './api-qmeup';

const middlewares = applyMiddleware(thunk.withExtraArgument({clientBeacon,clientEclaims,clientQmeUp}));

export default middlewares;