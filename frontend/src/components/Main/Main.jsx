import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./HomePage";
import UserSettings from "./UserSettings";
import ProductPage from "./ProductPage";
import Categories from "./Categories";
import Header from "../Header";
import Footer from "../Footer";

export default (props) => (
  <>
    <Header />
    <main>
      <div className="container content-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/product/p/:category"
            render={({ match }) =>
              ["smartphones", "laptops", "smartwatches", "headphones"].includes(
                match.params.category
              ) ? (
                <Categories />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/product/:id" component={ProductPage} />
          <Route
            path="/user"
            render={() =>
              props.isAuthenticated ? <UserSettings /> : <Redirect to="/" />
            }
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </main>
    <Footer />
  </>
);
