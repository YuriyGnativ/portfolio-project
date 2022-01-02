import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { createBrowserHistory } from "history";
import { editQueryString } from "../../../../../utils/editQueryString";

import "./sort-tab.scss";

export default connect(
  ({ router }) => ({ router }),
  {}
)(
  class extends Component {
    state = {
      activeIndex: null,
    };

    componentDidMount() {
      this.setState({
        active: false,
      });
    }

    handleSort = (e, titleProps) => {
      const history = createBrowserHistory();
      const { activeIndex } = this.state;
      const { index, value } = titleProps;
      const { location } = history;
      if (activeIndex !== index) {
        // history.push(
        //   location.pathname + `?sort=${index === 1 ? "cheap" : "expensive"}`
        // );
        this.setState(() => {
          history.push(
            location.pathname +
              editQueryString(location.search, "toggle", "PUSH", "sort", value)
          );
          return {
            activeIndex: index,
          };
        });
      } else {
        this.setState(() => {
          history.push(
            location.pathname +
              editQueryString(location.search, "toggle", "POP", "sort", value)
          );
          return {
            activeIndex: null,
          };
        });
      }
    };

    render() {
      const { activeIndex } = this.state;

      return (
        <div className="sort-tab">
          <Icon
            index={1}
            name="sort numeric down"
            className={activeIndex === 1 ? "active" : ""}
            size="large"
            onClick={this.handleSort}
            value="cheap"
          />
          <Icon
            index={2}
            name="sort numeric up"
            className={activeIndex === 2 ? "active" : ""}
            size="large"
            onClick={this.handleSort}
            value="expensive"
          />
        </div>
      );
    }
  }
);
