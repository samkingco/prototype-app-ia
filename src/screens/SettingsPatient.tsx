import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { accountSelectors } from "../store/account/selectors";
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";
import { PageTitle, PageTitleBackAction } from "../components/PageTitle";

interface Params {
  patientId: string;
}

export function SettingsPatient() {
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
          title={`${patient.firstName} ${patient.lastName}`}
          subtitle={`NHS #${patient.nhsNumber}`}
          leftAction={<PageTitleBackAction label="Account" />}
        />
        <Card onlyHasList={true}>
          <List>
            <ListItem
              to={`${url}/personal-information`}
              linkType="push"
              title="Personal information"
              iconLeft="person"
            />
            <ListItem
              to={`${url}/exemptions`}
              linkType="push"
              title="Exemptions and Pre-payment Certificates"
              iconLeft="description"
            />
            <ListItem
              to={`${url}/gp-surgery`}
              linkType="push"
              title="GP surgery"
              iconLeft="local_hospital"
            />
            <ListItem
              to={`${url}/address`}
              linkType="push"
              title="Registered address"
              iconLeft="home_work"
            />
            <ListItem
              to={`${url}/pharmacy`}
              linkType="push"
              title="Pharmacy nomination"
              iconLeft="local_pharmacy"
            />
          </List>
        </Card>

        <Card onlyHasList={true}>
          <ListItem
            to={`${url}/delete-patient`}
            linkType="destructive"
            title="Delete patient"
            iconLeft="delete_outline"
          />
        </Card>
      </PageContents>
    </ScreenWithSidebar>
  );
}
