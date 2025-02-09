/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "./src/navigation/BottomTabNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { MoviesProvider } from "./src/context/MoviesContext";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme/theme";

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <MoviesProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <BottomTabNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </MoviesProvider>
    </ThemeProvider>
  );
}

export default App;
