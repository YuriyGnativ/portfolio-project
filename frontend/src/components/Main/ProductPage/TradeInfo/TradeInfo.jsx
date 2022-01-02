import React, { Component } from "react";
import { Icon, Statistic, Segment } from "semantic-ui-react";

import CartWidget from "../../../Lib/CartWidget";
import WishlistWidget from "../../../Lib/WishlistWidget";
import AvailablenessWidget from "../../../Lib/AvailablenessWidget";

import "./trade-info.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export default connect(
  ({ singleitemReducer }) => ({ ...singleitemReducer }),
  {}
)(
  class extends Component {
    render() {
      const {
        productData: { available, price },
        productData,
      } = this.props;
      return (
        <div className="trade-info-container">
          <Segment>
            <div style={{ display: "flex" }}>
              <AvailablenessWidget available={available} />
              {available ? (
                <CartWidget item={productData} type="button" />
              ) : (
                <WishlistWidget type="button" style={{ marginLeft: "15px" }} />
              )}
            </div>

            <Segment>
              <div className="trade-panel">
                <Segment style={{ margin: 0 }}>
                  <Statistic size="tiny" style={{ margin: 0 }}>
                    <Statistic.Value>{price}$</Statistic.Value>
                  </Statistic>
                </Segment>
              </div>
            </Segment>
          </Segment>
        </div>
      );
    }
  }
);
