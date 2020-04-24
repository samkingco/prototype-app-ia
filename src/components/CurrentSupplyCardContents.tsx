import React from "react";
import pluralize from "pluralize";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { Divider } from "../design-system/Divider";
import { Button } from "../design-system/Button";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { ProgressBar } from "../design-system/ProgressBar";
import { ComputedMedication } from "../store/medications/selectors";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedMedicationsForTempRequest } from "../store/requests/slice";

interface Props extends ComputedMedication {
  hasRecentRequest?: boolean;
}

export function CurrentSupplyCardContents(props: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const {
    id,
    amountRemainingInDays,
    amountRemaining,
    amountPrescribed,
    form,
    hasRecentRequest,
  } = props;

  const requestPrescriptionUrl = "/request-prescription";

  const onRequestPrescriptionPress = () => {
    dispatch(setSelectedMedicationsForTempRequest([id]));
    history.push(requestPrescriptionUrl);
  };

  const progressBar = (
    <List gap={1}>
      <ProgressBar progress={amountRemaining / amountPrescribed} />
      <Text>
        <Text isInline={true} isBold={true}>
          {amountRemaining}
        </Text>{" "}
        / {amountPrescribed} {pluralize(form, amountPrescribed)}{" "}
        {amountRemainingInDays ? (
          <Text
            isInline={true}
            color="gray70"
          >{`(${amountRemainingInDays} ${pluralize(
            "days",
            amountRemainingInDays
          )} left)`}</Text>
        ) : null}
      </Text>
    </List>
  );

  const currentSupply = (
    <>
      <Heading>Your current supply</Heading>
      {progressBar}
      <ListItem
        title="Change this estimate"
        to={`${url}/change-due-date`}
        linkType="modal"
      />
    </>
  );

  if (!hasRecentRequest) {
    if (amountRemainingInDays && amountRemainingInDays <= 0) {
      return (
        <>
          <Heading>Run out!</Heading>
          <List gap={1}>
            <Text>
              As it takes a few days for your medication to reach you, now is a
              good time to request more.
            </Text>
            <Text>
              Need your medicine urgently? Please follow the NHS advice.
            </Text>
          </List>
          <Button onClick={onRequestPrescriptionPress}>
            Request a prescription
          </Button>
        </>
      );
    }

    if (amountRemainingInDays && amountRemainingInDays <= 10) {
      return (
        <>
          <Heading>Ready to request</Heading>
          <Text>
            As it takes a few days for your medication to reach you, now is a
            good time to request more.
          </Text>
          <Button onClick={onRequestPrescriptionPress}>
            Request a prescription
          </Button>
          <Divider mt={3} mb={3} />
          {currentSupply}
        </>
      );
    }

    if (!amountRemainingInDays) {
      return (
        <>
          <Heading>When will this run out?</Heading>
          <Text>
            We can remind you when it’s time to request more from your GP. Just
            tell us how much you were last prescribed and how often you take it.
          </Text>
          <List>
            <ListItem linkType="modal" title="Add medication details" />
            <ListItem
              title="Request a prescription"
              onClick={onRequestPrescriptionPress}
              linkType="modal"
            />
          </List>
        </>
      );
    }
  }

  return (
    <>
      {currentSupply}
      {!hasRecentRequest ? (
        <>
          <Divider />
          <Text>
            We’ll remind you when it’s time to request a new prescription. You
            can still request one now, but your GP might reject your request if
            they think it's too early.
          </Text>
          <ListItem
            title="Request a prescription"
            onClick={onRequestPrescriptionPress}
            linkType="modal"
          />
        </>
      ) : null}
    </>
  );
}
