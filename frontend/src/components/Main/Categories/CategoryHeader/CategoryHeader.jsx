import React from "react";
import { Icon, Header } from "semantic-ui-react";

import "./category-header.scss";

export default ({ category, icon }) => (
  <div className="category-header">
    <Icon name={icon} size="huge" />
    <Header as="h1">{category}</Header>
  </div>
);
