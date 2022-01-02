import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";
import history from "../../../store/history";
import * as actions from "../../../actions/auth.actions";

export default connect(
  () => ({}),
  (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
  })
)((props) => {
  const { signOut } = props;
  return (
    <List divided relaxed>
      <List.Item
        as="a"
        onClick={() => {
          history.push("/user");
        }}
      >
        {/* <Link to="/user"> */}
        <List.Icon name="user" verticalAlign="middle" />
        <List.Content>Settings</List.Content>
        {/* </Link> */}
      </List.Item>

      <List.Item
        as="a"
        onClick={() => {
          console.log("click");
          signOut();
        }}
      >
        <List.Icon name="sign-out" verticalAlign="middle" />
        <List.Content>Signout</List.Content>
      </List.Item>
    </List>
  );
});
