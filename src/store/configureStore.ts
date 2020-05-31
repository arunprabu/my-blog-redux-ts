import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import logger from 'redux-logger'; // npm i redux-logger 
import {postReducer}  from "../reducers/postReducer";
import { AppActions } from "../actions/posts";

export const rootReducer = combineReducers({
  posts: postReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);