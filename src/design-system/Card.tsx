import styled, { css } from "./styled";

export const Card = styled.div<{
  hasListItemAtStart?: boolean;
  hasListItemAtEnd?: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[4]};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.08), 0 -1px 0 0 rgba(0, 0, 0, 0.08);
  ${(p) => {
    const paddingTop = p.hasListItemAtStart
      ? p.theme.space[1]
      : p.theme.space[4];
    const paddingBottom = p.hasListItemAtEnd
      ? p.theme.space[1]
      : p.theme.space[4];
    return css`
      padding: ${paddingTop} ${p.theme.space[4]} ${paddingBottom};
    `;
  }}
`;
