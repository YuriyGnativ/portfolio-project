import React, { Component } from "react";
import { Menu, Icon, Input, Popup, List, Header } from "semantic-ui-react";

import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../actions/auth.actions";

import AuthPopup from "./AuthPopup";
import CartPopup from "./CartPopup";
import UserPanel from "./UserPanel";
import SearchWidget from "./SearchWidget";

export default connect(
  ({ mainReducer, authReducer }) => ({ ...mainReducer, ...authReducer }),
  (dispatch) => ({ ...bindActionCreators(actions, dispatch) })
)(
  class extends Component {
    // componentDidMount() {
    //   console.log("header component did mount");
    //   const compOffset = document
    //     .querySelector(".header-nav")
    //     .getBoundingClientRect();
    //   document.addEventListener("scroll", () => {
    //     if (window.scrollY >= compOffset.y) {
    //       document
    //         .querySelector(".header-nav")
    //         .classList.add("fixed-header-nav");
    //     } else {
    //       document
    //         .querySelector(".header-nav")
    //         .classList.remove("fixed-header-nav");
    //     }
    //   });
    // }

    render() {
      const { isAuthenticated, signOut } = this.props;
      return (
        <header className="app-header">
          <div className="container">
            <nav className="header-nav">
              <MediaQuery minWidth={600}>
                <Menu className="header-menu">
                  <Menu.Menu>
                    <Link to="/">
                      <Menu.Item>
                        <Icon
                          name="circle"
                          color={isAuthenticated ? "blue" : "black"}
                        />
                      </Menu.Item>
                    </Link>

                    <Menu.Item>
                      <Header as="h3">Super Hardware</Header>
                    </Menu.Item>
                    <Menu.Item>
                      <SearchWidget />
                      {/* <Input icon="search" size="mini" /> */}
                    </Menu.Item>
                  </Menu.Menu>
                  <Menu.Menu position="right">
                    {/* <Popup
                      content={
                        <List>
                          <List.Item>English</List.Item>
                          <List.Item>Ukrainian</List.Item>
                        </List>
                      }
                      on="click"
                      trigger={
                        <Menu.Item>
                          <Icon name="globe" />
                        </Menu.Item>
                      }
                    /> */}
                    <Popup
                      flowing
                      content={<CartPopup />}
                      position="bottom right"
                      on="click"
                      trigger={
                        <Menu.Item>
                          <Icon name="cart" />
                        </Menu.Item>
                      }
                    />

                    <Popup
                      content={
                        !isAuthenticated ? (
                          <AuthPopup />
                        ) : (
                          <UserPanel signOut={signOut} />
                        )
                      }
                      on="click"
                      trigger={
                        <Menu.Item
                          content={
                            <Icon
                              size="small"
                              name="user"
                              color={isAuthenticated ? "blue" : "black"}
                            />
                          }
                        ></Menu.Item>
                      }
                    />
                  </Menu.Menu>
                </Menu>
              </MediaQuery>
              <MediaQuery maxWidth={600}>
                <Menu>
                  <Popup
                    basic
                    on="click"
                    trigger={
                      <Menu.Item>
                        <Icon name="bars" />
                      </Menu.Item>
                    }
                    content={
                      <Menu>
                        <Menu.Item>
                          <Input />
                        </Menu.Item>
                      </Menu>
                    }
                  />
                  <Popup
                    content={
                      !isAuthenticated ? (
                        <AuthPopup />
                      ) : (
                        <UserPanel signOut={signOut} />
                      )
                    }
                    on="click"
                    trigger={
                      <Menu.Item
                        position="right"
                        content={
                          <Icon
                            size="small"
                            name="user"
                            color={isAuthenticated ? "blue" : "black"}
                          />
                        }
                      ></Menu.Item>
                    }
                  />
                </Menu>
              </MediaQuery>
            </nav>
          </div>
        </header>
      );
    }
  }
);
