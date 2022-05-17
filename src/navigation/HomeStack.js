import React from "react";

import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import PubDetail from "../screens/PubDetail";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={PubDetail} name="PubDetail"/>
      </Stack.Navigator>
    </View>
  );
}

export default HomeStack;
