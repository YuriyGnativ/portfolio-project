import React from "react";
import { Menu } from "semantic-ui-react";
import { v4 } from "uuid";

export default (
  <Menu.Item disabled style={{ display: "none" }} key={v4()}></Menu.Item>
);
