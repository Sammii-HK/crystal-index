import { CrystalInfo } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { BField, BInput } from "../Atoms";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { CrystalInfoResponse } from "../../pages/api/crystalInfo/create";
import { BSelectOrCreate } from "../Molecules/BSelectOrCreate";

type ChooseCrystalInfoFormProps = {
	existingCrystalInfos: CrystalInfo[];
	selectedCrystalInfoId: number | null | undefined;
	onCreateCrystalInfo: (info: CrystalInfo) => void;
	onSelectCrystalInfo: (id: number) => void;
};

export const ChooseCrystalInfoForm: React.FC<ChooseCrystalInfoFormProps> = (
	props
) => {
	const createNewCrystalInfo = useCallback(async (name) => {
		const res = await axios.post<CrystalInfoResponse>(
			"/api/crystalInfo/create",
			{ name }
		);

		const crystalInfo = res.data.crystalInfo;

		if (crystalInfo) {
			props.onCreateCrystalInfo(crystalInfo);
			props.onSelectCrystalInfo(crystalInfo.id);
		} else {
			// handle error
		}
	}, []);

	return (
		<div className="mt-4">
			<BField label="Crystal Info">
				<BSelectOrCreate
					id="crystalInfoSelectOrCreate"
					placeholder="Select Crystal Info"
					existingItems={props.existingCrystalInfos}
					selectedId={props.selectedCrystalInfoId}
					display={(info) => info.name}
					uniqueId={(info) => info.id}
					onCreate={createNewCrystalInfo}
					onSelect={(selectedInfo) => {
						props.onSelectCrystalInfo(selectedInfo.id);
					}}
				/>
			</BField>
		</div>
	);
};
