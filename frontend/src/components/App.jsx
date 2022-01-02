import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/auth.actions";

import Main from "./Main";
import SignUp from "./SignUp";

import "./app.scss";

export default connect(
  ({ authReducer }) => ({ ...authReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    componentDidMount() {
      try {
        const { token, userUrl } = JSON.parse(
          window.localStorage.getItem("userData")
        );
        if (token) {
          this.props.signinSuccess(token, userUrl);
        }
      } catch (error) {
        console.warn("User data is empty:", error);
      }
    }

    render() {
      return (
        <div className="app-container">
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/">
              <Main isAuthenticated={this.props.isAuthenticated} />
            </Route>
          </Switch>
        </div>
      );
    }
  }
);
