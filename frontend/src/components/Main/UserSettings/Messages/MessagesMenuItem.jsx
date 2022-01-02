import React from "react";
import { Menu } from "semantic-ui-react";
import { v4 } from "uuid";

export default (
  <Menu.Item position="right" key={v4()}>
    <div className="item-wrapper">
      <div className="label-wrapper">
        <span>Messages</span>
      </div>
      <Icon name="envelope outline" size="large" />
    </div>
  </Menu.Item>
);
