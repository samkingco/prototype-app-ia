import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { ComputedNotification } from "../store/notifications/selectors";
import { medicationSelectors } from "../store/medications/selectors";
import { accountSelectors } from "../store/account/selectors";
import { MedicationListItem } from "./MedicationListItem";
import styled from "styled-components";

interface Props {
  notification: ComputedNotification;
}

const Barcode = styled.div<{ src: string }>`
  max-width: 100%;
  height: 0;
  padding-bottom: 12%;
  background-color: ${(p) => p.theme.colors.gray10};
  background-image: ${(p) => `url(${p.src})`};
  background-size: 100%;
  background-repeat: no-repeat;
`;

const SerialNumberArea = styled(List)`
  max-width: 400px;
  text-align: left;
`;

export function NotificationTypeRxReturned(props: Props) {
  const { notification } = props;

  const prescriptionMedication = useSelector((s) =>
    medicationSelectors.byIds(
      s,
      notification.medicationIds ? notification.medicationIds : []
    )
  );

  const patient = useSelector((s) =>
    accountSelectors.getPatient(s, notification.patientId)
  );

  if (!notification.prescriptionSerial) {
    return (
      <Card>
        <Text>Something went wrong loading the prescription.</Text>
      </Card>
    );
  }

  return (
    <Card>
      <List gap={2}>
        <Text>{`Hi${patient ? ` ${patient.firstName}` : ""},`}</Text>
        <Text>
          You can now collect your medication from any pharmacy. Just show them
          this prescription barcode.
        </Text>
      </List>
      <Divider />
      <SerialNumberArea gap={1}>
        <Barcode
          src={`https://barcode.tec-it.com/barcode.ashx?data=${notification.prescriptionSerial}&dpi=192`}
        />
        <Heading fontFamily="mono">{notification.prescriptionSerial}</Heading>
      </SerialNumberArea>
      <Divider />
      {prescriptionMedication.length > 0 ? (
        <List>
          {prescriptionMedication.map((medication) => (
            <MedicationListItem
              key={`requested_med_${medication.id}`}
              medication={medication}
            />
          ))}
        </List>
      ) : null}
      <Divider />
      <Text>
        We’ll send you a refund if you've already paid for this prescription. It
        should appear on your statement within 5 to 10 days.
      </Text>
      <Text>
        Best wishes,
        <br />
        Team Echo
      </Text>
    </Card>
  );
}
