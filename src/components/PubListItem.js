import {TouchableOpacity, View} from "react-native";
import {Badge, Card, Icon, Text} from "@rneui/themed";
import React from "react";
import {useTailwind} from "tailwind-rn";

export default function PubListItem({pub, onPress}){
    const tw = useTailwind();
    const uri = pub.coverImage?.url;

    return(
        <Card>
            <TouchableOpacity
                style={{ marginBottom: 10 }}
                onPress={onPress}
            >
                {uri && (
                    <Card.Image
                        style={tw("h-52 p-0 flex-none flex-col justify-end")}
                        source={{uri}}
                    >
                        <View style={tw("self-start flex-none flex-row items-center bg-emerald-700/80 blur-sm rounded-full px-3 py-1 m-4")}>
                            <Icon
                                name='map-marker'
                                type='material-community'
                                color={tw("text-amber-50").color}
                                size={20}
                            />
                            <Text style={tw("flex-none pl-1 font-rcMedium")}>
                                {pub.distanceMeters} m
                            </Text>
                        </View>
                    </Card.Image>
                )}

                <View style={tw("p-4")}>
                    <Text>{pub.category?.name}</Text>
                    <Card.Title h2>{pub.name}</Card.Title>
                    <Card.FeaturedSubtitle><Badge status="success" containerStyle={tw("p-1")} /> Aberto agora, 16:00 - 22:00</Card.FeaturedSubtitle>
                </View>
            </TouchableOpacity>
        </Card>
    );
}