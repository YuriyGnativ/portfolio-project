import React, { Component } from "react";
import {
  Form,
  Button,
  Dropdown,
  Popup,
  Segment,
  Message,
} from "semantic-ui-react";
import CustomInput from "../../../../Lib/Input/Input";
import "./profile-info.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../../../../actions/auth.actions";
import * as userActions from "../../../../../actions/user.actions";

export default connect(
  ({ authReducer, userDataReducer }) => ({
    ...authReducer,
    ...userDataReducer,
  }),
  (dispatch) => ({
    ...bindActionCreators({ ...authActions, ...userActions }, dispatch),
  })
)(
  class extends Component {
    state = {
      isFetching: false,
      isDimmed: true,
      firstName: {
        value: "",
        error: null,
      },
      lastName: {
        value: "",
        error: null,
      },
      dob: {
        value: "",
        error: null,
      },
      username: {
        value: "",
        error: null,
      },
      lang: {
        value: "",
        error: null,
      },
      gender: {
        value: "",
        error: null,
      },
      oldValues: {
        firstName: null,
        lastName: null,
        dob: null,
        username: null,
        lang: null,
        gender: null,
      },
      messageField: {
        hidden: true,
        text: "",
      },
    };
    componentDidMount() {
      const {
        first_name: firstName,
        last_name: lastName,
        username,
        dob,
        gender,
        lang,
      } = this.props.data;

      this.setState({
        firstName: {
          value: firstName || "",
          error: { isError: false, text: "" },
        },
        lastName: {
          value: lastName || "",
          error: { isError: false, text: "" },
        },
        username: {
          value: username || "",
          error: { isError: false, text: "" },
        },
        dob: {
          value: dob || "",
          error: { isError: false, text: "" },
        },
        gender: {
          value: gender || "",
          error: { isError: false, text: "" },
        },
        lang: {
          value: lang || "",
          error: { isError: false, text: "" },
        },
        oldValues: {
          firstName: firstName || "",
          lastName: lastName || "",
          username: username || "",
          dob: dob || "",
          gender: gender || "",
          lang: lang || "",
        },
      });
    }
    handleCancel = () => {
      const { oldValues } = this.state;
      this.setState({
        firstName: {
          value: oldValues.firstName,
          error: { isError: false, text: "" },
        },
        lastName: {
          value: oldValues.lastName,
          error: { isError: false, text: "" },
        },
        username: {
          value: oldValues.username,
          error: { isError: false, text: "" },
        },
        dob: {
          value: oldValues.dob,
          error: { isError: false, text: "" },
        },
        gender: {
          value: oldValues.gender,
          error: { isError: false, text: "" },
        },
        lang: {
          value: oldValues.lang,
          error: { isError: false, text: "" },
        },
        isDimmed: true,
      });
    };
    handleDimmer = () => {
      this.setState({
        isDimmed: !this.state.isDimmed,
      });
    };
    handleChange = ({ target }, error) => {
      this.setState({
        [target.name]: {
          value: target.value || "",
          error: error || { isError: false, text: "" },
        },
      });
    };
    onCheck = async (value, callback) => {
      const checked = await fetch("/api/user/checkusername", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: value,
        }),
      }).then((res) => res.json());
      return callback(checked);
    };
    handleSubmit = () => {
      const { firstName, lastName, username, dob, gender, lang } = this.state;
      console.log(this.state);
      return new Promise((resolve, reject) => {
        if (0 < firstName.value.length && firstName.value.length < 4) {
          console.log("first if");
          this.setState({
            isFetching: false,
            firstName: {
              value: firstName.value,
              error: {
                isError: true,
                text: "Your name is too short",
              },
            },
          });
          reject();
        }
        if (0 < lastName.value.length && lastName.value.length < 4) {
          console.log("second if");

          this.setState({
            isFetching: false,

            lastName: {
              value: lastName.value,
              error: {
                isError: true,
                text: "Your last name is too short",
              },
            },
          });
          reject();
        }
        if (username.value === "" || username.error?.isError) {
          this.setState({
            isFetching: false,

            username: {
              value: username.value,
              error: {
                isError: true,
                text: "Field is empty",
              },
            },
          });
          reject();
        }

        resolve({
          firstName: firstName.value || undefined,
          lastName: lastName.value || undefined,
          username: username.value || undefined,
          dob: dob.value || undefined,
          gender: gender.value || undefined,
          lang: lang.value || undefined,
        });
      });
    };
    render() {
      const { token, signinSuccess, dataFetchSuccess } = this.props;
      const {
        isFetching,
        firstName,
        lastName,
        username,
        dob,
        gender,
        lang,
        oldValues,
        isDimmed,
        messageField,
      } = this.state;
      return !isDimmed ? (
        <div className="item-overlay">
          <div className="profile-data-fields-group">
            <Form>
              <Form.Field>
                <CustomInput
                  name="firstName"
                  validationError={firstName.error}
                  placeholder="first name"
                  value={firstName.value}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <CustomInput
                  name="lastName"
                  validationError={lastName.error}
                  placeholder="last name"
                  value={lastName.value}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <CustomInput
                  name="username"
                  type="text"
                  validationError={username.error}
                  placeholder="username"
                  onCheck={this.onCheck}
                  defaultValue={oldValues.username}
                  value={username.value}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <CustomInput
                  name="dob"
                  type="date"
                  validationError={dob.error}
                  placeholder="birth date"
                  value={dob.value}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Segment>
                  <span>gender</span>
                  <Dropdown
                    name="gender"
                    // defaultValue={}
                    options={[
                      { key: 1, text: "Male", value: 1 },
                      { key: 2, text: "Female", value: 2 },
                      {
                        key: 3,
                        text: "sdasdasd",
                        value: 3,
                      },
                    ]}
                    onChange={(e, target) => {
                      this.setState({
                        gender: {
                          value: target.value,
                          error: null,
                        },
                      });
                    }}
                    fluid
                  />
                </Segment>
              </Form.Field>
              <Form.Field>
                <Segment>
                  <span>language</span>
                  <Dropdown
                    name="lang"
                    defaultValue={lang.value}
                    options={[
                      { key: "Arabic", text: "Arabic", value: "Arabic" },
                      { key: "Chinese", text: "Chinese", value: "Chinese" },
                      { key: "Danish", text: "Danish", value: "Danish" },
                      { key: "Dutch", text: "Dutch", value: "Dutch" },
                      { key: "English", text: "English", value: "English" },
                      { key: "French", text: "French", value: "French" },
                      { key: "German", text: "German", value: "German" },
                      { key: "Greek", text: "Greek", value: "Greek" },
                      {
                        key: "Hungarian",
                        text: "Hungarian",
                        value: "Hungarian",
                      },
                      { key: "Italian", text: "Italian", value: "Italian" },
                      { key: "Japanese", text: "Japanese", value: "Japanese" },
                      { key: "Korean", text: "Korean", value: "Korean" },
                      {
                        key: "Lithuanian",
                        text: "Lithuanian",
                        value: "Lithuanian",
                      },
                      { key: "Persian", text: "Persian", value: "Persian" },
                      { key: "Polish", text: "Polish", value: "Polish" },
                      {
                        key: "Portuguese",
                        text: "Portuguese",
                        value: "Portuguese",
                      },
                      {
                        key: "Ukrainian",
                        text: "Ukrainian",
                        value: "Ukrainian",
                      },
                      { key: "Russian", text: "Russian", value: "Russian" },
                      { key: "Spanish", text: "Spanish", value: "Spanish" },
                      { key: "Swedish", text: "Swedish", value: "Swedish" },
                      { key: "Turkish", text: "Turkish", value: "Turkish" },
                      {
                        key: "Vietnamese",
                        text: "Vietnamese",
                        value: "Vietnamese",
                      },
                    ]}
                    onChange={(e, target) => {
                      this.setState({
                        lang: {
                          value: target.value,
                          error: null,
                        },
                      });
                    }}
                    selection
                    search
                    fluid
                  />
                </Segment>
              </Form.Field>
            </Form>
          </div>
          <Message hidden={messageField.hidden} negative>
            <Message.Header>Error:</Message.Header>
            {messageField.text}
          </Message>
          <div className="profile-data-footer">
            <Button
              disabled={isFetching}
              loading={isFetching}
              className="sgn-btn"
              onClick={() => {
                this.setState({
                  isFetching: true,
                });
                console.log("submit");
                this.handleSubmit()
                  .then((res) => {
                    fetch("/api/user/updateuser", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                      },
                      body: JSON.stringify(res),
                    })
                      .then((res) => res.json())
                      .then(
                        ({
                          success,
                          msg,
                          token,
                          user: userData,
                          user: {
                            firstName,
                            lastName,
                            dob,
                            lang,
                            gender,
                            userUrl,
                            username,
                          },
                        }) => {
                          console.log("user data", userData);
                          if (success) {
                            signinSuccess("Bearer " + token, userUrl);
                            dataFetchSuccess(userData);
                            this.setState({
                              isFetching: false,
                              // isDimmed: true,
                              firstName: {
                                value: firstName || "",
                                error: { isError: false, text: "" },
                              },
                              lastName: {
                                value: lastName || "",
                                error: { isError: false, text: "" },
                              },
                              dob: {
                                value: dob || "",
                                error: { isError: false, text: "" },
                              },
                              username: {
                                value: username || "",
                                error: { isError: false, text: "" },
                              },
                              lang: {
                                value: lang || "",
                                error: { isError: false, text: "" },
                              },
                              gender: {
                                value: gender || "",
                                error: { isError: false, text: "" },
                              },
                              oldValues: {
                                firstName: firstName || "",
                                lastName: lastName || "",
                                dob: dob || "",
                                username: username || "",
                                lang: lang || "",
                                gender: gender || "",
                              },
                            });
                          } else {
                            this.setState({
                              isFetching: false,
                              isDimmed: true,
                              messageField: {
                                hidden: false,
                                text: msg,
                              },
                            });
                          }
                        }
                      );
                  })
                  .catch((error) => {
                    console.warn(error);
                    this.setState({ isFetching: false });
                  });
              }}
            >
              Submit
            </Button>
            <Button
              className="sgn-btn"
              onClick={this.handleCancel}
              disabled={isFetching}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Popup
          on="hover"
          mouseEnterDelay={1300}
          basic
          position="top right"
          trigger={
            <div
              onDoubleClick={this.handleDimmer}
              style={{
                userSelect: "none",
                cursor: "pointer",
              }}
            >
              <div className="user-info-dimmed">
                <div className="user-info-dimmed-item">
                  <span className="field-name">First Name</span>
                  <span className="field-value">{firstName.value}</span>
                </div>
                <div className="user-info-dimmed-item">
                  <span className="field-name">Last Name</span>
                  <span className="field-value">{lastName.value}</span>
                </div>
                <div className="user-info-dimmed-item">
                  <span className="field-name">Username</span>
                  <span className="field-value">@{username.value}</span>
                </div>
                <div className="user-info-dimmed-item">
                  <span className="field-name">Birth date</span>
                  <span className="field-value">{dob.value}</span>
                </div>
                <div className="user-info-dimmed-item">
                  <span className="field-name">Gender</span>
                  <span className="field-value">{gender.value}</span>
                </div>
                <div className="user-info-dimmed-item">
                  <span className="field-name">Native Language</span>
                  <span className="field-value">{lang.value}</span>
                </div>
              </div>
            </div>
          }
          content={<span>double tap to edit</span>}
        />
      );
    }
  }
);
