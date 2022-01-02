import React from "react";

import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./categories-grid.scss";

export default () => {
  return (
    <div className="category-blocks-container">
      <ul className="category-blocks-holder">
        <li className="category-block">
          <Link to="/product/p/laptops">
            <Icon name="laptop" size="large" />
          </Link>
        </li>
        <li className="category-block">
          <Link to="/product/p/smartphones">
            <Icon name="mobile" size="large" />
          </Link>
        </li>
        <li className="category-block">
          <Link to="/product/p/headphones">
            <Icon name="headphones" size="large" />
          </Link>
        </li>
        <li className="category-block">
          <Link to="/product/p/smartwatches">
            <Icon name="time" size="large" />
          </Link>
        </li>
      </ul>
    </div>
  );
};
