import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

import "./availableness-widget.scss";

export default class extends Component {
  // state = {
  //   isAvailable: false,
  // };
  render() {
    const { available } = this.props;
    return (
      <div
        className={
          "is-available" +
          (available ? " is-available-true" : " is-available-false")
        }
      >
        <Icon name="check circle" />
        {available ? "Available Now!" : "Not Available"}
      </div>
    );
  }
}
