import styled from "./styled";

export const ListItemBadge = styled.div`
  background: ${(p) => p.theme.colors.purple60};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.fontSizes[0]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: ${(p) => p.theme.space[5]};
  transition: background-color 250ms ease-in-out;
`;
