import styled from "styled-components/native";
import { FlatList } from "react-native";

export const StyledList = styled(FlatList)`
  background-color: ${({ theme }) => theme.colors.background};
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
`;
