import axios from "axios";
import { Location } from "@prisma/client";
import { FormEventHandler, useCallback, useState } from "react";
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";
import { GeoencodedLocation } from "../../lib/types/geoencodedLocation";
import { locationFields, CrystalLocation } from "../../lib/types/location";
import { BField, BInput } from "../Atoms";
import { createLocation } from "../../lib/helpers/locationRequests";
import { BSelectOrCreateWithLookup } from "../Molecules/BSelectOrCreateWithLookup";

// Location fields need to work for a search dropdown with just a place name, and a full list for amends

type ChooseLocationFormProps = {
	id: string;
	label: string;
	placeholder: string;
	existingLocations: Location[];
	selectedLocation: string | null | undefined;
	onCreateLocation: (location: Location) => void;
  onSelectLocation: (placeName: Location) => void;
};

const ChooseLocationForm: React.FC<ChooseLocationFormProps> = (props) => {
	const lookUpLocations = useCallback(async (lookUp) => {
		const res = await axios.get(
			"https://api.opencagedata.com/geocode/v1/json",
			{
				params: {
					q: lookUp,
					key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
				},
			}
		);

		return res.data.results;
	}, []);

	const createLocationFromResult = useCallback(async (result: GeoencodedLocation) => {
		const locationInput = {
			placeName: result.formatted,
			city: result.components.city,
			country: result.components.country,
			county: result.components.county,
			lat: result.geometry.lat.toString(),
			long: result.geometry.lng.toString(),
		};

		const location = await createLocation(locationInput);
		if (location) {
      props.onCreateLocation(location);
      props.onSelectLocation(location);
    }
	}, []);

	return (
		<div className="mt-4">
			<BField label={props.label}>
				<BSelectOrCreateWithLookup
					id={props.id}
					placeholder={props.placeholder}
					existingItems={props.existingLocations}
					selectedId={props.selectedLocation}
					display={(info) => info.placeName}
					uniqueId={(info) => info.placeName}
          gatherCreateOptions={lookUpLocations}
					onCreate={createLocationFromResult}
					onSelect={(selectedLocation) => {
						props.onSelectLocation(selectedLocation)
					}}
          displayOption={option => option.formatted}
				/>
			</BField>
		</div>
	);
};

export default ChooseLocationForm;
