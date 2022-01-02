import React, { Component } from "react";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { editQueryString } from "../../../utils/editQueryString";

import "./checkbox-filters.scss";

export default connect(
  ({ router }) => ({ router }),
  {}
)(
  class extends Component {
    state = {
      checkedItems: [],
    };

    componentDidMount() {
      const { items } = this.props;
      const reduced = items.reduce((acc, i, index) => {
        if (i.active === true) {
          acc.push(index);
          return acc;
        } else {
          return acc;
        }
      }, []);
      this.setState({
        checkedItems: reduced,
      });
    }

    render() {
      const { component: CheckboxComponent, items } = this.props;
      const { checkedItems } = this.state;
      return (
        <div className="checkbox-filters">
          {items.map((item, index) => {
            return (
              <CheckboxComponent
                checked={checkedItems.includes(index)}
                label={item.value}
                key={index}
                onChange={() => {
                  const history = createBrowserHistory();
                  const { location } = history;
                  if (checkedItems.includes(index)) {
                    this.setState(() => {
                      history.push(
                        location.pathname +
                          editQueryString(
                            location.search,
                            item.entityType,
                            "POP",
                            item.queryValue,
                            item.value.toLowerCase()
                          )
                      );
                      return {
                        checkedItems: checkedItems.filter((o) => o !== index),
                      };
                    });
                  } else {
                    this.setState(() => {
                      history.push(
                        location.pathname +
                          editQueryString(
                            location.search,
                            item.entityType,
                            "PUSH",
                            item.queryValue,
                            item.value.toLowerCase()
                          )
                      );
                      return {
                        checkedItems: [...checkedItems, index],
                      };
                    });
                  }
                }}
              />
            );
          })}
        </div>
      );
    }
  }
);
