import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";

import { Tab, Menu, Image } from "semantic-ui-react";
import * as actions from "../../../../../../actions/singleitem.actions";

import "./product-photos-tabs.scss";

export default connect(
  ({ singleitemReducer: { productData, isFetching, dataReady } }) => ({
    productData,
    isFetching,
    dataReady,
  }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class ProductPhotosTabs extends Component {
    render() {
      const {
        productData: {
          image_set: { images },
        },
        dataReady,
      } = this.props;
      return dataReady ? (
        <div className="product-photos-tab-holder">
          <Tab
            menu={{ vertical: true }}
            panes={images.map((i, index) => {
              return {
                menuItem: (
                  <Menu.Item key={index}>
                    <div className="product-protos-menu-img">
                      <Image src={i} />
                    </div>
                  </Menu.Item>
                ),
                render: () => (
                  <Tab.Pane>
                    <div className="product-protos-pane-img">
                      <Image src={i} />
                    </div>
                  </Tab.Pane>
                ),
              };
            })}
          ></Tab>
        </div>
      ) : (
        <h1>Loading</h1>
      );
    }
  }
);
