import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { format, parse } from "date-fns";
import { Button } from "../design-system/Button";
import { TextInput } from "../design-system/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setupPatient } from "../store/account/slice";
import { accountSelectors } from "../store/account/selectors";
import { MaskedInput } from "../design-system/MaskedInput";
import { SelectInput } from "../design-system/SelectInput";
import { PatientGender } from "../store/account/fake-data";
import { Heading } from "../design-system/Heading";
import { InterstitialPage } from "../components/InterstitialPage";
import { ToolBar } from "../components/ToolBar";

export function ProtoSetup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(accountSelectors.activePatient);

  const [localDOB, setLocalDOB] = useState(
    patient.dateOfBirth ? format(patient.dateOfBirth, "dd/MM/yyyy") : ""
  );

  const genderOptions: { label: string; value: PatientGender }[] = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
    { label: "Non-binary/third gender", value: "Non-binary" },
    { label: "Prefer not to say", value: "None" },
  ];

  const [localGender, setLocalGender] = useState(`${patient.gender || ""}`);

  const onSave = () => {
    dispatch(
      setupPatient({
        dateOfBirth: parse(localDOB, "dd/MM/yyyy", new Date()).getTime(),
        gender: localGender as PatientGender,
      })
    );
  };

  return (
    <>
      <InterstitialPage>
        <Heading size={4}>Prototype setup</Heading>
        <Text>
          This information is just for the prototype. Feel free to use fake
          information if you're not comfortable sharing. It will only be saved
          on your device.
        </Text>
        <List gap={3}>
          <TextInput
            name="first-name"
            label="First name"
            placeholder={`e.g. "Alex"`}
            value={patient.firstName}
            onChange={(e) =>
              dispatch(setupPatient({ firstName: e.target.value }))
            }
          />
          <TextInput
            name="last-name"
            label="Last name"
            placeholder={`e.g. "Smith"`}
            value={patient.lastName}
            onChange={(e) =>
              dispatch(setupPatient({ lastName: e.target.value }))
            }
          />
          <MaskedInput
            name="date-of-birth"
            label="Date of birth"
            placeholder="DD/MM/YYYY"
            placeholderChar="-"
            value={localDOB}
            mask="11/11/1111"
            onChange={(e) => {
              setLocalDOB(e.target.value);
            }}
          />
          <SelectInput
            name="gender"
            label="Gender"
            placeholder={`e.g. "King"`}
            value={localGender}
            onChange={(e) => {
              setLocalGender(e.target.value);
            }}
          >
            <option value="" disabled={true} hidden={true}>
              Choose an option
            </option>
            {genderOptions.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </SelectInput>
        </List>
      </InterstitialPage>
      <ToolBar>
        <Button
          fillType="full-width"
          onClick={() => {
            onSave();
            history.replace("/medication");
          }}
        >
          Start the prototype
        </Button>
      </ToolBar>
    </>
  );
}
