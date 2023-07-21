import React, { useEffect, useState, useContext } from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { FreestylerProvider } from "./src/context";
import Routes from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}


export default function App() {
  return (
    <SafeAreaProvider>
     <NativeBaseProvider>
        <StatusBar backgroundColor="#1e293b" style="light"  />
        <FreestylerProvider>
          <Routes />
        </FreestylerProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
   
  );
}
