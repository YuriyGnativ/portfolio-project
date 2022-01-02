import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Form,
  Button,
  Icon,
  Label,
  Segment,
  Input,
  Divider,
  Message,
} from "semantic-ui-react";

import history from "../../../store/history";
import * as actions from "../../../actions/auth.actions";
import "./auth-popup.scss";

export default connect(
  ({ authReducer }) => ({ ...authReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    state = {
      loginField: {
        value: "",
        error: null,
      },
      passwordField: {
        value: "",
        error: {
          isError: false,
          text: "",
        },
        visible: false,
      },
      isFetching: false,
      messageField: {
        hidden: true,
        text: "",
      },
    };

    validateFields = () => {
      const { loginField, passwordField } = this.state;

      return new Promise((resolve, reject) => {
        if (loginField.value === "") {
          this.setState({
            loginField: {
              ...loginField,
              error: {
                content: "Field is empty",
                pointing: "below",
              },
            },
          });
          reject();
        }
        if (passwordField.value === "") {
          this.setState({
            passwordField: {
              ...passwordField,
              error: {
                isError: true,
                text: "Field is empty",
              },
            },
          });
          reject();
        }
        resolve({
          password: passwordField.value,
          username: loginField.value,
        });
      });
    };
    handleChange = ({ target }) => {
      if (target.name === "passwordField") {
        this.setState({
          [target.name]: {
            value: target.value,
            visible: this.state.passwordField.visible,
            error: {
              isError: false,
              text: "",
            },
          },
        });
      } else {
        this.setState({
          [target.name]: {
            error: null,
            value: target.value,
          },
        });
      }
    };

    render() {
      const { loginField, passwordField, isFetching, messageField } =
        this.state;
      const { signinSuccess } = this.props;
      return (
        <div className="auth-popup">
          <Segment>
            <Form>
              <Form.Field
                error={loginField.error}
                label="Email or Username"
                control="input"
                placeholder="Enter login"
                name="loginField"
                value={loginField.value}
                onChange={this.handleChange}
                onFocus={() => {
                  this.setState({
                    loginField: {
                      ...loginField,
                      error: null,
                    },
                    messageField: {
                      hidden: true,
                      text: "",
                    },
                  });
                }}
              />
              <Form.Field error={passwordField.error.isError}>
                <label>Password</label>
                <Input
                  type={passwordField.visible ? "text" : "password"}
                  name="passwordField"
                  placeholder="Enter password"
                  onChange={this.handleChange}
                  onFocus={() => {
                    this.setState({
                      passwordField: {
                        ...passwordField,
                        error: {
                          isError: false,
                          text: "",
                        },
                      },
                      messageField: {
                        hidden: true,
                        text: "",
                      },
                    });
                  }}
                  icon={
                    <Icon
                      name={passwordField.visible ? "eye slash" : "eye"}
                      link
                      onClick={() => {
                        this.setState({
                          passwordField: {
                            ...passwordField,
                            visible: !passwordField.visible,
                          },
                        });
                      }}
                    />
                  }
                />
                {passwordField.error.isError ? (
                  <Label pointing="above" prompt>
                    {passwordField.error.text}
                  </Label>
                ) : null}
              </Form.Field>
              <Message hidden={messageField.hidden} negative>
                <Message.Header>Error:</Message.Header>
                {messageField.text}
              </Message>
              <Divider />

              <Button
                loading={isFetching}
                type="submit"
                basic
                className="login-btn"
                onClick={() => {
                  this.setState({ isFetching: true });
                  this.validateFields()
                    .then((res) => {
                      fetch("/api/auth/signin", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(res),
                      })
                        .then((res) => res.json())
                        .then(({ success, msg, token, userUrl }) => {
                          this.setState({ isFetching: false });

                          if (success) {
                            signinSuccess("Bearer " + token, userUrl);
                          } else {
                            this.setState({
                              messageField: {
                                hidden: false,
                                text: msg,
                              },
                            });
                          }
                        });
                    })
                    .catch((err) => {
                      this.setState({
                        isFetching: false,
                      });
                      console.error(err);
                    });
                }}
              >
                Login
              </Button>
              <Button
                disabled={isFetching}
                color="black"
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </Form>
          </Segment>
        </div>
      );
    }
  }
);
