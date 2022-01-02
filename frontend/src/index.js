import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import App from "./components";

import createStore from "./store/store";
import history from "./store/history";

import "semantic-ui-css/semantic.min.css";
import "pure-react-carousel/dist/react-carousel.es.css";

const store = createStore();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
