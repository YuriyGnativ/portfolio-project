import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dimmer, Loader } from "semantic-ui-react";

import * as actions from "../../../../actions/product.actions";
import ProductCard from "../ProductCard";

import "./product-grid.scss";

export default connect(
  ({ productsReducer }) => ({ ...productsReducer }),
  (dispatch) => ({ ...bindActionCreators({ ...actions }, dispatch) })
)(
  class extends Component {
    componentDidMount() {
      const { fetchAndCountData, category } = this.props;
      fetchAndCountData(`/api/product/p/${category}${window.location.search}`);
    }

    render() {
      const { data, dataReady } = this.props;
      return dataReady ? (
        <div className="product-grid">
          {data.map((item, index) => {
            return <ProductCard item={item} key={index} />;
          })}
        </div>
      ) : (
        <div className="product-grid-loader">
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        </div>
      );
    }
  }
);
