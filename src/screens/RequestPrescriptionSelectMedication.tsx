import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { useSelector, useDispatch } from "react-redux";
import { medicationSelectors } from "../store/medications/selectors";
import { MedicationListItem } from "../components/MedicationListItem";
import { Divider } from "../design-system/Divider";
import { List } from "../design-system/List";
import { Checkbox } from "../design-system/Checkbox";
import { setSelectedMedicationsForTempRequest } from "../store/requests/slice";
import { requestSelectors } from "../store/requests/selectors";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";
import { ToolBar } from "../components/ToolBar";

export function RequestPrescriptionSelectMedication() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tempRequest = useSelector(requestSelectors.getTempRequest);

  const readyToRequestMedication = useSelector((s) =>
    medicationSelectors.readyToRequestMedication(s)
  );

  const tooEarlyToRequestMedication = useSelector((s) =>
    medicationSelectors.tooEarlyToRequestMedication(s)
  );

  const nonRequestableMedication = useSelector((s) =>
    medicationSelectors.nonRequestableMedication(s)
  );

  return (
    <>
      <NavigationBar
        title="Choose medication"
        useLargeTitle={true}
        leftAction={<NavigationBarBackAction label="Request a prescription" />}
      />
      <PageContents>
        {readyToRequestMedication.length > 0 ? (
          <Card>
            <Heading>Ready to request</Heading>
            <List>
              {readyToRequestMedication.map((medication) => (
                <>
                  <Divider extendRight={true} />
                  <Checkbox
                    key={`ready_to_request_${medication.id}`}
                    checked={tempRequest.medicationIds.includes(medication.id)}
                    onChange={() => {
                      if (tempRequest.medicationIds.includes(medication.id)) {
                        dispatch(
                          setSelectedMedicationsForTempRequest(
                            tempRequest.medicationIds.filter(
                              (id) => id !== medication.id
                            )
                          )
                        );
                      } else {
                        dispatch(
                          setSelectedMedicationsForTempRequest([
                            ...tempRequest.medicationIds,
                            medication.id,
                          ])
                        );
                      }
                    }}
                    labelComponent={
                      <MedicationListItem
                        medication={medication}
                        showIcon={false}
                        showStatusTag={true}
                        isCompact={true}
                      />
                    }
                  />
                </>
              ))}
            </List>
          </Card>
        ) : null}

        {tooEarlyToRequestMedication.length > 0 ? (
          <Card>
            <Heading>Not ready yet</Heading>
            <Text>
              We think you still have enough left. You can still request these,
              but your GP may not prescribe them if it’s too early.
            </Text>
            <List>
              {tooEarlyToRequestMedication.map((medication) => (
                <>
                  <Divider extendRight={true} />
                  <Checkbox
                    key={`too_early_to_request_${medication.id}`}
                    checked={tempRequest.medicationIds.includes(medication.id)}
                    onChange={() => {
                      if (tempRequest.medicationIds.includes(medication.id)) {
                        dispatch(
                          setSelectedMedicationsForTempRequest(
                            tempRequest.medicationIds.filter(
                              (id) => id !== medication.id
                            )
                          )
                        );
                      } else {
                        dispatch(
                          setSelectedMedicationsForTempRequest([
                            ...tempRequest.medicationIds,
                            medication.id,
                          ])
                        );
                      }
                    }}
                    labelComponent={
                      <MedicationListItem
                        medication={medication}
                        showIcon={false}
                        showStatusTag={true}
                        isCompact={true}
                      />
                    }
                  />
                </>
              ))}
            </List>
          </Card>
        ) : null}

        {nonRequestableMedication.length > 0 ? (
          <Card>
            <Heading>Recently requested</Heading>
            <List>
              <Divider extendRight={true} />
              {nonRequestableMedication.map((medication) => (
                <MedicationListItem
                  key={`ready_to_request_${medication.id}`}
                  medication={medication}
                  showStatusTag={true}
                />
              ))}
            </List>
          </Card>
        ) : null}
        <ToolBar>
          <Button
            isDisabled={tempRequest.medicationIds.length <= 0}
            fillType="full-width"
            onClick={() => history.push(`/request-prescription/select-address`)}
          >
            Confirm medication
          </Button>
        </ToolBar>
      </PageContents>
    </>
  );
}
