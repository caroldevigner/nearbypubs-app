import React from "react";
import { View } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";

import Home from "../screens/Home";
import PubDetail from "../screens/PubDetail";

import HomeStack from "./HomeStack";

import { useApp } from "../contexts/AppContext";

const Stack = createNativeStackNavigator();

function AppNavigation() {
    const tw = useTailwind();

    return (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: tw("bg-neutral-900") }}>
              <Stack.Screen component={Home} name="Home"/>
              <Stack.Screen component={PubDetail} name="PubDetail" options={{headerShown: true}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default AppNavigation;
