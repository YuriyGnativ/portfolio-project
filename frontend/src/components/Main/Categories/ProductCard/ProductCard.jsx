import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  Card,
  Image,
  Icon,
  Rating,
  Popup,
  Placeholder,
  Segment,
  Divider,
} from "semantic-ui-react";

import CartWidget from "../../../Lib/CartWidget";
import AvailablenessWidget from "../../../Lib/AvailablenessWidget";
import Comment from "../../../Lib/Comment";

import "./product-card.scss";

export default connect(
  ({}) => ({}),
  (dispatch) => ({ ...bindActionCreators({}, dispatch) })
)(
  class ProductCard extends Component {
    state = {
      onPopup: false,
      topComments: [],
      commentsReady: false,
    };
    render() {
      const {
        item: {
          name,
          main_image,
          price,
          rating,
          description,
          url,
          available,
          commentsCounter,
        },
      } = this.props;

      return (
        <div className="card-wrap raised-card">
          <Card>
            <Card.Content extra>
              <Popup
                trigger={true ? <Icon name="like" /> : <Icon name="check" />}
                content={() => {
                  return true ? (
                    <p>add to wishlist</p>
                  ) : (
                    <p>remove from the wishlist</p>
                  );
                }}
              />
            </Card.Content>

            {main_image ? (
              <Link
                to={{
                  pathname: `/product/${url}`,
                  state: {
                    url,
                  },
                }}
              >
                <Image src={main_image} wrapped ui={false} />
              </Link>
            ) : (
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            )}

            <Card.Content>
              <Card.Header
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </Card.Header>
              <Card.Meta>
                <Rating defaultRating={rating} maxRating={5} />
              </Card.Meta>
              <Card.Meta>
                <span>{price} $</span>
              </Card.Meta>
              <Card.Description
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "3",
                  minHeight: "53px",
                }}
              >
                {description ? (
                  <span>{description}</span>
                ) : (
                  <Placeholder>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder>
                )}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="card-extra-content">
                {available ? (
                  <>
                    <div
                      style={{
                        userSelect: "none",
                      }}
                    >
                      <Popup
                        hoverable={true}
                        disabled={commentsCounter >= 1 ? false : true}
                        trigger={
                          <a href="#">
                            <Icon
                              name="comments"
                              style={{
                                color:
                                  commentsCounter >= 1
                                    ? ""
                                    : "rgb(38, 34, 34,  0.26)",
                              }}
                            />
                          </a>
                        }
                        onOpen={async () => {
                          if (!this.state.commentsReady) {
                            const { mostLiked: topComments } = await fetch(
                              `/api/product/${url}/topcomments`
                            ).then((res) => res.json());
                            this.setState({
                              topComments,
                              commentsReady: true,
                            });
                          } else {
                            return null;
                          }
                        }}
                        content={
                          this.state.commentsReady ? (
                            <div className="comments-container">
                              <h4>Top Comments</h4>
                              <Divider />
                              {this.state.topComments.map((i, index) => {
                                return (
                                  <Comment
                                    key={index}
                                    avatar={i.user.avatar}
                                    username={i.user.username}
                                    innerText={i.inner_text}
                                  />
                                );
                              })}
                            </div>
                          ) : (
                            <div style={{ minWidth: "360px" }}>
                              <Segment.Group>
                                {Array(commentsCounter)
                                  .fill(1)
                                  .map((i, index) => {
                                    if (index <= 2) {
                                      return (
                                        <Segment key={index}>
                                          <Placeholder>
                                            <Placeholder.Header image>
                                              <Placeholder.Line length="medium" />
                                              <Placeholder.Line length="full" />
                                            </Placeholder.Header>
                                            <Placeholder.Paragraph>
                                              <Placeholder.Line length="full" />
                                              <Placeholder.Line length="medium" />
                                            </Placeholder.Paragraph>
                                          </Placeholder>
                                        </Segment>
                                      );
                                    }
                                  })}
                              </Segment.Group>
                            </div>
                          )
                        }
                      />
                      <span>{commentsCounter} comments</span>
                    </div>
                    <CartWidget item={this.props.item} type="icon" />
                  </>
                ) : (
                  <AvailablenessWidget available={available} />
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    }
  }
);
