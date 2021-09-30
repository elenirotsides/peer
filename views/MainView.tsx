import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<MapView style={styles.map} />
			<StrollButton/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default MainView;
