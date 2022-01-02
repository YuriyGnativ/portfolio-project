import React from "react";
import { Card, Placeholder } from "semantic-ui-react";
import "./product-card-small.scss";

export default () => {
  return (
    <div className="product-card-small">
      <Card>
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="very long" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
          </Placeholder>
          <Placeholder>
            <Placeholder.Line length="very short" />
          </Placeholder>
        </Card.Content>
      </Card>
    </div>
  );
};
