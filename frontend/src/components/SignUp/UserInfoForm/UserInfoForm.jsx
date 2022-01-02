import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../../actions/auth.actions";
import * as signupActions from "../../../actions/signup.actions";
import "./user-info-form.scss";

import { Segment, Form, Button, Input, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "../../../store/history";

export default connect(
  ({ authReducer }) => ({ ...authReducer }),
  (dispatch) => ({
    ...bindActionCreators(
      {
        ...authActions,
        ...signupActions,
      },
      dispatch
    ),
  })
)(
  class extends Component {
    state = {
      firstName: {
        value: "",
        error: null,
      },
      lastName: {
        value: "",
        error: null,
      },
      address: {
        value: "",
        error: null,
      },
      dob: {
        value: "",
        error: null,
      },
      messageField: {
        hidden: true,
        text: "",
      },
      isFetcheing: false,
    };

    handleChange = ({ target }) => {
      this.setState({
        [target.name]: { error: null, value: target.value },
      });
    };

    validateFields = () => {
      const { firstName, lastName, dob, address } = this.state;
      return new Promise((resolve, reject) => {
        if (firstName.value === "") {
          this.setState({
            firstName: {
              value: firstName.value,
              error: {
                content: "Field is empty",
                pointing: "above",
              },
            },
          });
          reject();
        }
        if (lastName.value === "") {
          this.setState({
            lastName: {
              value: lastName.value,
              error: {
                content: "Field is empty",
                pointing: "above",
              },
            },
          });
          reject();
        }
        if (address.value === "") {
          this.setState({
            address: {
              value: address.value,
              error: {
                content: "Field is empty",
                pointing: "above",
              },
            },
          });
          reject();
        }
        if (dob.value === "") {
          this.setState({
            dob: {
              value: dob.value,
              error: {
                content: "Field is empty",
                pointing: "above",
              },
            },
          });
          reject();
        }
        const data = JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          dob: dob.value,
        });
        console.log(data);
        resolve(data);
      });
    };

    render() {
      const { firstName, lastName, dob, address, messageField, isFetcheing } =
        this.state;
      const { token } = this.props;
      return (
        <div className="user-info-form-wrap">
          <Form>
            <Segment>
              <Form.Field
                label="First Name"
                control="input"
                placeholder="Enter your name"
                name="firstName"
                error={firstName.error}
                value={firstName.value}
                onFocus={() => {
                  this.setState({
                    firstName: {
                      value: firstName.value,
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
                label="Last Name"
                control="input"
                placeholder="Enter your surname"
                name="lastName"
                error={lastName.error}
                value={lastName.value}
                onFocus={() => {
                  this.setState({
                    lastName: {
                      value: lastName.value,
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
                label="Address"
                control="input"
                name="address"
                placeholder="Enter your address to deliver"
                error={address.error}
                value={address.value}
                onFocus={() => {
                  this.setState({
                    address: {
                      value: address.value,
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
              <Form.Field error={dob.error}>
                <label>Age</label>
                <Input
                  type="date"
                  placeholder="Enter your date of birth"
                  name="dob"
                  value={dob.value}
                  onFocus={() => {
                    this.setState({
                      dob: {
                        value: dob.value,
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
              </Form.Field>
            </Segment>
            <Message color="red" hidden={messageField.hidden}>
              <Message.Header>Error:</Message.Header>
              {messageField.text}
            </Message>
            <Button
              style={{ bottom: "0px" }}
              loading={isFetcheing}
              className="sgn-btn btn-right"
              onClick={() => {
                this.validateFields().then((res) => {
                  fetch("/api/user/updateuser", {
                    method: "post",
                    headers: {
                      authorization:
                        token || window.localStorage.getItem("token"),
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: res,
                  })
                    .then((res) => res.json())
                    .then(({ success, msg }) => {
                      if (success) {
                        history.push("/");
                      } else {
                        this.setState({
                          messageField: {
                            hidden: false,
                            text: msg,
                          },
                        });
                      }
                    });
                });
              }}
            >
              Save
            </Button>
            <Link
              to="/"
              style={{ pointerEvents: isFetcheing ? "none" : "all" }}
            >
              <Button
                disabled={isFetcheing}
                style={{ marginLeft: "73%" }}
                className="sgn-btn"
                onClick={() => {}}
              >
                Skip
              </Button>
            </Link>
          </Form>
        </div>
      );
    }
  }
);
