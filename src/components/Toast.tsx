import React, { useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const ToastContainer = styled(Animated.View)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl}px;
  left: ${({ theme }) => theme.spacing.lg}px;
  right: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ type }) =>
    type === "error" ? "#ff4444" : type === "success" ? "#00C851" : "#33b5e5"};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  flex-direction: row;
  align-items: center;
  elevation: 3;
`;

const ToastText = styled.Text`
  color: white;
  font-size: 14px;
  flex: 1;
`;

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  duration?: number;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onHide,
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  return (
    <ToastContainer as={Animated.View} style={{ opacity }} type={type}>
      <ToastText>{message}</ToastText>
    </ToastContainer>
  );
};
