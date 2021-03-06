import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import mainReducer from './reducers/reducers.js';

var store = createStore(
	mainReducer,
	applyMiddleware(thunkMiddleware)
);


ReactDOM.render(
	<Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
