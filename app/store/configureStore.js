
import { createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux'
import rootReducer from '../reducers/index'
const middlewares = [thunk];
const store = createStore(
    combineReducers({routing: routerReducer, ...rootReducer}),
    composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
