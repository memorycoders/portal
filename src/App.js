import React from "react";
import { Router, BrowserRouter,Route } from "react-router-dom";
import { MyRoutes } from "./routes";
import rootReducer from "src/redux";
import rootSaga from "./redux/index-saga";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
// import PageNotFound from "./pages/PageNotFound";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga); 

const App = (props) => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <MyRoutes />
          {/* <HomePage/> */}
          {/* <Route exact path="/404" component={PageNotFound} /> */}
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
