import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { v4 } from "uuid";

export default (
  <Menu.Item position="right" key={v4()}>
    <div className="item-wrapper">
      <div className="label-wrapper">
        <span>My reviews</span>
      </div>
      <Icon name="comments" size="large" />
    </div>
  </Menu.Item>
);
