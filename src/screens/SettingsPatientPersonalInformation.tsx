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
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";
import { PageTitle, PageTitleBackAction } from "../components/PageTitle";

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
    <ScreenWithSidebar>
      <PageContents>
        <PageTitle
          title="Personal information"
          leftAction={
            <PageTitleBackAction
              label={`${patient.firstName} ${patient.lastName}`}
            />
          }
        />
        <Card>
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
          <List gap={0}>
            <Text size={1} color="gray70">
              First name
            </Text>
            <Text>{patient.firstName}</Text>
          </List>
          <List gap={0}>
            <Text size={1} color="gray70">
              Last name
            </Text>
            <Text>{patient.lastName}</Text>
          </List>
          {patient.dateOfBirth ? (
            <List gap={0}>
              <Text size={1} color="gray70">
                Date of birth
              </Text>
              <Text>{format(patient.dateOfBirth, "do MMMM, yyyy")}</Text>
            </List>
          ) : null}
          <List gap={0}>
            <Text size={1} color="gray70">
              Gender
            </Text>
            <Text>
              {!patient.gender || patient.gender === "None"
                ? "Prefer not to say"
                : patient.gender}
            </Text>
          </List>
          <ListItem
            to={`${url}/edit-information`}
            linkType="modal"
            title="Edit personal information"
          />
        </Card>
      </PageContents>
    </ScreenWithSidebar>
  );
}
