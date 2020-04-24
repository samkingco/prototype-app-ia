import * as React from "react";
import styled, { css } from "./styled";

type FontFamily = "body" | "mono" | "display";

type TextColor =
  | "inherit"
  | "gray90"
  | "gray70"
  | "gray30"
  | "blue70"
  | "green70"
  | "orange70"
  | "red70"
  | "white";

interface StyledTextProps {
  color: TextColor;
  fontFamily: FontFamily;
  isInline: boolean;
  isBold: boolean;
  size: number;
}

const StyledText = styled("span")<StyledTextProps>`
  display: block;
  line-height: 1.5em;
  font-family: ${(p) => p.theme.fonts[p.fontFamily]};
  font-size: ${(p) => p.theme.fontSizes[p.size]};
  display: ${(p) => (p.isInline ? "inline-block" : "block")};
  font-weight: ${(p) =>
    p.isBold ? p.theme.fontWeights.bold : p.theme.fontWeights.normal};
  ${(p) =>
    p.color !== "inherit" &&
    css`
      color: ${p.theme.colors[p.color]};
    `};
`;

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ReactType | keyof JSX.IntrinsicElements;
  color?: TextColor;
  fontFamily?: FontFamily;
  isInline?: boolean;
  isBold?: boolean;
  size?: 0 | 1 | 2;
}

export const Text = ({
  children,
  className,
  as = "span",
  color = "inherit",
  fontFamily = "body",
  isInline = false,
  isBold = false,
  size = 2,
}: TextProps) => {
  return (
    <StyledText
      className={className}
      as={as}
      color={color}
      fontFamily={fontFamily}
      isInline={isInline}
      isBold={isBold}
      size={size}
    >
      {children}
    </StyledText>
  );
};
