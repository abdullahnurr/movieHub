import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Loading = () => (
  <LoadingContainer>
    <StyledActivityIndicator size="large" color="#e91e63" />
  </LoadingContainer>
);
