import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import {
	S_CANCEL,
	getIncrementRatingButtonLabel,
	PLACE_ATTRIBUTES,
	S_SUBMIT,
} from "../util/strings";
import Screen from "../util/screens";
import { Rating } from "../util/ratingTypes";
import axios from "axios";
import { Place as GooglePlace } from "@googlemaps/google-maps-services-js";
import { SERVER_BASE_URL } from "../util/env";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
	setPage: (screen: Screen) => void;
	previousRating?: Rating | null;
}

export const DEFAULT_INTERIM_RATING = 3;
const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

// key is name of attribute as we would like it rendered
// value is name of field in the Rating type
const attributesMap: Record<string, string> = {
	"Navigability": "navigability",
	"Sensory Aids": "braille", // TODO: change braille to sensory aids
	"Staff Helpfulness": "staffHelpfulness",
	"Guide Dog Friendliness": "guideDogFriendly",
};

const submitRating = async (request_body: {
	userID: string;
	token: string;
	placeID: GooglePlace["place_id"];
	guideDogFriendly: number | null;
	isMenuAccessible: 0 | 1 | null;
	noiseLevel: number | null;
	isStaffHelpful: 0 | 1 | null;
	lighting: number | null;
	isBathroomOnEntranceFloor: 0 | 1 | null;
	isContactlessPaymentOffered: 0 | 1 | null;
	isStairsRequired: 0 | 1 | null;
	spacing: number | null;
}) => {
	await axios.post(`${SERVER_BASE_URL}/addRatingToPlace`, request_body);
};

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
	setPage,
	previousRating,
}: SubmitRatingScreenProps) => {
	const [counter, setCounter] = useState(
		PLACE_ATTRIBUTES.reduce<{ [attribute: string]: number }>(function (countersMap, attribute) {
			if (previousRating) {
				// a little dirty, but we know that it will be a number
				// as all of the keys of attributesMap are the names
				// of the number
				countersMap[attribute] =
					(previousRating[attributesMap[attribute]] as number) ?? DEFAULT_INTERIM_RATING;
			}
			return countersMap;
		}, {})
	);

	return (
		<ScrollView>
			<PlaceImage photoref={photo_reference} placeName={placeName} />
			<Text>{placeName}</Text>
			<Button
				text={S_CANCEL}
				accessibilityLabel={S_CANCEL}
				onPress={() => {
					setPage(Screen.Details);
				}}
			/>
			{PLACE_ATTRIBUTES.map((attribute, index) => {
				const count = counter[attribute];

				return (
					<View key={`rating${index}`}>
						<Button
							iconName={"minus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								true,
								count,
								attribute,
								placeName
							)}
							onPress={() => {
								if (count === MIN_COUNT) {
									return;
								}
								setCounter({
									...counter,
									[attribute]: count - INCREMENT_VAL,
								});
							}}
						/>
						<Text>{attribute}</Text>
						<Text>{count}</Text>
						<Button
							iconName={"plus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								false,
								count,
								attribute,
								placeName
							)}
							onPress={() => {
								if (count === MAX_COUNT) {
									return;
								}
								setCounter({
									...counter,
									[attribute]: count + INCREMENT_VAL,
								});
							}}
						/>
					</View>
				);
			})}
			<Button
				text={S_SUBMIT}
				accessibilityLabel={S_SUBMIT}
				onPress={() => {
					const ratingToSubmit = {
						...counter,
					};
				}}
			/>
		</ScrollView>
	);
};

export default SubmitRatingScreen;
