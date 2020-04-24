import React from "react";
import { styled } from "./styled";
import { Text } from "./Text";

interface LabelProps {
  isDisabled: boolean;
  hasLabel: boolean;
  isCompact: boolean;
}

const Label = styled("label")<LabelProps>`
  position: relative;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: ${(p) => p.theme.space[3]};
  align-items: center;
  cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};
  padding: ${(p) =>
    p.isCompact ? 0 : `${p.theme.space[3]} ${p.theme.space[4]}`};
  margin: 0 -${(p) => (p.isCompact ? 0 : p.theme.space[4])};
  border-radius: ${(p) => p.theme.misc.borderRadius};
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const FakeInput = styled.span`
  width: ${(p) => p.theme.space[5]};
  height: ${(p) => p.theme.space[5]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px ${(p) => p.theme.colors.gray20};
  background-color: ${(p) => p.theme.colors.white};

  &::after {
    content: "";
    display: block;
    width: ${(p) => p.theme.space[2]};
    height: ${(p) => p.theme.space[2]};
    border-radius: 50%;
  }

  ${Input}:checked + & {
    background: ${(p) => p.theme.colors.blue60};
    box-shadow: none;

    &::after {
      background: ${(p) => p.theme.colors.white};
    }
  }

  ${Input}:disabled + & {
    background: ${(p) => p.theme.colors.gray20};
  }

  ${Input}:disabled:checked + & {
    &::after {
      background: ${(p) => p.theme.colors.gray40};
    }
  }
`;

export type RadioInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "label"
> & {
  labelText?: string;
  labelComponent?: React.ReactNode;
  isCompact?: boolean;
};

export const Radio = ({
  labelText,
  labelComponent,
  isCompact,
  ref,
  className,
  as,
  ...inputProps
}: RadioInputProps) => (
  <Label
    as={labelComponent || labelText ? "label" : "div"}
    isDisabled={!!inputProps.disabled}
    hasLabel={Boolean(labelComponent || labelText)}
    className={className}
    isCompact={Boolean(isCompact)}
  >
    <Input type="radio" {...inputProps} />
    <FakeInput />
    {labelComponent}
    {labelText && <Text>{labelText}</Text>}
  </Label>
);
