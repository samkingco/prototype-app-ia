import React from "react";
import { styled } from "./styled";
import { Icon } from "./Icon";
import { Text } from "./Text";

export interface CheckboxInputProps {
  labelText?: string;
  labelComponent?: React.ReactNode;
}

interface LabelProps {
  isDisabled: boolean;
  hasLabel: boolean;
}

const Label = styled("label")<LabelProps>`
  position: relative;
  display: grid;
  grid-template-columns: ${(p) =>
    p.hasLabel ? "min-content 1fr" : "min-content"};
  grid-gap: ${(p) => p.theme.space[2]};
  align-items: center;
  cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};
  padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[3]};
  margin: 0 -${(p) => p.theme.space[3]};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  transition: background-color 250ms ease;

  &:hover {
    background-color: ${(p) => p.theme.colors.blue10};
  }
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: ${(p) => p.theme.space[1]} 0;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const Tick = styled(Icon)`
  font-size: 20px;
`;

const FakeInput = styled.span`
  width: ${(p) => p.theme.space[4]};
  height: ${(p) => p.theme.space[4]};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(p) => p.theme.misc.borderRadius};
  box-shadow: inset 0 0 0 2px ${(p) => p.theme.colors.gray20};
  color: ${(p) => p.theme.colors.white};
  background-color: ${(p) => p.theme.colors.white};

  ${Tick} {
    display: none;
  }

  ${Input}:checked + & {
    background: ${(p) => p.theme.colors.blue60};
    box-shadow: none;
  }

  ${Input}:checked + & ${Tick} {
    display: block;
  }

  ${Input}:disabled + & {
    background: ${(p) => p.theme.colors.gray20};
  }

  ${Input}:disabled:checked + & {
    color: ${(p) => p.theme.colors.gray40};
  }
`;

export type CheckboxProps = CheckboxInputProps &
  Partial<React.HTMLProps<HTMLInputElement>>;

export const Checkbox = ({
  labelText,
  labelComponent,
  ref,
  as,
  type,
  className,
  ...inputProps
}: CheckboxProps) => {
  return (
    <Label
      as={labelComponent || labelText ? "label" : "div"}
      isDisabled={!!inputProps.disabled}
      hasLabel={Boolean(labelComponent || labelText)}
      className={className}
    >
      <Input type="checkbox" {...inputProps} />
      <FakeInput>
        <Tick>done</Tick>
      </FakeInput>
      {labelComponent}
      {labelText && <Text>{labelText}</Text>}
    </Label>
  );
};
