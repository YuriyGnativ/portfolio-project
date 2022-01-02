import React, { Component } from "react";
import { Range } from "react-range";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { editQueryString } from "../../../utils/editQueryString";

import "./range-filters.scss";

export default connect(
  ({ router }) => ({ router }),
  () => ({})
)(
  class extends Component {
    state = {
      params: null,
      values: [1, 100],
      queryValue: null,
      entityType: null,
    };

    componentDidMount() {
      const {
        params: { min, max, values, entityType, queryValue },
      } = this.props;
      this.setState({
        params: { min, max },
        values,
        entityType,
        queryValue,
      });
    }

    render() {
      const { values, params, queryValue, entityType } = this.state;

      return (
        <div className="range-input-container">
          <div className="minmax-wrapper">
            <input
              type="text"
              className="min-value-field"
              value={values[0]}
              onChange={(e) => {
                if (
                  !(e.target.value >= values[1]) &&
                  !(e.target.value < 0) &&
                  !isNaN(Number(e.target.value))
                ) {
                  this.setState({
                    values: [e.target.value, values[1]],
                  });
                }
              }}
              onBlur={() => {}}
            />
            <input type="text" className="max-value-field" value={values[1]} />
          </div>
          <Range
            step={1}
            // min={1}
            // max={100}
            min={params ? params.min : 1}
            max={params ? params.max : 100}
            values={values}
            onChange={(values) => {
              const history = createBrowserHistory();
              const { location } = history;
              this.setState(() => {
                history.push(
                  location.pathname +
                    editQueryString(
                      location.search,
                      entityType,
                      "PUSH",
                      queryValue,
                      values
                    )
                );
                return { values };
              });
              // if (location.search) {
              //   if (location.search.match(/\?price/)) {
              //     const replaced = location.search.replace(
              //       /\?price=\d+,\d+/,
              //       `?price=${this.state.values[0]},${this.state.values[1]}`
              //     );
              //     history.push(location.pathname + replaced);
              //   } else if (location.search.match(/\&price/)) {
              //     const replaced = location.search.replace(
              //       /\&price=\d+,\d+/,
              //       `&price=${this.state.values[0]},${this.state.values[1]}`
              //     );
              //     history.push(location.pathname + replaced);
              //   } else {
              //     history.push(
              //       location.pathname +
              //         location.search +
              //         `&price=${this.state.values[0]},${this.state.values[1]}`
              //     );
              //   }
              // } else {
              //   history.push(
              //     `?price=${this.state.values[0]},${this.state.values[1]}`
              //   );
              // }
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className="range-track">
                {children}
              </div>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <div {...props} className="input-thumb">
                <div
                  className={`${isDragged ? "dragged" : ""} + thumb-point`}
                />
              </div>
            )}
          />
        </div>
      );
    }
  }
);
