import React from "react";
import styled, { css } from "./styled";

const StyledInput = styled.select<{ hasLabel: boolean; isUnset: boolean }>`
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzg3OUFBQyIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCI+PHBhdGggZD0iTTE2LjU5IDguNTlMMTIgMTMuMTcgNy40MSA4LjU5IDYgMTBsNiA2IDYtNnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+"),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 1.5em auto, 100%;

  border: 2px solid ${(p) => p.theme.colors.gray20};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  padding: ${(p) => p.theme.space[2]};
  font-size: ${(p) => p.theme.fontSizes[2]};
  font-family: ${(p) => p.theme.fonts.body};
  color: ${(p) => (p.isUnset ? p.theme.colors.gray40 : p.theme.colors.gray90)};
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: ${(p) => p.theme.colors.gray40};
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.blue60};
  }

  ${(p) => {
    if (p.hasLabel) {
      return css`
        padding-top: ${(p) => p.theme.space[5]};
      `;
    }
  }}
`;

const Label = styled.label`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: ${(p) => p.theme.fontSizes[1]};
  color: ${(p) => p.theme.colors.gray70};
  padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[2]} 0;
  cursor: pointer;

  ${StyledInput}:focus + & {
    color: ${(p) => p.theme.colors.blue70};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

interface TextInputProps {
  children: React.ReactNode;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectInput(props: TextInputProps) {
  return (
    <Wrapper>
      <StyledInput
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        hasLabel={Boolean(props.label)}
        isUnset={!Boolean(props.value)}
        {...props}
      />
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
    </Wrapper>
  );
}
