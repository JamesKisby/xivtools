import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers/index";
import { forbiddenWordsMiddleWare } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-sagas";


const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleWare, initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
