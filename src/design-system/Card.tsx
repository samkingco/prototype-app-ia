import styled from "./styled";

export const Card = styled.div<{ onlyHasList?: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[3]};
  padding: ${(p) =>
    p.onlyHasList
      ? `${p.theme.space[3]} ${p.theme.space[5]}`
      : p.theme.space[5]};
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  box-shadow: ${(p) => p.theme.misc.cardShadow};
`;
