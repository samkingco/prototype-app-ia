import React from "react";
import pluralize from "pluralize";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { ProgressBar } from "../design-system/ProgressBar";
import { ComputedMedication } from "../store/medications/selectors";
import { useRouteMatch } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Divider } from "../design-system/Divider";

interface Props {
  medication: ComputedMedication;
}

export function CurrentSupplyCard({ medication }: Props) {
  const { url } = useRouteMatch();

  return medication.amountRemainingInDays ? (
    <Card hasListItemAtEnd={true}>
      <Heading>Your current supply</Heading>
      <ProgressBar
        progress={medication.amountRemaining / medication.amountPrescribed}
        dangerThreshold={
          14 / (medication.amountPrescribed / (medication.amountPerDay || 1))
        }
      />
      <List>
        <Text>
          <Text isBold={true} isInline={true}>
            {medication.amountRemaining}{" "}
            {pluralize(medication.form, medication.amountPrescribed)} left
          </Text>
          {medication.amountRemainingInDays ? (
            <>
              {` (${medication.amountRemainingInDays} ${pluralize(
                "days",
                medication.amountRemainingInDays
              )})`}
            </>
          ) : null}
        </Text>
        <Text color="gray70">{medication.amountPrescribed} prescribed</Text>
      </List>
      <List>
        <Divider extendRight={true} />
        <ListItem
          title="Update this estimate"
          to={`${url}/change-due-date`}
          linkType="modal"
        />
      </List>
    </Card>
  ) : null;
}
