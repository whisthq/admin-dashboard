import React from "react";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import ReduxPromise from "redux-promise";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Admin from "./components/PageAdmin/Admin";
import Analytics from "./components/PageAdmin/Analytics";
import Logs from "./components/PageAdmin/Logs";

import rootSaga from "./sagas";
import { Route } from "react-router-dom";
import { Router } from "react-router";
import { Helmet } from "react-helmet";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import history from "./history";
import "./static/App.css";
import LoginPage from "./components/PageLogin/LoginPage";

const persistConfig = {
    key: 'rootKey',
    storage,
}

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

let middleware = [routerMiddleware(history), ReduxPromise, sagaMiddleware]

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Helmet>
          <title>Fractal</title>
        </Helmet>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="/logs" component={Logs} />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById("root")
);
