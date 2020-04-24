import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { accountSelectors } from "../store/account/selectors";
import { Text } from "../design-system/Text";
import { format } from "date-fns";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";
import { Divider } from "../design-system/Divider";

interface Params {
  patientId: string;
}

export function SettingsPatientPersonalInformation() {
  const { patientId } = useParams<Params>();
  const { url } = useRouteMatch();
  const patient = useSelector((s) => accountSelectors.getPatient(s, patientId));

  if (!patient) {
    return null;
  }

  return (
    <>
      <NavigationBar
        title="Personal information"
        useLargeTitle={true}
        leftAction={
          <NavigationBarBackAction
            label={`${patient.firstName} ${patient.lastName}`}
          />
        }
      />
      <PageContents>
        <Card hasListItemAtEnd={true}>
          <Text>
            This information much match the registered details at{" "}
            {patient.gpSurgery.name ? (
              <Text isBold={true} isInline={true}>
                {patient.gpSurgery.name}
              </Text>
            ) : (
              "your GP"
            )}
            .
          </Text>
          <List gap={1}>
            <Text size={1} color="gray70">
              First name
            </Text>
            <Text>{patient.firstName}</Text>
          </List>
          <List gap={1}>
            <Text size={1} color="gray70">
              Last name
            </Text>
            <Text>{patient.lastName}</Text>
          </List>
          {patient.dateOfBirth ? (
            <List gap={1}>
              <Text size={1} color="gray70">
                Date of birth
              </Text>
              <Text>{format(patient.dateOfBirth, "do MMMM, yyyy")}</Text>
            </List>
          ) : null}
          <List gap={1}>
            <Text size={1} color="gray70">
              Gender
            </Text>
            <Text>
              {!patient.gender || patient.gender === "None"
                ? "Prefer not to say"
                : patient.gender}
            </Text>
          </List>
          <List>
            <Divider extendRight={true} />
            <ListItem
              to={`${url}/edit-information`}
              linkType="modal"
              title="Edit personal information"
            />
          </List>
        </Card>
      </PageContents>
    </>
  );
}
