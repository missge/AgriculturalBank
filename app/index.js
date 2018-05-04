import React from 'react';
import ReactDOM from 'react-dom';
import AppEntry from './appEntry';

import registerServiceWorker from './registerServiceWorker';
const FastClick = require('fastclick');
//Ω‚æˆ“∆∂Ø∂À300∫¡√Î—”≥Ÿ
FastClick.attach(document.body);
ReactDOM.render(
    <AppEntry />,
    document.getElementById('root'));
registerServiceWorker();
