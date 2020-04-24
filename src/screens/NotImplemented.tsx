import React from "react";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import {
  FlowNavigationBar,
  FlowNavigationBarModalCloseAction,
} from "../components/FlowNavigationBar";
import { Heading } from "../design-system/Heading";
import { PageTitle } from "../components/PageTitle";

export function NotImplemented() {
  return (
    <>
      <FlowNavigationBar
        title="Whoops, this isn't built yet"
        rightAction={<FlowNavigationBarModalCloseAction />}
      />
      <PageContents maxWidth={500}>
        <PageTitle title="" />
        <Card>
          <Heading>What would you expect here?</Heading>
          <Text>
            This page hasn't been built as part of the prototype, but can you
            tell us what you were expecting to see here?
          </Text>
        </Card>
      </PageContents>
    </>
  );
}
