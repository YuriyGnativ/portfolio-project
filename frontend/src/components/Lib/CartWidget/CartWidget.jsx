import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions/cart.actions";
import { Button, Icon } from "semantic-ui-react";

class CartWidget extends Component {
  state = {
    active: false,
  };

  componentDidUpdate(prevProps) {
    const {
      cartReducer: { items },
      item: { id },
    } = this.props;
    const item = items.find((i) => id === i.id);
    if (item && this.state.active === false) {
      this.setState({
        active: true,
      });
    } else if (!item && this.state.active === true) {
      this.setState({
        active: false,
      });
    }
  }

  componentDidMount() {
    const {
      item: { id },
      cartReducer: { items },
      type,
    } = this.props;
    if (items.find((i) => id === i.id)) {
      this.setState({
        active: true,
      });
    } else {
      this.setState({
        active: false,
      });
    }
  }

  handleActive = () => {
    const {
      props: { pushCart, shiftCart, item, type },
      state: { active },
    } = this;
    if (active) {
      shiftCart(item.id);
    } else {
      pushCart(item);
    }
    this.setState({
      active: !active,
    });
  };

  render() {
    const { active } = this.state;
    return this.props.type === "icon" ? (
      <Icon
        className="cart-widget"
        name={active ? "cart" : "add to cart"}
        color={active ? "blue" : "grey"}
        onClick={this.handleActive}
      />
    ) : (
      <Button onClick={this.handleActive}>
        <Icon
          color={active ? "blue" : "grey"}
          name={active ? "cart" : "add to cart"}
        />
        Add to Cart
      </Button>
    );
  }
}

export default connect(
  ({ cartReducer }) => ({ cartReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(CartWidget);
