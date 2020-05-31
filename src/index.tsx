import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 

//import rootReducers from './reducers'; 
//import logger from 'redux-logger'; // npm i redux-logger 
//import thunk from 'redux-thunk';  //npm i redux-thunk
  
//const store = createStore( rootReducers, applyMiddleware(thunk, logger) );  //this needs a special argument called 'reducer'

// instead of the above few steps we can do the following 
import {store} from './store/configureStore';

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
