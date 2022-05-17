import React, {useCallback } from "react";

import {
	View,
	TouchableOpacity,
	StatusBar,
	ScrollView,
} from "react-native";

import { Button, Text, Icon, Card, Badge } from "@rneui/themed";

import { useTailwind } from "tailwind-rn";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useApp } from "../contexts/AppContext";
import { gql, useQuery } from "../contexts/ApiContext";
import PubListItem from "../components/PubListItem";
import AnimatedView, {AnimationTypes} from "../components/AnimatedView";
import HeaderSetLocation from "../components/HeaderSetLocation";

const GetPubs = gql`
  query Pubs {
	pubs(where: {nearBy: {lat: -25.4272349, lng: -49.2476772}}) {
		nodes {
			id
			name
			distanceMeters
			category {
				name
			}
			coverImage {
				url
			}
			lat
			lng
			openingTime {
				monday
				tuesday
				wednesday
				thursday
				friday
				saturday
				sunday
			}
		}
	}
}
`;


const Home = () => {
  	const tw = useTailwind();
  	const navigation = useNavigation();
	const { userLocation } = useApp();
	const { data, refetch } = useQuery(GetPubs);

	const pubsList = data?.pubs?.nodes;
	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [])
	);

	return (
	  <SafeAreaView style={tw("flex-1")}>
		  <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
		  <ScrollView contentContainerStyle={tw("px-3")}>
			  <HeaderSetLocation/>
			  <View style={tw("flex-1 flex-row items-center")}>
				  <Text h1 style={tw("flex-1 pt-4")}>Próximos a você</Text>
				  <Button title="Filter"
						  titleStyle={tw("text-amber-500 text-xl")}
						  type="clear"
						  icon={{
							  name: 'tune',
							  type: 'material-community',
							  color: tw("text-amber-500").color
						  }}
				  />
			  </View>

			  {pubsList?.map((pub, index) => (
				  <AnimatedView
					  key={index}
					  animation={AnimationTypes.in.fadeInRight}
					  delay={index * 120 + 300}
				  >
					  <PubListItem
						  pub={pub}
						  onPress={() => navigation.navigate("PubDetail")}
					  />
				  </AnimatedView>
			  ))}

		  </ScrollView>
	  </SafeAreaView>
  );
};
export default Home;

