import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { List } from "../design-system/List";
import { MedicationListItem } from "../components/MedicationListItem";
import { ListItem } from "../design-system/ListItem";
import { Text } from "../design-system/Text";
import { PageContents } from "../design-system/PageContents";
import { Divider } from "../design-system/Divider";
import { medicationSelectors } from "../store/medications/selectors";
import { Button } from "../design-system/Button";
import { setSelectedMedicationsForTempRequest } from "../store/requests/slice";
import styled from "../design-system/styled";
import { TabBar } from "../components/TabBar";
import { NavigationBar } from "../components/NavigationBar";
import { ListItemBadge } from "../design-system/ListItemBadge";

const YourMedicationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px;
`;

export function Medication() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const history = useHistory();

  const medicationsList = useSelector(medicationSelectors.list);
  const requestableMedication = useSelector(
    medicationSelectors.requestableMedication
  );
  const runningLowMedication = requestableMedication.filter((medication) =>
    Boolean(
      medication.amountRemainingInDays && medication.amountRemainingInDays <= 14
    )
  );

  const todaysDosesRemaining = useSelector(
    medicationSelectors.totalDosesRemaining
  );

  return (
    <>
      <NavigationBar title="Medication" useXLargeTitle={true} />
      <PageContents>
        {runningLowMedication.length > 0 ? (
          <Card>
            <Heading>Running low?</Heading>
            <Text>
              It looks like you’re running low on some medication. Now is a good
              time to request more from your GP.
            </Text>
            <Button
              onClick={() => {
                history.push("/request-prescription");
                dispatch(setSelectedMedicationsForTempRequest([]));
              }}
            >
              Request a prescription
            </Button>
          </Card>
        ) : null}

        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <List>
            <ListItem
              to={`${url}/schedule`}
              linkType="push"
              iconLeft="today"
              renderComponentRight={
                todaysDosesRemaining > 0 && (
                  <ListItemBadge>{todaysDosesRemaining}</ListItemBadge>
                )
              }
              title="Today’s medication"
              subtitle={
                todaysDosesRemaining > 0
                  ? "See what you need to take today"
                  : "You’ve taken all your medication for today"
              }
            />
          </List>
        </Card>

        <Card>
          <YourMedicationWrapper>
            <Heading>Your medication</Heading>
          </YourMedicationWrapper>
          {medicationsList.length > 0 ? (
            <>
              <List>
                {medicationsList.map((medication) => (
                  <>
                    <Divider extendRight={true} />
                    <MedicationListItem
                      key={`your_meds_${medication.id}`}
                      to={`${url}/${medication.id}`}
                      linkType="push"
                      medication={medication}
                      showStatusTag={true}
                      showUnknownSupplyQuestion={true}
                    />
                  </>
                ))}
                <Divider extendRight={true} />
              </List>
            </>
          ) : (
            <Text>Add medication to your account</Text>
          )}
          <Button
            variant="secondary"
            fillType="full-width"
            onClick={() => {
              history.push("/add-medication");
              dispatch(setSelectedMedicationsForTempRequest([]));
            }}
          >
            Add medication
          </Button>
        </Card>

        {runningLowMedication.length === 0 ? (
          <Card>
            <Heading>Everything looks good</Heading>
            <Text>
              We think you still have enough medication left. You can still
              request a prescription, but your GP may not approve it if you’re
              too early.
            </Text>
            <Button
              variant="secondary"
              onClick={() => {
                history.push("/request-prescription");
                dispatch(setSelectedMedicationsForTempRequest([]));
              }}
            >
              Request a prescription
            </Button>
          </Card>
        ) : null}

        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <List>
            <ListItem
              to={`/medication-history`}
              linkType="push"
              title="Medication history"
              subtitle="See how your medication has changed over time"
            />
          </List>
        </Card>
      </PageContents>
      <TabBar />
    </>
  );
}
