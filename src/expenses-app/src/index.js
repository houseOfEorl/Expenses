import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App'
import thunkMiddleware from 'redux-thunk';
import api from './middleware/api';
import reducersApp from './reducers.jsx';


let createStoreWithMiddleware  = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(reducersApp)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);