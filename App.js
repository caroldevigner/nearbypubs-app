import React from "react";
import { useColorScheme } from "react-native";

import { TailwindProvider, useTailwind } from "tailwind-rn";
import { ThemeProvider } from "@rneui/themed";
import { BackdropProvider } from "react-native-propel-kit";
import { AppearanceProvider } from "react-native-appearance";
import utilities from "./tailwind.json";

import { AppProvider } from "./src/contexts/AppContext";
import AppNavigation from "./src/navigation/AppNavigation";
import createRNEUITheme from "./rneui.config.js";
import extraStyles from "./src/styles/extra-styles.json";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <BackdropProvider>
      <AppearanceProvider>
        <TailwindProvider
          utilities={{ ...utilities, ...extraStyles }}
          colorScheme={colorScheme}
        >
          <RNEUIProvider>
            <AppProvider>
              <AppNavigation />
            </AppProvider>
          </RNEUIProvider>
        </TailwindProvider>
      </AppearanceProvider>
    </BackdropProvider>
  );
}

const RNEUIProvider = ({ children }) => {
  const tw = useTailwind();
  const rneuiTheme = createRNEUITheme(tw);

  return <ThemeProvider theme={rneuiTheme}>{children}</ThemeProvider>;
};
