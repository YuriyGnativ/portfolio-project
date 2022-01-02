import React, { Component } from "react";
import {
  Segment,
  Dimmer,
  Checkbox,
  Accordion,
  Icon,
  Loader,
  Button,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createBrowserHistory } from "history";

import RangeFilters from "../../../Lib/RangeFilters";
import ColoredRadio from "../../../Lib/ColoredRadio";
import RadioFilters from "../../../Lib/RadioFilters";
import CheckboxFilters from "../../../Lib/CheckboxFilters";
import SortTab from "./SortTab";

import * as filterActions from "../../../../actions/filters.actions";
import * as productActions from "../../../../actions/product.actions";

import "./shared-filters.scss";

export default connect(
  ({ filtersReducer: { filters, filtersReady } }) => ({
    filters,
    filtersReady,
  }),
  (dispatch) => ({
    ...bindActionCreators({ ...filterActions, ...productActions }, dispatch),
  })
)(
  class extends Component {
    state = { activeIndexes: [0, 1, 2, 3] };

    handleClick = (e, titleProps) => {
      const { index } = titleProps;
      const { activeIndexes } = this.state;
      const newIndex = activeIndexes;

      const currentIndexPosition = activeIndexes.indexOf(index);
      if (currentIndexPosition > -1) {
        newIndex.splice(currentIndexPosition, 1);
      } else {
        newIndex.push(index);
      }

      this.setState({ activeIndexes: newIndex });
    };

    componentDidMount() {
      this.props.fetchFilters(`/api/product/p/${this.props.category}/filters`);
    }

    render() {
      const {
        state: { activeIndexes },
        props: { filters, filtersReady },
      } = this;

      return filtersReady ? (
        <>
          <Accordion
            styled
            style={{
              width: "auto",
              minWidth: "200px",
            }}
          >
            <div key={0}>
              <Accordion.Title
                index={0}
                active={activeIndexes.includes(0)}
                onClick={this.handleClick}
                style={{
                  border: 0,
                }}
              >
                <Icon name="dropdown" />
                Sort by
              </Accordion.Title>
              <Accordion.Content active={activeIndexes.includes(0)}>
                <SortTab />
              </Accordion.Content>
            </div>
            {filters.map((o, index) => {
              if (o.type === "checkbox")
                return (
                  <div key={index + 1}>
                    <Accordion.Title
                      active={activeIndexes.includes(index + 1)}
                      index={index + 1}
                      onClick={this.handleClick}
                      style={{
                        minWidth: "150px",
                      }}
                    >
                      <Icon name="dropdown" />
                      {o.title}
                    </Accordion.Title>

                    <Accordion.Content
                      active={activeIndexes.includes(index + 1)}
                      style={{
                        paddingLeft: "19px",
                        paddingRight: "19px",
                      }}
                    >
                      <CheckboxFilters items={o.items} component={Checkbox} />
                    </Accordion.Content>
                  </div>
                );
              if (o.type === "radio")
                return (
                  <div key={index + 1}>
                    <Accordion.Title
                      active={activeIndexes.includes(index + 1)}
                      index={index + 1}
                      onClick={this.handleClick}
                      style={{
                        minWidth: "150px",
                      }}
                    >
                      <Icon name="dropdown" />
                      {o.title}
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndexes.includes(index + 1)}
                      style={{
                        paddingLeft: "19px",
                        paddingRight: "19px",
                      }}
                    >
                      <RadioFilters items={o.items} component={ColoredRadio} />
                    </Accordion.Content>
                  </div>
                );
              if (o.type === "range")
                return (
                  <div key={index + 1}>
                    <Accordion.Title
                      active={activeIndexes.includes(index + 1)}
                      index={index + 1}
                      onClick={this.handleClick}
                      style={{
                        minWidth: "150px",
                      }}
                    >
                      <Icon name="dropdown" />
                      {o.title}
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndexes.includes(index + 1)}
                      style={{
                        paddingLeft: "19px",
                        paddingRight: "19px",
                      }}
                    >
                      <RangeFilters params={o.params} />
                    </Accordion.Content>
                  </div>
                );
            })}
            <Accordion.Title active={true} style={{ display: "none" }}>
              {"  "}
            </Accordion.Title>
            <Accordion.Content active={true}>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  const { fetchAndCountData, category } = this.props;
                  const history = createBrowserHistory();
                  const { location } = history;
                  fetchAndCountData(
                    `/api/product/p/${category}` + location.search
                  );
                }}
              >
                Apply Filters
              </Button>
            </Accordion.Content>
          </Accordion>
        </>
      ) : (
        <Segment>
          <div className="filters-loading-placeholder">
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          </div>
        </Segment>
      );
    }
  }
);
