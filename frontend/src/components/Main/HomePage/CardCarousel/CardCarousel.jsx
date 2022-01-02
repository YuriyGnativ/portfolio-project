import React, { Component } from "react";
import { Header, Divider, Button, Icon } from "semantic-ui-react";

import ProductCardSmall from "./ProductCardSmall";
import "./card-carousel.scss";

export default class extends Component {
  state = {
    loadMoreVisible: true,
    loadBack: true,
  };
  render() {
    const {
      props: { name },
      state: { loadMoreVisible, loadBack },
    } = this;
    return (
      <div className="card-carousel-container">
        <div className="card-carousel-header">
          <Header>{name}</Header>
        </div>
        <Divider />
        <div className="card-carousel-tiles">
          <ProductCardSmall />
          <ProductCardSmall />
          <ProductCardSmall />
          <ProductCardSmall />
          <ProductCardSmall />
        </div>
        {loadMoreVisible ? (
          <Button className="btn-arrow btn-right">
            <Icon name="long arrow alternate right" size="big" />
          </Button>
        ) : null}
        {loadBack ? (
          <Button className="btn-arrow btn-left">
            <Icon name="long arrow alternate left" size="big" />
          </Button>
        ) : null}
      </div>
    );
  }
}
