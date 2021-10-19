import React from "react";
import { View, StyleSheet, Text, LogBox } from "react-native";
import type { StyleProp } from "react-native";
import { Box } from "./Box";
import placeTypes from "../util/placeTypes";
import SelectMultiple from "react-native-select-multiple";
import { TEXT_COLOR } from "../util/colors";

// TODO: revise select multiple package to meet new React standards
LogBox.ignoreLogs(["Warning: componentWillReceiveProps has been renamed,"]);
interface FilterListItemProps {
	label: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style: StyleProp<object>;
}

const FilterListItem: React.FC<FilterListItemProps> = React.memo(
	({ label }: FilterListItemProps) => {
		const accessibilityHint = `Filter out ${label}s`;
		return (
			<View
				style={styles.flitem}
				accessibilityLabel={label}
				accessibilityHint={accessibilityHint}
			>
				<Text
					style={
						label.length < 20
							? { fontSize: 20, ...styles.text }
							: { fontSize: 16, ...styles.text }
					}
					accessibilityLabel={label}
					accessibilityHint={accessibilityHint}
				>
					{label}
				</Text>
			</View>
		);
	}
);
FilterListItem.displayName = "FilterListItem";
export interface FilterBoxProps {
	selectedFilters: Array<string>;
	setSelectedFilters: React.Dispatch<React.SetStateAction<Array<string>>>;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

const FilterBox: React.FC<FilterBoxProps> = ({
	selectedFilters,
	setSelectedFilters,
	style,
}: FilterBoxProps) => {
	const onSelectionsChange = (selectedFilters: Array<{ label: string; value: string }>) => {
		const filterArray = selectedFilters.map(filterObj => filterObj.label);
		setSelectedFilters(filterArray);
	};

	//eslint-disable-next-line @typescript-eslint/ban-types
	const renderLabel = (label: string, style: StyleProp<object>) => {
		return <FilterListItem label={label} style={style} />;
	};

	return (
		<Box
			accessibilityLabel="A vertical list of filters"
			accessibilityHint="A vertical list of checkboxes which allow you to select filters"
			style={StyleSheet.compose(styles.container, style)}
		>
			<SelectMultiple
				items={placeTypes}
				selectedItems={selectedFilters}
				onSelectionsChange={onSelectionsChange}
				renderLabel={renderLabel}
			/>
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 275,
		borderColor: TEXT_COLOR,
		borderTopWidth: 3,
		borderLeftWidth: 3,
		borderRightWidth: 3,
	},
	text: {
		color: TEXT_COLOR,
		fontWeight: "bold",
	},
	flitem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
	},
});

export default FilterBox;
