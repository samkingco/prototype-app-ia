import { styled } from "./styled";

export const PageContents = styled.div<{ maxWidth?: number }>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[4]};
  padding-top: ${(p) => p.theme.space[4]};
  padding-bottom: ${(p) => `calc(${p.theme.space[6]} * 4)`};
  max-width: ${(p) =>
    `calc(${p.maxWidth || "800"}px + ${p.theme.space[4]} * 2)`};
  margin: 0 auto;
`;
