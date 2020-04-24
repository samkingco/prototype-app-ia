import React from "react";
import { useSelector } from "react-redux";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { Divider } from "../design-system/Divider";
import { Button } from "../design-system/Button";
import { ComputedNotification } from "../store/notifications/selectors";
import { medicationSelectors } from "../store/medications/selectors";
import { accountSelectors } from "../store/account/selectors";
import { MedicationListItem } from "./MedicationListItem";
import { useHistory } from "react-router-dom";
import { Tag } from "../design-system/Tag";
import { ActionableNotificationLayout } from "./ActionableNotificationLayout";

interface Props {
  notification: ComputedNotification;
}

export function NotificationTypeRequestRx(props: Props) {
  const history = useHistory();
  const { notification } = props;

  const medicationToRequest = useSelector((s) =>
    medicationSelectors.byIds(s, notification.medicationIds || [])
  );

  const patient = useSelector((s) =>
    accountSelectors.getPatient(s, notification.patientId)
  );

  return (
    <ActionableNotificationLayout
      notification={notification}
      doneContent={<Text>You’ve already requested this prescription.</Text>}
      doneVerb="Requested"
      originalContent={
        <>
          <List gap={2}>
            <Text>{`Hi${patient ? ` ${patient.firstName}` : ""},`}</Text>
            <Text>
              It looks like you're running low on the following medication.
            </Text>
            <Text>
              As getting medication to you can take between 5 and 10 days, we
              recommend requesting more from your GP today.
            </Text>
          </List>
          <Divider />
          {medicationToRequest.length > 0 ? (
            <List>
              {medicationToRequest.map((medication) => (
                <MedicationListItem
                  key={`requested_med_${medication.id}`}
                  medication={medication}
                  additionalContent={
                    <>
                      <div />
                      <div>
                        <Tag variant="warning">Runs out in 14 days</Tag>
                      </div>
                    </>
                  }
                />
              ))}
            </List>
          ) : null}
          {!notification.hasBeenDone ? (
            <Button onClick={() => history.push("/request-prescription")}>
              Request prescription
            </Button>
          ) : null}
        </>
      }
    />
  );
}
