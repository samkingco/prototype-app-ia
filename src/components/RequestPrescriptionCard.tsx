import React from "react";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { ComputedMedication } from "../store/medications/selectors";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedMedicationsForTempRequest } from "../store/requests/slice";
import { Card } from "../design-system/Card";

interface Props {
  medication: ComputedMedication;
  hasRecentRequest: boolean;
}

export function RequestPrescriptionCard({
  medication,
  hasRecentRequest,
}: Props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const requestPrescriptionUrl = "/request-prescription";

  const onRequestPrescriptionPress = () => {
    dispatch(setSelectedMedicationsForTempRequest([medication.id]));
    history.push(requestPrescriptionUrl);
  };

  if (!hasRecentRequest) {
    if (
      medication.amountRemainingInDays &&
      medication.amountRemainingInDays <= 0
    ) {
      return (
        <Card>
          <Heading>Looks like you’ve run out</Heading>
          <List gap={2}>
            <Text color="gray70">
              You can request more now. Remember it will take a few days to
              reach you.
            </Text>
            <Text color="gray70">
              Need your medicine urgently? Please follow the NHS advice.
            </Text>
          </List>
          <Button onClick={onRequestPrescriptionPress}>
            Request a prescription
          </Button>
        </Card>
      );
    }

    if (
      medication.amountRemainingInDays &&
      medication.amountRemainingInDays <= 14
    ) {
      return (
        <Card>
          <Heading>Ready to request</Heading>
          <Text color="gray70">
            As it takes a few days for your medication to reach you, now is a
            good time to request more.
          </Text>
          <Button onClick={onRequestPrescriptionPress}>
            Request a prescription
          </Button>
        </Card>
      );
    }

    if (!medication.amountRemainingInDays) {
      return (
        <Card>
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
        </Card>
      );
    }
  }

  return null;
}
