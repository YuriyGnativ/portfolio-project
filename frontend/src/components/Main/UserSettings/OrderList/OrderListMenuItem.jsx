import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { v4 } from "uuid";

export default (
  <Menu.Item position="right" key={v4()}>
    <div className="item-wrapper">
      <div className="label-wrapper">
        <span>Orders</span>
      </div>
      <Icon name="list" size="large" />
    </div>
  </Menu.Item>
);
