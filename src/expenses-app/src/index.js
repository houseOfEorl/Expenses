import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import api from './middleware/api';
import reducersApp from './reducers.jsx';


let createStoreWithMiddleware  = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(reducersApp)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
