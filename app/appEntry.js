import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store/configureStore.js'
import Routers from './routers'
export default () => (
    <Provider store={store}>
     <Routers/>
    </Provider>
)

