import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//Redux dependencies
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
// Import Redux Middleware
import promiseMiddlware from "redux-promise";
import ReduxThunk from "redux-thunk";
//Import Reducer
import Reducer from "./_reducers";
import "antd/dist/antd.css";

// Apply middlewares into Redux store
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddlware,
  ReduxThunk
)(createStore);

// import antd stylesheets

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
