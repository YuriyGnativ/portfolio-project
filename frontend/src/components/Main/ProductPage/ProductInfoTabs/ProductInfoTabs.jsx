import React from "react";
import { Tab, Image, Menu } from "semantic-ui-react";

import ProductPhotosHolder from "./ProductPhotos";
import TechnicalDetails from "./TechnicalDetails";
import CommentsTab from "./Comments";
import "./product-info-tabs.scss";

const panes = [ProductPhotosHolder, TechnicalDetails, CommentsTab];

const ProductInfoTabs = () => (
  <div className="product-page-tabs-holder">
    <Tab menu={{}} panes={panes} />
  </div>
);

export default ProductInfoTabs;
