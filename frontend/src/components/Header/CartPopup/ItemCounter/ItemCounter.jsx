import React, { Component } from "react";
import { Input, Icon } from "semantic-ui-react";
import "./item-counter.scss";

class ItemCounter extends Component {
  state = {
    counter: 1,
  };

  handlePlus = () => {
    this.setState({
      counter: ++this.state.counter,
    });
  };

  handleMinus = () => {
    if (this.state.counter > 1) {
      this.setState({
        counter: --this.state.counter,
      });
    } else {
      const { shiftCart, id } = this.props;
      shiftCart(id);
    }
  };

  handleChange = (e) => {
    console.log(e.target.value);
    if (
      !isNaN(Number(e.target.value)) &&
      e.target.value !== "" &&
      Number(e.target.value) > 0
    ) {
      this.setState({
        counter: e.target.value,
      });
    }
  };
  handleBlur = (e) => {
    if (Number(e.target.value) === 0) {
      this.setState({
        counter: this.state.counter,
      });
    }
  };

  render() {
    const { counter } = this.state;
    return (
      <div className="item-counter-wrap">
        <button className="btn btn-left" onClick={this.handleMinus}>
          <Icon
            color={counter > 1 ? "black" : "red"}
            name={counter > 1 ? "minus" : "trash"}
          />
        </button>
        <Input
          className="cart-counter-input"
          value={counter}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <button className="btn btn-right" onClick={this.handlePlus}>
          <Icon name="plus" />
        </button>
      </div>
    );
  }
}

export default ItemCounter;
