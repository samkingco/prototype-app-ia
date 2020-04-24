import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { BulletList } from "../design-system/BulletList";
import { Divider } from "../design-system/Divider";
import {
  FlowNavigationBar,
  FlowNavigationBarModalCloseAction,
} from "../components/FlowNavigationBar";
import { PageTitle } from "../components/PageTitle";

export function RequestPrescriptionStart() {
  const history = useHistory();

  return (
    <>
      <FlowNavigationBar
        title="Request a prescription"
        rightAction={<FlowNavigationBarModalCloseAction />}
      />
      <PageContents maxWidth={500}>
        <PageTitle title="" />
        <Card>
          <Icon size={6} color="gray40">
            notifications
          </Icon>
          <Heading size={4}>Your health comes first</Heading>
          <BulletList>
            <li>
              <Text>
                We always get your GP's approval before sending you medication.
                This ensures it’s safe.
              </Text>
            </li>
            <li>
              <Text>
                Our team of pharmacists will check your medication again before
                sending it out to you.
              </Text>
            </li>
          </BulletList>
          <Divider mt={3} mb={3} />
          <Button
            fillType="full-width"
            onClick={() =>
              history.push("/request-prescription/select-medication")
            }
          >
            Okay, got it
          </Button>
        </Card>
      </PageContents>
    </>
  );
}
