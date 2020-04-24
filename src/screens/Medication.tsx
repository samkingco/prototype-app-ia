import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
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
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";
import { PageTitle } from "../components/PageTitle";
import styled from "../design-system/styled";
import { Icon } from "../design-system/Icon";

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
      medication.amountRemainingInDays && medication.amountRemainingInDays <= 10
    )
  );

  return (
    <ScreenWithSidebar>
      <PageContents>
        <PageTitle title="Medication" useXLargeTitle={true} />
        <Card onlyHasList={true}>
          <List>
            <ListItem
              to={`${url}/schedule`}
              linkType="modal"
              iconLeft="today"
              title="Today’s medication"
              subtitle="See what you need to take today"
            />
          </List>
        </Card>

        {runningLowMedication.length > 0 ? (
          <Card>
            <Heading>Running low?</Heading>
            <Text>
              It looks like you’re running low on these. Now is a good time to
              request more from your GP.
            </Text>
            <Divider />
            <List>
              {runningLowMedication.map((medication) => (
                <MedicationListItem
                  key={`running_low_${medication.id}`}
                  to={`${url}/${medication.id}`}
                  linkType="push"
                  medication={medication}
                  showStatusTag={true}
                />
              ))}
            </List>
            <Divider />
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

        <Card>
          <YourMedicationWrapper>
            <Heading>Your medication</Heading>
            <Link to="/add-medication">
              <Icon color="blue60">add</Icon>
            </Link>
          </YourMedicationWrapper>
          <Divider />
          {medicationsList.length > 0 ? (
            <>
              <List>
                {medicationsList.map((medication) => (
                  <>
                    <MedicationListItem
                      key={`your_meds_${medication.id}`}
                      to={`${url}/${medication.id}`}
                      linkType="push"
                      medication={medication}
                      showStatusTag={true}
                    />
                  </>
                ))}
              </List>
            </>
          ) : (
            <Text>Add medication to your account</Text>
          )}
        </Card>

        <Card onlyHasList={true}>
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
    </ScreenWithSidebar>
  );
}
