import React from "react";

import "./radio-filters.scss";

export default (props) => {
  const RadioComponent = props.component;
  return (
    <div className="radio-filters">
      {props.items.map((item, index) => {
        return (
          <RadioComponent label={item} key={index} checked={item.active} />
        );
      })}
    </div>
  );
};
