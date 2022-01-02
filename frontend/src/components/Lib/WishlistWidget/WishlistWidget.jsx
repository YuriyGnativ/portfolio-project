import React, { Component } from "react";
import { Icon, Button, Popup } from "semantic-ui-react";

import "./wishlist-widget.scss";

export default class extends Component {
  render() {
    const { type, size, style } = this.props;
    return (
      <Popup
        content="add to wishlist so we can alarm you when product is available"
        mouseEnterDelay={1300}
        trigger={
          type === "button" ? (
            <Button
              className="btn-wishlist"
              style={style}
              icon="like"
              content={"Add to Wishlist"}
            />
          ) : type === "icon" ? (
            <Icon
              className="icon-wishlist"
              name="like"
              size={size}
              style={style}
            />
          ) : null
        }
      ></Popup>
    );
  }
}
