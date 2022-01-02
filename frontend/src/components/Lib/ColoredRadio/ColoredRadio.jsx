import React, { useState } from "react";
import { Radio } from "semantic-ui-react";

import "./colored-radio.scss";

export default (props) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="colored-radio-wrap">
      <Radio
        name={props.label}
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      />
    </div>
  );
};
