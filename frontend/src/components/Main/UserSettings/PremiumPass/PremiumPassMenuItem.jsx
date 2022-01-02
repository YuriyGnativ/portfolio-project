import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { v4 } from "uuid";

export default (
  <Menu.Item position="right" key={v4()}>
    <div className="item-wrapper">
      <div className="label-wrapper">
        <span>Premium</span>
      </div>
      <Icon name="diamond" size="large" />
    </div>
  </Menu.Item>
);
