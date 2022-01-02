import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistState from "redux-localstorage";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/root.reducer";

export default () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      // applyMiddleware(ThunkMiddleware, routerMiddleware(history), logger)
      applyMiddleware(ThunkMiddleware, logger)
      // persistState()
    )
  );
  return store;
};
