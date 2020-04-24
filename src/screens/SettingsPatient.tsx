import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { accountSelectors } from "../store/account/selectors";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";

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
    <>
      <NavigationBar
        title={`${patient.firstName} ${patient.lastName}`}
        subtitle={`NHS #${patient.nhsNumber}`}
        useLargeTitle={true}
        leftAction={<NavigationBarBackAction label="Account" />}
      />
      <PageContents>
        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
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

        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <ListItem
            to={`${url}/delete-patient`}
            linkType="destructive"
            title="Delete patient"
            iconLeft="delete_outline"
          />
        </Card>
      </PageContents>
    </>
  );
}
