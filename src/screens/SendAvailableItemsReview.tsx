import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../design-system/List";
import { requestSelectors } from "../store/requests/selectors";
import { MedicationListItem } from "../components/MedicationListItem";
import { medicationSelectors } from "../store/medications/selectors";
import {
  FlowNavigationBar,
  FlowNavigationBarBackAction,
} from "../components/FlowNavigationBar";
import { FlowLayout } from "../components/FlowLayout";
import { PageTitle } from "../components/PageTitle";
import { Request } from "../store/requests/fake-data";
import { Tag } from "../design-system/Tag";
import { Divider } from "../design-system/Divider";
import { sendAvailableItems } from "../store/requests/slice";

interface Params {
  requestId: string;
}

export function SendAvailableItemsReview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const requests = useSelector(requestSelectors.unpreparedRequests);
  const allStockStatuses: Request["medicationStockStatus"] = requests.reduce(
    (statuses, request) => ({
      ...statuses,
      ...request.medicationStockStatus,
    }),
    {}
  );

  const outOfStockMedicationIds = Object.keys(allStockStatuses).reduce(
    (ids: string[], id) => {
      if (allStockStatuses[id] === "out_of_stock") {
        return [...ids, id];
      }
      return ids;
    },
    []
  );

  const inStockMedicationIds = Object.keys(allStockStatuses).reduce(
    (ids: string[], id) => {
      if (allStockStatuses[id] === "in_stock") {
        return [...ids, id];
      }
      return ids;
    },
    []
  );

  const outOfStockMedication = useSelector((s) =>
    medicationSelectors.byIds(s, outOfStockMedicationIds)
  );

  const inStockMedication = useSelector((s) =>
    medicationSelectors.byIds(s, inStockMedicationIds)
  );

  return (
    <>
      <FlowNavigationBar
        title=" "
        leftAction={<FlowNavigationBarBackAction />}
      />
      <PageContents>
        <PageTitle title="" />
        <FlowLayout
          main={
            <>
              <Card>
                <Heading>
                  Should we send your available medication as soon as possible?
                </Heading>
                <Text>
                  If we send your available medication now, you won’t be able
                  collect the rest from a different pharmacy.
                </Text>
                <Divider />
                <List>
                  {outOfStockMedication.map((medication) => (
                    <MedicationListItem
                      key={`med_${medication.id}`}
                      medication={medication}
                      additionalContent={
                        <div>
                          <Tag variant="error">Currently unavailable</Tag>
                        </div>
                      }
                    />
                  ))}
                  {inStockMedication.map((medication) => (
                    <MedicationListItem
                      key={`med_${medication.id}`}
                      medication={medication}
                      additionalContent={
                        <div>
                          <Tag variant="success">Available</Tag>
                        </div>
                      }
                    />
                  ))}
                </List>
                <Divider />
                <List gap={1}>
                  <Text isBold={true}>Need your medication urgently?</Text>
                  <Text>
                    Ask us to return your prescription to the NHS system so you
                    can collect it at a different pharmacy.
                  </Text>
                </List>
              </Card>

              <Card>
                <List gap={1}>
                  <Text isBold={true}>Can’t see all your medication?</Text>
                  <Text>
                    We might still be waiting for a prescription from your GP,
                    or our pharmacists may have already checked and prepared
                    your prescription.
                  </Text>
                </List>
              </Card>
            </>
          }
          aside={
            <Card>
              <Button
                fillType="full-width"
                onClick={() => {
                  dispatch(sendAvailableItems());
                  history.push("/request-partial/success");
                }}
              >
                Send available items
              </Button>
            </Card>
          }
        />
      </PageContents>
    </>
  );
}
