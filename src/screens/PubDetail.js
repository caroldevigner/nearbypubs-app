import React, { useEffect } from "react";

import {
    View,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Text } from "@rneui/themed";

import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useApp } from "../contexts/AppContext";

const PubDetail = () => {
    const tw = useTailwind();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("")}>
                <View style={tw("flex-1")}>
                    <Text>Olá</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default PubDetail;
