import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/auth.actions";

import { Form, Segment, Button, Message } from "semantic-ui-react";

import "./email-confirm.scss";

export default connect(
  ({ authReducer }) => ({ ...authReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    state = {
      isFetching: false,
      verifyCode: {
        value: "",
        error: null,
      },
      messageField: {
        hidden: true,
        text: "",
      },
    };

    validateCode = () => {
      const { verifyCode, messageField } = this.state;
      return new Promise((resolve, reject) => {
        if (verifyCode.value === "") {
          this.setState({
            verifyCode: {
              value: verifyCode.value,
              error: {
                content: "Field is empty",
                pointing: "above",
              },
            },
          });
          reject("Field is empty");
        }
        resolve({ verifyCode: verifyCode.value });
      });
    };

    handleChange = ({ target }) => {
      this.setState({
        [target.name]: { error: null, value: target.value },
      });
    };

    render() {
      const {
        isFetching,
        verifyCode,
        messageField: { text, hidden },
      } = this.state;
      const { setStep, signinSuccess } = this.props;
      console.log(this.props);
      return (
        <>
          <div className="confirm-form-wrap">
            <Form>
              <Segment>
                <Form.Field
                  label="confirmation code"
                  control="input"
                  name="verifyCode"
                  placeholder="Referral code"
                  error={verifyCode.error}
                  value={verifyCode.value}
                  onFocus={() => {
                    this.setState({
                      verifyCode: {
                        value: verifyCode.value,
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
            </Form>
            <Button
              className="sgn-btn btn-right"
              loading={isFetching}
              onClick={() => {
                this.validateCode()
                  .then((res) => {
                    this.setState({
                      isFetching: true,
                    });
                    fetch("/api/auth/emailverify", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify(res),
                    })
                      .then((res) => res.json())
                      .then(({ success, msg, token, userUrl }) => {
                        if (success) {
                          this.setState({
                            isFetching: false,
                          });

                          signinSuccess("Bearer " + token, userUrl);
                          setStep(3);
                        } else {
                          this.setState({
                            isFetching: false,
                            messageField: {
                              hidden: false,
                              text: msg,
                            },
                          });
                        }
                      });
                  })
                  .catch((err) => {
                    console.log("error:", err);
                    this.setState({
                      isFetching: false,
                    });
                  });
              }}
            >
              Confirm
            </Button>
          </div>
          <Message hidden={hidden} color="red">
            <Message.Header>Error:</Message.Header>
            {text}
          </Message>
        </>
      );
    }
  }
);
