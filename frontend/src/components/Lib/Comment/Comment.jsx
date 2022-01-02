import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import "./comment.scss";

export default ({ avatar, username, innerText }) => {
  return (
    <Segment>
      <div className="comment-wrap">
        <div className="user-pic">
          <img src={avatar} alt="" />
        </div>
        <div className="comment-content">
          <div className="comment-header">
            <span className="username">
              <a href="#">@{username}</a>
            </span>
            <div className="comment-rating">
              <div className="comment-likes">
                <Icon name="thumbs up" />
              </div>
              <div className="comment-dislikes">
                <Icon name="thumbs down" />
              </div>
            </div>
          </div>
          <span className="comment-text">{innerText}</span>
        </div>
      </div>
    </Segment>
  );
};
