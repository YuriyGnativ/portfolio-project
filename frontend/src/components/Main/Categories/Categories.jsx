import React, { Component } from "react";
import { Divider, Segment } from "semantic-ui-react";

import CategoryHeader from "./CategoryHeader";
import ProductGrid from "./ProductGrid";
import SharedFilters from "./SharedFilters";
import Pagination from "./ProductGrid/Pagination";

import "./categories.scss";

export default class extends Component {
  state = {
    category: null,
    icon: null,
    rdy: false,
  };

  componentDidMount() {
    const category = window.location.pathname.split("/").pop();
    switch (category) {
      case "smartphones":
        this.setState({
          category: "smartphones",
          icon: "mobile",
          rdy: true,
        });
        return null;
      case "laptops":
        this.setState({
          category: "laptops",
          icon: "laptop",
          rdy: true,
        });
        return null;

      case "smartwatches":
        this.setState({
          category: "smartwatches",
          icon: "time",
          rdy: true,
        });
        return null;

      case "headphones":
        this.setState({
          category: "headphones",
          icon: "headphones",
          rdy: true,
        });
        return null;
    }
  }
  render() {
    const { rdy, category, icon } = this.state;
    return rdy ? (
      <>
        <CategoryHeader category={category} icon={icon} />
        <Divider />
        <div className="content-wrapper">
          <aside className="filters-sidebar">
            <SharedFilters category={category} />
            <Divider />
          </aside>
          <Segment style={{ flex: 1 }}>
            <div className="product-grid-container">
              <ProductGrid category={category} />
              <Divider style={{ marginTop: "35px" }} />
              <Pagination category={category} />
            </div>
          </Segment>
        </div>
      </>
    ) : (
      <h1>Loading...</h1>
    );
  }
}
