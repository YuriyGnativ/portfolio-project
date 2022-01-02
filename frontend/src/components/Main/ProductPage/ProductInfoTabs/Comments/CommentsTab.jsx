import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";

import { Tab, Icon, Segment } from "semantic-ui-react";
import Comment from "../../../../Lib/Comment";

import "./comments-tab.scss";

const CommentsTab = connect(
  ({ singleitemReducer: { productData, isFetching, dataReady } }) => ({
    productData,
    isFetching,
    dataReady,
  }),
  () => ({})
)(
  class extends Component {
    render() {
      const {
        productData: { comments },
        dataReady,
      } = this.props;
      return dataReady && comments.length >= 1 ? (
        <>
          {comments.map(
            ({ i, subcomments, user: { username, avatar }, inner_text }) => {
              return subcomments.length === 0 ? (
                <Comment
                  key={v4()}
                  avatar={avatar}
                  username={username}
                  innerText={inner_text}
                />
              ) : (
                <Segment key={v4()}>
                  <Comment
                    key={v4()}
                    avatar={avatar}
                    username={username}
                    innerText={inner_text}
                  />
                  <div className="subcomments">
                    {subcomments.map(
                      ({ inner_text, user: { avatar, username } }) => {
                        return (
                          <Comment
                            key={v4()}
                            avatar={avatar}
                            username={username}
                            innerText={inner_text}
                          />
                        );
                      }
                    )}
                  </div>
                </Segment>
              );
            }
          )}
        </>
      ) : (
        <div className="comments-placeholder">
          <Icon name="conversation" size="huge" />
          <span className="comments-placeholder-header">No Comments Yet</span>
          <span className="comments-placeholder-body">
            Be the First. Share what you think!
          </span>
        </div>
      );
    }
  }
);

export default {
  menuItem: "Comments",
  render: () => (
    <Tab.Pane>
      <CommentsTab />
    </Tab.Pane>
  ),
};
