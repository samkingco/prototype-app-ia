import React from "react";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { Heading } from "../design-system/Heading";
import {
  NavigationBar,
  NavigationBarModalCloseAction,
} from "../components/NavigationBar";

export function NotImplemented() {
  return (
    <>
      <NavigationBar title="" rightAction={<NavigationBarModalCloseAction />} />
      <PageContents maxWidth={500}>
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
