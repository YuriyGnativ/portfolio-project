import React from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";

export default () => {
  return (
    <Grid columns={2}>
      <Grid.Column width={4}>
        <Segment>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
        <Segment>
          <Placeholder fluid>
            <Placeholder.Header>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="full" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="long" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="long" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="full" />
              <Placeholder.Line length="long" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
