import rootReducer from "../reducer/index.js";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
// thunk nos permite trabajar con asincronismo en el front