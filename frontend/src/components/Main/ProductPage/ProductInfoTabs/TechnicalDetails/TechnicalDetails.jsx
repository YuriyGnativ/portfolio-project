import React, { Component } from "react";
import { Tab, Icon, Label, Menu, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/singleitem.actions";
import { bindActionCreators } from "redux";
import { createBrowserHistory } from "history";

const Stats = connect(
  ({ singleitemReducer: { productData, isFetching, dataReady } }) => ({
    productData,
    isFetching,
    dataReady,
  }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    componentDidMount() {
      // const history = createBrowserHistory();
      // const { url } = history.location.state;
      // const { fetchProductStats, statsReady } = this.props;
      // console.log("compdidmount");
      // console.log("curr url", url);
      // console.log("props url", this.props.url);
      // if (!statsReady || url !== this.props.url) fetchProductStats(url);
      // fetchProductStats(url);
    }

    render() {
      const {
        productData: { data },
        dataReady,
      } = this.props;
      return dataReady ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2" textAlign="center">
                Technical Details
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(data).map((i, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{i}</Table.Cell>
                  <Table.Cell>{data[i]}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <h1>Loading</h1>
      );
    }
  }
);

export default {
  menuItem: "Technical Details",
  render: () => (
    <Tab.Pane>
      <Stats />
    </Tab.Pane>
  ),
};
