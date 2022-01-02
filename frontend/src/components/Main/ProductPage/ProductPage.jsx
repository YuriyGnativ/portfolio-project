import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Header, Rating, Divider, Placeholder } from "semantic-ui-react";

import CardCarousel from "../HomePage/CardCarousel";
import BreadCrumbs from "./Breadcrumbs";
import ProductInfoTabs from "./ProductInfoTabs";
import TradeInfo from "./TradeInfo";

import * as actions from "../../../actions/singleitem.actions";

import "./product-page.scss";

export default connect(
  ({ singleitemReducer }) => ({ ...singleitemReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    componentDidMount() {
      const {
        fetchProductData,
        match: {
          params: { id },
        },
        dataReady,
        productUrl,
      } = this.props;
      if (productUrl !== id || !dataReady) {
        fetchProductData(id);
      }
    }

    render() {
      const {
        isFetching,
        productData,
        match: {
          params: { id },
        },
      } = this.props;
      return !isFetching ? (
        <>
          <Divider />
          <BreadCrumbs
            name={productData.name}
            category={productData.product_type}
          />
          <Header as="h1">{productData.name}</Header>
          <div className="product-rating">
            <Rating defaultRating={productData.rating} maxRating={5} />
            <div className="product-code">
              <span>product code:</span> {id}
            </div>
          </div>
          <Divider />
          <div
            className="product-main-wrapper"
            style={{ marginBottom: "25px" }}
          >
            <ProductInfoTabs />
            <TradeInfo />
          </div>
          <CardCarousel name="Recomended for You" />
        </>
      ) : (
        <>
          <Divider />
          <Placeholder fluid>
            <Placeholder.Header>
              <Placeholder.Line length="short" />
            </Placeholder.Header>
          </Placeholder>
          <Placeholder style={{ borderRadius: "5px" }}>
            <Placeholder.Image style={{ height: "38px" }} />
          </Placeholder>
          <div
            className="product-rating"
            style={{
              marginTop: "25px",
            }}
          >
            <Rating defaultRating={0} maxRating={5} disabled />
            <Placeholder style={{ width: "30rem" }}>
              <Placeholder.Line length="full" />
            </Placeholder>
          </div>
          <Divider />
          <div
            style={{ display: "flex", marginTop: "25px", marginBottom: "25px" }}
          >
            <Placeholder style={{ borderRadius: "5px" }} fluid>
              <Placeholder.Image
                style={{
                  height: "35px",
                  width: "45rem",
                }}
              />
              <Placeholder.Image
                style={{
                  height: "500px",
                  width: "45rem",
                }}
              />
            </Placeholder>
            <Placeholder
              style={{
                borderRadius: "5px",
                marginLeft: "15px",
                maxHeight: "175px",
                marginTop: "0",
              }}
              fluid
            >
              <Placeholder.Image
                style={{
                  height: "10px",
                  width: "45rem",
                }}
              />
            </Placeholder>
          </div>
          <CardCarousel name="Recomended for You" />
        </>
      );
    }
  }
);
