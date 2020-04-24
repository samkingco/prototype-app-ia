import React from "react";
import styled from "./styled";
import { Radio } from "./Radio";
import { Checkbox } from "./Checkbox";

export const InputGroupWrapper = styled.div`
  overflow: hidden;
  border-radius: ${(p) => p.theme.misc.borderRadius};
  border: 2px solid ${(p) => p.theme.colors.gray20};
`;

const InputWrapper = styled.div<{ isChecked: boolean }>`
  padding: ${(p) => p.theme.space[3]};
  background-color: ${(p) =>
    p.isChecked ? p.theme.colors.blue10 : p.theme.colors.white};
  & + & {
    border-top: 1px solid ${(p) => p.theme.colors.gray10};
  }
`;

interface InputGroupItem {
  key: string;
  name: string;
  labelText?: string;
  labelComponent?: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}

interface InputGroupProps {
  selectionMode: "single" | "multi";
  items: InputGroupItem[];
}

export function InputGroup(props: InputGroupProps) {
  return (
    <InputGroupWrapper>
      {props.items.map((i) => (
        <InputWrapper key={i.key} isChecked={i.checked}>
          {props.selectionMode === "single" && (
            <Radio isCompact={true} {...i} />
          )}
          {props.selectionMode === "multi" && (
            <Checkbox isCompact={true} {...i} />
          )}
        </InputWrapper>
      ))}
    </InputGroupWrapper>
  );
}
