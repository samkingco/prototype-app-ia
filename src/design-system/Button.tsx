import React from "react";
import { styled } from "./styled";
import theme from "./theme";
import { IconProps, Icon } from "./Icon";

type ButtonVariants = "primary" | "secondary" | "gray" | "disabled";
type ButtonFill = "min-content" | "full-width";

const buttonColorMap: {
  [key in ButtonVariants]: {
    background: string;
    backgroundHover: string;
    color: string;
  };
} = {
  primary: {
    background: theme.colors.green40,
    backgroundHover: theme.colors.green30,
    color: theme.colors.green90,
  },
  secondary: {
    background: theme.colors.purple10,
    backgroundHover: theme.colors.purple20,
    color: theme.colors.purple70,
  },
  gray: {
    background: theme.colors.gray10,
    backgroundHover: theme.colors.gray10,
    color: theme.colors.gray70,
  },
  disabled: {
    background: theme.colors.gray20,
    backgroundHover: theme.colors.gray20,
    color: theme.colors.gray70,
  },
};

const ButtonContents = styled.span<{ hasIcon: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.hasIcon ? "max-content 1fr" : "1fr")};
  grid-gap: ${(p) => p.theme.space[2]};
`;

export const StyledButton = styled.button<{
  variant: ButtonVariants;
  fillType: ButtonFill;
}>`
  display: inline-block;
  width: ${(p) => (p.fillType === "min-content" ? "max-content" : "100%")};
  border: none;
  padding: ${(p) => `${p.theme.space[3]} ${p.theme.space[4]}`};
  margin: 0;
  text-decoration: none;
  background: ${(p) => buttonColorMap[p.variant].background};
  color: ${(p) => buttonColorMap[p.variant].color};
  font-family: ${(p) => p.theme.fonts.body};
  font-size: ${(p) => p.theme.fontSizes[2]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  line-height: 1.5;
  vertical-align: middle;
  border-radius: ${(p) => p.theme.misc.borderRadius};
  cursor: ${(p) => (p.variant === "disabled" ? "default" : "pointer")};
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;

  &:hover {
    background: ${(p) => buttonColorMap[p.variant].backgroundHover};
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariants;
  fillType?: ButtonFill;
  onClick?: () => void;
  isDisabled?: boolean;
  iconText?: string;
  iconColor?: IconProps["color"];
}

export function Button({
  variant = "primary",
  fillType = "full-width",
  isDisabled = false,
  iconText,
  iconColor,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={isDisabled && variant !== "gray" ? "disabled" : variant}
      disabled={isDisabled}
      fillType={fillType}
      {...props}
    >
      <ButtonContents hasIcon={Boolean(iconText)}>
        {iconText && <Icon color={iconColor}>{iconText}</Icon>}
        {props.children}
      </ButtonContents>
    </StyledButton>
  );
}
