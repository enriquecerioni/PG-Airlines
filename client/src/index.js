import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {store} from './redux/store/index.js'
import reportWebVitals from "./reportWebVitals";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001/";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
