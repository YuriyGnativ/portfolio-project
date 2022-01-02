import React, { Component } from "react";
import { Segment, Icon, Accordion, Tab } from "semantic-ui-react";
import { connect } from "react-redux";

import ProfileInfo from "./ProfileInfo";
import LocationInfo from "./LocationInfo";
import PaymentInfo from "./PaymentInfo";

import "./personal-info.scss";

export default connect(
  ({ userDataReducer }) => ({ ...userDataReducer }),
  () => ({})
)(
  class extends Component {
    state = {
      activeIndex: [0],
      dimmerActive: false,
      userData: null,
    };

    handleClick = (e, titleProps) => {
      const { index } = titleProps;
      const { activeIndex } = this.state;

      if (activeIndex.includes(index)) {
        this.setState({
          activeIndex: activeIndex.filter((i) => i !== index),
        });
      } else {
        this.setState({
          activeIndex: [...activeIndex, index],
        });
      }
    };

    render() {
      const { activeIndex } = this.state;

      return (
        <Tab.Pane>
          {!this.props.userData ? (
            <div className="profile-data-wrapper">
              <Accordion exclusive={false}>
                <Segment>
                  <Accordion.Title
                    index={0}
                    active={activeIndex.includes(0)}
                    onClick={this.handleClick}
                  >
                    <div className="profile-data-header">
                      <div>
                        <Icon name="user" circular />
                        <h3>Personal Info</h3>
                      </div>
                    </div>
                  </Accordion.Title>

                  <Accordion.Content active={activeIndex.includes(0)}>
                    <ProfileInfo userData={this.props.data} />
                  </Accordion.Content>
                </Segment>
                <Segment>
                  <Accordion.Title
                    index={1}
                    active={activeIndex.includes(1)}
                    onClick={this.handleClick}
                  >
                    <div className="profile-data-header">
                      <div>
                        <Icon name="map marker alternate" circular />
                        <h3>Location info</h3>
                      </div>
                      <div></div>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex.includes(1)}>
                    <LocationInfo />
                  </Accordion.Content>
                </Segment>
                <Segment>
                  <Accordion.Title
                    index={2}
                    active={activeIndex.includes(2)}
                    onClick={this.handleClick}
                  >
                    <div className="profile-data-header">
                      <div>
                        <Icon name="credit card outline" circular />
                        <h3>Payment</h3>
                      </div>
                      <div></div>
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex.includes(2)}>
                    <PaymentInfo />
                  </Accordion.Content>
                </Segment>
              </Accordion>
            </div>
          ) : (
            <h1>loading</h1>
          )}
        </Tab.Pane>
      );
    }
  }
);
