import styled from "./styled";

export const List = styled.div<{ gap?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => (p.gap ? p.theme.space[p.gap] : 0)};
`;
