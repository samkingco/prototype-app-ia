import { styled, css } from "./styled";
import { Text } from "./Text";

export type TagVariant = "default" | "success" | "warning" | "error";

export interface TagProps {
  variant?: TagVariant;
}

export const Tag = styled(Text)<TagProps>`
  display: inline-block;
  font-size: ${(p) => p.theme.fontSizes[0]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  padding: ${(p) =>
    `calc(${p.theme.space[0]} - 1px) calc(${p.theme.space[1]} - 1px)`};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  border: 2px solid ${(p) => p.theme.colors.white};

  ${(p) => {
    if (p.variant === "success") {
      return css`
        background: ${p.theme.colors.green10};
        color: ${p.theme.colors.green70};
      `;
    }

    if (p.variant === "warning") {
      return css`
        background: ${p.theme.colors.orange10};
        color: ${p.theme.colors.orange70};
      `;
    }

    if (p.variant === "error") {
      return css`
        background: ${p.theme.colors.red10};
        color: ${p.theme.colors.red70};
      `;
    }

    return css`
      background: ${p.theme.colors.gray10};
      color: ${p.theme.colors.gray70};
    `;
  }};
`;
