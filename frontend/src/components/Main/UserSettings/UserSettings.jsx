import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Segment, Tab } from "semantic-ui-react";

import EmptyPane from "./EmptyPane";
import PersonalInfo from "./PersonalInfo";
import Notifications from "./Notifications";
import OrderList from "./OrderList";
import PremiumPass from "./PremiumPass";
import Reviews from "./Reviews";
import Wishlist from "./Wishlist";
import UserSettingsPlaceholder from "./Placeholder";

import "./user-settings.scss";
import * as actions from "../../../actions/user.actions";

export default connect(
  ({ userDataReducer, authReducer }) => ({
    ...userDataReducer,
    ...authReducer,
  }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    componentDidMount() {
      const { userUrl, fetchUserData } = this.props;
      fetchUserData(userUrl);
    }

    render() {
      return (
        <Segment>
          {this.props.dataReady ? (
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              defaultActiveIndex={0}
              panes={[
                EmptyPane,
                PersonalInfo,
                Notifications,
                OrderList,
                PremiumPass,
                Reviews,
                Wishlist,
              ]}
            />
          ) : (
            <UserSettingsPlaceholder />
          )}
        </Segment>
      );
    }
  }
);
