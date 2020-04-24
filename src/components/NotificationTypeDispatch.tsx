import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { Divider } from "../design-system/Divider";
import { Button } from "../design-system/Button";
import { ComputedNotification } from "../store/notifications/selectors";
import { requestSelectors } from "../store/requests/selectors";
import { medicationSelectors } from "../store/medications/selectors";
import { accountSelectors } from "../store/account/selectors";
import { MedicationListItem } from "./MedicationListItem";
import { FormattedAddress } from "./FormattedAddress";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  notification: ComputedNotification;
}

export function NotificationTypeDispatch(props: Props) {
  const history = useHistory();
  const { notification } = props;

  const request = useSelector((s) =>
    requestSelectors.byId(s, notification.requestId)
  );

  const requestedMedication = useSelector((s) =>
    medicationSelectors.byIds(s, request ? request.medicationIds : [])
  );

  const patient = useSelector((s) =>
    accountSelectors.getPatient(s, notification.patientId)
  );

  const deliveryAddress = useSelector((s) =>
    accountSelectors.getDeliveryAddress(
      s,
      request && request.deliveryAddressId ? request.deliveryAddressId : ""
    )
  );

  if (!request) {
    return (
      <Card>
        <Text>There was a problem loading request information.</Text>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <List gap={2}>
          <Text>{`Hi${patient ? ` ${patient.firstName}` : ""},`}</Text>
          <Text>
            We sent you the following medication on the{" "}
            {format(request.lastStatusChange, "do 'of' MMM")}, so it should be
            with you soon. You can track its progress below.
          </Text>
        </List>
        <Divider />
        {requestedMedication.length > 0 ? (
          <List>
            {requestedMedication.map((medication) => (
              <MedicationListItem
                key={`requested_med_${medication.id}`}
                medication={medication}
              />
            ))}
          </List>
        ) : null}
        <Divider />
        {deliveryAddress ? (
          <>
            <List gap={1}>
              <Text isBold={true}>Delivery address</Text>
              <FormattedAddress address={deliveryAddress} />
            </List>
          </>
        ) : null}
        <List gap={1}>
          <Text isBold={true}>
            {request.isLetterboxFriendly
              ? "Letterbox friendly"
              : "Not letterbox friendly"}
          </Text>
          <Text>
            Based on the size of this delivery, we think it will
            {request.isLetterboxFriendly ? " " : " not "}fit through your
            letterbox.
          </Text>
        </List>
        <Button onClick={() => history.push("/track-delivery")}>
          Track delivery
        </Button>
        <Divider mt={3} mb={3} />
        <Text>
          Best wishes,
          <br />
          Team Echo
        </Text>
      </Card>
    </>
  );
}
