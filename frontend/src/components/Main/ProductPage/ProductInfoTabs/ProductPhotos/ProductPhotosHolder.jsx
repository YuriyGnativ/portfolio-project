import React, { Component } from "react";
import { Menu, Tab } from "semantic-ui-react";

import ProductPhotosTabs from "./ProductPhotosTabs";

export default {
  menuItem: "Photos",
  render: () => (
    <Tab.Pane>
      <ProductPhotosTabs />
    </Tab.Pane>
  ),
};
