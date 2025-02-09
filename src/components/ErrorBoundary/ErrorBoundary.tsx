import React, { useState, useCallback } from "react";
import styled from "styled-components/native";

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ErrorMessage = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const RetryText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  font-weight: bold;
`;

interface Props {
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    console.error("Error caught by boundary:", error);
    setError(error);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  if (error) {
    return (
      <ErrorContainer>
        <ErrorTitle>Hata! Bir şeyler ters gitti</ErrorTitle>
        <ErrorMessage>
          {error.message || "Beklenmeyen bir hata oluştu"}
        </ErrorMessage>
        <RetryButton onPress={handleRetry}>
          <RetryText>Tekrar Dene</RetryText>
        </RetryButton>
      </ErrorContainer>
    );
  }

  try {
    return <>{children}</>;
  } catch (err) {
    handleError(err as Error);
    return null;
  }
};
