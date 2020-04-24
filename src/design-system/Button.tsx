import React from "react";
import { styled } from "./styled";

type ButtonVariants = "primary" | "secondary";
type ButtonFill = "min-content" | "full-width";

export const StyledButton = styled.button<{
  variant: ButtonVariants;
  fillType: ButtonFill;
}>`
  display: inline-block;
  width: ${(p) => (p.fillType === "min-content" ? "max-content" : "100%")};
  border: none;
  padding: ${(p) => `${p.theme.space[3]} ${p.theme.space[3]}`};
  margin: 0;
  text-decoration: none;
  background: ${(p) =>
    p.variant === "secondary"
      ? p.theme.colors.purple10
      : p.theme.colors.green40};
  color: ${(p) =>
    p.variant === "secondary"
      ? p.theme.colors.purple70
      : p.theme.colors.green90};
  font-family: ${(p) => p.theme.fonts.body};
  font-size: ${(p) => p.theme.fontSizes[2]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;

  &:hover {
    background: ${(p) =>
      p.variant === "secondary"
        ? p.theme.colors.purple20
        : p.theme.colors.green30};
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariants;
  fillType?: ButtonFill;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  fillType = "min-content",
  ...props
}: ButtonProps) {
  return <StyledButton variant={variant} fillType={fillType} {...props} />;
}
