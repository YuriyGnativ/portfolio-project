import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { v4 } from "uuid";

import { connect } from "react-redux";

const PersonalInfoPane = connect(
  ({ userDataReducer }) => ({ ...userDataReducer }),
  () => ({})
)((props) => {
  const { firstName, lastName, username, email } = props.data;

  return (
    <div className="item-wrapper">
      <div className="label-wrapper">
        <span>
          {firstName && lastName ? firstName + " " + lastName : email}
        </span>
        <span>@{username}</span>
      </div>
      <Icon name="user" size="large" />
    </div>
  );
});

export default (
  <Menu.Item position="right" className="remove-before" key={v4()}>
    <PersonalInfoPane />
  </Menu.Item>
);
