import {Icon, Text} from "@rneui/themed";
import {TouchableOpacity, View} from "react-native";
import React from "react";
import {useTailwind} from "tailwind-rn";

export default function HeaderSetLocation({}) {
    const tw = useTailwind();

    return(
        <View style={tw("my-2 py-2")}>
            <Text style={tw("text-base uppercase")}>Your location</Text>
            <TouchableOpacity
                style={{ marginBottom: 10 }}
            >
                <View style={tw("flex-row items-center rounded-full bg-neutral-800 pr-4 my-2")}>
                    <Icon
                        reverse
                        name='map-marker'
                        type='material-community'
                        color={tw("text-emerald-700").color}
                    />
                    <Text h4 style={tw("grow")}>Select your address here</Text>
                    <Icon
                        name='chevron-down'
                        type='material-community'
                        color={tw("text-amber-50").color}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}