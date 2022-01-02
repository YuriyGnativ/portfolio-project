import React from "react";
import { List, Image, Placeholder, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions/cart.actions";
import ItemCounter from "./ItemCounter";
import "./cart-popup.scss";

const CartPopup = (props) => {
  const { items } = props;
  return items.length ? (
    <List divided relaxed>
      <Segment.Group>
        {items.map((item, index) => {
          const { main_image, name, id, description, price, url } = item;

          return (
            <Segment key={index}>
              <div className="cart-item-wrap">
                <List.Item>
                  {main_image ? (
                    <Image src={main_image} href={`/product/${url}`} />
                  ) : (
                    <Placeholder>
                      <Placeholder.Header image />
                    </Placeholder>
                  )}
                  <List.Content>
                    <List.Header as="a" href={`/product/${url}`}>
                      {name}
                    </List.Header>
                    <List.Description>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        ${price}{" "}
                        <ItemCounter shiftCart={props.shiftCart} id={id} />
                      </div>
                    </List.Description>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="full" />
                    </Placeholder.Paragraph>
                  </List.Content>
                </List.Item>
              </div>
            </Segment>
          );
        })}
      </Segment.Group>
    </List>
  ) : (
    <div className="filler-wrapper">
      <h1 className="header-wrap">Cart is empty</h1>
      <img
        className="img-wrap"
        src={`${process.env.PUBLIC_URL}/cart-image.png`}
        width="190"
        height="230"
      />
    </div>
  );
};

export default connect(
  ({ cartReducer }) => ({ ...cartReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(CartPopup);
