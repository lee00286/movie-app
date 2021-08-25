import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Redux 연결
import 'antd/dist/antd.css'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'; // Redux-promise
import ReduxThunk from 'redux-thunk'; // Redux-thunk
import Reducer from './_reducers'; // Reducer

// 원래는 createStore만 씀 (객체만 받을 수 있음)
// promiseMiddleware과 ReduxThunk를 추가 (promise와 function도 받을 수 있음)
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render( // Redux 연결
  <Provider
    store={ createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      ) }
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
