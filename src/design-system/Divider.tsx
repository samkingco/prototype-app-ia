import { styled } from "./styled";

export const Divider = styled.div<{
  mt?: number;
  mb?: number;
  extendRight?: boolean;
}>`
  height: 1px;
  background: ${(p) => p.theme.colors.gray10};
  margin-top: ${(p) => (p.mt ? p.theme.space[p.mt] : 0)};
  margin-bottom: ${(p) => (p.mb ? p.theme.space[p.mb] : 0)};
  margin-right ${(p) => (p.extendRight ? `-${p.theme.space[4]}` : 0)};
`;
