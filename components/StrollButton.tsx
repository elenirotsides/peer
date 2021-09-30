import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DISABLED_COLOR } from "../util/colors";

import * as Peer from "./Peer/lib";

const onPressStartStrolling = (): void => {
	//TODO: change state to strolling
};

const StrollButton = (): JSX.Element => {
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);

	return (
		<View style={styles.buttonGroup}>
			<Peer.Button
				style={styles.strollBtn}
				onPress={onPressStartStrolling}
				accessibilityLabel="Take a stroll"
				text="Take a stroll"
			/>
			<Peer.Button
				style={styles.filterBtn}
				onPress={() => {
					setIsShowingFilters(!isShowingFilters);
				}}
				accessibilityLabel="Show filters"
				image="chevron"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonGroup: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		bottom: 75,
	},
	filterBtn: {
		borderLeftWidth: StyleSheet.hairlineWidth,
		borderLeftColor: DISABLED_COLOR,
		height: "100%",
	},
	strollBtn: {
		height: "100%",
	},
});

export default StrollButton;