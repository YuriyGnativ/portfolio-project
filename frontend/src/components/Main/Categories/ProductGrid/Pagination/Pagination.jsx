import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";
import { connect, useStore } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../../actions/product.actions";
import { useHistory } from "react-router";
import qs, { stringify } from "qs";
import { createBrowserHistory } from "history";

import "./pagination.scss";

export default connect(
  ({ paginationReducer }) => ({ ...paginationReducer }),
  (dispatch) => ({
    ...bindActionCreators({ ...actions }, dispatch),
  })
)((props) => {
  const { count, fetchProductData, category } = props;
  return (
    <div className="pagination-wrap">
      <Pagination
        defaultActivePage={1}
        totalPages={Math.ceil(count / 8)}
        onPageChange={(e, { activePage }) => {
          const history = createBrowserHistory();
          const { location } = history;
          const searchObj = qs.parse(location.search, {
            ignoreQueryPrefix: true,
          });
          searchObj.page = activePage;
          const encoded = stringify(searchObj, { encode: false });
          const parsedSearch = "?" + encoded;
          fetchProductData("/api/product/p/" + category + parsedSearch);
          history.push(location.pathname + parsedSearch);
        }}
      />
    </div>
  );
});
