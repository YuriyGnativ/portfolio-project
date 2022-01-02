import React, { Component } from "react";

import {
  Form,
  Segment,
  Button,
  Message,
  Input,
  Label,
} from "semantic-ui-react";
import { isEmail, isStrongPassword } from "validator";

import "./credentials-form.scss";

export default class extends Component {
  state = {
    email: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
    repeatPassword: {
      value: "",
      error: null,
    },
    username: {
      icon: null,
      value: "",
      isFetching: false,
      isDisabled: false,
      error: {
        isError: false,
        text: "",
      },
    },
    fetchBtn: {
      isFetching: false,
      isDisabled: false,
    },
    messageField: {
      hidden: true,
      text: "",
    },
  };

  validateCredentials = () => {
    const { email, password, repeatPassword, username } = this.state;
    return new Promise((resolve, reject) => {
      if (email.value === "") {
        this.setState({
          email: {
            value: email.value,
            error: { content: "Field is empty", pointing: "above" },
          },
        });
        reject();
      } else if (!isEmail(email.value)) {
        this.setState({
          email: {
            value: email.value,
            error: { content: "Unavailable email", pointing: "above" },
          },
        });
        reject();
      }
      if (username.value === "") {
        this.setState({
          username: {
            value: username.value,
            error: { isError: true, text: "Field is empty" },
          },
        });
        reject();
      }
      if (password.value === "") {
        this.setState({
          password: {
            value: password.value,
            error: { content: "Field is empty", pointing: "above" },
          },
        });
      } else if (
        !isStrongPassword(password.value, {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 2,
          minSymbols: 0,
        })
      ) {
        this.setState({
          password: {
            value: password.value,
            error: {
              content: "Password isn't strong enough",
              pointing: "above",
            },
          },
        });
        reject();
      }

      if (repeatPassword.value === "") {
        this.setState({
          repeatPassword: {
            value: repeatPassword.value,
            error: {
              content: "Field is empty",
              pointing: "above",
            },
          },
        });
        reject();
      } else if (repeatPassword.value !== password.value) {
        this.setState({
          repeatPassword: {
            value: repeatPassword.value,
            error: {
              content: "Passwords didn't match",
              pointing: "above",
            },
          },
        });
        reject();
      }
      resolve({
        email: email.value,
        password: password.value,
        username: username.value,
      });
    });
  };

  handleChange = ({ target }) => {
    if (target.name === "username") {
      this.setState({
        [target.name]: {
          error: { isError: false, text: "" },
          value: target.value,
          icon: null,
          isFetching: false,
          isDisabled: false,
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
    const { setStep } = this.props;
    const {
      email,
      username,
      password,
      repeatPassword,
      isFetching,
      messageField,
    } = this.state;
    return (
      <div className="credentials-form-wrap">
        <Form>
          <Segment>
            <Form.Field
              name="email"
              label="email"
              control="input"
              placeholder="email"
              error={email.error}
              value={email.value}
              onFocus={() => {
                this.setState({
                  email: {
                    value: email.value,
                    error: null,
                  },
                  messageField: {
                    hidden: true,
                    text: "",
                  },
                });
              }}
              onChange={this.handleChange}
            />
          </Segment>
          <Segment>
            <Form.Field
              // label="username"
              // control="input"
              error={username.error.isError}
            >
              <label>username</label>
              <Input
                loading={username.isFetching}
                disabled={username.isDisabled}
                icon={username.icon}
                // icon="checkmark"
                name="username"
                placeholder="username"
                value={username.value}
                onChange={this.handleChange}
                onFocus={() => {
                  this.setState({
                    username: {
                      icon: null,
                      value: username.value,
                      isFetching: false,
                      isDisabled: false,
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
                onBlur={() => {
                  if (username.value === "") {
                  } else {
                    this.setState(
                      {
                        username: {
                          value: username.value,
                          icon: null,
                          isFetching: true,
                          isDisabled: true,
                          error: {
                            isError: false,
                            text: "",
                          },
                        },
                      },
                      () => {
                        fetch("/api/user/checkusername", {
                          method: "post",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify({ username: username.value }),
                        })
                          .then((res) => res.json())
                          .then(({ success, msg }) => {
                            if (!success) {
                              this.setState({
                                username: {
                                  value: username.value,
                                  isFetching: false,
                                  isDisabled: false,
                                  error: {
                                    isError: true,
                                    text: msg,
                                  },
                                },
                              });
                            } else {
                              this.setState({
                                username: {
                                  icon: "checkmark",
                                  value: username.value,
                                  isFetching: false,
                                  isDisabled: false,
                                  error: {
                                    isError: false,
                                    text: "",
                                  },
                                },
                              });
                            }
                          });
                      }
                    );
                  }
                }}
              />

              {username.error.isError ? (
                <Label pointing="above" prompt>
                  {username.error.text}
                </Label>
              ) : null}
            </Form.Field>
          </Segment>
          <Segment>
            <Form.Field
              name="password"
              label="password"
              control="input"
              placeholder="password"
              value={password.value}
              error={password.error}
              onChange={this.handleChange}
              onFocus={() => {
                this.setState({
                  password: {
                    value: password.value,
                    error: null,
                  },
                  messageField: {
                    hidden: true,
                    text: "",
                  },
                });
              }}
            />
          </Segment>
          <Segment>
            <Form.Field
              name="repeatPassword"
              label="repeat password"
              control="input"
              placeholder="repeat password"
              error={repeatPassword.error}
              value={repeatPassword.value}
              onChange={this.handleChange}
              onFocus={() => {
                this.setState({
                  repeatPassword: {
                    value: repeatPassword.value,
                    error: null,
                  },
                  messageField: {
                    hidden: true,
                    text: "",
                  },
                });
              }}
            />
          </Segment>
          <Message hidden={messageField.hidden} negative>
            <Message.Header>Error:</Message.Header>
            {messageField.text}
          </Message>
          <Button
            disabled={username.isFetching}
            loading={isFetching}
            type="submit"
            className="sgn-btn btn-left"
            onClick={() => {
              // setStep(2);

              this.validateCredentials(email)
                .then((formData) => {
                  this.setState({
                    isFetching: true,
                  });
                  fetch("/api/auth/signup", {
                    method: "post",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  })
                    .then((res) => res.json())
                    .then(({ success, msg }) => {
                      this.setState({
                        isFetching: false,
                      });
                      if (success) {
                        setStep(2);
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
                  console.log(err);
                });
            }}
          >
            Next
          </Button>
        </Form>
      </div>
    );
  }
}
