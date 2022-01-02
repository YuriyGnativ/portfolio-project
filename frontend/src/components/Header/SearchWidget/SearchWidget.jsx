import React, { Component } from "react";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/search.actions";

import "./search-widget.scss";

export default connect(
  ({ searchReducer }) => ({ ...searchReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    constructor(props) {
      super(props);
      this.searchRef = React.createRef();
    }
    handleSearchChange = (e, data) => {
      const {
        searchRef,
        props: { startSearch, cleanQuery, fetchData },
      } = this;
      clearTimeout(searchRef.current);
      console.log(data);
      startSearch(data.value);
      searchRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          cleanQuery();
          return;
        }
        fetchData(data.value);
      }, 300);
    };

    render() {
      const { loading, results, value, updateSelection } = this.props;
      return (
        <div className="search-wrap">
          <Search
            input={{ icon: "search", iconPosition: "left" }}
            loading={loading}
            onResultSelect={(e, data) => {
              updateSelection(data.result.title);
            }}
            onSearchChange={this.handleSearchChange}
            ref={this.searchRef}
            results={results.map((i, index) => ({ ...i, key: index }))}
            value={value}
            resultRenderer={({ image, title, description, price, url }) => (
              <a href={`/product/${url}`}>
                <div className="image">
                  <img src={image} alt="" />
                </div>
                <div className="content">
                  <div className="price">{price}</div>
                  <div className="title">{title}</div>
                  <div className="description">{description}</div>
                </div>
              </a>
            )}
          />
        </div>
      );
    }
  }
);
