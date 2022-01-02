import React from "react";
import { Breadcrumb, Icon } from "semantic-ui-react";

export default ({ name, category }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Section href="/">
        <Icon name="home" />
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section href={`/product/p/${category}`}>
        {category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section link active>
        {name}
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};
