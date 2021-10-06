import React, { useState } from "react";
import { StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { DISABLED_COLOR } from "../util/colors";
import { Box } from "./Box";
import CheckBox from "./CheckBox";

export interface FilterBoxProps {
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

const FilterBox : React.FC<FilterBoxProps> = ({ style }: FilterBoxProps) => {
	const categories = [
		//FIXME: use actual categories and not placeholders
		"Grocery stores",
		"Parks",
		"Museum",
	];
	const categoriesState = categories.map(category => {
		const [value, set] = useState<boolean>(false);
		return { name: category, value: value, set: set };
	});

	return (
		<Box
			accessibilityLabel="A vertical list of filters"
			accessibilityHint="A vertical list of checkboxes which allow you to select filters"
			style={StyleSheet.compose(styles.container, style)}
		>
			{categoriesState.map(({ name, value, set }, index: number) => {
				return (
					<CheckBox
						style={styles.checkBox}
						text={name}
						key={index}
						accessibilityLabel={`Filter out type ${name}`}
						value={value}
						onValueChange={() => {
							set(!value);
						}}
					/>
				);
			})}
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderBottomColor: DISABLED_COLOR,
		borderBottomWidth: 1,
	},
	checkBox: {
		margin: 5,
	},
});

export default FilterBox;
