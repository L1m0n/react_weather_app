import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import mainReducer from './reducers';

var store = createStore();


ReactDOM.render(
	<Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
