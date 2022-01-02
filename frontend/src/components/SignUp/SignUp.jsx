import React, { Component } from "react";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import { Step, Icon, Segment, Divider, Form, Button } from "semantic-ui-react";
import * as actions from "../../actions/signup.actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import CredentialsForm from "./CredentialsForm";
import EmailConfirm from "./EmailConfirm";
import UserInfoForm from "./UserInfoForm";

import "./sign-up.scss";

export default connect(
  ({ signupReducer }) => ({ ...signupReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    state = {
      defaultStep: 1,
      activeStep: 1,
      disabledSteps: [],
    };
    handleStep = () => {
      this.setState({});
    };
    render() {
      // const { activeStep, disabledSteps } = this.state;
      const { setStep, currentStep } = this.props;
      console.log(this);
      return (
        <div className="container signup-container">
          <Segment>
            <h1>Sign Up</h1>
            <Divider />
            <Step.Group>
              <Step key={1} active={currentStep === 1}>
                <Icon name="user" />
                <Step.Content>
                  <Step.Title>Step 1</Step.Title>
                  <Step.Description>Enter credentials</Step.Description>
                </Step.Content>
              </Step>

              <Step key={2} active={currentStep === 2}>
                <Icon name="mail" />
                <Step.Content>
                  <Step.Title>Step 2</Step.Title>
                  <Step.Description>Confirm your email</Step.Description>
                </Step.Content>
              </Step>

              <Step key={3} active={currentStep === 3}>
                <Icon name="info" />
                <Step.Content>
                  <Step.Title>Step 3</Step.Title>
                  <Step.Description>Compleate registration</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            <Divider />
            <TransitionGroup>
              {currentStep === 1 ? (
                <CredentialsForm setStep={setStep} />
              ) : currentStep === 2 ? (
                <EmailConfirm setStep={setStep} />
              ) : currentStep === 3 ? (
                <UserInfoForm setStep={setStep} />
              ) : null}
              {/* {currentStep === 1 ? (
                <CSSTransition classNames="fade" mode="out-in" key={1}>
                  <CredentialsForm setStep={setStep} />
                </CSSTransition>
              ) : currentStep === 2 ? (
                <CSSTransition classNames="fade" mode="out-in" key={2}>
                  <EmailConfirm setStep={setStep} />
                </CSSTransition>
              ) : currentStep === 3 ? (
                <CSSTransition classNames="fade" mode="out-in" key={3}>
                  <UserInfoForm setStep={setStep} />
                </CSSTransition>
              ) : null} */}
            </TransitionGroup>
          </Segment>
        </div>
      );
    }
  }
);
