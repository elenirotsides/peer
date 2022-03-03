import { Rating as PeerRatingType } from "peer-types";

// TODO: export database types to own package
// so that they do not need to be managed twice
export interface Rating extends PeerRatingType {
	// index signature: below defines what Rating types can be
	// indexed by (indexing looks like: ex. myRating[braille])
	[index: string]: string | number | null | Date | undefined;
}
