import React from "react";
import { Segment } from "semantic-ui-react";

import ImageCarousel from "./Carousel";
import CategoriesGrid from "./CategoriesGrid";

import "./homepage.scss";
import CardCarousel from "./CardCarousel";

export default () => (
  <div className="container homepage-container">
    <div className="top-view-container">
      <Segment>
        <CategoriesGrid />
      </Segment>
      <Segment>
        <ImageCarousel />
      </Segment>
    </div>
    <div className="bottom-view-container">
      <Segment>
        <CardCarousel name="Recent Viewed" />
      </Segment>
      <Segment>
        <CardCarousel name="Recomended" />
      </Segment>
    </div>
  </div>
);
