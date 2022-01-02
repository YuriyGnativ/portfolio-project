import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { v4 } from "uuid";

export default (
  <Menu.Item position="right" key={v4()}>
    <div className="item-wrapper">
      <div className="label-wrapper">
        <span>Notifications</span>
      </div>
      <Icon name="bell" size="large" c />
    </div>
  </Menu.Item>
);
